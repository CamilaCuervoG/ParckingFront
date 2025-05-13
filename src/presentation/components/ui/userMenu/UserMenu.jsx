import { useState } from 'react';  // Necesario para el manejo de estado
import { useNavigate } from 'react-router-dom';
import './UserMenu.css';

export default function UserMenu() {
  const navigate = useNavigate();

  // Definir el estado para el menú
  const [isOpen, setIsOpen] = useState(false);

  // Definir la función toggleMenu para alternar el estado
  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);  // Cambia el estado de isOpen
  };

  return (
    <header>
      <div className="user-menu-container">
        <img
          src="/src/assets/avatar.png"
          alt="User Avatar"
          className="user-avatar"
          onClick={toggleMenu}  // Llama a toggleMenu al hacer click en la imagen
        />

        {isOpen && (
          <div className="dropdown-menu">
            <ul className="menu-options">
              <li className="menu-option-item">Ver Perfil</li>
              <li  className="menu-option-item" onClick={() => navigate('/')}>
                Cerrar Sesión
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
