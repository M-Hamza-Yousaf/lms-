import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar/Sidebar';

function GradeStudents() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState({});
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://lms-production-b53d.up.railway.app/api/assignments/submissions',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubmissions(response.data.submissions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGradeChange = (id, value) => {
    setGrades({ ...grades, [id]: value });
  };

  const handleFeedbackChange = (id, value) => {
    setFeedbacks({ ...feedbacks, [id]: value });
  };

  const handleSubmitGrade = async (submission) => {
    const marks = parseInt(grades[submission._id]);
    
    if (isNaN(marks) || marks < 0 || marks > submission.maxMarks) {
      alert(`Please enter valid marks (0-${submission.maxMarks})`);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://lms-production-b53d.up.railway.app/api/assignments/${submission.assignmentId}/grade/${submission._id}`,
        { 
          marks: marks,
          feedback: feedbacks[submission._id] || ''
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Graded successfully!');
      fetchSubmissions();
    } catch (error) {
      alert('Failed to grade submission');
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="teacher" />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-textDark">Grade Students 📝</h1>
            <p className="text-textLight mt-1">Review and grade student submissions</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-textLight">Loading submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-xl font-bold text-textDark mb-2">No Submissions Yet</h2>
              <p className="text-textLight">Students haven't submitted any assignments yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map(s => (
                <div key={s._id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-textDark">{s.assignmentTitle}</h3>
                      <p className="text-sm text-textLight">{s.courseName}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded ${
                      s.status === 'graded' 
                        ? 'bg-green-100 text-success' 
                        : 'bg-blue-100 text-primary'
                    }`}>
                      {s.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-textLight mb-1">Student</p>
                      <p className="font-semibold text-textDark">{s.studentName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-textLight mb-1">Submitted</p>
                      <p className="text-sm text-textDark">
                        {new Date(s.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-bg p-4 rounded-lg mb-4">
                    <p className="text-xs text-textLight mb-1">Student's Answer:</p>
                    <p className="text-sm text-textDark">{s.answerText}</p>
                  </div>

                  {s.status === 'graded' ? (
                    <div className="border-t border-border pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-textLight mb-1">Marks</p>
                          <p className="text-2xl font-bold text-success">
                            {s.marks}/{s.maxMarks}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-textLight mb-1">Feedback</p>
                          <p className="text-sm text-textDark">{s.feedback || 'No feedback'}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-border pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs text-textLight mb-1">
                            Marks (out of {s.maxMarks})
                          </label>
                          <input
                            type="number"
                            max={s.maxMarks}
                            min="0"
                            placeholder={`0-${s.maxMarks}`}
                            value={grades[s._id] || ''}
                            onChange={(e) => handleGradeChange(s._id, e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-textLight mb-1">Feedback</label>
                          <input
                            type="text"
                            placeholder="Add feedback..."
                            value={feedbacks[s._id] || ''}
                            onChange={(e) => handleFeedbackChange(s._id, e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => handleSubmitGrade(s)}
                        className="bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-primary-dark transition"
                      >
                        💾 Save Grade
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GradeStudents;