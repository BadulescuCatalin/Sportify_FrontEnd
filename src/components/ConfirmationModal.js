import React, { useState } from "react";
import Modal from "react-modal";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Confirmation</h2>
      <p>Are you sure you want to confirm the reservation?</p>
      <div>
        <button onClick={handleConfirm}>Yes, I confirm</button>
        <button onClick={onClose}>No, go back!</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
