// src/components/TablaSalidas.jsx
import React from "react";

function TablaSalidas({ salidas }) {
  return (
    <div className="resumen-container">
      <h3>Tabla de Salidas</h3>
      <table className="resumen-tabla">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Tipo de vehículo</th>
            <th>Fecha y Hora</th>
          </tr>
        </thead>
        <tbody>
          {salidas.length === 0 ? (
            <tr>
              <td colSpan="3">No hay salidas registradas.</td>
            </tr>
          ) : (
            salidas.map((salida, index) => (
              <tr key={index}>
                <td>{salida.placa}</td>
                <td>{salida.tipo}</td>
                <td>{salida.fecha}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaSalidas;
