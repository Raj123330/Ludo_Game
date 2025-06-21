import React, { useState } from "react";
import "./ConflictTable.css";
import UserInfo from "../UserInfo/UserInfo";

const conflictMatches = [
  {
    id: "Match #188",
    date: "09 JAN, 2025 10:01 AM",
    roomCode: "45368798",
    conflictTime: "09 JAN, 2025 10:02 AM",
    participants: [
      {
        role: "Host",
        name: "Aj",
        phone: "7850873530",
        result: "Winner",
        time: "09 JAN, 2025 10:02 AM"
      },
      {
        role: "Joiner",
        name: "Rahil",
        phone: "7073108208",
        result: "Looser",
        time: "09 JAN, 2025 10:02 AM"
      }
    ]
  },
  {
    id: "Match #105",
    date: "02 OCT, 2024 03:34 PM",
    roomCode: "12345",
    conflictTime: "02 OCT, 2024 03:37 PM",
    participants: [
      {
        role: "Host",
        name: "Sunil",
        phone: "7790982678",
        result: "Winner",
        time: "02 OCT, 2024 03:35 PM"
      },
      {
        role: "Joiner",
        name: "Sunil1",
        phone: "6350113458",
        result: "Looser",
        time: "02 OCT, 2024 03:35 PM"
      }
    ]
  },
  {
    id: "Match #15",
    date: "12 AUG, 2024 11:39 PM",
    roomCode: "25802580",
    conflictTime: "13 AUG, 2024 12:48 AM",
    participants: [
      {
        role: "Host",
        name: "Vinod",
        phone: "9785064008",
        result: "Winner",
        time: "13 AUG, 2024 12:48 AM"
      },
      {
        role: "Joiner",
        name: "Qqqq",
        phone: "9351926290",
        result: "Looser",
        time: "13 AUG, 2024 12:48 AM"
      }
    ]
  },
  {
    id: "Match #3",
    date: "17 JUL, 2024 08:12 AM",
    roomCode: "0123456852",
    conflictTime: "17 JUL, 2024 08:13 AM",
    participants: [
      {
        role: "Host",
        name: "Dev Ninja",
        phone: "7669006847",
        result: "Looser",
        time: "17 JUL, 2024 08:12 AM"
      },
      {
        role: "Joiner",
        name: "Monu",
        phone: "7838403916",
        result: "Winner",
        time: "17 JUL, 2024 08:12 AM"
      }
    ]
  }
];

const ConflictTable = ({ setSelectedMatch, setSelectedUser }) => {
  const [search, setSearch] = useState("");

  const filtered = conflictMatches.filter((match) =>
    match.id.toLowerCase().includes(search.toLowerCase())
  );
 
  const handleOpenMatch = (match) => {
    setSelectedMatch(match);  // <- Set the selected match in parent state
    setSelectedUser(null);     // <- Clear selected user (if any)
  };

  return (
    <div className="conflict-container">
      <div className="header">
      <h2>Manage Conflicts</h2>
      <div className="user-info"><UserInfo/></div>
      </div>


      <div className="search-bar">
        <input
          type="text"
          placeholder="match id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>FIND</button>
      </div>

      <div className="table-wrapper">
        <h3>Conflicted Matches</h3>
        <table>
          <thead>
            <tr>
              <th>Match Id</th>
              <th>Room Code</th>
              <th>Host</th>
              <th>Host Result</th>
              <th>Joiner</th>
              <th>Joiner Result</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((match, idx) => {
              const host = match.participants.find(p => p.role === "Host");
              const joiner = match.participants.find(p => p.role === "Joiner");

              return (
                <tr key={idx}>
                  <td>
                    <div>{match.id}</div>
                    <div className="subtext">{match.date}</div>
                  </td>
                  <td>
                    <div>{match.roomCode}</div>
                    <div className="subtext">Conflict : {match.conflictTime}</div>
                  </td>
                  <td>
                    <div>
                      {host.name}{" "}
                      <span className={host.result === "Winner" ? "winner" : "looser"}>
                        ({host.result})
                      </span>
                    </div>
                    <div className="subtext">{host.phone}</div>
                  </td>
                  <td>
                    <span className="screenshot">SCREENSHOT</span>
                    <div className="subtext">{host.time}</div>
                  </td>
                  <td>
                    <div>
                      {joiner.name}{" "}
                      <span className={joiner.result === "Winner" ? "winner" : "looser"}>
                        ({joiner.result})
                      </span>
                    </div>
                    <div className="subtext">{joiner.phone}</div>
                  </td>
                  <td>
                    <span className="screenshot">SCREENSHOT</span>
                    <div className="subtext">{joiner.time}</div>
                  </td>
                  <td>
                    <button className="resolved-btn">✔ RESOLVED</button>
                    <div className="open-match" onClick={() => handleOpenMatch(match)}>Open Match ➜</div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="no-result">
                  No conflict match found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConflictTable;
