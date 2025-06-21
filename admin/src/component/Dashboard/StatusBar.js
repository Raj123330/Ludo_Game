import React from "react";
import "./StatusBar.css";

const StatusBox = ({ label, value, isActive, onClick }) => {
  return (
    <div className={`status-box ${isActive ? "active" : ""}`} onClick={onClick}>
      <span className="label">{label}</span>
      <span className="value">: {value}</span>
    </div>
  );
};

const StatusBar = ({ onStatusClick }) => {
  return (
    <div className="status-bar">
      <StatusBox label="ONLINE USERS" value="0" onClick={() => onStatusClick('Dashboard')} />
      <StatusBox label="WITHDRAWS" value="0" onClick={() => onStatusClick('User Withdraws')} />
      <StatusBox label="CONFLICTS" value="0" onClick={() => onStatusClick('Manage Conflicts')} />
      <StatusBox label="CANCEL REQUESTS" value="0" onClick={() => onStatusClick('Cancel Requests')} />
      <StatusBox label="KYC REQUESTS" value="0" onClick={() => onStatusClick('User KYC')} />
      <StatusBox label="ACTIVE MATCHES" value="9" isActive onClick={() => onStatusClick('ActiveMatches')} />
    </div>
  );
};

export default StatusBar;
