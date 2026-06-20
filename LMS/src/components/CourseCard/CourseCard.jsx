import { Link } from 'react-router-dom';

function CourseCard({ course, onEnroll, onDelete, showActions = true, userRole = 'student' }) {
  const handleEnroll = () => {
    if (onEnroll) onEnroll(course._id);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(course._id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <img 
        src={course.thumbnail || 'https://via.placeholder.com/300x200?text=Course'} 
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      
      <div className="p-5">
        <span className="inline-block bg-blue-100 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2">
          {course.category}
        </span>
        
        <h3 className="text-lg font-bold text-textDark mb-2">{course.title}</h3>
        
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
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </span>
          <span className="text-xs text-textLight">
            👥 {course.enrolledStudents?.length || 0} enrolled
          </span>
        </div>

        {showActions && (
          <div className="space-y-2">
            {userRole === 'student' && onEnroll && (
              <button
                onClick={handleEnroll}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                ✅ Enroll Now
              </button>
            )}

            {userRole === 'teacher' && onDelete && (
              <button
                onClick={handleDelete}
                className="w-full bg-danger text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                🗑️ Delete Course
              </button>
            )}

            {userRole === 'admin' && onDelete && (
              <button
                onClick={handleDelete}
                className="w-full bg-danger text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                🗑️ Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;