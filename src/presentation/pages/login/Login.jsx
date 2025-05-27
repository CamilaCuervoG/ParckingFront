import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  login as loginApi,
  register as registerApi
} from '../../../services/authService';
import './Login.css';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = Object.fromEntries(new FormData(e.target));

    try {
      if (isSignUp) {
        await registerApi(data.name, data.email, data.password);
        setIsSignUp(false);
        alert('¡Registro exitoso, inicia sesión!');
      } else {
        const { data: res } = await loginApi(data.email, data.password);
        localStorage.setItem('token', res.token);
        navigate('/index');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Error en la operación');
    }
  };

  return (
    <div className={`container ${isSignUp ? 'toggle' : ''}`}>
      {/* ----------- INICIAR SESIÓN ----------- */}
      <div className="container__form">
        <form className="sign__in" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>

          <div className="container__input">
            <ion-icon name="mail-open-outline"></ion-icon>
            <input type="email" name="email" placeholder="Correo Electrónico" required />
          </div>

          <div className="container__input">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input type="password" name="password" placeholder="Contraseña" required />
          </div>

          {error && !isSignUp && <p className="error">{error}</p>}

          <button className="button">Iniciar Sesión</button>
        </form>
      </div>

      {/* ----------- REGISTRO ----------- */}
      <div className="container__form">
        <form className="sign__up" onSubmit={handleSubmit}>
          <h2>Registrarse</h2>

          <div className="container__input">
            <ion-icon name="person-outline"></ion-icon>
            <input type="text" name="name" placeholder="Nombre" required />
          </div>

          <div className="container__input">
            <ion-icon name="mail-open-outline"></ion-icon>
            <input type="email" name="email" placeholder="Correo Electrónico" required />
          </div>

          <div className="container__input">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input type="password" name="password" placeholder="Contraseña" required />
          </div>

          {error && isSignUp && <p className="error">{error}</p>}

          <button className="button">Registrarse</button>
        </form>
      </div>

      {/* ----------- BIENVENIDA ----------- */}
      <div className="container__welcome">
        <div className="welcome__up welcome">
          <h3>¡Bienvenido!</h3>
          <p>Regístrese con sus datos personales para entrar a Parking JCA</p>
          <button className="button" type="button" onClick={() => setIsSignUp(true)}>
            Registrarse
          </button>
        </div>

        <div className="welcome__in welcome">
          <h3>¡Hola!</h3>
          <p>Ingrese sus datos personales para entrar a Parking JCA</p>
          <button className="button" type="button" onClick={() => setIsSignUp(false)}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

