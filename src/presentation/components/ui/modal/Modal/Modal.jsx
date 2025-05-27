// src/components/Modal.jsx
import React from "react";
import "./Modal.css";


function Modal({ isOpen, onClose, title, children, extraButton = null }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 id="modal-title">{title}</h2>
        <div className="modal-body">{children}</div>

        <div className="modal-actions">
          {extraButton}
          <button className="modal-close-btn" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
