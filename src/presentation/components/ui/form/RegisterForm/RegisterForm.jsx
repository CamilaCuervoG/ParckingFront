import React, { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import RegisterModal from "../../modal/RegisterModal/RegisterModal";
import "./RegisterForm.css"; // Importa CSS del login

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const formRef = useRef(null);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalVisible(true);
    if (formRef.current) formRef.current.reset();
  };

  const closeModal = () => setModalVisible(false);

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1>Crear cuenta</h1>
          <p>Regístrate para comenzar</p>

          <form ref={formRef} onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre completo</label>
            <input id="name" type="text" placeholder="Tu nombre" required />

            <label htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" placeholder="Tu correo" required />

            <label htmlFor="password">Contraseña</label>
            <div className="password-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Crea una contraseña"
                required
              />
              <span onClick={togglePassword} className="eye-icon">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button type="submit">Registrar</button>
          </form>

          <div className="login-links">
            <span>¿Ya tienes cuenta? </span>
            <Link to="/login">Iniciar sesión</Link>
          </div>
        </div>
      </div>

      {modalVisible && (
        <RegisterModal
          message="¡Registro exitoso!"
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default RegisterForm;
