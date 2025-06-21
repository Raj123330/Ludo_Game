import React, { useState } from "react";
import "./InputHeader.css";

const InputHeader = ({
  heading = "Manage Users",
  placeholder = "mobile no",
  buttonText = "FIND",
  usersData = [],
  onSearch = () => {},
}) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const filteredUsers = usersData.filter((user) =>
      user.phone.includes(search)
    );
    onSearch(filteredUsers);
  };

  return (
    <div className="withdraw-requests-container">
      <div className="header">
        <h2>User Withdraws</h2>
        <div className="user-info">👤 Dev Ninja</div>
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
    </div>
  );
};

export default InputHeader;
