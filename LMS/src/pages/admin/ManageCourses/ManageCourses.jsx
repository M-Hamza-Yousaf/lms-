import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar/Sidebar';

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://lms-production-b53d.up.railway.app/api/courses');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course permanently?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://lms-production-b53d.up.railway.app/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(courses.filter(c => c._id !== id));
      alert('Course deleted');
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="admin" />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-textDark">Manage Courses ⚙️</h1>
            <p className="text-textLight mt-1">Total: {courses.length} courses</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-textLight">Loading...</div>
            ) : courses.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-xl font-bold text-textDark">No Courses Yet</h2>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-bg">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Course</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Teacher</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Category</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Students</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course._id} className="border-t border-border hover:bg-bg">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-textDark">{course.title}</div>
                          <div className="text-xs text-textLight line-clamp-1">{course.description}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-textDark">{course.teacherName}</td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-100 text-primary text-xs font-semibold px-2 py-1 rounded">
                            {course.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-textDark">
                          {course.enrolledStudents?.length || 0}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-danger text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-red-700 transition"
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCourses;