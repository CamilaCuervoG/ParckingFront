import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/sidebar/Sidebar";  // Correcto
import Header from "../../components/layout/header/Header";  // Correcto
import StatsCard from "../../components/ui/cards/StatsCard/StatsCards";
import TablaSalidas from "../../components/ui/widgets/tablaSalidas/TablaSalidas";  // Nombre actualizado a TablaSalidas
import "../../pages/index/Index.css";
import "../../pages/entradas/Entradas.css";
import Banner from "../../components/layout/banner/Banner";
// import './Salidas.css';

function Salidas() {
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("Automóvil");
  const [mensaje, setMensaje] = useState("");
  const [salidas, setSalidas] = useState([]);

  const placaRegex = /^[A-Za-z]{3}-\d{4}$/;

  // Cargar salidas guardadas al montar el componente
  useEffect(() => {
    const salidasGuardadas = JSON.parse(localStorage.getItem("salidas")) || [];
    setSalidas(salidasGuardadas);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!placaRegex.test(placa)) {
      setMensaje("⚠️ La placa debe seguir el formato: ABC-1234");
      return;
    }

    const nuevaSalida = {
      placa,
      tipo,
      fecha: new Date().toLocaleString("es-CO"),
    };

    const salidasActuales = JSON.parse(localStorage.getItem("salidas")) || [];
    const nuevasSalidas = [...salidasActuales, nuevaSalida];

    localStorage.setItem("salidas", JSON.stringify(nuevasSalidas));
    setSalidas(nuevasSalidas);
    setMensaje("✅ Salida registrada correctamente.");
    setPlaca("");
    setTipo("Automóvil");
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="banner-container">
        <Banner message="Registrar salida de vehículos"/>
        </div>

        <div className="content-grid">
          <section className="left-section">
            <div className="card-custom">
              <h3>Formulario de Salida</h3>
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
                    aria-label="Placa del vehículo"
                  />
                </div>

                <div>
                  <label htmlFor="tipo">Tipo de vehículo:</label>
                  <select
                    id="tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    aria-label="Tipo de vehículo"
                  >
                    <option value="Automóvil">Automóvil</option>
                    <option value="Motocicleta">Motocicleta</option>
                  </select>
                </div>

                <button type="submit" className="btn-submit">
                  Registrar Salida
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

            <div className="Statescard">
              <StatsCard
                title="Salidas del día"
                entries={80}
                exits={160}
                footer="Datos del día de hoy"
              />
            </div>
          </section>

          <aside className="right-section">
            <TablaSalidas salidas={[...salidas].reverse()} />  {/* Ahora está usando TablaSalidas para mostrar las salidas */}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Salidas;
