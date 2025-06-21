import React, { useState } from "react";
import "./Dashboard.css";
import { UserPlus, CreditCard, Gamepad2, ShoppingCart } from "lucide-react";
import CustomDateModal from "./component/CustomDate";

const InfoCard = ({ title, value, icon }) => (
  <div className="dashboard-card">
    <div className="dashboard-text">
      <p className="dashboard-title">{title}</p>
      <p className="dashboard-value">{value}</p>
    </div>
    <div className="dashboard-icon">{icon}</div>
  </div>
);

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <button
          className="custom-dates-button"
          onClick={() => setModalOpen(true)}
        >
          CUSTOM DATES
        </button>
      </div>

      <div className="cards-grid">
        <InfoCard
          title="New Users"
          value="0 Users Joined"
          icon={<UserPlus className="icon-white" />}
        />
        <InfoCard
          title="Deposits"
          value="₹0 Deposits"
          icon={<CreditCard className="icon-white" />}
        />
        <InfoCard
          title="Matches"
          value="0 finished matches"
          icon={<Gamepad2 className="icon-white" />}
        />
        <InfoCard
          title="Admin Earnings"
          value="₹0 Estimated"
          icon={<ShoppingCart className="icon-white" />}
        />
        <InfoCard
          title="Withdraws"
          value="₹0.00 Withdraws, - Withdraw Fee"
          icon={<CreditCard className="icon-white" />}
        />

        <div className="dashboard-total-card">
          <div>
            <p className="dashboard-total-amount">
              ₹ 358,712.09{" "}
              <span className="dashboard-total-users">270 Users Wallet</span>
            </p>
            <p className="dashboard-total-label">
              Total Wallet Balance (All Users)
            </p>
          </div>
          <div className="dashboard-icon">💳</div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="card">
          <div className="card-content">
            <h3 className="section-title">New Registered Users</h3>
            <hr />
            <ul className="user-list">
              <li>User</li>
              <li>Refer By</li>
              <li>Registered</li>
              <li>On Wallet</li>
            </ul>
            <p className="no-data">no data available</p>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h3 className="section-title">Deposits By Users</h3>
            <hr />
            <p className="no-data">no data available</p>
          </div>
        </div>
      </div>

      <CustomDateModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
