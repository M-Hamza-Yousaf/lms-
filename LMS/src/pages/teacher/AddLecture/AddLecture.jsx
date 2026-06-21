import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar/Sidebar';

function AddLecture() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('course'); // 'course' or 'assignment'
  const [courses, setCourses] = useState([]);
  
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    duration: '4 weeks',
    price: 0,
    level: 'Beginner',
    thumbnail: ''
  });
  
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    courseId: '',
    dueDate: '',
    maxMarks: 100
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://lms-production-b53d.up.railway.app/api/courses/my-courses',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCourseChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleAssignmentChange = (e) => {
    setAssignmentData({ ...assignmentData, [e.target.name]: e.target.value });
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://lms-production-b53d.up.railway.app/api/courses',
        courseData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Course created successfully! 🎉');
      navigate('/teacher/courses');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!assignmentData.courseId) {
      setError('Please select a course');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://lms-production-b53d.up.railway.app/api/assignments',
        assignmentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Assignment created successfully! 🎉');
      setAssignmentData({
        title: '',
        description: '',
        courseId: '',
        dueDate: '',
        maxMarks: 100
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="teacher" />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-textDark">Create Content 📚</h1>
            <p className="text-textLight mt-1">Add courses or assignments</p>
          </div>

          {/* Mode Switcher */}
          <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 flex gap-2">
            <button
              onClick={() => setMode('course')}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                mode === 'course' ? 'bg-primary text-white' : 'text-textDark hover:bg-bg'
              }`}
            >
              📚 Create Course
            </button>
            <button
              onClick={() => setMode('assignment')}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                mode === 'assignment' ? 'bg-primary text-white' : 'text-textDark hover:bg-bg'
              }`}
            >
              📝 Create Assignment
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            {error && (
              <div className="bg-red-50 border border-danger text-danger px-4 py-3 rounded-lg mb-4 text-sm">
                ⚠️ {error}
              </div>
            )}

            {mode === 'course' ? (
              <form onSubmit={handleCreateCourse} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-textDark mb-1.5">Course Title</label>
                  <input
                    type="text"
                    name="title"
                    value={courseData.title}
                    onChange={handleCourseChange}
                    placeholder="e.g., React for Beginners"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-1.5">Description</label>
                  <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleCourseChange}
                    placeholder="What will students learn..."
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-textDark mb-1.5">Category</label>
                    <select
                      name="category"
                      value={courseData.category}
                      onChange={handleCourseChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                    >
                      <option value="Programming">Programming</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-textDark mb-1.5">Level</label>
                    <select
                      name="level"
                      value={courseData.level}
                      onChange={handleCourseChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-textDark mb-1.5">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={courseData.duration}
                      onChange={handleCourseChange}
                      placeholder="e.g., 4 weeks"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-textDark mb-1.5">Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={courseData.price}
                      onChange={handleCourseChange}
                      min="0"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-60"
                >
                  {loading ? '⏳ Creating Course...' : '➕ Create Course'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleCreateAssignment} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-textDark mb-1.5">Select Course</label>
                  <select
                    name="courseId"
                    value={assignmentData.courseId}
                    onChange={handleAssignmentChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="">-- Select a course --</option>
                    {courses.map(course => (
                      <option key={course._id} value={course._id}>{course.title}</option>
                    ))}
                  </select>
                  {courses.length === 0 && (
                    <p className="text-xs text-yellow-600 mt-1">
                      ⚠️ Create a course first before adding assignments
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-1.5">Assignment Title</label>
                  <input
                    type="text"
                    name="title"
                    value={assignmentData.title}
                    onChange={handleAssignmentChange}
                    placeholder="e.g., React Components Assignment"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-1.5">Description</label>
                  <textarea
                    name="description"
                    value={assignmentData.description}
                    onChange={handleAssignmentChange}
                    placeholder="Assignment instructions and requirements..."
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-textDark mb-1.5">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={assignmentData.dueDate}
                      onChange={handleAssignmentChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-textDark mb-1.5">Max Marks</label>
                    <input
                      type="number"
                      name="maxMarks"
                      value={assignmentData.maxMarks}
                      onChange={handleAssignmentChange}
                      min="1"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || courses.length === 0}
                  className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-60"
                >
                  {loading ? '⏳ Creating Assignment...' : '➕ Create Assignment'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLecture;