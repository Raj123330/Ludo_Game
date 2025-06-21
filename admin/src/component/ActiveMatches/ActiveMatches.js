import React, { useState } from "react";
import "./ActiveMatches.css";

const mockData = [
  {
    id: 222,
    date: "09 APR, 2025 12:51 AM",
    host: "Rakib",
    phone: "1977858945",
    joined: "none",
    bet: 9999,
    prize: 9999.99,
    game: "Badshah Ludo",
    range: "₹2500 - ₹10000",
    status: "CANCELLED",
  },
  {
    id: 221,
    date: "05 APR, 2025 01:03 PM",
    host: "nik",
    phone: "9509634890",
    joined: "none",
    bet: 55,
    prize: 107.25,
    game: "Aam Ludo",
    range: "₹50 - ₹500",
    status: "CANCELLED",
  },
  // Add more mock entries here...
];

const ActiveMatches= () => {
  const [search, setSearch] = useState("");

  const filteredMatches = mockData.filter((match) =>
    match.id.toString().includes(search)
  );

  return (
    <div className="match-history-container">
      <div className="header">
        <h2>Match History</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="match id"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="find-btn">FIND</button>
        </div>
      </div>

      <div className="match-table">
        <div className="table-header">
          <div>Match Id</div>
          <div>Room Code</div>
          <div>Hosted By</div>
          <div>Joined By</div>
          <div>Amount</div>
          <div>Game</div>
          <div>Status</div>
        </div>

        {filteredMatches.map((match) => (
          <div className="table-row" key={match.id}>
            <div>
              <strong>Match #{match.id}</strong>
              <br />
              <span className="small">{match.date}</span>
            </div>
            <div></div>
            <div>
              <strong>{match.host}</strong>
              <br />
              <span className="small">{match.phone}</span>
            </div>
            <div>{match.joined}</div>
            <div>
              Bet: ₹{match.bet}
              <br />
              Prize: ₹{match.prize}
            </div>
            <div>
              <strong>{match.game}</strong>
              <br />
              <span className="small">{match.range}</span>
            </div>
            <div>
              <span className="status cancelled">{match.status}</span>
              <br />
              <span className="open-link">Open Match ➤</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveMatches;
