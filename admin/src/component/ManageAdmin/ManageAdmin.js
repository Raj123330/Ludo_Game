import React, { useState } from "react";
import "./ManageAdmin.css";
import { UserPlus } from "lucide-react";
import AddAdmin from "../POPUP/AddAdmin";

const defaultAdmins = [
  { name: "Rahul Sharma", permissions: "Manage Users, Withdraws", status: "Active" },
  { name: "Priya Verma", permissions: "Tournament, Notifications", status: "Inactive" },
  { name: "Amit Patel", permissions: "Withdraws, Coupons", status: "Active" },
];

export default function ManageAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminData, setAdminData] = useState(defaultAdmins); // <-- using default data

  return (
    <div className="container">
      <div className="header">
        <h2>Manage Admins</h2>
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          <UserPlus className="icon" /> Add Admin
        </button>
      </div>

      <div className="card">
        <h3 className="card-title">Admin List</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Admin</th>
              <th>Permissions</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminData.length > 0 ? (
              adminData.map((admin, index) => (
                <tr key={index}>
                  <td>{admin.name}</td>
                  <td>{admin.permissions}</td>
                  <td>
                    <span className={`status-badge ${admin.status.toLowerCase()}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup for Add Admin */}
      <AddAdmin isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
