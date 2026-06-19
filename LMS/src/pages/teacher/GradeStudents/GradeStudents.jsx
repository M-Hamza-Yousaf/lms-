import { useState } from "react";

function GradeStudents() {
  const [submissions] = useState([
    {
      id: 1,
      student: "Ali Khan",
      assignment: "React Components",
      course: "React Basics",
      submitted: "2026-06-10",
      grade: "",
    },
    {
      id: 2,
      student: "Sara Ahmed",
      assignment: "State Management",
      course: "React Basics",
      submitted: "2026-06-09",
      grade: "92",
    },
    {
      id: 3,
      student: "Hamza Yousaf",
      assignment: "API Integration",
      course: "Node.js Course",
      submitted: "2026-06-08",
      grade: "85",
    },
  ]);

  const [grades, setGrades] = useState({});

  const handleGradeChange = (id, value) => {
    setGrades({ ...grades, [id]: value });
  };

  const handleSubmit = (id) => {
    alert(`Grade ${grades[id]} submitted for student!`);
  };

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textDark">
            Grade Students 📝
          </h1>
          <p className="text-textLight mt-1">
            Review and grade student submissions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Student
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Assignment
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Course
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Submitted
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Grade
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} className="border-t border-border hover:bg-bg">
                    <td className="px-4 py-3 font-semibold text-textDark">
                      {s.student}
                    </td>
                    <td className="px-4 py-3 text-sm text-textDark">
                      {s.assignment}
                    </td>
                    <td className="px-4 py-3 text-sm text-textLight">
                      {s.course}
                    </td>
                    <td className="px-4 py-3 text-sm text-textDark">
                      {s.submitted}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        max="100"
                        placeholder={s.grade || "0-100"}
                        value={grades[s.id] || ""}
                        onChange={(e) =>
                          handleGradeChange(s.id, e.target.value)
                        }
                        className="w-20 px-2 py-1 border border-border rounded focus:outline-none focus:border-primary text-sm"
                      />
                      <span className="text-xs text-textLight ml-1">/100</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleSubmit(s.id)}
                        className="bg-primary text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-primary-dark transition"
                      >
                        💾 Save
                      </button>
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

export default GradeStudents;
