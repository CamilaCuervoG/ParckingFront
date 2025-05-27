import { useState } from "react";
import "./ExitCard.css";

function ExitCard({ title, current, total, color }) {
  const [showPanel, setShowPanel] = useState(false);

  const handleOpenPanel = () => setShowPanel(true);
  const handleClosePanel = () => setShowPanel(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí agregar lógica para guardar datos de salida
    alert("Registro de salida guardado");
    setShowPanel(false);
  };

  return (
    <>
      <div className={`exit-card ${color}`} onClick={handleOpenPanel}>
        <h3>{title}</h3>
        <p className="large-number">{current}</p>
        <p className="total-text">{`Celdas Ocupadas`}</p>
      </div>

      {showPanel && (
        <div className="overlay" onClick={handleClosePanel}>
          <div className="alert-panel" onClick={(e) => e.stopPropagation()}>
            <h4>Registrar Salida</h4>
            <form onSubmit={handleSubmit}>
              <label htmlFor="vehicleId">ID del Vehículo</label>
              <input type="text" id="vehicleId" name="vehicleId" required />

              <label htmlFor="timeExit">Hora de Salida</label>
              <input type="time" id="timeExit" name="timeExit" required />

              <div className="buttons">
                <button type="submit">Guardar</button>
                <button type="button" className="btn-close" onClick={handleClosePanel}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ExitCard;
