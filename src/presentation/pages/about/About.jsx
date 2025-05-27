import React from "react";
import SidebarStart from "../../components/layout/sidebar/sidebarStart/SidebarStart";
import "./About.css";

const About = () => {
  return (
    <>
      <SidebarStart />
      <main className="main-content">
        <h1>Sobre Nosotros</h1>
        <p>
          ParkingJCA es un sistema dedicado a ofrecer soluciones eficientes para la gestión de parqueaderos
          y administración de software relacionado. Nuestro objetivo es brindar comodidad y seguridad a nuestros usuarios
          con planes flexibles y tarifas competitivas.
        </p>

        <section className="team-section">
          <h2>Nuestro Equipo</h2>
          <p>
            Contamos con un equipo multidisciplinario de expertos en tecnología, logística y atención al cliente,
            comprometidos con la mejora continua y la innovación.
          </p>
        </section>

        <section className="mission-section">
          <h2>Misión</h2>
          <p>
            Facilitar el acceso y control del parqueadero, junto con ofrecer un software robusto que simplifique
            la administración para nuestros clientes.
          </p>
        </section>

        <section className="vision-section">
          <h2>Visión</h2>
          <p>
            Ser la plataforma líder en soluciones integrales para parqueaderos en Latinoamérica, reconocidos
            por nuestra calidad, innovación y servicio al cliente.
          </p>
        </section>
      </main>
    </>
  );
};

export default About;

