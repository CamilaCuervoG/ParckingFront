import React, { useState, useEffect } from "react";
import { FaCarSide, FaParking } from "react-icons/fa";
import GestionarConfiguracion from "../../../../../domain/usecases/gestionarConfiguración";
import "./ParkingSystem.css";

export default function ParkingSystem({ config = null }) {
  const [showModal, setShowModal] = useState(false);
  const [parkingData, setParkingData] = useState({ cells: [], config: {} });
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    ocupados: 0,
    disponibles: 0,
    porcentaje: 0,
    altaOcupacion: false
  });

  // Cargar datos del parking
  useEffect(() => {
    const cargarDatos = () => {
      let data;
      let stats;

      if (config) {
        // Vista previa
        data = GestionarConfiguracion.generarDatosParking(config);
        // Si tienes un método específico para calcular estadísticas desde data, úsalo:
        stats = GestionarConfiguracion.obtenerEstadisticasDesdeData
          ? GestionarConfiguracion.obtenerEstadisticasDesdeData(data)
          : GestionarConfiguracion.obtenerEstadisticasParking(); // fallback
      } else {
        // Modo real
        data = GestionarConfiguracion.obtenerDatosParking();
        stats = GestionarConfiguracion.obtenerEstadisticasParking();
      }

      setParkingData(data);
      setEstadisticas(stats);
    };

    cargarDatos();
  }, [config]);

  // Bloquear scroll del fondo cuando modal esté abierto
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [showModal]);

  // Alternar ocupación (solo si no es vista previa)
  const toggleEspacio = (espacioId) => {
    if (config) return;

    const espacio = parkingData.cells.find(cell => cell.id === espacioId);
    if (espacio) {
      const nuevoEstado = !espacio.occupied;

      if (GestionarConfiguracion.actualizarEspacioParking(espacioId, nuevoEstado)) {
        const data = GestionarConfiguracion.obtenerDatosParking();
        const stats = GestionarConfiguracion.obtenerEstadisticasParking();
        setParkingData(data);
        setEstadisticas(stats);
      }
    }
  };

  const { total, ocupados, disponibles, porcentaje, altaOcupacion } = estadisticas;
  const columnas = parkingData.config?.columnas || 5;

  return (
    <div className="parking-wrapper">
      <button
        onClick={() => setShowModal(true)}
        className={`main-btn ${altaOcupacion ? "bg-red" : "bg-blue"}`}
        aria-haspopup="dialog"
        aria-expanded={showModal}
        aria-controls="parking-modal"
      >
        <div className="btn-info">
          <div className="title">
            {config ? "Vista Previa" : "Informe Global"}
          </div>
          <div className="subtitle">
            {ocupados}/{total} ocupados ({porcentaje}%)
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
              className={`modal-header ${altaOcupacion ? "bg-red-light" : "bg-blue-light"}`}
            >
              <div className="modal-top">
                <h2 id="modal-title">
                  {config ? "Vista Previa - " : ""}Estado de Parqueaderos
                </h2>
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
                  <strong className="red">{ocupados}</strong>
                  <span>Ocupados</span>
                </div>
                <div>
                  <strong className="green">{disponibles}</strong>
                  <span>Disponibles</span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${altaOcupacion ? "bg-red" : "bg-blue"}`}
                  style={{ width: `${porcentaje}%` }}
                ></div>
              </div>
            </div>

            <div className="modal-content">
              <div className="legend">
                <span><span className="box red"></span>Ocupado</span>
                <span><span className="box green"></span>Libre</span>
                {!config && (
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    (Haz clic en un espacio para cambiar su estado)
                  </span>
                )}
              </div>

              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${columnas}, 1fr)`
                }}
              >
                {parkingData.cells.map((cell) => (
                  <div
                    key={cell.id}
                    className={`cell ${cell.occupied ? "occupied" : "free"} ${!config ? "clickable" : ""}`}
                    onClick={() => toggleEspacio(cell.id)}
                    style={{
                      cursor: config ? "default" : "pointer"
                    }}
                    role={!config ? "button" : undefined}
                    tabIndex={!config ? 0 : undefined}
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

              <div className={`status ${altaOcupacion ? "status-red" : "status-green"}`}>
                {altaOcupacion
                  ? "⚠️ Pocos espacios disponibles"
                  : "✅ Buena disponibilidad"}
              </div>

              {config && (
                <div style={{
                  marginTop: '15px',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  Configuración: {parkingData.config?.filas || 4} filas × {columnas} columnas
                  | Umbral de alerta: {parkingData.config?.umbralAlta || 70}%
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
