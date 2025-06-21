import React from 'react';
import './Confirmation.css';
import { Info } from 'lucide-react'; // using lucide-react for icons

export default function Confirmation({ message = "Are you sure you want to delete this?", onClose, onConfirm }) {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <div className="popup-content">
          <Info className="info-icon" size={48} strokeWidth={2.5} />
          <p className="popup-message">{message}</p>
        </div>
        <div className="popup-actions">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="confirm-button" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
