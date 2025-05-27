import React from "react";
import "./PaymentCard.css";

function Card({ title, onClick }) {
  return (
    <div
      className="cardpayment"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") onClick();
      }}
    >
      <h3>{title}</h3>
    </div>
  );
}

export default Card;
