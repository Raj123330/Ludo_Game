import React, { useState } from "react";
import "./KycRequest.css";
import ImageModal from "../Modal/Modal";
import UserInfo from "../UserInfo/UserInfo";

const kycRequests = [
  {
    name: "Abhishek",
    phone: "7062472965",
    status: "COMPLETED",
    remarks: "kyc approved by admin",
    aadhar: "778876777678",
    date: "30 JAN, 2025 08:08 AM",
    image: "https://i.pravatar.cc/40?img=1"
  },
  {
    name: "Dilshad khan",
    phone: "8398978489",
    status: "COMPLETED",
    remarks: "kyc approved by admin",
    aadhar: "385748484888",
    date: "21 JAN, 2025 02:46 PM"
  },
  {
    name: "Sohail",
    phone: "9610529835",
    status: "COMPLETED",
    remarks: "kyc approved by admin",
    aadhar: "329921749878",
    date: "19 JAN, 2025 02:32 PM"
  },
  {
    name: "Savej khan",
    phone: "9928929882",
    status: "COMPLETED",
    remarks: "kyc approved by admin",
    aadhar: "329921749874",
    date: "19 JAN, 2025 02:28 PM"
  },
  {
    name: "Cggc",
    phone: "6375664424",
    status: "COMPLETED",
    remarks: "kyc approved by admin",
    aadhar: "329921749877",
    date: "18 JAN, 2025 03:54 AM"
  }
];

const KycRequests = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  const filtered = kycRequests.filter((user) =>
    user.phone.includes(search)
  );

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
    <div className="kyc-requests-container">
      <div className="header">
        <h2>User KYC</h2>
        <div className="user-info"><UserInfo/></div>
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
        <h3>All KYC Requests</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>KYC Status</th>
              <th>Remarks</th>
              <th>Aadhar Details</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, index) => (
              <tr key={index}>
                <td className="user-info-cell">
                  <img
                    src={user.image || "https://via.placeholder.com/40"}
                    alt="avatar"
                    className="avatar"
                  />
                  <div>
                    <div>{user.name}</div>
                    <div className="subtext">{user.phone}</div>
                  </div>
                </td>
                <td>
                  <span className="status completed">{user.status}</span>
                </td>
                <td>{user.remarks}</td>
                <td>
                  <div>{user.aadhar}</div>
                  <div className="doc-buttons">
                    <button
                      className="doc-btn"
                      onClick={() => openModal("Aadhar Front", user.aadharFront)}
                    >
                      FRONT
                    </button>
                    <button
                      className="doc-btn"
                      onClick={() => openModal("Aadhar Back", user.aadharBack)}
                    >
                      BACK
                    </button>
                  </div>
                </td>
                <td>{user.date}</td>
                <td>
                  <button className="action-btn">KYC APPROVED</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="no-result">
                  No KYC found
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

export default KycRequests;