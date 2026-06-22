import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar/Sidebar';

function AddLecture() {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); // 1 = course form, 2 = add lectures
  const [createdCourse, setCreatedCourse] = useState(null);
  
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    duration: '4 weeks',
    price: 0,
    level: 'Beginner',
    thumbnail: ''
  });

  const [lectureData, setLectureData] = useState({
    title: '',
    videoUrl: '',
    duration: '10 min',
    description: ''
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://lms-production-b53d.up.railway.app/api/courses/my-courses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCourseChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleLectureChange = (e) => {
    setLectureData({ ...lectureData, [e.target.name]: e.target.value });
  };

  // Step 1: Create Course
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://lms-production-b53d.up.railway.app/api/courses',
        courseData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCreatedCourse(response.data.course);
      setSelectedCourse(response.data.course);
      setStep(2);
      fetchMyCourses();
      alert('Course created! Now add lectures.');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Add Lecture
  const handleAddLecture = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const courseId = selectedCourse._id;
      
      const response = await axios.post(
        `https://lms-production-b53d.up.railway.app/api/courses/${courseId}/lectures`,
        lectureData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedCourse(response.data.course);
      setLectureData({
        title: '',
        videoUrl: '',
        duration: '10 min',
        description: ''
      });
      
      fetchMyCourses();
      alert('Lecture added successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add lecture');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLecture = async (lectureId) => {
    if (!window.confirm('Delete this lecture?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const courseId = selectedCourse._id;
      
      const response = await axios.delete(
        `https://lms-production-b53d.up.railway.app/api/courses/${courseId}/lectures/${lectureId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedCourse(response.data.course);
      fetchMyCourses();
    } catch (error) {
      alert('Failed to delete lecture');
    }
  };

  const selectExistingCourse = (course) => {
    setSelectedCourse(course);
    setStep(2);
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="teacher" />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-textDark">Add Course & Lectures 📚</h1>
            <p className="text-textLight mt-1">Create courses and manage lectures</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setStep(1)}
              className={`px-5 py-2.5 rounded-lg font-semibold transition ${
                step === 1 ? 'bg-primary text-white' : 'bg-white text-textDark'
              }`}
            >
              ➕ New Course
            </button>
            <button
              onClick={() => courses.length > 0 ? setStep(2) : alert('Create a course first')}
              className={`px-5 py-2.5 rounded-lg font-semibold transition ${
                step === 2 ? 'bg-primary text-white' : 'bg-white text-textDark'
              }`}
            >
              🎥 Manage Lectures
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-danger text-danger px-4 py-3 rounded-lg mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Step 1: Create Course */}
          {step === 1 && (
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-textDark mb-4">Create New Course</h2>
              
              <form onSubmit={handleCreateCourse} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-textDark mb-1.5">Course Title</label>
                  <input
                    type="text"
                    name="title"
                    value={courseData.title}
                    onChange={handleCourseChange}
                    required
                    placeholder="e.g., React for Beginners"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-1.5">Description</label>
                  <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleCourseChange}
                    required
                    rows="3"
                    placeholder="What will students learn..."
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-textDark mb-1.5">Category</label>
                    <select
                      name="category"
                      value={courseData.category}
                      onChange={handleCourseChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                    >
                      <option value="Programming">Programming</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-textDark mb-1.5">Level</label>
                    <select
                      name="level"
                      value={courseData.level}
                      onChange={handleCourseChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-textDark mb-1.5">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={courseData.duration}
                      onChange={handleCourseChange}
                      placeholder="e.g., 4 weeks"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-textDark mb-1.5">Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={courseData.price}
                      onChange={handleCourseChange}
                      min="0"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-1.5">Thumbnail URL (Optional)</label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={courseData.thumbnail}
                    onChange={handleCourseChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-60"
                >
                  {loading ? '⏳ Creating Course...' : '➕ Create Course'}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Manage Lectures */}
          {step === 2 && (
            <div className="space-y-6">
              
              {/* Select Course */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold text-textDark mb-4">Select Course</h2>
                {courses.length === 0 ? (
                  <p className="text-textLight">No courses yet. Create one first!</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {courses.map(course => (
                      <button
                        key={course._id}
                        onClick={() => selectExistingCourse(course)}
                        className={`p-4 rounded-lg text-left transition ${
                          selectedCourse?._id === course._id
                            ? 'bg-primary text-white'
                            : 'bg-bg hover:bg-blue-50 text-textDark'
                        }`}
                      >
                        <h3 className="font-bold text-sm mb-1">{course.title}</h3>
                        <p className="text-xs opacity-80">
                          {course.lectures?.length || 0} lectures
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedCourse && (
                <>
                  {/* Add Lecture Form */}
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-textDark mb-4">
                      Add Lecture to: {selectedCourse.title}
                    </h2>
                    
                    <form onSubmit={handleAddLecture} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-textDark mb-1.5">Lecture Title</label>
                        <input
                          type="text"
                          name="title"
                          value={lectureData.title}
                          onChange={handleLectureChange}
                          required
                          placeholder="e.g., Introduction to React"
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-textDark mb-1.5">Video URL</label>
                        <input
                          type="url"
                          name="videoUrl"
                          value={lectureData.videoUrl}
                          onChange={handleLectureChange}
                          required
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-textDark mb-1.5">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={lectureData.duration}
                          onChange={handleLectureChange}
                          placeholder="e.g., 15 min"
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-textDark mb-1.5">Description</label>
                        <textarea
                          name="description"
                          value={lectureData.description}
                          onChange={handleLectureChange}
                          rows="2"
                          placeholder="Brief description of this lecture..."
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-60"
                      >
                        {loading ? '⏳ Adding...' : '➕ Add Lecture'}
                      </button>
                    </form>
                  </div>

                  {/* Existing Lectures */}
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-textDark mb-4">
                      Lectures ({selectedCourse.lectures?.length || 0})
                    </h2>
                    
                    {selectedCourse.lectures?.length === 0 ? (
                      <p className="text-textLight text-center py-6">No lectures yet. Add your first lecture above!</p>
                    ) : (
                      <ul className="space-y-3">
                        {selectedCourse.lectures?.map((lecture, index) => (
                          <li key={lecture._id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-bg transition">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-primary font-semibold text-sm">#{index + 1}</span>
                                <h3 className="font-semibold text-textDark">{lecture.title}</h3>
                              </div>
                              <p className="text-xs text-textLight">⏱️ {lecture.duration}</p>
                              {lecture.description && (
                                <p className="text-xs text-textLight mt-1">{lecture.description}</p>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteLecture(lecture._id)}
                              className="bg-danger text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-red-700 transition"
                            >
                              🗑️ Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddLecture;