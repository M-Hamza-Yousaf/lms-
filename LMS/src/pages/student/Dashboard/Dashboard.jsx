import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://lms-production-b53d.up.railway.app/api/courses",
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  const enrolledCourses = courses.filter((c) =>
    c.enrolledStudents?.some((id) => id === user.id),
  );

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-8 rounded-2xl shadow-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.fullName}! 👋
          </h1>
          <p className="opacity-90">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-2">📚</div>
            <h3 className="text-2xl font-bold text-textDark">
              {enrolledCourses.length}
            </h3>
            <p className="text-textLight text-sm">Enrolled Courses</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-2xl font-bold text-textDark">
              {courses.length}
            </h3>
            <p className="text-textLight text-sm">Available Courses</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-2xl font-bold text-textDark">85%</h3>
            <p className="text-textLight text-sm">Average Progress</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-textDark">My Courses</h2>
            <Link
              to="/student/courses"
              className="text-primary text-sm font-semibold hover:underline"
            >
              View All →
            </Link>
          </div>
          {enrolledCourses.length === 0 ? (
            <p className="text-textLight text-center py-8">
              No enrolled courses yet. Browse courses to get started!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {enrolledCourses.slice(0, 3).map((course) => (
                <div
                  key={course._id}
                  className="border border-border p-4 rounded-lg hover:shadow-md transition"
                >
                  <h3 className="font-bold text-textDark mb-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-textLight mb-3">
                    {course.teacherName}
                  </p>
                  <div className="w-full bg-bg rounded-full h-2 mb-1">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-textLight">60% Complete</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/student/courses"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="text-4xl mb-2">🎓</div>
            <h3 className="font-bold text-textDark">Browse Courses</h3>
            <p className="text-sm text-textLight">
              Discover new courses to learn
            </p>
          </Link>
          <Link
            to="/student/assignments"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="text-4xl mb-2">📝</div>
            <h3 className="font-bold text-textDark">Assignments</h3>
            <p className="text-sm text-textLight">View pending assignments</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
