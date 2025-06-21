import React, { useState } from "react";
import { 
  FaTachometerAlt, FaUserShield, FaUsers, FaGift, FaMoneyBillAlt, 
  FaTrophy, FaPlusCircle, FaLayerGroup, FaTicketAlt, 
  FaBell, FaUserCog, FaCogs 
} from "react-icons/fa"; // Correct icons
import "./SideBar.css";

const navItems = [
  { label: "Dashboard", icon: <FaTachometerAlt /> },
  { label: "Manage Admins", icon: <FaUserShield /> },
  { label: "Manage Users", icon: <FaUsers /> },
  { label: "Refer and Earn", icon: <FaGift /> },
  { label: "User Withdraws", icon: <FaMoneyBillAlt /> },
  { label: "Tournament", icon: <FaTrophy /> },
  { label: "Create Tournament", icon: <FaPlusCircle /> },
  { label: "Add Level", icon: <FaLayerGroup /> },
  { label: "Coupon Entry", icon: <FaTicketAlt /> },
  { label: "Manage Notifications", icon: <FaBell /> },
  { label: "Admin Logs", icon: <FaUserCog /> },
  { label: "Configuration", icon: <FaCogs /> },
];

const Sidebar = ({ onItemSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index, label) => {
    setActiveIndex(index);
    onItemSelect(label); // To update the selected view
  };

  return (
    <div className="sidebar">
      {/* Sidebar Logo */}
      <div className="sidebar-logo">
        <img 
          src="https://store-images.s-microsoft.com/image/apps.33970.14434231203861974.eecc5a13-8a71-4460-ab48-fbd9088ef0da.2d0f320c-55b6-4f9d-8924-769c7b90642a?mode=scale&q=90&h=720&w=1280" 
          alt="Logo" 
        />
        <span>Ludo Topper</span>
      </div>

      {/* Sidebar Navigation */}
      <nav className="nav-items">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(index, item.label)}
            className={`nav-button ${activeIndex === index ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
