import React, { useState } from 'react';
import '../ConfigCard/ConfigCard.css'; 

const SuperAdminConfig = () => {
  const [adminData, setAdminData] = useState({
    name: 'Dev Ninja',
    email: 'admin@codegully.in',
    password: '123456',
  });

  const handleChange = (e) => {
    setAdminData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', adminData);
    // Send data to backend here
  };

  return (
    <section className="config-container">
      <h1 className="config-title">Configuration</h1>

      <div className="config-card">
        <h2 className="config-heading">
          <i className="fas fa-cogs" /> Super Admin Credentials
        </h2>

        <form onSubmit={handleSubmit} className="config-form">
          {[
            { label: 'Admin Name', name: 'name', type: 'text' },
            { label: 'Admin Email', name: 'email', type: 'email' },
            { label: 'Admin Password', name: 'password', type: 'password' },
          ].map(({ label, name, type }) => (
            <div key={name} className="form-group">
              <label>{label}</label>
              <input
                type={type}
                name={name}
                value={adminData[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button type="submit" className="submit-btn">
            Update Super Admin
          </button>
        </form>
      </div>
    </section>
  );
};

export default SuperAdminConfig;
