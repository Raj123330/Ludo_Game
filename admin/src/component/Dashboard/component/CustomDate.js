import React, { useState } from "react";
import "./CustomDate.css";
import { Calendar, X } from "lucide-react";

const CustomDateModal = ({ isOpen, onRequestClose }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleApply = () => {
    console.log("From:", fromDate, "To:", toDate);
    onRequestClose(); // Close modal after apply
  };

  if (!isOpen) return null;

  return (
    <div className="custom-overlay">
      <div className="custom-modal">
        <div className="modal-header">
         <h2 className="modal-title">Custom Dates  </h2>
        <span className="close-icon" onClick={onRequestClose}><X size={20} /></span>
       </div>
       

        <div className="input-group">
          <input
            type="date"
            placeholder="From dd-mm-yyyy"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        
        </div>

        <div className="input-group">
          <input
            type="date"
            placeholder="To dd-mm-yyyy"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default CustomDateModal;
