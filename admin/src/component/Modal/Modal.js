// components/ImageModal.js
import React from "react";
import "./Modal.css";

const ImageModal = ({ show, title, image, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <img src={image} alt={title} className="doc-image" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
