import React, {useState} from "react";
import "./AdminLogs.css";
import CustomDateModal from "../Dashboard/component/CustomDate";

const adminLogs = [
  {
    dateTime: "23 APR, 2025 11:00 PM",
    activity: "admin@codegully.in logged in successfully",
    device: "Windows",
    ipAddress: "2409:4081:9506:523a:b87a:4ff:5489:18fb",
  },
  {
    dateTime: "23 APR, 2025 12:00 AM",
    activity:
      "admin@codegully.in try to logged in & failed with password 12345",
    device: "Windows",
    ipAddress: "2409:40d4:311e:e8ae:5cda:80e5:f793:b144",
  },
];

export default function AdminLogs() {
  const [modalOpen, setModalOpen] = useState(false); 
  return (
    <div className="admin-logs-container">
      <div className="admin-logs-header">
        <h1 className="admin-logs-title">Admin Logs</h1>
        <div className="admin-logs-actions">
          <button className="btn-today">TODAY (23 APRIL, 2025)</button>
          <button className="btn-custom" onClick={() => setModalOpen(true)}>CUSTOM DATES</button>
        </div>
      </div>

      <div className="admin-logs-card">
        <h2 className="card-title">Activity logs on admin panel</h2>
        <div className="admin-logs-table-wrapper">
          <table className="admin-logs-table">
            <thead>
              <tr>
                <th>DATE & TIME</th>
                <th>ACTIVITY</th>
                <th>DEVICE</th>
                <th>IP ADDRESS</th>
              </tr>
            </thead>
            <tbody>
              {adminLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.dateTime}</td>
                  <td>{log.activity}</td>
                  <td>{log.device}</td>
                  <td>{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomDateModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} />
    </div>
  );
}
