import React from 'react';
import './PaymentForm.css';

export default function PaymentForm() {
  return (
    <div className="payment-form-container">
      <h2>Tarifas del Parqueadero</h2>
      <table className="tarifas-table">
        <thead>
          <tr>
            <th>Tipo de Vehículo</th>
            <th>Por Hora</th>
            <th>Por Día</th>
            <th>Mensualidad</th>
            <th>Anualidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Carro</td>
            <td>$5.000</td>
            <td>$25.000</td>
            <td>$300.000</td>
            <td>$3.000.000</td>
          </tr>
          <tr>
            <td>Moto</td>
            <td>$2.000</td>
            <td>$10.000</td>
            <td>$120.000</td>
            <td>$1.200.000</td>
          </tr>
        </tbody>
      </table>
      <button className="cerrar-btn">Cerrar</button>
    </div>
  );
}
