import React from "react";
import "./ConfirmPopup.css";

function ConfirmPopup({ onConfirm, onClose }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p className="confirm-message">Confirm changes?</p>

        <div className="confirm-buttons">
          <button
            className="confirm-btn"
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopup;
