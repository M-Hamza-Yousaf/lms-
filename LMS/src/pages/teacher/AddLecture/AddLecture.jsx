import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function TeacherAddLecture() {
  const [formData, setFormData] = useState({
    course: '',
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    resources: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Lecture added successfully! (Backend integration pending)');
    setFormData({ course: '', title: '', description: '', videoUrl: '', duration: '', resources: '' });
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="teacher" />

      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-textDark mb-1">Add New Lecture ➕</h1>
          <p className="text-sm md:text-base text-textLight">Upload a new lecture for your students</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 md:p-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Course Select */}
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Select Course <span className="text-danger">*</span>
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 bg-white"
              >
                <option value="">-- Choose a course --</option>
                <option value="web-dev">Web Development with React</option>
                <option value="database">Database Management Systems</option>
                <option value="js">JavaScript Fundamentals</option>
                <option value="node">Node.js Backend Development</option>
              </select>
            </div>

            {/* Lecture Title */}
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Lecture Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Introduction to React Hooks"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="What will students learn in this lecture?"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 resize-y"
              ></textarea>
            </div>

            {/* Video URL & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Duration (mm:ss)
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="25:30"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Upload Video File
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition cursor-pointer">
                <div className="text-5xl mb-3">📹</div>
                <p className="text-textDark font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-textLight">MP4, AVI, MOV (Max 500MB)</p>
              </div>
            </div>

            {/* Resources */}
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Additional Resources (Optional)
              </label>
              <textarea
                name="resources"
                value={formData.resources}
                onChange={handleChange}
                rows="3"
                placeholder="Add links to PDFs, slides, or code examples (one per line)"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary resize-y"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-border">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                💾 Save Lecture
              </button>
              <button
                type="button"
                className="flex-1 bg-bg text-textDark py-3 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default TeacherAddLecture;