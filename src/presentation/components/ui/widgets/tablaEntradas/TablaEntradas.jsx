import React from "react";

function TablaEntradas({ entradas }) {
  return (
    <div className="resumen-container" style={{ marginTop: "21px" }}>
      <h3>Entradas Registradas</h3>
      <table className="resumen-tabla">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Tipo</th>
            <th>Fecha y Hora</th>
          </tr>
        </thead>
        <tbody>
        {entradas.length === 0 ? (
          <tr>
            <td colSpan="3" style={{ textAlign: "center", fontStyle: "italic" }}>
              Sin datos registrados
            </td>
          </tr>
        ) : (
          entradas.slice().reverse().map((entrada, index) => (
            <tr key={index}>
              <td>{entrada.placa}</td>
              <td>{entrada.tipo}</td>
              <td>{entrada.fecha}</td>
            </tr>
          ))
        )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEntradas;
