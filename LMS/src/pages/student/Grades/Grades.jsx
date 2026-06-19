function Grades() {
  const grades = [
    {
      course: "React Basics",
      assignment: "Components",
      marks: 85,
      total: 100,
      grade: "A",
    },
    {
      course: "React Basics",
      assignment: "State Management",
      marks: 92,
      total: 100,
      grade: "A+",
    },
    {
      course: "Node.js Course",
      assignment: "API Integration",
      marks: 78,
      total: 100,
      grade: "B+",
    },
    {
      course: "MongoDB Basics",
      assignment: "Database Design",
      marks: 88,
      total: 100,
      grade: "A",
    },
  ];

  const totalMarks = grades.reduce((sum, g) => sum + g.marks, 0);
  const totalPossible = grades.reduce((sum, g) => sum + g.total, 0);
  const average = totalPossible
    ? ((totalMarks / totalPossible) * 100).toFixed(1)
    : 0;

  const getGradeColor = (grade) => {
    if (grade.includes("A")) return "bg-green-100 text-success";
    if (grade.includes("B")) return "bg-blue-100 text-primary";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textDark">My Grades 🏆</h1>
          <p className="text-textLight mt-1">Track your academic performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-2xl shadow-lg">
            <p className="text-sm opacity-90 mb-2">Overall Average</p>
            <p className="text-4xl font-bold">{average}%</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-sm text-textLight mb-2">Total Assignments</p>
            <p className="text-4xl font-bold text-textDark">{grades.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-sm text-textLight mb-2">Current Grade</p>
            <p className="text-4xl font-bold text-success">A</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Course
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Assignment
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Marks
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Percentage
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {grades.map((g, i) => (
                  <tr key={i} className="border-t border-border hover:bg-bg">
                    <td className="px-4 py-3 font-semibold text-textDark">
                      {g.course}
                    </td>
                    <td className="px-4 py-3 text-sm text-textDark">
                      {g.assignment}
                    </td>
                    <td className="px-4 py-3 text-sm text-textDark">
                      {g.marks}/{g.total}
                    </td>
                    <td className="px-4 py-3 text-sm text-textDark">
                      {((g.marks / g.total) * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${getGradeColor(g.grade)}`}
                      >
                        {g.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grades;
