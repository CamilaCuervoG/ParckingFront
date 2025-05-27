import { useState } from 'react';
import {
  listEntries,     // GET  /parkings/entries
  closeEntry       // PUT  /parkings/:id/exit
} from '../../../../../services/parkingService';
import './ExitCard.css';

/*
  Props:
    • title        → texto visible
    • current      → número mostrado (no se actualiza en caliente)
    • total        → slots ocupados/total (visual)
    • color        → clase de color ya definida en CSS
*/
function ExitCard({ title, current, total, color }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const toggle = () => {
    setMessage('');
    setShow((v) => !v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const plate = e.target.plate.value.trim().toUpperCase();

    try {
      /* 1. Buscar entrada abierta con esa placa */
      const { data: abiertas } = await listEntries();
      const registro = abiertas.find((r) => r.plate === plate);

      if (!registro) {
        setMessage('⚠️ No hay entrada activa con esa placa');
        return;
      }

      /* 2. Cerrar la entrada en el backend */
      await closeEntry(registro.id);

      setMessage('✅ Salida registrada');
      /* 3. Cerrar el panel suavemente */
      setTimeout(() => setShow(false), 700);
    } catch (err) {
      const txt =
        err.response?.data?.msg || '❌ Error al registrar la salida';
      setMessage(txt);
    }
  };

  return (
    <>
      <div className={`exit-card ${color}`} onClick={toggle}>
        <h3>{title}</h3>
        <p className="large-number">{current}</p>
        <p className="total-text">{`Celdas Ocupadas`}</p>
      </div>

      {show && (
        <div className="overlay" onClick={toggle}>
          <div className="alert-panel" onClick={(e) => e.stopPropagation()}>
            <h4>Registrar salida de vehículo</h4>

            <form onSubmit={handleSubmit}>
              <label htmlFor="plate">Placa del vehículo</label>
              <input id="plate" name="plate" type="text" required />

              {message && (
                <p
                  style={{
                    marginTop: 8,
                    color: message.startsWith('✅') ? 'green' : 'red'
                  }}
                >
                  {message}
                </p>
              )}

              <div className="buttons">
                <button type="submit">Registrar</button>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggle}
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

export default ExitCard;
