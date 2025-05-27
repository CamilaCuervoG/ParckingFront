import { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Header  from '../../components/layout/header/Header';

import { list, createEntry } from '../../../services/personalService';
import './Personal.css';

export default function Personal() {
  /* ---------- state ---------- */
  const [name,       setName]       = useState('');
  const [position,   setPosition]   = useState('');
  const [message,    setMessage]    = useState('');
  const [staff,      setStaff]      = useState([]);
  const [loading,    setLoading]    = useState(false);

  /* ---------- cargar datos al montar ---------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await list();
        setStaff(data);
      } catch (err) {
        console.error('Error al cargar personal:', err);
        setMessage('⚠️ No se pudo cargar el personal');
      }
    })();
  }, []);

  /* ---------- enviar nuevo registro ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name,
        position,
        dateRegister: new Date().toISOString()   // ← se envía la fecha actual
      };
      await createEntry(payload);

      /* refrescar tabla */
      const { data } = await list();
      setStaff(data);

      setMessage('✅ Personal registrado correctamente.');
      setName('');
      setPosition('');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error al registrar personal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content personal-content">
        <div className="header personal-header">
        <Header titulo="Manejo Personal" />
        </div>

        <div className="banner">Gestión de Personal</div>
        <div className="content-grid">
          {/* ------------ FORMULARIO ------------ */}
          <section className="left-section">
            <div className="card-custom">
              <h3>Registrar Personal</h3>

              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre completo"
                  required
                />

                <label htmlFor="position">Cargo:</label>
                <input
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Ej: Vigilante, Cajero…"
                  required
                />

                <button type="submit" disabled={loading}>
                  {loading ? 'Guardando…' : 'Registrar'}
                </button>
              </form>

              {message && (
                <p style={{ color: message.startsWith('✅') ? 'green' : 'red' }}>
                  {message}
                </p>
              )}
            </div>
          </section>

          {/* ------------ TABLA ------------ */}
          <aside className="right-section">
            <div className="resumen-container">
              <h3>Historial de Personal</h3>

              <table className="resumen-tabla">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cargo</th>
                    <th>Fecha Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center' }}>
                        Sin registros
                      </td>
                    </tr>
                  ) : (
                    staff.map((p) => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.position}</td>
                        <td>
                          {new Date(p.dateRegister).toLocaleString('es-CO', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
