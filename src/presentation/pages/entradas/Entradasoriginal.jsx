import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import Header from "../../components/layout/header/Header";
import StatsCard from "../../components/ui/cards/StatsCard/StatsCards";
import TablaEntradas from "../../components/ui/widgets/tablaEntradas/TablaEntradas";
import { registrarEntrada } from "../../../domain/usecases/registrarEntrada";
import "../../pages/index/Index.css";
import "./Entradas.css";
import Banner from "../../components/layout/banner/Banner";

function Entradas() {
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("Automóvil");
  const [mensaje, setMensaje] = useState("");
  const [entradas, setEntradas] = useState([]);

  useEffect(() => {
    setEntradas([]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = registrarEntrada(placa, tipo, entradas);
    if (result.error) {
      setMensaje(result.error);
      return;
    }

    setEntradas(result.nuevaLista);
    setMensaje(result.mensaje);
    setPlaca("");
    setTipo("Automóvil");
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        
       <div className="banner-container">
        <Banner message="Registrar entrada de vehículos"/>
       </div>

        <div className="content-grid">
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
                title="Entradas del día"
                entries={entradas.length}
                exits={30}
                footer="Datos del día de hoy"
              />
            </div>
          </section>

          <aside className="right-section">
            <TablaEntradas entradas={entradas} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Entradas;
