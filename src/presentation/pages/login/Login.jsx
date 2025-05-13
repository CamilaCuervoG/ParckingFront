import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepositoryImpl } from '../../../domain/repositories/AuthRepositoryImpl';
import { loginUser } from '../../../domain/usecases/loginUser';
import { registerUser } from '../../../domain/usecases/registerUser';
import './Login.css';

const authRepository = new AuthRepositoryImpl();

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    if (isSignUp) {
      await registerUser(authRepository)(data.email, data.password);
      setIsSignUp(false);
    } else {
      const ok = await loginUser(authRepository)(data.email, data.password);
      if (ok) {
        navigate('/index');
      } else {
        alert('Credenciales incorrectas');
      }
    }
  };

  return (
    <div className={`container ${isSignUp ? 'toggle' : ''}`}>
      {/* ---------- Formulario Iniciar Sesión ---------- */}
      <div className="container__form">
        <form className="sign__in" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          <div className="container__input">
            <ion-icon name="mail-open-outline"></ion-icon>
            <input type="text" name="email" placeholder="Correo Electrónico" />
          </div>
          <div className="container__input">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input type="password" name="password" placeholder="Contraseña" />
          </div>
          <a href="#">¿Olvidaste tu contraseña?</a>
          <button className="button">Iniciar Sesión</button>
        </form>
      </div>

      {/* ---------- Formulario Registro ---------- */}
      <div className="container__form">
        <form className="sign__up" onSubmit={handleSubmit}>
          <h2>Registrarse</h2>
          <div className="container__input">
            <ion-icon name="person-outline"></ion-icon>
            <input type="text" name="name" placeholder="Nombre" />
          </div>
          <div className="container__input">
            <ion-icon name="mail-open-outline"></ion-icon>
            <input type="text" name="email" placeholder="Correo Electrónico" />
          </div>
          <div className="container__input">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input type="password" name="password" placeholder="Contraseña" />
          </div>
          <button className="button">Registrarse</button>
        </form>
      </div>

      {/* ---------- Bienvenida ---------- */}
      <div className="container__welcome">
        <div className="welcome__up welcome">
          <h3>¡Bienvenido!</h3>
          <p>Regístrese con sus datos personales para entrar a Parking JCA</p>
          <button
            className="button"
            onClick={() => setIsSignUp(true)}
            type="button"
          >
            Registrarse
          </button>
        </div>

        <div className="welcome__in welcome">
          <h3>¡Hola!</h3>
          <p>Ingrese sus datos personales para entrar a Parking JCA</p>
          <button
            className="button"
            onClick={() => setIsSignUp(false)}
            type="button"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
