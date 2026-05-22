import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function AdminManageUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const users = [
    { id: 1, name: 'Ahmad Khan', email: 'ahmad@test.com', role: 'student', joined: '2026-01-15', status: 'active' },
    { id: 2, name: 'Sara Ali', email: 'sara@test.com', role: 'teacher', joined: '2025-09-20', status: 'active' },
    { id: 3, name: 'Bilal Hassan', email: 'bilal@test.com', role: 'student', joined: '2026-02-10', status: 'active' },
    { id: 4, name: 'Ayesha Khan', email: 'ayesha@test.com', role: 'teacher', joined: '2025-08-05', status: 'active' },
    { id: 5, name: 'Hassan Ali', email: 'hassan@test.com', role: 'student', joined: '2026-03-22', status: 'inactive' },
    { id: 6, name: 'Fatima Sheikh', email: 'fatima@test.com', role: 'admin', joined: '2025-06-15', status: 'active' },
    { id: 7, name: 'Tariq Mehmood', email: 'tariq@test.com', role: 'teacher', joined: '2025-07-30', status: 'active' },
    { id: 8, name: 'Usman Khan', email: 'usman@test.com', role: 'student', joined: '2026-04-12', status: 'active' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    if (role === 'admin') return 'bg-purple-500 text-white';
    if (role === 'teacher') return 'bg-primary text-white';
    return 'bg-success text-white';
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="admin" />

      <main className="flex-1 md:ml-64 p-5 md:p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-textDark mb-1">Manage Users 👥</h1>
            <p className="text-sm md:text-base text-textLight">View and manage all platform users</p>
          </div>
          <button className="bg-primary text-white px-5 py-3 rounded-lg font-semibold hover:bg-primary-dark transition">
            ➕ Add New User
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* Users Table - Desktop */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-textDark">Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-textDark">Email</th>
                  <th className="text-center p-4 text-sm font-semibold text-textDark">Role</th>
                  <th className="text-center p-4 text-sm font-semibold text-textDark">Joined</th>
                  <th className="text-center p-4 text-sm font-semibold text-textDark">Status</th>
                  <th className="text-center p-4 text-sm font-semibold text-textDark">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-bg transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center">
                          👤
                        </div>
                        <span className="font-medium text-textDark">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-textLight">{user.email}</td>
                    <td className="p-4 text-center">
                      <span className={`${getRoleBadge(user.role)} text-xs font-semibold px-3 py-1 rounded-full uppercase`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-center text-sm text-textLight">{user.joined}</td>
                    <td className="p-4 text-center">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <button className="bg-primary text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-primary-dark transition">
                          ✏️ Edit
                        </button>
                        <button className="bg-danger text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-red-700 transition">
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Cards - Mobile */}
        <div className="md:hidden space-y-3">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                  👤
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-textDark">{user.name}</h4>
                  <p className="text-xs text-textLight truncate">{user.email}</p>
                </div>
                <span className={`${getRoleBadge(user.role)} text-xs font-semibold px-2 py-1 rounded-full uppercase`}>
                  {user.role}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3 text-xs">
                <span className="text-textLight">Joined: {user.joined}</span>
                <span className={`font-semibold ${user.status === 'active' ? 'text-success' : 'text-danger'}`}>
                  {user.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white py-2 rounded text-sm font-medium">
                  ✏️ Edit
                </button>
                <button className="flex-1 bg-danger text-white py-2 rounded text-sm font-medium">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminManageUsers;