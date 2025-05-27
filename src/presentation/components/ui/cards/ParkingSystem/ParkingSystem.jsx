import React, { useState, useEffect } from "react";
import { FaCarSide, FaParking } from "react-icons/fa"; // Importamos iconos
import "./ParkingSystem.css";

const parkingData = {
  cells: Array.from({ length: 20 }, (_, i) => ({
    id: `${String.fromCharCode(65 + Math.floor(i / 5))}${(i % 5) + 1}`,
    occupied: Math.random() > 0.4,
  })),
};

export default function ParkingSystem() {
  const [showModal, setShowModal] = useState(false);

  const total = parkingData.cells.length;
  const occupied = parkingData.cells.filter((c) => c.occupied).length;
  const available = total - occupied;
  const percentage = Math.round((occupied / total) * 100);
  const isHighOccupancy = percentage > 70;

  // Bloquear scroll del fondo cuando modal esté abierto
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Limpieza al desmontar
    return () => document.body.classList.remove("no-scroll");
  }, [showModal]);

  return (
    <div className="parking-wrapper">
      <button
        onClick={() => setShowModal(true)}
        className={`main-btn ${isHighOccupancy ? "bg-red" : "bg-blue"}`}
        aria-haspopup="dialog"
        aria-expanded={showModal}
        aria-controls="parking-modal"
      >
        <div className="btn-info">
          <div className="title">Informe Global</div>
          <div className="subtitle">
            {occupied}/{total} ocupados ({percentage}%)
          </div>
        </div>
      </button>

      {showModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          id="parking-modal"
          aria-labelledby="modal-title"
        >
          <div className="modal-box">
            <div
              className={`modal-header ${
                isHighOccupancy ? "bg-red-light" : "bg-blue-light"
              }`}
            >
              <div className="modal-top">
                <h2 id="modal-title">Estado de Parqueaderos</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                  aria-label="Cerrar modal"
                >
                  ✖️
                </button>
              </div>
              <div className="stats">
                <div>
                  <strong>{total}</strong>
                  <span>Total</span>
                </div>
                <div>
                  <strong className="red">{occupied}</strong>
                  <span>Ocupados</span>
                </div>
                <div>
                  <strong className="green">{available}</strong>
                  <span>Disponibles</span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${
                    isHighOccupancy ? "bg-red" : "bg-blue"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            <div className="modal-content">
              <div className="legend">
                <span>
                  <span className="box red"></span>Ocupado
                </span>
                <span>
                  <span className="box green"></span>Libre
                </span>
              </div>

              <div className="grid">
                {parkingData.cells.map((cell) => (
                  <div
                    key={cell.id}
                    className={`cell ${cell.occupied ? "occupied" : "free"}`}
                  >
                    <span>
                      {cell.occupied ? (
                        <FaCarSide size={28} color="#7e0e0e" />
                      ) : (
                        <FaParking size={28} color="#22c55e" />
                      )}
                    </span>
                    <small>{cell.id}</small>
                  </div>
                ))}
              </div>

              <div
                className={`status ${
                  isHighOccupancy ? "status-red" : "status-green"
                }`}
              >
                {isHighOccupancy
                  ? "⚠️ Pocos espacios disponibles"
                  : "✅ Buena disponibilidad"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
