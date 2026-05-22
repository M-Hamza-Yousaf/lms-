import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function StudentCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const allCourses = [
    { id: 1, title: 'Web Development with React', instructor: 'Sir Ahmed Khan', image: '🌐', progress: 75, totalLectures: 24, completedLectures: 18, category: 'enrolled', rating: 4.8 },
    { id: 2, title: 'Database Management Systems', instructor: 'Sara Ali', image: '💾', progress: 50, totalLectures: 20, completedLectures: 10, category: 'enrolled', rating: 4.6 },
    { id: 3, title: 'Operating Systems', instructor: 'Sir Bilal Hussain', image: '💻', progress: 30, totalLectures: 18, completedLectures: 5, category: 'enrolled', rating: 4.7 },
    { id: 4, title: 'Data Structures & Algorithms', instructor: 'Sir Imran Malik', image: '🧮', progress: 100, totalLectures: 22, completedLectures: 22, category: 'completed', rating: 4.9 },
    { id: 5, title: 'Computer Networks', instructor: 'Ayesha Khan', image: '🌐', progress: 100, totalLectures: 16, completedLectures: 16, category: 'completed', rating: 4.5 },
    { id: 6, title: 'Software Engineering', instructor: 'Sir Tariq Mehmood', image: '⚙️', progress: 100, totalLectures: 20, completedLectures: 20, category: 'completed', rating: 4.8 },
    { id: 7, title: 'Mobile App Development', instructor: 'Sir Hassan Ali', image: '📱', progress: 0, totalLectures: 25, completedLectures: 0, category: 'available', rating: 4.7 },
    { id: 8, title: 'Cloud Computing', instructor: 'Fatima Sheikh', image: '☁️', progress: 0, totalLectures: 18, completedLectures: 0, category: 'available', rating: 4.6 },
    { id: 9, title: 'Artificial Intelligence', instructor: 'Sir Usman Khan', image: '🤖', progress: 0, totalLectures: 28, completedLectures: 0, category: 'available', rating: 4.9 },
  ];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || course.category === filter;
    return matchesSearch && matchesFilter;
  });

  const counts = {
    all: allCourses.length,
    enrolled: allCourses.filter(c => c.category === 'enrolled').length,
    completed: allCourses.filter(c => c.category === 'completed').length,
    available: allCourses.filter(c => c.category === 'available').length,
  };

  const getBadge = (category) => {
    if (category === 'completed') return { text: '✓ Completed', class: 'bg-success' };
    if (category === 'enrolled') return { text: 'In Progress', class: 'bg-secondary' };
    return { text: 'New', class: 'bg-primary' };
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="student" />

      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-textDark mb-1">My Courses 📚</h1>
          <p className="text-sm md:text-base text-textLight">Browse and manage your learning</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { key: 'all', label: 'All Courses', count: counts.all },
            { key: 'enrolled', label: 'In Progress', count: counts.enrolled },
            { key: 'completed', label: 'Completed', count: counts.completed },
            { key: 'available', label: 'Available', count: counts.available },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0 border transition ${
                filter === tab.key
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-textLight border-border hover:border-primary hover:text-primary'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                filter === tab.key ? 'bg-white bg-opacity-25' : 'bg-black bg-opacity-10'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((course) => {
              const badge = getBadge(course.category);
              return (
                <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
                  {/* Card Header */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex justify-between items-start">
                    <span className="text-5xl">{course.image}</span>
                    <span className={`${badge.class} text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide`}>
                      {badge.text}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1">
                    <h3 className="text-base font-semibold text-textDark mb-2 leading-tight">{course.title}</h3>
                    <p className="text-sm text-textLight mb-3">👤 {course.instructor}</p>

                    <div className="flex justify-between text-xs text-textLight mb-3 pb-3 border-b border-border">
                      <span>📹 {course.totalLectures} lectures</span>
                      <span>⭐ {course.rating}</span>
                    </div>

                    {course.category !== 'available' && (
                      <>
                        <div className="bg-border h-1.5 rounded overflow-hidden mb-2">
                          <div className="bg-primary h-full rounded transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <p className="text-xs text-textLight font-medium">
                          {course.completedLectures} / {course.totalLectures} · {course.progress}%
                        </p>
                      </>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-0">
                    {course.category === 'available' ? (
                      <button className="w-full bg-success text-white py-3 rounded-lg font-semibold text-sm hover:bg-green-700 transition">
                        Enroll Now
                      </button>
                    ) : (
                      <Link
                        to="/student/lecture-view"
                        className="block w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-dark transition text-center"
                      >
                        {course.category === 'completed' ? 'Review' : 'Continue Learning'}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-textDark font-semibold mb-2">No courses found</h3>
            <p className="text-textLight">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default StudentCourses;