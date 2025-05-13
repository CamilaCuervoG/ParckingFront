import { useNavigate } from 'react-router-dom';
import './Start.css';

export default function Start() {
  const navigate = useNavigate();

  return (
    <>
      {/* Página de bienvenida (contenido original) */}
      <div className="page">
        <div className="page__container">
          <div className="menu">
            <img
              src="/assets/logo.png"
              alt="Logo Pagina"
              className="menu__logo"
            />

            <h1 className="menu__title">BIENVENIDO</h1>
            <p className="menu__subtitle">Parqueadero Urbano</p>

            <div className="menu__buttons">
              <button
                className="menu__button menu__button--blue"
                onClick={() => navigate('/login')}
              >
                Iniciar sesión
              </button>

              {/* Botones neutros: enlaza cuando tengas esas rutas */}
              <button className="menu__button menu__button--light">
                Tarifas
              </button>
              <button className="menu__button menu__button--sky">
                Sobre nosotros
              </button>
              <button className="menu__button menu__button--gray">
                Contacto
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
