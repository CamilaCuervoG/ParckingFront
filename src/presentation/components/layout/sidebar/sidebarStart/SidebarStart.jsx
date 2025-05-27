import React from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../../../../../assets/logo.png";
import { FiHome, FiInfo, FiPhone, FiLock } from "react-icons/fi";
import "./SidebarStart.css";

const SidebarStart = () => {
  const navigate = useNavigate();

  return (
    <nav className="sidebarstart expanded">
      <div className="sidebarstart-title">
        <img src={logo} alt="Logo" className="sidebarstart-logo" />
        <span className="brandstart">Parking JCA</span>
      </div>
      <div className="sidebarstart-nav">
        <button
          className="sidebarstart-button"
          onClick={() => navigate("/")}
        >
          <FiHome className="icon" />
          <span className="buttonstart-text">Inicio</span>
        </button>
        <button
          className="sidebarstart-button"
          onClick={() => navigate("/about")}
        >
          <FiInfo className="icon" />
          <span className="buttonstart-text">Sobre Nosotros</span>
        </button>
        <button
          className="sidebarstart-button"
          onClick={() => navigate("/contact")}
        >
          <FiPhone className="icon" />
          <span className="buttonstart-text">Contacto</span>
        </button>
        <button
          className="sidebarstart-button"
          onClick={() => navigate("/login")}
        >
          <FiLock className="icon" />
          <span className="buttonstart-text">Iniciar Sesión</span>
        </button>
      </div>
    </nav>
  );
};

export default SidebarStart;
