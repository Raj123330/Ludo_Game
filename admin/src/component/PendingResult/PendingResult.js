import React, { useState } from "react";
import "./PendingResult.css";

const PendingResults = () => {
  const [search, setSearch] = useState("");
  const [data] = useState([]); // Add your dynamic match data here

  return (
    <div className="pending-results-container">
      <div className="header">
        <h2>Pending Results</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="match id"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="find-button">FIND</button>
        </div>
      </div>

      <div className="results-card">
        <h3>Pending Result Matches</h3>
        <div className="table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                <th>Match Id</th>
                <th>Room Code</th>
                <th>Host</th>
                <th>Joiner</th>
                <th>Amount</th>
                <th>Game</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.matchId}</td>
                    <td>{item.roomCode}</td>
                    <td>{item.host}</td>
                    <td>{item.joiner}</td>
                    <td>{item.amount}</td>
                    <td>{item.game}</td>
                    <td>
                      <button className="action-btn">Resolve</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    no data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingResults;
