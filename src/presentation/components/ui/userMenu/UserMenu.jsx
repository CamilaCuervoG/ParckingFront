import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserMenu.css';

export default function UserMenu({ titulo = "Dashboard Principal" }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  // Cierra el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo-box">
          <span className="logo-text">P</span>
        </div>
        <div>
          <div className="brand-name">PARKING</div>
          <div className="brand-subtitle">Sistema de Gestión</div>
        </div>
      </div>

      <div className="center-info">
        <div className="dashboard-label">{titulo}</div> {/* ← Cambiado aquí */}
        <div className="divider" />
        <div className="status">
          <div className="status-dot" />
          <span className="status-text">Sistema Activo</span>
        </div>
      </div>

      <div className="user-menu" ref={menuRef}>
        <button onClick={toggleMenu} className="user-button">
          <div className="user-avatar">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                       1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                       0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          <div className="user-info">
            <div className="user-name">Usuario Admin</div>
            <div className="user-role">Administrador</div>
          </div>

          <svg
            width="16"
            height="16"
            fill="#6b7280"
            className={`arrow ${isOpen ? 'rotated' : ''}`}
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>

        {isOpen && (
          <div className="dropdown">
            <div className="dropdown-header">
              <div className="dropdown-name">Usuario Admin</div>
              <div className="dropdown-email">admin@parking.com</div>
            </div>

            <button className="dropdown-button" onClick={() => { console.log('Ver perfil'); closeMenu(); }}>
              👤 Ver Perfil
            </button>

            <button className="dropdown-button" onClick={() => { console.log('Configuración'); closeMenu(); }}>
              ⚙️ Configuración
            </button>

            <div className="dropdown-divider" />

            <button
              className="dropdown-button logout"
              onClick={() => {
                navigate('/');
                closeMenu();
              }}
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
