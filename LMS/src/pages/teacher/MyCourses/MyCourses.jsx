import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function TeacherMyCourses() {
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    { id: 1, title: 'Web Development with React', students: 45, lectures: 12, status: 'active', image: '🌐', rating: 4.8, created: '2025-08-15' },
    { id: 2, title: 'Database Management Systems', students: 38, lectures: 10, status: 'active', image: '💾', rating: 4.6, created: '2025-09-20' },
    { id: 3, title: 'JavaScript Fundamentals', students: 52, lectures: 15, status: 'active', image: '💻', rating: 4.7, created: '2025-07-10' },
    { id: 4, title: 'Node.js Backend Development', students: 21, lectures: 8, status: 'draft', image: '🚀', rating: 0, created: '2026-01-05' },
  ];

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="teacher" />

      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-textDark mb-1">My Courses 📚</h1>
            <p className="text-sm md:text-base text-textLight">Manage all your courses</p>
          </div>
          <button className="bg-primary text-white px-5 py-3 rounded-lg font-semibold hover:bg-primary-dark transition">
            ➕ Create New Course
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex justify-between items-start">
                <span className="text-5xl">{course.image}</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${
                  course.status === 'active' ? 'bg-success text-white' : 'bg-secondary text-white'
                }`}>
                  {course.status}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-textDark mb-3">{course.title}</h3>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="bg-bg p-3 rounded-lg">
                    <p className="text-textLight text-xs mb-1">👥 Students</p>
                    <p className="font-bold text-textDark">{course.students}</p>
                  </div>
                  <div className="bg-bg p-3 rounded-lg">
                    <p className="text-textLight text-xs mb-1">📹 Lectures</p>
                    <p className="font-bold text-textDark">{course.lectures}</p>
                  </div>
                </div>
                <div className="text-xs text-textLight mb-4">
                  ⭐ {course.rating > 0 ? course.rating : 'No ratings yet'} · Created {course.created}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition">
                    ✏️ Edit
                  </button>
                  <button className="flex-1 bg-bg text-textDark py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                    👁️ View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TeacherMyCourses;