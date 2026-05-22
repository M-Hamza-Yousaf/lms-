import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function TeacherGradeStudents() {
  const [filter, setFilter] = useState('pending');

  const submissions = [
    { id: 1, student: 'Ahmed Khan', avatar: '👤', assignment: 'React Project', course: 'Web Development', submittedDate: '2026-05-20', status: 'pending', totalMarks: 100 },
    { id: 2, student: 'Sara Ali', avatar: '👤', assignment: 'SQL Quiz', course: 'Database', submittedDate: '2026-05-19', status: 'pending', totalMarks: 50 },
    { id: 3, student: 'Bilal Hassan', avatar: '👤', assignment: 'JS Functions', course: 'JavaScript', submittedDate: '2026-05-18', status: 'pending', totalMarks: 100 },
    { id: 4, student: 'Ayesha Khan', avatar: '👤', assignment: 'Node.js API', course: 'Node.js', submittedDate: '2026-05-17', status: 'graded', marks: 85, totalMarks: 100 },
    { id: 5, student: 'Hassan Ali', avatar: '👤', assignment: 'Database Design', course: 'Database', submittedDate: '2026-05-16', status: 'graded', marks: 42, totalMarks: 50 },
    { id: 6, student: 'Fatima Sheikh', avatar: '👤', assignment: 'React Hooks', course: 'Web Development', submittedDate: '2026-05-15', status: 'graded', marks: 92, totalMarks: 100 },
  ];

  const filtered = filter === 'all' ? submissions : submissions.filter(s => s.status === filter);

  const counts = {
    all: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    graded: submissions.filter(s => s.status === 'graded').length,
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="teacher" />

      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-textDark mb-1">Grade Students ✅</h1>
          <p className="text-sm md:text-base text-textLight">Review and grade student submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-l-primary">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl">📋</span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-textDark">{counts.all}</h3>
                <p className="text-xs text-textLight">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-l-secondary">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl">⏳</span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-textDark">{counts.pending}</h3>
                <p className="text-xs text-textLight">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-l-success">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl">✅</span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-textDark">{counts.graded}</h3>
                <p className="text-xs text-textLight">Graded</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { key: 'all', label: 'All', count: counts.all },
            { key: 'pending', label: 'Pending', count: counts.pending },
            { key: 'graded', label: 'Graded', count: counts.graded },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0 border transition ${
                filter === tab.key
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-textLight border-border hover:border-primary'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                filter === tab.key ? 'bg-white bg-opacity-25' : 'bg-black bg-opacity-10'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {filtered.map((sub) => (
            <div key={sub.id} className="bg-white p-4 md:p-5 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Student Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    {sub.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-textDark">{sub.student}</h3>
                    <p className="text-sm text-textLight mt-1">{sub.assignment}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-textLight">
                      <span>📚 {sub.course}</span>
                      <span>·</span>
                      <span>📅 {sub.submittedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Marks (if graded) */}
                {sub.status === 'graded' && (
                  <div className="bg-bg p-3 rounded-lg text-center min-w-[100px]">
                    <div className="text-xs text-textLight mb-1">Marks</div>
                    <div className="text-xl font-bold text-textDark">
                      {sub.marks}<span className="text-sm text-textLight">/{sub.totalMarks}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 md:flex-col md:justify-center">
                  {sub.status === 'pending' ? (
                    <>
                      <button className="flex-1 md:flex-none bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition whitespace-nowrap">
                        📝 Grade
                      </button>
                      <button className="flex-1 md:flex-none bg-bg text-textDark px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap">
                        👁️ View
                      </button>
                    </>
                  ) : (
                    <button className="bg-success text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition whitespace-nowrap">
                      ✏️ Edit Grade
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TeacherGradeStudents;