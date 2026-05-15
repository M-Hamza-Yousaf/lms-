import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';
import './Dashboard.css';

function StudentDashboard() {
  // Dummy data (will come from backend later)
  const stats = [
    { icon: '📚', label: 'Enrolled Courses', value: 6, color: 'blue' },
    { icon: '✅', label: 'Completed', value: 3, color: 'green' },
    { icon: '📝', label: 'Pending Tasks', value: 8, color: 'orange' },
    { icon: '🏆', label: 'Average Grade', value: '85%', color: 'purple' },
  ];

  const recentCourses = [
    { id: 1, title: 'Web Development', progress: 75, instructor: 'Sir Ahmed', image: '🌐' },
    { id: 2, title: 'Database Systems', progress: 50, instructor: 'Ma\'am Sara', image: '💾' },
    { id: 3, title: 'Operating Systems', progress: 30, instructor: 'Sir Bilal', image: '💻' },
  ];

  const upcomingAssignments = [
    { id: 1, title: 'React Project Submission', course: 'Web Development', dueDate: '2026-05-15', status: 'pending' },
    { id: 2, title: 'SQL Queries Quiz', course: 'Database Systems', dueDate: '2026-05-17', status: 'pending' },
    { id: 3, title: 'Process Scheduling Report', course: 'Operating Systems', dueDate: '2026-05-20', status: 'pending' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />
      
      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Welcome Back, Student! 👋</h1>
            <p>Here's what's happening with your learning today</p>
          </div>
          <div className="user-avatar">👤</div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="dashboard-content">
          {/* Recent Courses */}
          <div className="content-section">
            <div className="section-header">
              <h2>Continue Learning</h2>
              <Link to="/student/courses" className="view-all">View All →</Link>
            </div>
            <div className="courses-list">
              {recentCourses.map((course) => (
                <div key={course.id} className="course-item">
                  <div className="course-image">{course.image}</div>
                  <div className="course-details">
                    <h4>{course.title}</h4>
                    <p>Instructor: {course.instructor}</p>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{course.progress}% complete</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="content-section">
            <div className="section-header">
              <h2>Upcoming Assignments</h2>
              <Link to="/student/assignments" className="view-all">View All →</Link>
            </div>
            <div className="assignments-list">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-icon">📝</div>
                  <div className="assignment-details">
                    <h4>{assignment.title}</h4>
                    <p>{assignment.course}</p>
                    <span className="due-date">📅 Due: {assignment.dueDate}</span>
                  </div>
                  <button className="submit-btn">Submit</button>
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