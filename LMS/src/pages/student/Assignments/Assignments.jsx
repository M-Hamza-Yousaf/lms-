import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function StudentAssignments() {
  const [filter, setFilter] = useState('all');

  const assignments = [
    { id: 1, title: 'React Project Submission', course: 'Web Development', dueDate: '2026-05-25', status: 'pending', marks: null, totalMarks: 100, description: 'Build a full-stack todo application with React and local storage.' },
    { id: 2, title: 'SQL Queries Quiz', course: 'Database Systems', dueDate: '2026-05-27', status: 'pending', marks: null, totalMarks: 50, description: 'Online quiz covering JOIN, GROUP BY, and subqueries.' },
    { id: 3, title: 'Process Scheduling Report', course: 'Operating Systems', dueDate: '2026-05-30', status: 'pending', marks: null, totalMarks: 100, description: 'Compare FCFS, SJF, and Round Robin scheduling algorithms.' },
    { id: 4, title: 'HTML/CSS Portfolio', course: 'Web Development', dueDate: '2026-05-10', status: 'submitted', marks: 85, totalMarks: 100, description: 'Personal portfolio website using HTML5 and CSS3.' },
    { id: 5, title: 'ER Diagram Assignment', course: 'Database Systems', dueDate: '2026-05-12', status: 'submitted', marks: 42, totalMarks: 50, description: 'Design ER diagram for a library management system.' },
    { id: 6, title: 'Linux Commands Lab', course: 'Operating Systems', dueDate: '2026-05-08', status: 'submitted', marks: 95, totalMarks: 100, description: 'Practical exercise using basic Linux commands.' },
    { id: 7, title: 'JavaScript Basics Quiz', course: 'Web Development', dueDate: '2026-05-03', status: 'graded', marks: 78, totalMarks: 100, description: 'MCQ quiz on JavaScript fundamentals.' },
    { id: 8, title: 'Algorithm Complexity', course: 'Data Structures', dueDate: '2026-05-05', status: 'graded', marks: 88, totalMarks: 100, description: 'Analyze time and space complexity of given algorithms.' },
  ];

  const filteredAssignments = filter === 'all' ? assignments : assignments.filter(a => a.status === filter);

  const counts = {
    all: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length,
  };

  const getStatusBadge = (status) => {
    if (status === 'pending') return { text: '⏳ Pending', class: 'bg-secondary text-white' };
    if (status === 'submitted') return { text: '📤 Submitted', class: 'bg-primary text-white' };
    return { text: '✅ Graded', class: 'bg-success text-white' };
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="student" />

      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-textDark mb-1">Assignments 📝</h1>
          <p className="text-sm md:text-base text-textLight">Track and submit your assignments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {[
            { label: 'Total', value: counts.all, icon: '📋', color: 'border-l-primary' },
            { label: 'Pending', value: counts.pending, icon: '⏳', color: 'border-l-secondary' },
            { label: 'Submitted', value: counts.submitted, icon: '📤', color: 'border-l-blue-500' },
            { label: 'Graded', value: counts.graded, icon: '✅', color: 'border-l-success' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white p-4 rounded-xl shadow-sm border-l-4 ${stat.color}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl md:text-3xl">{stat.icon}</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-textDark">{stat.value}</h3>
                  <p className="text-xs text-textLight">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { key: 'all', label: 'All', count: counts.all },
            { key: 'pending', label: 'Pending', count: counts.pending },
            { key: 'submitted', label: 'Submitted', count: counts.submitted },
            { key: 'graded', label: 'Graded', count: counts.graded },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0 border transition ${
                filter === tab.key
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-textLight border-border hover:border-primary hover:text-primary'
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

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.length > 0 ? filteredAssignments.map((assignment) => {
            const badge = getStatusBadge(assignment.status);
            const overdue = isOverdue(assignment.dueDate) && assignment.status === 'pending';

            return (
              <div key={assignment.id} className="bg-white p-5 md:p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-base md:text-lg font-bold text-textDark">{assignment.title}</h3>
                      <span className={`${badge.class} text-xs font-semibold px-2.5 py-1 rounded-full`}>
                        {badge.text}
                      </span>
                      {overdue && (
                        <span className="bg-danger text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          ⚠️ Overdue
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-textLight mb-2">📚 {assignment.course}</p>
                    <p className="text-sm text-textDark leading-relaxed">{assignment.description}</p>
                  </div>

                  {assignment.marks !== null && (
                    <div className="bg-bg p-3 rounded-lg text-center min-w-[100px] flex-shrink-0">
                      <div className="text-xs text-textLight mb-1">Marks</div>
                      <div className="text-xl md:text-2xl font-bold text-textDark">
                        {assignment.marks}<span className="text-base text-textLight">/{assignment.totalMarks}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-textLight">📅 Due:</span>
                    <span className={`font-medium ${overdue ? 'text-danger' : 'text-textDark'}`}>
                      {assignment.dueDate}
                    </span>
                    <span className="text-textLight">·</span>
                    <span className="text-textLight">Total: {assignment.totalMarks} marks</span>
                  </div>

                  {assignment.status === 'pending' && (
                    <button className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition">
                      📤 Submit Assignment
                    </button>
                  )}
                  {assignment.status === 'submitted' && (
                    <button className="bg-bg text-textDark px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-200 transition">
                      📄 View Submission
                    </button>
                  )}
                  {assignment.status === 'graded' && (
                    <button className="bg-success text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-700 transition">
                      👁️ View Feedback
                    </button>
                  )}
                </div>
              </div>
            );
          }) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-textDark font-semibold mb-2">No assignments found</h3>
              <p className="text-textLight">No assignments in this category</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default StudentAssignments;