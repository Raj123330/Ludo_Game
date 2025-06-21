import React, { useState } from 'react';
import './SendNotification.css';

const SendNotification = ({ isOpen, onClose, onSend }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Send Notification</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <label>Enter Notification Content</label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Type your message here..."
          />
          <button className="send-button" onClick={handleSend}>
            SEND TO ALL USERS
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
