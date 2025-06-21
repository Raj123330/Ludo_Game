import React from "react";
import "./MatchInfo.css";
import MatchHeader from "./MatchHeader";
import CancelAndConflicts from "./Cancel&Confilct";

export default function MatchInfoPage() {
  return (
    <div className="match-info-container">
      {/* Header */}
      <div className="header-wrapper">
      <MatchHeader/>
      </div>

      {/* Transactions */}

       
      <CancelAndConflicts/>
    </div>
  );
}
