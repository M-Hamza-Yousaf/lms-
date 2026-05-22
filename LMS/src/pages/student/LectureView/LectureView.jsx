import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function LectureView() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLectureId, setCurrentLectureId] = useState(3);

  const course = {
    title: 'Web Development with React',
    instructor: 'Sir Ahmed Khan',
    totalLectures: 12,
    completedLectures: 5,
  };

  const lectures = [
    { id: 1, title: 'Introduction to React', duration: '15:30', completed: true },
    { id: 2, title: 'JSX & Components', duration: '22:45', completed: true },
    { id: 3, title: 'State and Props', duration: '28:10', completed: false },
    { id: 4, title: 'Hooks - useState', duration: '20:15', completed: false },
    { id: 5, title: 'Hooks - useEffect', duration: '25:30', completed: false },
    { id: 6, title: 'React Router Basics', duration: '32:20', completed: false },
    { id: 7, title: 'Forms in React', duration: '18:45', completed: false },
    { id: 8, title: 'API Integration', duration: '30:00', completed: false },
    { id: 9, title: 'Context API', duration: '24:15', completed: false },
    { id: 10, title: 'Performance Optimization', duration: '27:30', completed: false },
    { id: 11, title: 'Deployment', duration: '20:00', completed: false },
    { id: 12, title: 'Final Project', duration: '45:00', completed: false },
  ];

  const resources = [
    { id: 1, name: 'Lecture Slides', type: 'PDF', size: '2.4 MB', icon: '📄' },
    { id: 2, name: 'Code Examples', type: 'ZIP', size: '1.8 MB', icon: '💻' },
    { id: 3, name: 'Practice Exercises', type: 'PDF', size: '1.2 MB', icon: '✏️' },
    { id: 4, name: 'Reference Links', type: 'TXT', size: '5 KB', icon: '🔗' },
  ];

  const comments = [
    { id: 1, user: 'Ali Khan', time: '2 hours ago', text: 'Great explanation! Can you provide more examples on useState with objects?' },
    { id: 2, user: 'Sara Ahmed', time: '5 hours ago', text: 'I was confused about props vs state but this lecture cleared everything!' },
    { id: 3, user: 'Bilal Hassan', time: '1 day ago', text: 'The code in 15:30 timestamp is not working for me. Anyone facing same issue?' },
  ];

  const currentLecture = lectures.find(l => l.id === currentLectureId) || lectures[2];

  const handleMarkComplete = () => {
    alert('Lecture marked as complete! (Backend integration pending)');
  };

  const handleNext = () => {
    if (currentLectureId < lectures.length) setCurrentLectureId(currentLectureId + 1);
  };

  const handlePrevious = () => {
    if (currentLectureId > 1) setCurrentLectureId(currentLectureId - 1);
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="student" />

      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8 pb-10">
        {/* Breadcrumb */}
        <div className="flex gap-2 items-center mb-4 text-sm text-textLight flex-wrap">
          <Link to="/student/courses" className="text-primary font-medium hover:underline">
            📚 My Courses
          </Link>
          <span>→</span>
          <span className="truncate">{course.title}</span>
        </div>

        {/* Course Header */}
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-textDark mb-1">{course.title}</h1>
            <p className="text-sm text-textLight">👤 {course.instructor} · 📹 {course.totalLectures} lectures</p>
          </div>
          <div className="flex items-center gap-3 bg-bg md:bg-transparent p-3 md:p-0 rounded-lg">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
              {Math.round((course.completedLectures / course.totalLectures) * 100)}%
            </div>
            <p className="text-xs md:text-sm text-textLight font-medium">{course.completedLectures} / {course.totalLectures} completed</p>
          </div>
        </div>

        {/* Main Content - 2 Column on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Left - Video + Content */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Video Placeholder */}
            <div className="bg-black aspect-video flex items-center justify-center text-white text-center p-4 cursor-pointer hover:scale-[1.02] transition">
              <div>
                <span className="text-5xl md:text-6xl block mb-3">▶️</span>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{currentLecture.title}</h3>
                <p className="text-sm opacity-70 mb-1">Lecture {currentLecture.id} · {currentLecture.duration}</p>
                <small className="text-xs opacity-50">Click to play (Video integration pending)</small>
              </div>
            </div>

            {/* Lecture Actions */}
            <div className="p-5 md:p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-border">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-textDark mb-2">
                  Lecture {currentLecture.id}: {currentLecture.title}
                </h2>
                <span className="bg-bg px-3 py-1 rounded-full text-xs text-textLight font-medium">
                  ⏱️ {currentLecture.duration}
                </span>
              </div>
              <button
                onClick={handleMarkComplete}
                className="bg-success text-white px-5 py-3 rounded-lg font-semibold text-sm hover:bg-green-700 hover:-translate-y-0.5 transition"
              >
                ✓ Mark as Complete
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-5 md:px-6 pt-4 border-b border-border overflow-x-auto">
              {[
                { key: 'overview', label: '📖 Overview' },
                { key: 'resources', label: '📎 Resources' },
                { key: 'discussion', label: '💬 Discussion' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'text-primary border-primary'
                      : 'text-textLight border-transparent hover:text-textDark'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-5 md:p-6 min-h-[300px]">
              {/* Overview */}
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-base font-semibold text-textDark mb-3">About This Lecture</h3>
                  <p className="text-textLight mb-4 leading-relaxed">
                    In this lecture, we will dive deep into React's state and props.
                    You will learn how to manage component state using useState hook
                    and how to pass data between components using props.
                  </p>

                  <h3 className="text-base font-semibold text-textDark mb-3 mt-5">What You Will Learn</h3>
                  <ul className="space-y-2">
                    {['Understanding component state', 'Using useState hook effectively', 'Passing data with props', 'Best practices for state management', 'Common pitfalls and how to avoid them'].map((item, i) => (
                      <li key={i} className="text-textLight pl-7 relative">
                        <span className="absolute left-0 text-success font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-base font-semibold text-textDark mb-3 mt-5">Prerequisites</h3>
                  <p className="text-textLight">Basic understanding of JSX and React components from previous lectures.</p>
                </div>
              )}

              {/* Resources */}
              {activeTab === 'resources' && (
                <div>
                  <h3 className="text-base font-semibold text-textDark mb-2">Lecture Resources</h3>
                  <p className="text-textLight mb-5">Download these materials to follow along with the lecture:</p>
                  <div className="space-y-3">
                    {resources.map(resource => (
                      <div key={resource.id} className="flex items-center gap-4 p-4 bg-bg rounded-lg hover:bg-gray-100 transition">
                        <span className="text-3xl flex-shrink-0">{resource.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1">{resource.name}</h4>
                          <p className="text-xs text-textLight">{resource.type} · {resource.size}</p>
                        </div>
                        <button className="bg-primary text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-primary-dark transition flex-shrink-0">
                          ⬇️ Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discussion */}
              {activeTab === 'discussion' && (
                <div>
                  <h3 className="text-base font-semibold text-textDark mb-5">Discussion ({comments.length})</h3>

                  {/* Comment Input */}
                  <div className="bg-bg rounded-lg p-4 mb-6">
                    <textarea
                      placeholder="Ask a question or share your thoughts..."
                      rows="3"
                      className="w-full border border-border rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-primary resize-y"
                    ></textarea>
                    <button className="mt-3 bg-primary text-white px-6 py-2.5 rounded-md font-medium hover:bg-primary-dark transition">
                      Post Comment
                    </button>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map(comment => (
                      <div key={comment.id} className="flex gap-3 pb-4 border-b border-border last:border-0">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg flex-shrink-0">
                          👤
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2 mb-2">
                            <strong className="text-sm">{comment.user}</strong>
                            <span className="text-xs text-textLight whitespace-nowrap">{comment.time}</span>
                          </div>
                          <p className="text-textDark mb-2 leading-relaxed text-sm">{comment.text}</p>
                          <div className="flex gap-4">
                            <button className="text-xs text-textLight font-medium hover:text-primary transition">👍 Like</button>
                            <button className="text-xs text-textLight font-medium hover:text-primary transition">💬 Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col md:flex-row justify-between gap-3 p-5 md:p-6 border-t border-border">
              <button
                onClick={handlePrevious}
                disabled={currentLectureId === 1}
                className="px-6 py-3 bg-bg text-textDark rounded-lg font-semibold text-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition w-full md:w-auto"
              >
                ← Previous Lecture
              </button>
              <button
                onClick={handleNext}
                disabled={currentLectureId === lectures.length}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition w-full md:w-auto"
              >
                Next Lecture →
              </button>
            </div>
          </div>

          {/* Right - Lectures List Sidebar */}
          <aside className="bg-white p-5 rounded-xl shadow-sm lg:sticky lg:top-5 lg:max-h-[calc(100vh-40px)] overflow-y-auto">
            <h3 className="text-base font-semibold mb-2">Course Content</h3>
            <p className="text-xs text-textLight mb-4 pb-4 border-b border-border">
              {course.completedLectures} / {course.totalLectures} lectures completed
            </p>
            <div className="space-y-2">
              {lectures.map(lecture => (
                <div
                  key={lecture.id}
                  onClick={() => setCurrentLectureId(lecture.id)}
                  className={`flex gap-3 p-3 rounded-lg cursor-pointer transition items-start ${
                    lecture.id === currentLectureId
                      ? 'bg-blue-50 border-l-4 border-primary'
                      : 'bg-bg hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg flex-shrink-0">
                    {lecture.completed ? '✅' : lecture.id === currentLectureId ? '▶️' : '⭕'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-semibold mb-1 ${lecture.completed ? 'text-success' : 'text-textDark'}`}>
                      Lecture {lecture.id}
                    </h4>
                    <p className="text-xs text-textDark mb-1 leading-tight">{lecture.title}</p>
                    <small className="text-xs text-textLight">⏱️ {lecture.duration}</small>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default LectureView;