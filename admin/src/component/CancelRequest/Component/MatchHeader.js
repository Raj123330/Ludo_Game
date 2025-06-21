import React from "react";
import "./MatchHeader.css";

const defaultData = {
  matchId: 181,
  date: "08 JAN, 2025 09:29 PM",
  roomCode: "03725465",
  betAmount: 500,
  prizeAmount: 975,
  gameName: "AAM LUDO",
  status: "CANCELLED",
  players: [
    { name: "Rahil", phone: "7073108208", result: "NOT SUBMITTED" },
    { name: "Ravi", phone: "6377259171", result: "NOT SUBMITTED" },
  ],
};

export default function MatchHeader() {
  return (
    <div className="match-header-container">
      <div className="match-header-gradient">
        <div className="match-header-content">
          {/* Match Info */}
          <h2 className="match-id">Match Id #{defaultData.matchId}</h2>
          <p className="match-date">{defaultData.date}</p>

          {/* Players */}
          <div className="players-wrapper">
            {defaultData.players.map((player, idx) => (
              <div key={idx} className="player-card">
                <div className="player-avatar" />
                <div className="player-details">
                  <p className="player-name">{player.name}</p>
                  <p className="player-phone">{player.phone}</p>
                </div>
                <div className="submitted-result">
                  <span className="result-badge">{player.result}</span>
                </div>
              </div>
            ))}

            {/* VS */}
            <div className="vs-circle">VS</div>
          </div>

          {/* Tags */}
          <div className="tags-wrapper">
            <div className="tag tag-cancelled">{defaultData.status}</div>
            <div className="tag tag-room">ROOM CODE : {defaultData.roomCode}</div>
            <div className="tag tag-bet">BET : ₹{defaultData.betAmount}</div>
            <div className="tag tag-prize">PRIZE : ₹{defaultData.prizeAmount}</div>
            <div className="tag tag-game">GAME : {defaultData.gameName}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
