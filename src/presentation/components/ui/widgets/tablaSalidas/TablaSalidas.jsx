import React from 'react';

export default function TablaSalidas({ salidas = [], onSalida }) {
  return (
      <div className="tabla-box tabla-salidas">
        <h3>Salidas Registradas</h3>
        <div className="tabla-scroll">
        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Tipo</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Horas</th>
              <th>Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {salidas.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: 12 }}>
                  No hay salidas registradas.
                </td>
              </tr>
            ) : (
              salidas.map((r) => (
                <tr key={r.id}>
                  <td>{r.plate}</td>
                  <td>{r.vehicleType === 'moto' ? 'Motocicleta' : 'Automóvil'}</td>
                  <td>{new Date(r.entryTime).toLocaleString()}</td>
                  <td>{r.exitTime ? new Date(r.exitTime).toLocaleString() : '—'}</td>
                  <td>{r.durationHours ?? '—'}</td>
                  <td>{r.amountCharged ? `$${r.amountCharged.toLocaleString()}` : '—'}</td>
                  <td>
                    {!r.exitTime && (
                      <button onClick={() => onSalida(r.id)}>
                        Registrar salida
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
