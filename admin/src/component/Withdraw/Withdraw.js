import React, { useState } from "react";
import "./Withdraw.css";
import ImageModal from "../Modal/Modal";
import UserInfo from "../UserInfo/UserInfo";

const withdraws = [
  {
    name: "Kamlesg",
    phone: "7878188407",
    txn: "xx_txn14271428046",
    date: "08 FEB, 2025 06:25 PM",
    transfer: "₹ 98.20",
    fee: "₹ 1.80",
    amount: "₹ 100",
    remarks: "money transferred by admin",
    status: "COMPLETED",
    action: "APPROVED",
    proof: "https://via.placeholder.com/150"
  },
  {
    name: "Abhishek",
    phone: "7062472965",
    txn: "xx_txn14271428037",
    date: "30 JAN, 2025 08:09 AM",
    transfer: "₹ 98.20",
    fee: "₹ 1.80",
    amount: "₹ 100",
    remarks: "hdfjshf",
    status: "REJECTED",
    action: "REJECTED",
    proof: "https://via.placeholder.com/150"
  },
  {
    name: "Lahopcb",
    phone: "9024128979",
    txn: "xx_txn14271428026",
    date: "24 JAN, 2025 12:30 AM",
    transfer: "₹ 98.20",
    fee: "₹ 1.80",
    amount: "₹ 100",
    remarks: "money transferred by admin",
    status: "COMPLETED",
    action: "APPROVED",
    proof: "https://via.placeholder.com/150"
  },
  {
    name: "nik",
    phone: "9509634890",
    txn: "xx_txn14271428019",
    date: "21 JAN, 2025 01:16 PM",
    transfer: "₹ 98.20",
    fee: "₹ 1.80",
    amount: "₹ 100",
    remarks: "money transferred by admin",
    status: "COMPLETED",
    action: "APPROVED",
    proof: "https://via.placeholder.com/150"
  }
];

const WithdrawRequests = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  const filtered = withdraws.filter((w) => w.phone.includes(search));

  const openModal = (title, image) => {
    setSelectedTitle(title);
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage("");
    setSelectedTitle("");
  };

  return (
    <div className="withdraw-requests-container">
      <div className="header">
        <h2>User Withdraws</h2>
        <div className="user-info">
           <UserInfo/>
           </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="mobile no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="find-btn">FIND</button>
      </div>

      <div className="table-wrapper">
        <h3>All Withdraws Request</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Txn</th>
              <th>Details</th>
              <th>Amount</th>
              <th>Remarks</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={idx}>
                <td className="user-cell">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="avatar"
                    className="avatar"
                  />
                  <div>
                    <div>{item.name}</div>
                    <div className="subtext">{item.phone}</div>
                  </div>
                </td>
                <td>
                  <div>{item.txn}</div>
                  <div className="subtext">{item.date}</div>
                </td>
                <td>
                  Transfer : {item.transfer}
                  <br />
                  Fee : {item.fee}
                </td>
                <td>{item.amount}</td>
                <td>{item.remarks}</td>
                <td>
                  <span
                    className={`status-pill ${
                      item.status === "COMPLETED" ? "completed" : "rejected"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => {
                      openModal("Payment Proof", item.proof);
                    }}
                  >
                    {item.action}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="no-result">
                  No Withdraw Request Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ImageModal
        show={showModal}
        title={selectedTitle}
        image={selectedImage}
        onClose={closeModal}
      />
    </div>
  );
};

export default WithdrawRequests;
