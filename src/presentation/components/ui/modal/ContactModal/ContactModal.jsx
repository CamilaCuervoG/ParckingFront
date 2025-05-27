import React from "react";
import "./ContactModal.css";

const ContactModal = ({ message, onClose }) => {
  return (
    <div className="contactmodal-backdrop">
      <div className="contactmodal-content">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ContactModal;
