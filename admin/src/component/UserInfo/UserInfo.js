// src/components/UserInfo.js
import React, { useState } from "react";
import "./UserInfo.css"; // style separately or in Withdraw.css

const UserInfo = () => {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    alert("Logged out"); // Replace with actual logout logic
    setShowLogout(false);
  };

  return (
    <div className="user-info" onClick={() => setShowLogout(!showLogout)}>
      👤 Dev Ninja
      {showLogout && (
        <div className="logout-popup">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
