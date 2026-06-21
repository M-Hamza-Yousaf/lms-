import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar/Sidebar';

function Grades() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://lms-production-b53d.up.railway.app/api/assignments/my-grades',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGrades(response.data.grades);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const gradedItems = grades.filter(g => g.marks !== null);
  const totalMarks = gradedItems.reduce((sum, g) => sum + (g.marks || 0), 0);
  const totalPossible = gradedItems.reduce((sum, g) => sum + g.maxMarks, 0);
  const average = totalPossible ? ((totalMarks / totalPossible) * 100).toFixed(1) : 0;

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'F';
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'bg-green-100 text-success';
    if (grade.includes('B')) return 'bg-blue-100 text-primary';
    if (grade === 'C') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-danger';
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="student" />
      
      <div className="flex-1 md:ml-64 p-6">
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
              <p className="text-sm text-textLight mb-2">Graded Assignments</p>
              <p className="text-4xl font-bold text-textDark">{gradedItems.length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="text-sm text-textLight mb-2">Current Grade</p>
              <p className="text-4xl font-bold text-success">
                {gradedItems.length > 0 ? getGrade(parseFloat(average)) : '--'}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-textLight">Loading grades...</p>
            </div>
          ) : grades.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-xl font-bold text-textDark mb-2">No Grades Yet</h2>
              <p className="text-textLight">Submit assignments to see your grades</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-bg">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Course</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Assignment</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Marks</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Percentage</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Grade</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((g, i) => {
                      const percentage = g.marks !== null ? ((g.marks / g.maxMarks) * 100).toFixed(1) : null;
                      const grade = percentage ? getGrade(parseFloat(percentage)) : '--';
                      return (
                        <tr key={i} className="border-t border-border hover:bg-bg">
                          <td className="px-4 py-3 font-semibold text-textDark">{g.courseName}</td>
                          <td className="px-4 py-3 text-sm text-textDark">{g.assignmentTitle}</td>
                          <td className="px-4 py-3 text-sm text-textDark">
                            {g.marks !== null ? `${g.marks}/${g.maxMarks}` : 'Pending'}
                          </td>
                          <td className="px-4 py-3 text-sm text-textDark">
                            {percentage ? `${percentage}%` : '--'}
                          </td>
                          <td className="px-4 py-3">
                            {percentage ? (
                              <span className={`text-xs font-bold px-2 py-1 rounded ${getGradeColor(grade)}`}>
                                {grade}
                              </span>
                            ) : (
                              <span className="text-xs text-textLight">--</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-xs text-textLight">
                            {g.feedback || '--'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Grades;