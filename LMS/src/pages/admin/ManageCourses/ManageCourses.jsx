import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function AdminManageCourses() {
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    { id: 1, title: 'Web Development with React', instructor: 'Sir Ahmed', students: 245, status: 'active', created: '2025-08-15', icon: '🌐' },
    { id: 2, title: 'JavaScript Fundamentals', instructor: 'Sara Ali', students: 198, status: 'active', created: '2025-07-20', icon: '💻' },
    { id: 3, title: 'Database Systems', instructor: 'Sir Bilal', students: 156, status: 'active', created: '2025-09-10', icon: '💾' },
    { id: 4, title: 'Python Programming', instructor: 'Sir Tariq', students: 142, status: 'active', created: '2025-06-05', icon: '🐍' },
    { id: 5, title: 'AI Basics', instructor: 'Sir Usman', students: 89, status: 'pending', created: '2026-04-20', icon: '🤖' },
    { id: 6, title: 'Mobile Development', instructor: 'Hassan Ali', students: 67, status: 'active', created: '2026-01-15', icon: '📱' },
    { id: 7, title: 'Cloud Computing', instructor: 'Fatima Sheikh', students: 0, status: 'pending', created: '2026-05-10', icon: '☁️' },
  ];

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="admin" />

      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-textDark mb-1">Manage Courses 📚</h1>
            <p className="text-sm md:text-base text-textLight">Review and manage all platform courses</p>
          </div>
          <button className="bg-primary text-white px-5 py-3 rounded-lg font-semibold hover:bg-primary-dark transition">
            ➕ Add New Course
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex justify-between items-start">
                <span className="text-5xl">{course.icon}</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${
                  course.status === 'active' ? 'bg-success text-white' : 'bg-secondary text-white'
                }`}>
                  {course.status}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-textDark mb-2">{course.title}</h3>
                <p className="text-sm text-textLight mb-4">👤 {course.instructor}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-bg p-3 rounded-lg text-center">
                    <p className="text-textLight text-xs mb-1">Students</p>
                    <p className="font-bold text-textDark">{course.students}</p>
                  </div>
                  <div className="bg-bg p-3 rounded-lg text-center">
                    <p className="text-textLight text-xs mb-1">Created</p>
                    <p className="font-bold text-textDark text-xs">{course.created}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition">
                    ✏️ Edit
                  </button>
                  <button className="flex-1 bg-bg text-textDark py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                    👁️ View
                  </button>
                  <button className="bg-danger text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition">
                    🗑️
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

export default AdminManageCourses;