import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar/Sidebar';

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://lms-production-b53d.up.railway.app/api/courses/my-courses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://lms-production-b53d.up.railway.app/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(courses.filter(c => c._id !== id));
      alert('Course deleted successfully');
    } catch (error) {
      alert('Failed to delete course');
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="teacher" />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-textDark">My Courses 📚</h1>
              <p className="text-textLight mt-1">Manage all your courses</p>
            </div>
            <Link 
              to="/teacher/add-lecture"
              className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              ➕ Add New Course
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-textLight">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-xl font-bold text-textDark mb-2">No Courses Yet</h2>
              <p className="text-textLight mb-6">Start by creating your first course</p>
              <Link 
                to="/teacher/add-lecture"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                Create First Course
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <div key={course._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5">
                    <span className="inline-block bg-blue-100 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {course.category}
                    </span>
                    <h3 className="text-lg font-bold text-textDark mb-2">{course.title}</h3>
                    <p className="text-textLight text-sm mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-textLight mb-4">
                      <span>⏱️ {course.duration}</span>
                      <span>📊 {course.level}</span>
                      <span>👥 {course.enrolledStudents?.length || 0} students</span>
                    </div>

                    <button
                      onClick={() => handleDelete(course._id)}
                      className="w-full bg-danger text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;