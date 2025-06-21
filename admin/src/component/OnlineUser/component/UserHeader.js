import React, { useState } from "react";
import "./UserHeader.css";

const UserProfileHeader = ({ user, activeTab, setActiveTab }) => {
    return (
      <div className="user-profile-header">
        <div className="gradient-strip">
          <div className="profile-card">
            <div className="left-section">
              <img
                className="avatar"
                src={user.image || "https://via.placeholder.com/60x60.png?text=U"}
                alt={user.name}
              />
              <div className="user-details">
                <h3>{user.name}</h3>
                <p>{user.phone}</p>
              </div>
            </div>
            <div className="tab-links">
              {["Dashboard", "Transactions", "Matches"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab ? "active-tab" : ""}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default UserProfileHeader;