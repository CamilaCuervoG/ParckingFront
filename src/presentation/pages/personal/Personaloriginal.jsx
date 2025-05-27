import React, { useState, useEffect } from "react";
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Header from '../../components/layout/header/Header';
import GestionarPersonal from '../../../domain/usecases/gestionarPersonal';
import '../../pages/index/Index.css';
import '../../pages/personal/Personal.css';
import Banner from "../../components/layout/banner/Banner";

function Personal() {
  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [personal, setPersonal] = useState([]);

  // Cargar personal guardado al montar el componente
  useEffect(() => {
    const guardado = GestionarPersonal.obtenerPersonal();
    setPersonal(guardado.reverse());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const actualizado = GestionarPersonal.agregarPersonal(nombre, cargo);
      setPersonal(actualizado);
      setMensaje("✅ Personal registrado correctamente.");
      setNombre("");
      setCargo("");
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        
        {/* Banner */}
        <Banner message="Gestión de Personal"/>

        <div className="content-grid">
          <section className="left-section">
            <div className="card-custom">
              <h3>Registrar Personal</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre completo"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cargo">Cargo:</label>
                  <input
                    id="cargo"
                    type="text"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="Ej: Vigilante, Cajero..."
                    required
                  />
                </div>

                <button type="submit" className="btn-submit">
                  Registrar
                </button>
              </form>

              {mensaje && (
                <p
                  style={{
                    marginTop: "10px",
                    color: mensaje.includes("correctamente") ? "green" : "red",
                  }}
                >
                  {mensaje}
                </p>
              )}
            </div>
          </section>

          <aside className="right-section">
            <div className="card-custom scrollable-table">
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
                  {personal.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        Sin registros
                      </td>
                    </tr>
                  ) : (
                    personal.map((p, index) => (
                      <tr key={index}>
                        <td>{p.nombre}</td>
                        <td>{p.cargo}</td>
                        <td>{p.fecha}</td>
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

export default Personal;
