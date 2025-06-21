import React from "react";
import "./Cancel&Conflict.css";

const defaultTransactions = [
  {
    txn: "created a match",
    date: "08 JAN, 2025 09:29 PM",
    txnId: "xx_txn14271427940",
    user: "Rahil",
    phone: "7073108208",
    type: "DEBIT",
    amount: "-500 ₹",
    status: "SUCCESSFUL",
  },
  {
    txn: "played a match",
    date: "08 JAN, 2025 09:30 PM",
    txnId: "xx_txn14271427942",
    user: "Ravi",
    phone: "6377259171",
    type: "DEBIT",
    amount: "-500 ₹",
    status: "SUCCESSFUL",
  },
  {
    txn: "Match Cancelled",
    date: "08 JAN, 2025 09:30 PM",
    txnId: "xx_txn14271427943",
    user: "Ravi",
    phone: "6377259171",
    type: "CREDIT",
    amount: "+500 ₹",
    status: "SUCCESSFUL",
  },
  {
    txn: "Match Cancelled",
    date: "08 JAN, 2025 09:30 PM",
    txnId: "xx_txn14271427944",
    user: "Rahil",
    phone: "7073108208",
    type: "CREDIT",
    amount: "+500 ₹",
    status: "SUCCESSFUL",
  },
];

const defaultCancelRequests = [
  {
    name: "Ravi",
    phone: "6377259171",
    reason: "Room Code Not Working",
    requestedOn: "08 JAN, 2025 09:30 PM",
    status: "ACCEPTED",
  },
  {
    name: "Rahil",
    phone: "7073108208",
    reason: "Room Code Not Working",
    requestedOn: "08 JAN, 2025 09:30 PM",
    status: "ACCEPTED",
  },
];

const defaultConflicts = []; // Empty now, can be populated later

export default function CancelAndConflicts() {
  return (
    <div className="cancel-conflicts-container">

      {/* Transactions Section */}
      <div className="card">
        <h3>Transactions On Match</h3>
        <div className="table">
          <div className="table-header">
            <div>Txn</div>
            <div>Txn Id</div>
            <div>User</div>
            <div>Type</div>
            <div>Amount</div>
            <div>Status</div>
          </div>
          {defaultTransactions.map((txn, idx) => (
            <div key={idx} className="table-row">
              <div>
                <strong>{txn.txn}</strong><br />
                <small>{txn.date}</small>
              </div>
              <div>{txn.txnId}</div>
              <div>
                <strong>{txn.user}</strong><br />
                <small>{txn.phone}</small>
              </div>
              <div>{txn.type}</div>
              <div style={{ color: txn.amount.includes('-') ? "red" : "green", fontWeight: "bold" }}>
                {txn.amount}
              </div>
              <div>
                <span className="status-badge successful">{txn.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Requests Section */}
      <div className="card">
        <h3>Cancel Requests On Match</h3>
        <div className="table">
          <div className="table-header">
            <div>Requested By</div>
            <div>Reason</div>
            <div>Status</div>
          </div>
          {defaultCancelRequests.map((req, idx) => (
            <div key={idx} className="table-row">
              <div>
                <strong>{req.name}</strong><br />
                <small>{req.phone}</small>
              </div>
              <div>
                <strong>{req.reason}</strong><br />
                <small>Requested On {req.requestedOn}</small>
              </div>
              <div>
                <span className="status-badge accepted">{req.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conflicts Section */}
      <div className="card">
        <h3>Conflicts On Match</h3>
        <div className="table">
          <div className="table-header">
            <div>Conflict Date</div>
            <div>Host</div>
            <div>Host Result</div>
            <div>Joiner</div>
            <div>Joiner Result</div>
            <div>Status</div>
          </div>
          {defaultConflicts.length > 0 ? (
            defaultConflicts.map((conflict, idx) => (
              <div key={idx} className="table-row">
                <div>{conflict.date}</div>
                <div>{conflict.host}</div>
                <div>{conflict.hostResult}</div>
                <div>{conflict.joiner}</div>
                <div>{conflict.joinerResult}</div>
                <div>
                  <span className={`status-badge ${conflict.status.toLowerCase()}`}>
                    {conflict.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">no data available</div>
          )}
        </div>
      </div>

    </div>
  );
}
