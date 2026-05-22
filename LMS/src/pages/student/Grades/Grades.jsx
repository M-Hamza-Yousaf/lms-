import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function StudentGrades() {
  const courseGrades = [
    { id: 1, course: 'Web Development with React', totalMarks: 100, obtained: 85, grade: 'A', color: 'text-success' },
    { id: 2, course: 'Database Management Systems', totalMarks: 100, obtained: 78, grade: 'B+', color: 'text-primary' },
    { id: 3, course: 'Operating Systems', totalMarks: 100, obtained: 72, grade: 'B', color: 'text-primary' },
    { id: 4, course: 'Data Structures & Algorithms', totalMarks: 100, obtained: 92, grade: 'A+', color: 'text-success' },
    { id: 5, course: 'Computer Networks', totalMarks: 100, obtained: 88, grade: 'A', color: 'text-success' },
    { id: 6, course: 'Software Engineering', totalMarks: 100, obtained: 65, grade: 'C+', color: 'text-secondary' },
  ];

  const overallStats = {
    totalCourses: courseGrades.length,
    averagePercentage: Math.round(courseGrades.reduce((sum, c) => sum + c.obtained, 0) / courseGrades.length),
    totalGPA: 3.5,
    bestCourse: courseGrades.reduce((max, c) => c.obtained > max.obtained ? c : max).course,
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'bg-success';
    if (percentage >= 80) return 'bg-primary';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-secondary';
    return 'bg-danger';
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="student" />

      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-textDark mb-1">My Grades 📊</h1>
          <p className="text-sm md:text-base text-textLight">Track your academic performance</p>
        </div>

        {/* Overall Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-6">
          <div className="bg-gradient-to-br from-primary to-primary-dark p-5 rounded-xl text-white">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="text-2xl md:text-3xl font-bold">{overallStats.totalCourses}</h3>
            <p className="text-sm opacity-90">Total Courses</p>
          </div>
          <div className="bg-gradient-to-br from-success to-green-700 p-5 rounded-xl text-white">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-2xl md:text-3xl font-bold">{overallStats.averagePercentage}%</h3>
            <p className="text-sm opacity-90">Average</p>
          </div>
          <div className="bg-gradient-to-br from-secondary to-orange-600 p-5 rounded-xl text-white">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="text-2xl md:text-3xl font-bold">{overallStats.totalGPA}</h3>
            <p className="text-sm opacity-90">GPA</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-5 rounded-xl text-white">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-lg md:text-xl font-bold truncate">Best</h3>
            <p className="text-xs opacity-90 truncate">{overallStats.bestCourse}</p>
          </div>
        </div>

        {/* Course Grades Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 border-b border-border">
            <h2 className="text-lg md:text-xl font-bold text-textDark">Course-wise Grades</h2>
            <p className="text-sm text-textLight mt-1">Detailed performance for each course</p>
          </div>

          {/* Mobile View - Cards */}
          <div className="md:hidden divide-y divide-border">
            {courseGrades.map((course) => {
              const percentage = Math.round((course.obtained / course.totalMarks) * 100);
              return (
                <div key={course.id} className="p-5">
                  <h4 className="font-semibold text-textDark mb-3">{course.course}</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-textLight">Marks:</span>
                    <span className="font-bold">{course.obtained}/{course.totalMarks}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-textLight">Grade:</span>
                    <span className={`text-xl font-bold ${course.color}`}>{course.grade}</span>
                  </div>
                  <div className="bg-bg h-2 rounded overflow-hidden mb-1">
                    <div className={`${getGradeColor(percentage)} h-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                  </div>
                  <p className="text-xs text-textLight text-right font-medium">{percentage}%</p>
                </div>
              );
            })}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-textDark">Course</th>
                  <th className="text-center p-4 text-sm font-semibold text-textDark">Marks</th>
                  <th className="text-center p-4 text-sm font-semibold text-textDark">Percentage</th>
                  <th className="text-center p-4 text-sm font-semibold text-textDark">Grade</th>
                  <th className="text-left p-4 text-sm font-semibold text-textDark">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {courseGrades.map((course) => {
                  const percentage = Math.round((course.obtained / course.totalMarks) * 100);
                  return (
                    <tr key={course.id} className="hover:bg-bg transition">
                      <td className="p-4 font-medium text-textDark">{course.course}</td>
                      <td className="p-4 text-center font-bold">{course.obtained}/{course.totalMarks}</td>
                      <td className="p-4 text-center font-semibold">{percentage}%</td>
                      <td className="p-4 text-center">
                        <span className={`text-xl font-bold ${course.color}`}>{course.grade}</span>
                      </td>
                      <td className="p-4 min-w-[200px]">
                        <div className="bg-bg h-2 rounded overflow-hidden">
                          <div className={`${getGradeColor(percentage)} h-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grade Scale */}
        <div className="mt-6 bg-white p-5 md:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-textDark mb-4">Grading Scale</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { grade: 'A+', range: '90-100%', color: 'bg-success text-white' },
              { grade: 'A', range: '80-89%', color: 'bg-primary text-white' },
              { grade: 'B', range: '70-79%', color: 'bg-blue-500 text-white' },
              { grade: 'C', range: '60-69%', color: 'bg-secondary text-white' },
              { grade: 'F', range: '<60%', color: 'bg-danger text-white' },
            ].map((item, i) => (
              <div key={i} className={`${item.color} p-4 rounded-lg text-center`}>
                <div className="text-xl font-bold">{item.grade}</div>
                <div className="text-xs opacity-90">{item.range}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentGrades;