import React from 'react';
import "./IncomeCard.css";

const IncomeCard = ({ title, value, footer }) => {
  return (
    <div className="income-card">
      <div className="income-card-header">
        <h3>{title}</h3>
      </div>
      <div className="income-card-body">
        <p className="income-value">{value}</p>
      </div>
      <div className="income-card-footer">
        <span>{footer}</span>
      </div>
      </div>
  );
};

export default IncomeCard;
