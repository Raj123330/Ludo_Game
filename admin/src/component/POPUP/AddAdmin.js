import React, { useState } from 'react';
import './AddAdmin.css'; // Import the CSS file

const permissionsList = [
  "Manage Users",
  "Send Notification",
  "Ban User",
  "Add Transaction",
  "Manage KYCs Requests",
  "Manage Withdraws Requests",
  "Manage Cancellation Requests",
  "Manage Conflicts Requests",
  "Manage Pending Results",
  "Match History & Data",
];

const AddAdmin = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    status: 'Active',
    permissions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePermission = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // You can call your API here
    onClose(); // Close the modal after submitting (optional)
  };

  if (!isOpen) return null; // <-- This will hide the popup when not needed

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="form-title">Add New Admin</h2>
        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-group">
            <label>Admin Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Admin Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Admin Email"
              required
            />
          </div>

          <div className="form-group">
            <label>Admin Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Admin Password"
              required
            />
          </div>

          <div className="form-group">
            <label>Admin Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
  <label>Permissions</label>
  <div className="permissions-grid">
    {permissionsList.map((perm, idx) => (
      <div key={idx} className="permission-item">
        {perm}
        <input
          type="checkbox"
          checked={formData.permissions.includes(perm)}
          onChange={() => togglePermission(perm)}
        />
      </div>
    ))}
  </div>
</div>

          <button type="submit" className="submit-btn">ADD ADMIN</button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
