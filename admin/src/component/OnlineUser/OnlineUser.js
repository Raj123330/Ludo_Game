import React, { useState } from "react";
import "./OnlineUser.css";

const usersData = [
  {
    id: 1,
    name: "Ariyan",
    phone: "9178730895",
    referral: "no referral",
    kyc: "Not Submitted",
    wallet: 0,
    status: "Offline",
    joined: "22 APR, 2025 10:40 PM",
    image: null,
  },
  {
    id: 2,
    name: "Saminaz",
    phone: "0954893894",
    referral: "no referral",
    kyc: "Not Submitted",
    wallet: 0,
    status: "Offline",
    joined: "21 APR, 2025 06:33 PM",
    image: null,
  },
  {
    id: 3,
    name: "ST Raju Islam",
    phone: "1327456481",
    referral: "no referral",
    kyc: "Not Submitted",
    wallet: 0,
    status: "Offline",
    joined: "18 APR, 2025 12:07 AM",
    image: "https://via.placeholder.com/40x40.png?text=ST", // Replace with real avatar URL
  },
  // Add more users as needed
];

const UserTable = ({ onOpenUser }) => {
  const [search, setSearch] = useState("");

  const filteredUsers = usersData.filter((user) =>
    user.phone.includes(search)
  );

  return (
    <div className="user-table-container">
      <h2>Manage Users</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="mobile no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>FIND</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>USER</th>
              <th>REFER BY</th>
              <th>KYC STATUS</th>
              <th>WALLET</th>
              <th>STATUS</th>
              <th>JOINED ON</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="user-info">
                  <img
                    src={
                      user.image ||
                      "https://via.placeholder.com/40x40.png?text=U"
                    }
                    alt={user.name}
                  />
                  <div>
                    <strong>{user.name}</strong>
                    <div>{user.phone}</div>
                  </div>
                </td>
                <td>{user.referral}</td>
                <td>{user.kyc}</td>
                <td>₹ {user.wallet}</td>
                <td>
                  <span className="status">{user.status.toUpperCase()}</span>
                </td>
                <td>{user.joined}</td>
                <td>
                  <button className="open-btn" onClick={() => onOpenUser(user)}>
                    OPEN USER
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="no-result">No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserTable;
