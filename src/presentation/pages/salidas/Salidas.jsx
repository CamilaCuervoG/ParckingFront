import React, { useState, useEffect } from 'react';

import Sidebar      from '../../components/layout/sidebar/Sidebar';
import Header       from '../../components/layout/header/Header';
import StatsCard    from '../../components/ui/cards/StatsCard/StatsCards';
import TablaSalidas from '../../components/ui/widgets/tablaSalidas/TablaSalidas';

import {
  listEntries,      // GET  /parkings/entries
  listExits,        // GET  /parkings/exits
  closeEntry        // PUT  /parkings/:id/exit
} from '../../../services/parkingService';

import '../../pages/index/Index.css';
import './Salidas.css';

function Salidas() {
  const [placa, setPlaca]       = useState('');
  const [mensaje, setMensaje]   = useState('');
  const [salidas, setSalidas]   = useState([]);

  /* ───── cargar salidas al montar ───── */
  useEffect(() => { cargarSalidas(); }, []);

  const cargarSalidas = async () => {
    try {
      const { data } = await listExits();
      setSalidas(data);
    } catch (err) {
      console.error('Error al cargar salidas:', err.message);
    }
  };

  /* ───── registrar salida ───── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      /* busca entrada abierta con la placa escrita */
      const { data: abiertas } = await listEntries();
      const registro = abiertas.find(
        (r) => r.plate === placa.trim().toUpperCase()
      );

      if (!registro) {
        setMensaje('⚠️ No hay entrada activa con esa placa');
        return;
      }

      /* cierra entrada y calcula valor en backend */
      await closeEntry(registro.id);

      await cargarSalidas();
      setPlaca('');
      setMensaje('✅ Salida registrada correctamente');
    } catch (err) {
      setMensaje(err.response?.data?.msg || 'Error al registrar salida');
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />

        <div className="banner">Registrar salida de vehículos</div>

        <div className="content-grid">
          {/* Formulario */}
          <section className="left-section">
            <div className="card-custom">
              <h3>Formulario de Salida</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="placa">Placa:</label>
                <input
                  id="placa"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                  placeholder="Ingrese la placa"
                  required
                />

                <button className="btn-submit">Registrar Salida</button>
              </form>

              {mensaje && (
                <p
                  style={{
                    marginTop: '10px',
                    color: mensaje.includes('✅') ? 'green' : 'red'
                  }}
                >
                  {mensaje}
                </p>
              )}
            </div>

            <div className="datescards-container">
              <StatsCard
                title="Salidas del día"
                entries={salidas.length}
                exits={0}
                footer="Datos del día de hoy"
              />
            </div>
          </section>

          {/* Tabla */}
          <aside className="right-section">
            <TablaSalidas salidas={[...salidas].reverse()} onSalida={closeEntry} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Salidas;
