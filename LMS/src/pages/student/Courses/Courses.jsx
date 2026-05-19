import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';
import './Courses.css';

function StudentCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  // Dummy courses data (will come from backend later)
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

  // Filter courses based on search and category
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || course.category === filter;
    return matchesSearch && matchesFilter;
  });

  // Count courses by category
  const counts = {
    all: allCourses.length,
    enrolled: allCourses.filter(c => c.category === 'enrolled').length,
    completed: allCourses.filter(c => c.category === 'completed').length,
    available: allCourses.filter(c => c.category === 'available').length,
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />

      <main className="dashboard-main">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1>My Courses 📚</h1>
            <p>Browse and manage your learning</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Courses <span className="count">{counts.all}</span>
          </button>
          <button
            className={`filter-tab ${filter === 'enrolled' ? 'active' : ''}`}
            onClick={() => setFilter('enrolled')}
          >
            In Progress <span className="count">{counts.enrolled}</span>
          </button>
          <button
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed <span className="count">{counts.completed}</span>
          </button>
          <button
            className={`filter-tab ${filter === 'available' ? 'active' : ''}`}
            onClick={() => setFilter('available')}
          >
            Available <span className="count">{counts.available}</span>
          </button>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-card-header">
                  <span className="course-emoji">{course.image}</span>
                  {course.category === 'completed' && (
                    <span className="badge completed-badge">✓ Completed</span>
                  )}
                  {course.category === 'enrolled' && (
                    <span className="badge progress-badge">In Progress</span>
                  )}
                  {course.category === 'available' && (
                    <span className="badge new-badge">New</span>
                  )}
                </div>

                <div className="course-card-body">
                  <h3>{course.title}</h3>
                  <p className="instructor">👤 {course.instructor}</p>

                  <div className="course-meta">
                    <span>📹 {course.totalLectures} lectures</span>
                    <span>⭐ {course.rating}</span>
                  </div>

                  {course.category !== 'available' && (
                    <>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="progress-info">
                        {course.completedLectures} / {course.totalLectures} lectures · {course.progress}%
                      </p>
                    </>
                  )}
                </div>

                <div className="course-card-footer">
                  {course.category === 'available' ? (
                    <button className="enroll-btn">Enroll Now</button>
                  ) : (
                    <Link to="/student/lecture-view" className="continue-btn">
                      {course.category === 'completed' ? 'Review' : 'Continue Learning'}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <h3>No courses found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default StudentCourses;