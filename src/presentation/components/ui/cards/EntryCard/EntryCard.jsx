import React, { useState } from 'react';
import { createEntry } from '../../../../../services/parkingService';
import './EntryCard.css';

function EntryCard({ title, current, totalSlots, color }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const toggle = () => {
    setMessage('');
    setShow((v) => !v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plate = e.target.plate.value.trim().toUpperCase();
    const uiType = e.target.type.value;           // Automóvil / Motocicleta
    const vehicleType = uiType.startsWith('Moto') ? 'moto' : 'carro';

    try {
      await createEntry(plate, vehicleType);
      setMessage('✅ Entrada registrada');
      setTimeout(() => setShow(false), 600);
    } catch (err) {
      const text =
        err.response?.data?.msg || '❌ Error al registrar la entrada';
      setMessage(text);
    }
  };

  return (
    <>
      <div className={`entry-card ${color}`} onClick={toggle}>
        <h3>{title}</h3>
        <p className="large-number">{current}</p>
        <p className="total-text">{`Celdas Disponibles prueba`}</p>
      </div>

      {show && (
        <div className="overlay" onClick={toggle}>
          <div className="alert-panel" onClick={(e) => e.stopPropagation()}>
            <h4>Registrar ingreso</h4>

            <form onSubmit={handleSubmit}>
              <label>
                Placa:
                <input id="plate" name="plate" type="text" required />
              </label>

              <label>
                Tipo:
                <select id="type" name="type" defaultValue="Automóvil">
                  <option>Automóvil</option>
                  <option>Motocicleta</option>
                </select>
              </label>

              {message && (
                <p
                  style={{
                    marginTop: 6,
                    color: message.startsWith('✅') ? 'green' : 'red'
                  }}
                >
                  {message}
                </p>
              )}

              <div className="buttons">
                <button type="submit">Registrar</button>
                <button type="button" className="btn-close" onClick={toggle}>
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
