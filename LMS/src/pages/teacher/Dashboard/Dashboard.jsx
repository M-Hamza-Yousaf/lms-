import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function TeacherDashboard() {
  const stats = [
    { icon: '📚', label: 'My Courses', value: 4, color: 'border-l-primary' },
    { icon: '👥', label: 'Total Students', value: 156, color: 'border-l-success' },
    { icon: '📝', label: 'To Grade', value: 23, color: 'border-l-secondary' },
    { icon: '🎥', label: 'Lectures', value: 28, color: 'border-l-purple-500' },
  ];

  const myCourses = [
    { id: 1, title: 'Web Development with React', students: 45, lectures: 12, image: '🌐' },
    { id: 2, title: 'Database Management', students: 38, lectures: 10, image: '💾' },
    { id: 3, title: 'JavaScript Fundamentals', students: 52, lectures: 15, image: '💻' },
    { id: 4, title: 'Node.js Backend', students: 21, lectures: 8, image: '🚀' },
  ];

  const recentSubmissions = [
    { id: 1, student: 'Ahmed Khan', assignment: 'React Project', course: 'Web Development', time: '2 hours ago' },
    { id: 2, student: 'Sara Ali', assignment: 'SQL Quiz', course: 'Database', time: '5 hours ago' },
    { id: 3, student: 'Bilal Hassan', assignment: 'JS Functions', course: 'JavaScript', time: '1 day ago' },
    { id: 4, student: 'Ayesha Khan', assignment: 'API Project', course: 'Node.js', time: '1 day ago' },
  ];

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="teacher" />

      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-7">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-textDark mb-1">Welcome, Teacher! 👨‍🏫</h1>
            <p className="text-sm md:text-base text-textLight">Manage your courses and students</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg md:text-2xl flex-shrink-0">
            👨‍🏫
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className={`bg-white p-4 md:p-6 rounded-xl shadow-sm border-l-4 ${stat.color} flex items-center gap-3 md:gap-4 hover:-translate-y-1 hover:shadow-lg transition`}>
              <div className="text-2xl md:text-4xl bg-bg w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-textDark">{stat.value}</h3>
                <p className="text-xs md:text-sm text-textLight">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Link to="/teacher/add-lecture" className="bg-gradient-to-br from-primary to-primary-dark p-5 rounded-xl text-white hover:-translate-y-1 transition">
            <div className="text-3xl mb-2">➕</div>
            <h3 className="font-bold mb-1">Add New Lecture</h3>
            <p className="text-sm opacity-90">Upload lecture content</p>
          </Link>
          <Link to="/teacher/grade-students" className="bg-gradient-to-br from-success to-green-700 p-5 rounded-xl text-white hover:-translate-y-1 transition">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-bold mb-1">Grade Students</h3>
            <p className="text-sm opacity-90">Review submissions</p>
          </Link>
          <Link to="/teacher/courses" className="bg-gradient-to-br from-secondary to-orange-600 p-5 rounded-xl text-white hover:-translate-y-1 transition">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-bold mb-1">Manage Courses</h3>
            <p className="text-sm opacity-90">View all courses</p>
          </Link>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Courses */}
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg md:text-xl font-bold text-textDark">My Courses</h2>
              <Link to="/teacher/courses" className="text-primary font-medium text-sm hover:underline">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="flex gap-4 p-3 md:p-4 bg-bg rounded-lg hover:bg-gray-100 transition">
                  <div className="text-3xl md:text-4xl bg-white w-12 h-12 md:w-15 md:h-15 rounded-lg flex items-center justify-center flex-shrink-0">
                    {course.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-semibold text-textDark mb-1">{course.title}</h4>
                    <div className="flex gap-3 text-xs md:text-sm text-textLight">
                      <span>👥 {course.students} students</span>
                      <span>📹 {course.lectures} lectures</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg md:text-xl font-bold text-textDark">Recent Submissions</h2>
              <Link to="/teacher/grade-students" className="text-primary font-medium text-sm hover:underline">
                Grade All →
              </Link>
            </div>
            <div className="space-y-4">
              {recentSubmissions.map((sub) => (
                <div key={sub.id} className="flex gap-3 items-center p-3 md:p-4 bg-bg rounded-lg hover:bg-gray-100 transition">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-textDark mb-1">{sub.student}</h4>
                    <p className="text-xs text-textLight mb-1">{sub.assignment} · {sub.course}</p>
                    <span className="text-xs text-textLight">⏱️ {sub.time}</span>
                  </div>
                  <button className="bg-primary text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-primary-dark transition flex-shrink-0">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TeacherDashboard;