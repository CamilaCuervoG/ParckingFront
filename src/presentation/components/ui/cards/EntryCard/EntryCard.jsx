import React, { useState } from "react";
import "./EntryCard.css";

function EntryCard({ title, current, total, color }) {
  const [showPanel, setShowPanel] = useState(false);

  const handleTogglePanel = () => {
    setShowPanel(!showPanel);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos del formulario (ejemplo)
    alert("Registro enviado!");
    setShowPanel(false);
  };

  return (
    <>
      <div className={`entry-card ${color}`} onClick={handleTogglePanel}>
        <h3>{title}</h3>
        <p className="large-number">{current}</p>
        <p className="total-text">{`Celdas Disponibles`}</p>
      </div>

      {showPanel && (
        <div className="overlay" onClick={handleTogglePanel}>
          <div className="alert-panel" onClick={(e) => e.stopPropagation()}>
            <h4>Registrar ingreso de vehículo</h4>
            <form onSubmit={handleSubmit}>
              <label htmlFor="plate">Número de placa:</label>
              <input id="plate" name="plate" type="text" required />

              <label htmlFor="type">Tipo de vehículo:</label>
              <select id="type" name="type" required>
                <option value="">Seleccione...</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>

              <div className="buttons">
                <button type="submit">Registrar</button>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleTogglePanel}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EntryCard;
