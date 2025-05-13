import React from 'react';
import './Banner.css';

const Banner = ({ message }) => {
  const now = new Date();
  const hours = now.getHours();

  // Saludo según la hora
  let greeting = 'Buenos Días,';
  if (hours >= 12 && hours < 18) {
    greeting = 'Buenas Tardes,';
  } else if (hours >= 18) {
    greeting = 'Buenas Noches,';
  }

  // Formato de hora (ej. 10:29 am)
  const formattedTime = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).toLowerCase();

  return (
    <div className="greeting-banner">
      <div className="greeting-text">
        <h2>{greeting}</h2>
        {message && <p>{message}</p>}
      </div>
      <div className="greeting-time">
        {formattedTime}
      </div>
    </div>
  );
};

export default Banner;
