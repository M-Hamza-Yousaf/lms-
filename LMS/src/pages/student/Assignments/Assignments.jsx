function Assignments() {
  const assignments = [
    {
      id: 1,
      title: "React Components",
      course: "React Basics",
      dueDate: "2026-06-15",
      status: "pending",
      marks: "--/100",
    },
    {
      id: 2,
      title: "State Management",
      course: "React Basics",
      dueDate: "2026-06-20",
      status: "pending",
      marks: "--/100",
    },
    {
      id: 3,
      title: "API Integration",
      course: "Node.js Course",
      dueDate: "2026-06-10",
      status: "submitted",
      marks: "85/100",
    },
    {
      id: 4,
      title: "Database Design",
      course: "MongoDB Basics",
      dueDate: "2026-06-05",
      status: "graded",
      marks: "92/100",
    },
  ];

  const getStatusColor = (status) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "submitted") return "bg-blue-100 text-primary";
    return "bg-green-100 text-success";
  };

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textDark">
            My Assignments 📚📚
          </h1>
          <p className="text-textLight mt-1">
            Track and submit your assignments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-xs text-textLight">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {assignments.filter((a) => a.status === "pending").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-xs text-textLight">Submitted</p>
            <p className="text-2xl font-bold text-primary">
              {assignments.filter((a) => a.status === "submitted").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-xs text-textLight">Graded</p>
            <p className="text-2xl font-bold text-success">
              {assignments.filter((a) => a.status === "graded").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Assignment
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Course
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Due Date
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Marks
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((a) => (
                  <tr key={a.id} className="border-t border-border hover:bg-bg">
                    <td className="px-4 py-3 font-semibold text-textDark">
                      {a.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-textLight">
                      {a.course}
                    </td>
                    <td className="px-4 py-3 text-sm text-textDark">
                      {a.dueDate}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(a.status)}`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-textDark">
                      {a.marks}
                    </td>
                    <td className="px-4 py-3">
                      {a.status === "pending" && (
                        <button className="bg-primary text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-primary-dark transition">
                          Submit
                        </button>
                      )}
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

export default Assignments;
