import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar/Sidebar';

function LectureView() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLecture, setActiveLecture] = useState(0);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get('https://lms-production-b53d.up.railway.app/api/courses');
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      const enrolled = response.data.courses.filter(c => 
        c.enrolledStudents?.some(id => id === userData.id)
      );
      
      setCourses(enrolled);
      if (enrolled.length > 0) {
        setSelectedCourse(enrolled[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setActiveLecture(0);
  };

  const isYouTubeUrl = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-bg">
        <Sidebar role="student" />
        <div className="flex-1 md:ml-64 p-6 flex items-center justify-center">
          <p className="text-textLight">Loading lectures...</p>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex min-h-screen bg-bg">
        <Sidebar role="student" />
        <div className="flex-1 md:ml-64 p-6">
          <div className="max-w-3xl mx-auto bg-white p-12 rounded-2xl shadow-lg text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-textDark mb-2">No Enrolled Courses</h2>
            <p className="text-textLight mb-6">Enroll in courses to access lectures</p>
            <Link 
              to="/student/courses"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentLecture = selectedCourse?.lectures?.[activeLecture];

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="student" />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-textDark">My Lectures 🎥</h1>
            <p className="text-textLight">Watch lectures from your enrolled courses</p>
          </div>

          {/* Course Selection Tabs */}
          <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {courses.map(course => (
                <button
                  key={course._id}
                  onClick={() => handleCourseSelect(course)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                    selectedCourse?._id === course._id
                      ? 'bg-primary text-white'
                      : 'bg-bg text-textDark hover:bg-blue-50'
                  }`}
                >
                  {course.title}
                </button>
              ))}
            </div>
          </div>

          {selectedCourse && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Video Player + Info */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
                  
                  {selectedCourse.lectures?.length === 0 ? (
                    <div className="aspect-video bg-textDark flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-2">📚</div>
                        <p>No lectures available yet</p>
                      </div>
                    </div>
                  ) : currentLecture && isYouTubeUrl(currentLecture.videoUrl) ? (
                    <div className="aspect-video">
                      <iframe
                        src={getYouTubeEmbedUrl(currentLecture.videoUrl)}
                        className="w-full h-full"
                        title={currentLecture.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : currentLecture ? (
                    <div className="aspect-video bg-textDark flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-2">▶️</div>
                        <p className="text-xl font-semibold mb-1">{currentLecture.title}</p>
                        <a 
                          href={currentLecture.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-sm underline mt-2"
                        >
                          Open Video in New Tab →
                        </a>
                      </div>
                    </div>
                  ) : null}

                  {currentLecture && (
                    <div className="p-6">
                      <span className="inline-block bg-blue-100 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        Lecture {activeLecture + 1} of {selectedCourse.lectures?.length}
                      </span>
                      <h2 className="text-2xl font-bold text-textDark mb-2">{currentLecture.title}</h2>
                      <p className="text-textLight text-sm mb-2">⏱️ Duration: {currentLecture.duration}</p>
                      {currentLecture.description && (
                        <p className="text-textLight">{currentLecture.description}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-lg font-bold text-textDark mb-2">About This Course</h3>
                  <p className="text-textLight text-sm mb-3">{selectedCourse.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-textLight">
                    <span>👨‍🏫 {selectedCourse.teacherName}</span>
                    <span>📊 {selectedCourse.level}</span>
                    <span>⏱️ {selectedCourse.duration}</span>
                  </div>
                </div>
              </div>

              {/* Lecture List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-5 sticky top-6">
                  <h3 className="text-lg font-bold text-textDark mb-4">
                    📚 Course Content ({selectedCourse.lectures?.length || 0})
                  </h3>
                  
                  {selectedCourse.lectures?.length === 0 ? (
                    <p className="text-textLight text-sm text-center py-6">
                      No lectures yet
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {selectedCourse.lectures?.map((lecture, index) => (
                        <li key={lecture._id}>
                          <button
                            onClick={() => setActiveLecture(index)}
                            className={`w-full text-left p-3 rounded-lg transition ${
                              activeLecture === index
                                ? 'bg-primary text-white'
                                : 'text-textDark hover:bg-bg'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span className={`text-xs font-bold ${
                                activeLecture === index ? 'text-white' : 'text-textLight'
                              }`}>
                                {index + 1}.
                              </span>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{lecture.title}</p>
                                <p className={`text-xs mt-1 ${
                                  activeLecture === index ? 'text-white opacity-90' : 'text-textLight'
                                }`}>
                                  ⏱️ {lecture.duration}
                                </p>
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LectureView;