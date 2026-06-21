import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar/Sidebar';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://lms-production-b53d.up.railway.app/api/assignments',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openSubmitModal = (assignment) => {
    setSelectedAssignment(assignment);
    setAnswerText('');
    setShowSubmitModal(true);
  };

  const handleSubmit = async () => {
    if (!answerText.trim()) {
      alert('Please write your answer');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `https://lms-production-b53d.up.railway.app/api/assignments/${selectedAssignment._id}/submit`,
        { answerText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Assignment submitted successfully! 🎉');
      setShowSubmitModal(false);
      fetchAssignments();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit');
    }
  };

  const getMyStatus = (assignment) => {
    const mySubmission = assignment.submissions?.find(s => s.student === user.id);
    if (!mySubmission) return 'pending';
    return mySubmission.status;
  };

  const getMyMarks = (assignment) => {
    const mySubmission = assignment.submissions?.find(s => s.student === user.id);
    if (!mySubmission || mySubmission.marks === null) return '--';
    return `${mySubmission.marks}/${assignment.maxMarks}`;
  };

  const getStatusColor = (status) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
    if (status === 'submitted') return 'bg-blue-100 text-primary';
    return 'bg-green-100 text-success';
  };

  const pendingCount = assignments.filter(a => getMyStatus(a) === 'pending').length;
  const submittedCount = assignments.filter(a => getMyStatus(a) === 'submitted').length;
  const gradedCount = assignments.filter(a => getMyStatus(a) === 'graded').length;

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="student" />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-textDark">My Assignments 📝</h1>
            <p className="text-textLight mt-1">Track and submit your assignments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-xs text-textLight">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-xs text-textLight">Submitted</p>
              <p className="text-2xl font-bold text-primary">{submittedCount}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-xs text-textLight">Graded</p>
              <p className="text-2xl font-bold text-success">{gradedCount}</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-textLight">Loading assignments...</p>
            </div>
          ) : assignments.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-xl font-bold text-textDark mb-2">No Assignments Yet</h2>
              <p className="text-textLight">Teachers haven't posted assignments yet</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-bg">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Assignment</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Course</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Due Date</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Status</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Marks</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map(a => {
                      const status = getMyStatus(a);
                      return (
                        <tr key={a._id} className="border-t border-border hover:bg-bg">
                          <td className="px-4 py-3">
                            <div className="font-semibold text-textDark">{a.title}</div>
                            <div className="text-xs text-textLight line-clamp-1">{a.description}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-textLight">{a.courseName}</td>
                          <td className="px-4 py-3 text-sm text-textDark">
                            {new Date(a.dueDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(status)}`}>
                              {status}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-textDark">{getMyMarks(a)}</td>
                          <td className="px-4 py-3">
                            {status === 'pending' && (
                              <button 
                                onClick={() => openSubmitModal(a)}
                                className="bg-primary text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-primary-dark transition"
                              >
                                Submit
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Submit Modal */}
          {showSubmitModal && selectedAssignment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
                <h2 className="text-xl font-bold text-textDark mb-2">Submit Assignment</h2>
                <h3 className="text-lg text-primary mb-4">{selectedAssignment.title}</h3>
                <p className="text-textLight text-sm mb-4">{selectedAssignment.description}</p>
                
                <label className="block text-sm font-medium text-textDark mb-2">
                  Your Answer
                </label>
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Write your answer here..."
                  rows="6"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary resize-none mb-4"
                />
                
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="px-5 py-2.5 border border-border rounded-lg font-semibold hover:bg-bg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition"
                  >
                    ✅ Submit Assignment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Assignments;