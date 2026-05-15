import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ role = 'student' }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for mobile sidebar open/close
  const [isOpen, setIsOpen] = useState(false);

  // Menu items based on role
  const menuItems = {
    student: [
      { path: '/student/dashboard', icon: '🏠', label: 'Dashboard' },
      { path: '/student/courses', icon: '📚', label: 'My Courses' },
      { path: '/student/assignments', icon: '📝', label: 'Assignments' },
      { path: '/student/grades', icon: '📊', label: 'Grades' },
    ],
    teacher: [
      { path: '/teacher/dashboard', icon: '🏠', label: 'Dashboard' },
      { path: '/teacher/courses', icon: '📚', label: 'My Courses' },
      { path: '/teacher/add-lecture', icon: '➕', label: 'Add Lecture' },
      { path: '/teacher/grade-students', icon: '✅', label: 'Grade Students' },
    ],
    admin: [
      { path: '/admin/dashboard', icon: '🏠', label: 'Dashboard' },
      { path: '/admin/manage-users', icon: '👥', label: 'Manage Users' },
      { path: '/admin/manage-courses', icon: '📚', label: 'Manage Courses' },
    ],
  };

  const items = menuItems[role] || menuItems.student;

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Close sidebar when link clicked (on mobile)
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Role display labels
  const roleLabels = {
    student: '🎓 Student',
    teacher: '👨‍🏫 Teacher',
    admin: '⚙️ Admin'
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Dark overlay (only shows on mobile when sidebar is open) */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={handleLinkClick}>
            📚 LMS
          </Link>
          <span className="sidebar-role">{roleLabels[role]}</span>
        </div>

        <nav className="sidebar-nav">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;