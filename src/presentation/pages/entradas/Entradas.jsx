import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Header  from '../../components/layout/header/Header';
import StatsCard from '../../components/ui/cards/StatsCard/StatsCards';
import TablaEntradas from '../../components/ui/widgets/tablaEntradas/TablaEntradas';

import { createEntry, listEntries } from '../../../services/parkingService';

import '../../pages/index/Index.css';
import './Entradas.css';

function Entradas() {
  const [placa, setPlaca]       = useState('');
  const [tipo, setTipo]         = useState('Automóvil');   // etiqueta que ve el usuario
  const [mensaje, setMensaje]   = useState('');
  const [entradas, setEntradas] = useState([]);

  /* cargar entradas activas al montar */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await listEntries();
        setEntradas(data);
      } catch (err) {
        console.error('Error al cargar entradas:', err.message);
      }
    })();
  }, []);

  /* registrar nueva entrada */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    // traduce etiqueta UI → valor BD
    const vehicleType = tipo.startsWith('Motocicleta') ? 'moto' : 'carro';

    try {
      await createEntry(placa.trim().toUpperCase(), vehicleType);

      const { data } = await listEntries();
      setEntradas(data);

      setPlaca('');
      setTipo('Automóvil');
      setMensaje('Entrada registrada correctamente');
    } catch (err) {
      setMensaje(err.response?.data?.msg || 'Error al registrar');
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="banner">Registrar entrada de vehículos</div>

        <div className="content-grid">
          {/* -------- Izquierda -------- */}
          <section className="left-section">
            <div className="card-custom">
              <h3>Formulario de Entrada</h3>

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="placa">Placa:</label>
                  <input
                    id="placa"
                    type="text"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                    placeholder="Ingrese la placa"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="tipo">Tipo de vehículo:</label>
                  <select
                    id="tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value="Automóvil">Automóvil</option>
                    <option value="Motocicleta">Motocicleta</option>
                  </select>
                </div>

                <button type="submit" className="btn-submit">
                  Registrar Entrada
                </button>
              </form>

              {mensaje && (
                <p
                  style={{
                    marginTop: '10px',
                    color: mensaje.includes('correctamente') ? 'green' : 'red'
                  }}
                >
                  {mensaje}
                </p>
              )}
            </div>

            <div className="datescards-container">
              <StatsCard
                title="Entradas del día"
                entries={entradas.length}
                exits={0}
                footer="Datos del día de hoy"
              />
            </div>
          </section>

          {/* -------- Derecha -------- */}
          <aside className="right-section">
            <TablaEntradas entradas={entradas} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Entradas;

