import React, { useState } from 'react';
import "./CancelRequest.css";
import UserInfo from "../UserInfo/UserInfo"; 


const cancelRequests = [
  {
    id: "Match #181",
    date: "08 JAN, 2025 09:29 PM",
    roomCode: "03725465",
    host: {
      name: "Rahil",
      phone: "7073108208",
      accepted: true
    },
    joiner: {
      name: "Ravi",
      phone: "6377259171",
      accepted: true
    },
    reason: "Room Code Not Working",
    requestedOn: "08 JAN, 2025 09:30 PM",
    status: "ACCEPTED"
  },
  {
    id: "Match #152",
    date: "20 DEC, 2024 11:14 AM",
    roomCode: "05865554",
    host: {
      name: "Waseem",
      phone: "9649799031",
      accepted: true
    },
    joiner: {
      name: "Wasee",
      phone: "7014145857",
      accepted: true
    },
    reason: "Accepted another player cancellation request",
    requestedOn: "20 DEC, 2024 11:14 AM",
    status: "ACCEPTED"
  },
  {
    id: "Match #152",
    date: "20 DEC, 2024 11:14 AM",
    roomCode: "05865554",
    host: {
      name: "Waseem",
      phone: "9649799031",
      accepted: true
    },
    joiner: {
      name: "Wasee",
      phone: "7014145857",
      accepted: true
    },
    reason: "Room Code Not Working",
    requestedOn: "20 DEC, 2024 11:15 AM",
    status: "ACCEPTED"
  }
];

const CancelRequests = ({ setSelectedMatch, setSelectedUser }) => {
  const [search, setSearch] = useState("");

  const filtered = cancelRequests.filter((match) =>
    match.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenMatch = (match) => {
    setSelectedMatch(match);  // <- Set the selected match in parent state
    setSelectedUser(null);     // <- Clear selected user (if any)
  };

  return (
    <div className="cancel-requests-container">
      <div className="header">
        <h2>Cancel Requests</h2>
        <div className="user-info"><UserInfo/></div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="match id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="find-btn">FIND</button>
      </div>

      <div className="table-wrapper">
        <h3>Cancel Requests</h3>
        <table>
          <thead>
            <tr>
              <th>Match Id</th>
              <th>Room Code</th>
              <th>Host</th>
              <th>Joiner</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req, index) => (
              <tr key={index}>
                <td>
                  <div>{req.id}</div>
                  <div className="subtext">{req.date}</div>
                </td>
                <td>{req.roomCode}</td>
                <td>
                  <div>
                    {req.host.name}
                    {req.host.accepted && <span className="check">✅</span>}
                  </div>
                  <div className="subtext">{req.host.phone}</div>
                </td>
                <td>
                  <div>
                    {req.joiner.name}
                    {req.joiner.accepted && <span className="check">✅</span>}
                  </div>
                  <div className="subtext">{req.joiner.phone}</div>
                </td>
                <td>
                  <div className="reason-text">{req.reason}</div>
                  <div className="subtext">Requested On {req.requestedOn}</div>
                </td>
                <td>
                  <span className="status accepted">{req.status}</span>
                </td>
                <td>
                  <div className="open-match"
                   onClick={() => handleOpenMatch(req)}
                   style={{ cursor: "pointer", color: "blue", fontWeight: "bold" }}>Open Match ➜</div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="no-result">
                  No cancel request found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CancelRequests;
