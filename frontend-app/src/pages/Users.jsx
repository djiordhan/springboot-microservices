import { useEffect, useState } from 'react';
import { userService } from '../services/api';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please make sure the backend is running.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await userService.updateUser(editingId, formData);
      } else {
        await userService.createUser(formData);
      }
      setFormData({ username: '', email: '', fullName: '' });
      setShowForm(false);
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error('Error saving user:', err);
      alert('Failed to save user. Please try again.');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ username: '', email: '', fullName: '' });
    setShowForm(false);
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="users-page fade-in">
      <div className="page-header">
        <div>
          <h1>👥 Users Management</h1>
          <p>Manage users from the User Service (MySQL + Redis)</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '➕ Add User'}
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {showForm && (
        <div className="card form-card">
          <div className="card-header">
            <h3 className="card-title">
              {editingId ? '✏️ Edit User' : '➕ Create New User'}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? '💾 Update User' : '➕ Create User'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                ✕ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Users ({users.length})</h3>
          <button className="btn btn-secondary" onClick={fetchUsers}>
            🔄 Refresh
          </button>
        </div>
        
        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👤</div>
            <h3>No users found</h3>
            <p>Create your first user to get started</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <span className="badge badge-info">{user.id}</span>
                    </td>
                    <td>
                      <strong>{user.username}</strong>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.fullName}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon btn-icon-edit"
                          onClick={() => handleEdit(user)}
                          title="Edit user"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icon btn-icon-delete"
                          onClick={() => handleDelete(user.id)}
                          title="Delete user"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
