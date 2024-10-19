import React, { useState } from 'react';
import './WarningModal.css';

const WarningModal = ({ show, onClose, onDoNotShowAgain }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleCheckboxChange = () => {
    setDontShowAgain(!dontShowAgain);
  };

  const handleClose = () => {
    if (dontShowAgain) {
      onDoNotShowAgain();
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Notice</h2>
        <p>PLEASE READ: You might not see anything - that's because the backend shuts down after inactivity. Just wait for a bit for the backend to start again and you should start seeing jokers.</p>
        <div className="modal-actions">
          <label>
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={handleCheckboxChange}
            />
            Don't show this again
          </label>
        </div>
        <button onClick={handleClose}>OK</button>
      </div>
    </div>
  );
};

export default WarningModal;
