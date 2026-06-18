import { useState, useEffect } from 'react';
import axios from 'axios';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://lms-production-b53d.up.railway.app/api/courses/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://lms-production-b53d.up.railway.app/api/courses/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u._id !== id));
      alert('User deleted');
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      student: 'bg-blue-100 text-primary',
      teacher: 'bg-green-100 text-success',
      admin: 'bg-purple-100 text-purple-700'
    };
    return badges[role] || 'bg-gray-100 text-textDark';
  };

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textDark">Manage Users 👥</h1>
          <p className="text-textLight mt-1">Total: {users.length} users</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-textLight">Loading...</div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">👥</div>
              <h2 className="text-xl font-bold text-textDark">No Users Yet</h2>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bg">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Email</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Role</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Joined</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-textDark">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-t border-border hover:bg-bg">
                      <td className="px-4 py-3 font-semibold text-textDark">{user.fullName}</td>
                      <td className="px-4 py-3 text-sm text-textLight">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getRoleBadge(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-textLight">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-danger text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-red-700 transition"
                          >
                            🗑️ Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;