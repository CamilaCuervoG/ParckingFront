// src/components/RegisterModal/RegisterModal.jsx
import React from "react";
import "./RegisterModal.css";

const RegisterModal = ({ message, onClose }) => {
  return (
    <div className="register-modal-overlay">
      <div className="register-modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default RegisterModal;
