import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo.png";
import { useLocation } from "react-router-dom";

import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const Entradas = () => {
    navigate("/entradas");
  };
  const Salidas = () => {
    navigate("/salidas");
  };
  const Historial = () => {
    navigate("/historial");
  };
  const Personal = () => {
    navigate("/personal");
  };
  const Configuracion = () => {
    navigate("/configuracion");
  };

  return (
    <aside className="sidebar">
      <ul className="sidebar__list">
        {/* Logo */}
        <li className="sidebar__element">
          <img
            src={logo}
            alt="Logo Parking JCA"
            className="sidebar__icon sidebar__icon--logo"
          />
          <div className="sidebar__hide">
            <h3 className="sidebar__title sidebar__title--Parking">
              Parking JCA
            </h3>
          </div>
        </li>

        {/* Index*/}
        <li
          className={`sidebar__element ${location.pathname === "/index" ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            // strokeWidth="1.5"
            stroke="currentColor"
            width="30"
            height="30"
            className="sidebar__icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12L11.204 3.045a1.125 1.125 0 011.591 0L21.75 12M4.5 9.75v10.125A1.125 1.125 0 005.625 21H9.75v-4.875A1.125 1.125 0 0110.875 15h2.25a1.125 1.125 0 011.125 1.125V21h4.125A1.125 1.125 0 0019.5 19.875V9.75M8.25 21h8.25"
            />
          </svg>

          <div className="sidebar__hide">
            <a className="sidebar__text" onClick={() => navigate("/index")}>
              Inicio
            </a>
          </div>
        </li>

        {/* Entradas */}
        <li
          className={`sidebar__element ${location.pathname === "/entradas" ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            // stroke-width="1.5"
            stroke="currentColor"
            width="30"
            height="30"
            className="sidebar__icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            // stroke-width="1.5"
            stroke="currentColor"
            width="30"
            height="30"
            className="sidebar__icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
            />
          </svg> */}

          <div className="sidebar__hide">
            <a className="sidebar__text" onClick={() => navigate("/entradas")}>
              Entradas
            </a>
          </div>
        </li>

        {/* Salidas */}
        <li
          className={`sidebar__element ${location.pathname === "/salidas" ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            // stroke-width="1.5"
            stroke="currentColor"
            width="30"
            height="30"
            className="sidebar__icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#526581"
            width="30"
            height="30"
            className="sidebar__icon"
          >
            <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840v80q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200v80Zm160-160-56-57 103-103H360v-80h327L584-624l56-56 200 200-200 200Z" />
          </svg> */}

          <div className="sidebar__hide">
            <a className="sidebar__text" onClick={() => navigate("/salidas")}>
              Salidas
            </a>
          </div>
        </li>

        {/* Historial */}
        <li
          className={`sidebar__element ${location.pathname === "/historial" ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            // strokeWidth="1.5"
            stroke="currentColor"
            width="30"
            height="30"
            className="sidebar__icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>

          <div className="sidebar__hide">
            <a className="sidebar__text" onClick={() => navigate("/historial")}>
              Historial
            </a>
          </div>
        </li>

        {/* Personal */}
        <li
          className={`sidebar__element ${location.pathname === "/personal" ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            // stroke-width="1.5"
            stroke="currentColor"
            width="30"
            height="30"
            className="sidebar__icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>

          <div className="sidebar__hide">
            <a className="sidebar__text" onClick={() => navigate("/personal")}>
              Personal
            </a>
          </div>
        </li>

        {/* Configuración */}
        <li
          className={`sidebar__element ${location.pathname === "/configuracion" ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            // strokeWidth="1.5"
            stroke="currentColor"
            width="30"
            height="30"
            className="sidebar__icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <div className="sidebar__hide">
            <a
              className="sidebar__text"
              onClick={() => navigate("/configuracion")}
            >
              Configuración
            </a>
          </div>
        </li>
      </ul>
    </aside>
  );
}
