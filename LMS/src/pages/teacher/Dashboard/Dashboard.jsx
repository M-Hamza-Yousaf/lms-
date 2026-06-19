import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://lms-production-b53d.up.railway.app/api/courses/my-courses",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  const totalStudents = courses.reduce(
    (sum, c) => sum + (c.enrolledStudents?.length || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-success to-green-700 text-white p-8 rounded-2xl shadow-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Hello, Professor {user.fullName}! 👨‍🏫
          </h1>
          <p className="opacity-90">Inspire and educate your students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-2">📚</div>
            <h3 className="text-2xl font-bold text-textDark">
              {courses.length}
            </h3>
            <p className="text-textLight text-sm">My Courses</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-2">👥</div>
            <h3 className="text-2xl font-bold text-textDark">
              {totalStudents}
            </h3>
            <p className="text-textLight text-sm">Total Students</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-2">⭐</div>
            <h3 className="text-2xl font-bold text-textDark">4.8</h3>
            <p className="text-textLight text-sm">Average Rating</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Link
            to="/teacher/add-lecture"
            className="bg-primary text-white p-6 rounded-2xl shadow-lg hover:bg-primary-dark transition"
          >
            <div className="text-4xl mb-2">➕</div>
            <h3 className="font-bold text-xl mb-1">Create New Course</h3>
            <p className="opacity-90 text-sm">
              Add a new course to your library
            </p>
          </Link>
          <Link
            to="/teacher/my-courses"
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="text-4xl mb-2">📖</div>
            <h3 className="font-bold text-xl mb-1 text-textDark">
              Manage Courses
            </h3>
            <p className="text-textLight text-sm">
              Edit or delete your courses
            </p>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-textDark mb-4">
            Recent Courses
          </h2>
          {courses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-textLight mb-4">No courses created yet</p>
              <Link
                to="/teacher/add-lecture"
                className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition inline-block"
              >
                Create First Course
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {courses.slice(0, 5).map((course) => (
                <div
                  key={course._id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-bg transition"
                >
                  <div>
                    <h3 className="font-semibold text-textDark">
                      {course.title}
                    </h3>
                    <p className="text-xs text-textLight">
                      {course.category} • {course.level}
                    </p>
                  </div>
                  <span className="text-sm text-primary font-semibold">
                    {course.enrolledStudents?.length || 0} students
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

export default TeacherDashboard;
