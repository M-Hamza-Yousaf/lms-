import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ role = "student" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = {
    student: [
      { path: "/student/dashboard", icon: "🏠", label: "Dashboard" },
      { path: "/student/courses", icon: "📚", label: "My Courses" },
      { path: "/student/assignments", icon: "📝", label: "Assignments" },
      { path: "/student/grades", icon: "📊", label: "Grades" },
    ],
    teacher: [
      { path: "/teacher/dashboard", icon: "🏠", label: "Dashboard" },
      { path: "/teacher/courses", icon: "📚", label: "My Courses" },
      { path: "/teacher/add-lecture", icon: "➕", label: "Add Lecture" },
      { path: "/teacher/grade-students", icon: "✅", label: "Grade Students" },
    ],
    admin: [
      { path: "/admin/dashboard", icon: "🏠", label: "Dashboard" },
      { path: "/admin/manage-users", icon: "👥", label: "Manage Users" },
      { path: "/admin/manage-courses", icon: "📚", label: "Manage Courses" },
    ],
  };

  const items = menuItems[role] || menuItems.student;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleLinkClick = () => setIsOpen(false);

  const roleLabels = {
    student: "🎓 Student",
    teacher: "👨‍🏫 Teacher",
    admin: "⚙️ Admin",
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-11 h-11 bg-primary text-white rounded-lg shadow-lg text-xl flex items-center justify-center hover:bg-primary-dark transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed left-0 top-0 h-screen w-64 bg-white border-r border-border flex flex-col z-40
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="p-5 border-b border-border flex flex-col gap-2">
          <Link
            to="/"
            className="text-2xl font-bold text-primary"
            onClick={handleLinkClick}
          >
            📚 LMS
          </Link>
          <span className="text-xs text-textLight bg-bg px-3 py-1 rounded-full w-fit">
            {roleLabels[role]}
          </span>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg mb-1 font-medium text-sm transition
                ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "text-textLight hover:bg-bg hover:text-textDark"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-danger text-danger font-semibold rounded-lg hover:bg-danger hover:text-white transition"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
