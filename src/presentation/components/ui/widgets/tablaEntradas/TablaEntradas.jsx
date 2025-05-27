import React from "react";

export default function TablaEntradas({ entradas = [] }) {
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
          {entradas.map((r, idx) => {
            const fecha   = new Date(r.entryTime).toLocaleDateString();
            const hora    = new Date(r.entryTime).toLocaleTimeString();
          /* convierte valor BD → etiqueta UI */
            const tipoMostrar = r.vehicleType === 'moto' ? 'Motocicleta' : 'Automóvil';

            return (
              <tr key={r.id}>
                <td>{r.plate}</td>
                <td>{tipoMostrar}</td>
                <td>{fecha} - {hora}</td>
              </tr>
            );
        })}

        {!entradas.length && (
          <tr>
            <td colSpan="3" style={{ textAlign: "center", padding:12, fontStyle: "italic" }}>
              Sin datos registrados
            </td>
          </tr> 
        )}
        </tbody>
      </table>
    </div>
  );
}


