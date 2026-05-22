import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function AdminDashboard() {
  const stats = [
    { icon: '👥', label: 'Total Users', value: '1,245', color: 'from-primary to-primary-dark' },
    { icon: '📚', label: 'Total Courses', value: '87', color: 'from-success to-green-700' },
    { icon: '🎓', label: 'Active Students', value: '980', color: 'from-secondary to-orange-600' },
    { icon: '👨‍🏫', label: 'Teachers', value: '52', color: 'from-purple-500 to-purple-700' },
  ];

  const recentActivity = [
    { id: 1, action: 'Ahmad signed up as Student', time: '5 minutes ago', icon: '👤', color: 'bg-blue-100' },
    { id: 2, action: 'Sara enrolled in Web Development', time: '15 minutes ago', icon: '📚', color: 'bg-green-100' },
    { id: 3, action: 'New course "AI Basics" added', time: '1 hour ago', icon: '➕', color: 'bg-purple-100' },
    { id: 4, action: 'Bilal submitted assignment', time: '2 hours ago', icon: '📝', color: 'bg-orange-100' },
    { id: 5, action: 'Course "Database" updated', time: '3 hours ago', icon: '✏️', color: 'bg-pink-100' },
  ];

  const topCourses = [
    { id: 1, title: 'Web Development', students: 245, instructor: 'Sir Ahmed' },
    { id: 2, title: 'JavaScript Basics', students: 198, instructor: 'Sara Ali' },
    { id: 3, title: 'Database Systems', students: 156, instructor: 'Sir Bilal' },
    { id: 4, title: 'Python Programming', students: 142, instructor: 'Sir Tariq' },
  ];

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="admin" />

      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-7">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-textDark mb-1">Admin Dashboard ⚙️</h1>
            <p className="text-sm md:text-base text-textLight">Manage your LMS platform</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-lg md:text-2xl flex-shrink-0">
            ⚙️
          </div>
        </div>

        {/* Stats - Gradient Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} p-5 md:p-6 rounded-xl text-white hover:-translate-y-1 transition`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <h3 className="text-2xl md:text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link to="/admin/manage-users" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-3xl">
              👥
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-textDark mb-1">Manage Users</h3>
              <p className="text-sm text-textLight">View and manage all users</p>
            </div>
            <span className="text-primary">→</span>
          </Link>
          <Link to="/admin/manage-courses" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-3xl">
              📚
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-textDark mb-1">Manage Courses</h3>
              <p className="text-sm text-textLight">Review and manage courses</p>
            </div>
            <span className="text-primary">→</span>
          </Link>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm">
            <h2 className="text-lg md:text-xl font-bold text-textDark mb-5">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3 items-center p-3 bg-bg rounded-lg hover:bg-gray-100 transition">
                  <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-textDark">{activity.action}</p>
                    <span className="text-xs text-textLight">⏱️ {activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Courses */}
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm">
            <h2 className="text-lg md:text-xl font-bold text-textDark mb-5">Top Courses</h2>
            <div className="space-y-3">
              {topCourses.map((course, i) => (
                <div key={course.id} className="flex items-center gap-3 p-3 bg-bg rounded-lg hover:bg-gray-100 transition">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white flex-shrink-0 ${
                    i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-orange-700' : 'bg-primary'
                  }`}>
                    #{i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-textDark text-sm">{course.title}</h4>
                    <p className="text-xs text-textLight">{course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-textDark">{course.students}</p>
                    <p className="text-xs text-textLight">students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;