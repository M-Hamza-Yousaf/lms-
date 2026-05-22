import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function StudentDashboard() {
  const stats = [
    { icon: '📚', label: 'Enrolled Courses', value: 6, color: 'border-l-blue-600' },
    { icon: '✅', label: 'Completed', value: 3, color: 'border-l-green-500' },
    { icon: '📝', label: 'Pending Tasks', value: 8, color: 'border-l-orange-500' },
    { icon: '🏆', label: 'Average Grade', value: '85%', color: 'border-l-purple-500' },
  ];

  const recentCourses = [
    { id: 1, title: 'Web Development', progress: 75, instructor: 'Sir Ahmed', image: '🌐' },
    { id: 2, title: 'Database Systems', progress: 50, instructor: 'Sara', image: '💾' },
    { id: 3, title: 'Operating Systems', progress: 30, instructor: 'Sir Bilal', image: '💻' },
  ];

  const upcomingAssignments = [
    { id: 1, title: 'React Project', course: 'Web Development', dueDate: '2026-05-15' },
    { id: 2, title: 'SQL Quiz', course: 'Database Systems', dueDate: '2026-05-17' },
    { id: 3, title: 'OS Report', course: 'Operating Systems', dueDate: '2026-05-20' },
  ];

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="student" />
      
      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8">
        <div className="flex justify-between items-center mb-7">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-textDark mb-1">Welcome Back, Student! 👋</h1>
            <p className="text-sm md:text-base text-textLight">Here's what's happening with your learning today</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg md:text-2xl cursor-pointer flex-shrink-0">
            👤
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-white p-4 md:p-6 rounded-xl shadow-sm border-l-4 ${stat.color} flex items-center gap-3 md:gap-4 hover:-translate-y-1 hover:shadow-lg transition`}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg md:text-xl font-bold text-textDark">Continue Learning</h2>
              <Link to="/student/courses" className="text-primary font-medium text-sm hover:underline">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex gap-4 p-3 md:p-4 bg-bg rounded-lg hover:bg-gray-100 hover:translate-x-1 transition">
                  <div className="text-3xl md:text-4xl bg-white w-12 h-12 md:w-15 md:h-15 rounded-lg flex items-center justify-center flex-shrink-0">
                    {course.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-semibold text-textDark mb-1">{course.title}</h4>
                    <p className="text-xs md:text-sm text-textLight mb-2">Instructor: {course.instructor}</p>
                    <div className="bg-border h-1.5 rounded overflow-hidden mb-1">
                      <div className="bg-primary h-full rounded transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="text-xs text-textLight font-medium">{course.progress}% complete</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg md:text-xl font-bold text-textDark">Upcoming Assignments</h2>
              <Link to="/student/assignments" className="text-primary font-medium text-sm hover:underline">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="flex gap-3 items-center p-3 md:p-4 bg-bg rounded-lg hover:bg-gray-100 transition flex-wrap">
                  <div className="text-2xl md:text-3xl flex-shrink-0">📝</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-semibold text-textDark mb-1">{assignment.title}</h4>
                    <p className="text-xs md:text-sm text-textLight mb-1">{assignment.course}</p>
                    <span className="text-xs text-danger font-medium">📅 Due: {assignment.dueDate}</span>
                  </div>
                  <button className="bg-primary text-white px-4 py-2 rounded-md text-xs md:text-sm font-medium hover:bg-primary-dark transition flex-shrink-0 ml-auto">
                    Submit
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

export default StudentDashboard;