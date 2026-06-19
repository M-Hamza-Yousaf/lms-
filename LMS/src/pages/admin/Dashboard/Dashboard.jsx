import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [usersRes, coursesRes] = await Promise.all([
        axios.get(
          "https://lms-production-b53d.up.railway.app/api/courses/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
        axios.get("https://lms-production-b53d.up.railway.app/api/courses"),
      ]);
      setUsers(usersRes.data.users);
      setCourses(coursesRes.data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  const studentsCount = users.filter((u) => u.role === "student").length;
  const teachersCount = users.filter((u) => u.role === "teacher").length;

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 rounded-2xl shadow-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard ⚙️</h1>
          <p className="opacity-90">System overview and management</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-lg">
            <div className="text-3xl mb-1">👥</div>
            <h3 className="text-2xl font-bold text-textDark">{users.length}</h3>
            <p className="text-textLight text-xs">Total Users</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-lg">
            <div className="text-3xl mb-1">🎓</div>
            <h3 className="text-2xl font-bold text-textDark">
              {studentsCount}
            </h3>
            <p className="text-textLight text-xs">Students</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-lg">
            <div className="text-3xl mb-1">👨‍🏫</div>
            <h3 className="text-2xl font-bold text-textDark">
              {teachersCount}
            </h3>
            <p className="text-textLight text-xs">Teachers</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-lg">
            <div className="text-3xl mb-1">📚</div>
            <h3 className="text-2xl font-bold text-textDark">
              {courses.length}
            </h3>
            <p className="text-textLight text-xs">Total Courses</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Link
            to="/admin/manage-users"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="text-4xl mb-2">👥</div>
            <h3 className="font-bold text-xl mb-1 text-textDark">
              Manage Users
            </h3>
            <p className="text-textLight text-sm">View and manage all users</p>
          </Link>
          <Link
            to="/admin/manage-courses"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="text-4xl mb-2">📚</div>
            <h3 className="font-bold text-xl mb-1 text-textDark">
              Manage Courses
            </h3>
            <p className="text-textLight text-sm">
              Review and moderate courses
            </p>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-textDark mb-4">Recent Users</h2>
          {users.length === 0 ? (
            <p className="text-textLight text-center py-8">No users yet</p>
          ) : (
            <div className="space-y-2">
              {users.slice(0, 5).map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold text-textDark text-sm">
                      {user.fullName}
                    </h4>
                    <p className="text-xs text-textLight">{user.email}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "teacher"
                          ? "bg-green-100 text-success"
                          : "bg-blue-100 text-primary"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
