import { useState, useEffect } from "react";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://lms-production-b53d.up.railway.app/api/courses",
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://lms-production-b53d.up.railway.app/api/courses/${id}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Enrolled successfully! 🎉");
      fetchCourses();
    } catch (error) {
      alert(error.response?.data?.message || "Enrollment failed");
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchSearch = c.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      categoryFilter === "All" || c.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textDark">
            Browse Courses 🎓
          </h1>
          <p className="text-textLight mt-1">
            Discover amazing courses to learn from
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="🔍 Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="All">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-textLight">Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-textDark mb-2">
              No Courses Found
            </h2>
            <p className="text-textLight">Try different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <span className="inline-block bg-blue-100 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    {course.category}
                  </span>
                  <h3 className="text-lg font-bold text-textDark mb-2">
                    {course.title}
                  </h3>
                  <p className="text-textLight text-sm mb-3 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-textLight mb-3">
                    <span>👨‍🏫 {course.teacherName}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-textLight mb-4">
                    <span>⏱️ {course.duration}</span>
                    <span>📊 {course.level}</span>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-primary">
                      {course.price === 0 ? "Free" : `$${course.price}`}
                    </span>
                    <span className="text-xs text-textLight">
                      👥 {course.enrolledStudents?.length || 0} enrolled
                    </span>
                  </div>

                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition"
                  >
                    ✅ Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
