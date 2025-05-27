  import React, { useState } from "react";
  import SidebarStart from "../../components/layout/sidebar/sidebarStart/SidebarStart"
  import PaymentCard from "../../components/ui/cards/PaymentCard/PaymentCard";
  import Modal from "../../components/ui/modal/Modal/Modal";
  import PaymentForm from "../../components/ui/form/PaymentForm/PaymentForm"; // Importa tu formulario de pago
  import "./Start.css"
  
  const Start = () => {
    const [modalParqueaderoOpen, setModalParqueaderoOpen] = useState(false);
    const [modalSoftwareOpen, setModalSoftwareOpen] = useState(false);
    const [modalPagoOpen, setModalPagoOpen] = useState(false); // Estado para modal pago
    const [modalMensajeOpen, setModalMensajeOpen] = useState(false); // Modal para mensaje
    const [mensajePago, setMensajePago] = useState(""); // Texto del mensaje de éxito

    // Función que se ejecuta cuando el pago es exitoso
    const handlePagoExitoso = (mensaje) => {
      setModalPagoOpen(false);        // Cierra modal del formulario de pago
      setMensajePago(mensaje);        // Guarda el mensaje
      setModalMensajeOpen(true);      // Abre el modal de confirmación
    };

    return (
      <>
        <SidebarStart />
        <main className="main-content">
          <h1>Bienvenido a ParkingJCA</h1>
          <p>
            Tu vehículo, en buenas manos. En nuestro parqueadero encontrarás
            seguridad, comodidad y atención las 24 horas del día. Ubicados en una
            zona estratégica, ofrecemos espacios amplios, tarifas accesibles y
            vigilancia permanente para tu tranquilidad.
          </p>
          <h6>Consulta los valores del parqueadero y planes del software:</h6>

          <div className="cards-container">
            <PaymentCard title="Parqueadero" onClick={() => setModalParqueaderoOpen(true)} />
            <PaymentCard title="Software" onClick={() => setModalSoftwareOpen(true)} />
          </div>

          {/* Bloque informativo adicional */}
          <section className="info-section">
            <h2>¿Por qué elegir ParkingJCA?</h2>
            <p>
              ParkingJCA te ofrece soluciones confiables y seguras para el cuidado
              de tu vehículo. Contamos con tarifas competitivas y planes de software
              diseñados para facilitar la administración del parqueadero.
            </p>
            <p>
              Nuestro compromiso es brindarte un servicio eficiente, transparente y
              adaptado a tus necesidades, tanto si eres usuario frecuente como si
              administras un parqueadero.
            </p>
          </section>

          {/* Modal Parqueadero */}
          <Modal
            isOpen={modalParqueaderoOpen}
            onClose={() => setModalParqueaderoOpen(false)}
            title="Tarifas del Parqueadero"
          >
            <table>
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
          </Modal>

          {/* Modal Software */}
          <Modal
            isOpen={modalSoftwareOpen}
            onClose={() => setModalSoftwareOpen(false)}
            title="Planes del Software"
            extraButton={
              <button
                className="modal-comprar-btn"
                onClick={() => {
                  setModalSoftwareOpen(false); // Cerrar modal Software
                  setModalPagoOpen(true);      // Abrir modal Pago
                }}
              >
                Comprar
              </button>
            }
          >
            <table>
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Características</th>
                  <th>Mensualidad</th>
                  <th>Anualidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Básico</td>
                  <td>1 usuario, Reportes básicos</td>
                  <td>$50.000</td>
                  <td>$500.000</td>
                </tr>
                <tr>
                  <td>Premium</td>
                  <td>Multiusuario, Reportes avanzados, Soporte 24/7</td>
                  <td>$100.000</td>
                  <td>$1.000.000</td>
                </tr>
              </tbody>
            </table>
          </Modal>

          {/* Modal para formulario de pago */}
          <Modal
            isOpen={modalPagoOpen}
            onClose={() => setModalPagoOpen(false)}
          >
            <PaymentForm onPagoExitoso={handlePagoExitoso} />
          </Modal>

          {/* Modal de mensaje de pago exitoso */}
          <Modal
            isOpen={modalMensajeOpen}
            onClose={() => setModalMensajeOpen(false)}
            title="Pago exitoso"
          >
            <p>{mensajePago || "¡El pago se realizó con éxito!"}</p>
          </Modal>
        </main>
      </>
    );
  };

  export default Start;
