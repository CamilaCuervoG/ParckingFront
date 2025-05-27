import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import Header from "../../components/layout/header/Header";
import getHistorial from "../../../domain/usecases/getHistorial";
import "../../pages/index/Index.css";
import "./Historial.css";
import Banner from "../../components/layout/banner/Banner";

function Historial() {
  const [entradas, setEntradas] = useState([]);
  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    const historialUseCase = new getHistorial();  // Usamos el caso de uso para obtener los datos
    const { entradas, salidas } = historialUseCase.execute();
    setEntradas(entradas.reverse());
    setSalidas(salidas.reverse());
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />

        {/* Banner */}
        <div className="banner-container">
        <Banner message="Historial de Entradas y Salidas"/>
        </div>

        <div className="content-grid">
          {/* Entradas */}
          <section className="left-section">
            <div className="card-custom">
              <h3>Entradas Registradas</h3>
              <div className="tabla-scroll">
                <table className="resumen-tabla">
                  <thead>
                    <tr>
                      <th>Placa</th>
                      <th>Tipo</th>
                      <th>Fecha y Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entradas.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>Sin entradas</td>
                      </tr>
                    ) : (
                      entradas.map((entrada, index) => (
                        <tr key={index}>
                          <td>{entrada.placa}</td>
                          <td>{entrada.tipo}</td>
                          <td>{entrada.fecha}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Salidas */}
          <aside className="right-section">
            <div className="card-custom">
              <h3>Salidas Registradas</h3>
              <div className="tabla-scroll">
                <table className="resumen-tabla">
                  <thead>
                    <tr>
                      <th>Placa</th>
                      <th>Tipo</th>
                      <th>Fecha y Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salidas.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>Sin salidas</td>
                      </tr>
                    ) : (
                      salidas.map((salida, index) => (
                        <tr key={index}>
                          <td>{salida.placa}</td>
                          <td>{salida.tipo}</td>
                          <td>{salida.fecha}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Historial;
