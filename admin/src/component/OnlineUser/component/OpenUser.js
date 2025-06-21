import React, { useState } from "react";
import "./OpenUser.css";
import UserProfileHeader from "./UserHeader";

const UserProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const exampleUser = {
    name: "Anshu",
    phone: "7805105273",
    wallet: 5,
    image: null,
    username: "anshu123",
    winnings: 1200,
    mobile: "7805105273",
    referralBonus: 200,
    registeredOn: "2024-12-15",
    totalReferrals: 5,
    lastActive: "2025-04-20",
    playedMatches: 18,
    status: "Active",
    wonMatches: 12,
    walletBalance: 500,
    lostMatches: 6,
    accountStatus: "Verified",
    referralCode: "ANSHU500",
    kycStatus: "Not Submitted",
    referredBy: "RAHUL100",
    totalDeposit: 2000,
    totalWithdraws: 1500,
    transactions: [
      { date: "2025-04-01", amount: 500, type: "Deposit" },
      { date: "2025-04-10", amount: 300, type: "Withdraw" }
    ],
    matches: [
      { id: 1, status: "Won" },
      { id: 2, status: "Lost" }
    ]
  };

  const renderTabContent = () => {
    if (activeTab === "Dashboard") {
      return (
        <div className="profile-card">
          <div className="header">
            <h3>Player Statistics & Information</h3>
          </div>
          <div className="profile-grid">
            <div><strong>Username:</strong> {exampleUser.username}</div>
            <div><strong>Winnings:</strong> ₹ {exampleUser.winnings}</div>
            <div><strong>Mobile No:</strong> {exampleUser.mobile}</div>
            <div><strong>Referral Bonus:</strong> ₹ {exampleUser.referralBonus}</div>
            <div><strong>Registered On:</strong> {exampleUser.registeredOn}</div>
            <div><strong>Total Referrals:</strong> {exampleUser.totalReferrals}</div>
            <div><strong>Last Active:</strong> {exampleUser.lastActive}</div>
            <div><strong>Played Matches:</strong> {exampleUser.playedMatches}</div>
            <div><strong>Status:</strong> {exampleUser.status}</div>
            <div><strong>Won Matches:</strong> {exampleUser.wonMatches}</div>
            <div><strong>Wallet Balance:</strong> ₹ {exampleUser.walletBalance}</div>
            <div><strong>Lost Matches:</strong> {exampleUser.lostMatches}</div>
            <div><strong>Account Status:</strong> {exampleUser.accountStatus}</div>
            <div><strong>Referral Code:</strong> {exampleUser.referralCode}</div>
            <div><strong>KYC Status:</strong> {exampleUser.kycStatus}</div>
            <div><strong>Referred By:</strong> {exampleUser.referredBy}</div>
            <div><strong>Total Deposit:</strong> ₹ {exampleUser.totalDeposit}</div>
            <div><strong>Total Withdraws:</strong> ₹ {exampleUser.totalWithdraws}</div>
          </div>
        </div>
      );
    } else if (activeTab === "Transactions") {
      return (
        <div className="profile-card">
          <h3>Transactions</h3>
          <ul>
            {exampleUser.transactions.map((txn, i) => (
              <li key={i}>
                {txn.date} - ₹{txn.amount} ({txn.type})
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (activeTab === "Matches") {
      return (
        <div className="profile-card">
          <h3>Matches</h3>
          <ul>
            {exampleUser.matches.map((match, i) => (
              <li key={i}>
                Match #{match.id}: {match.status}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <UserProfileHeader user={exampleUser} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="status-actions">
        <div className="badges">
          <span className="badge offline">OFFLINE</span>
          <span className="badge kyc">KYC NOT SUBMITTED</span>
        </div>
        <div className="actions">
          <button className="wallet">
            <i className="fas fa-wallet"></i> ₹ {exampleUser.wallet}
          </button>
          <button className="notify">📢 SEND NOTIFICATION</button>
          <button className="ban">⛔ BAN USER</button>
        </div>
      </div>

      {/* Dynamic Content */}
      {renderTabContent()}
    </div>
  );
};

export default UserProfile;
