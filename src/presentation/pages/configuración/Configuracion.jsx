import React, { useState, useEffect } from "react";
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Header from '../../components/layout/header/Header';
import GestionarConfiguracion from '../../../domain/usecases/gestionarConfiguración';
import '../../pages/index/Index.css';
import './Configuracion.css';
import Banner from "../../components/layout/banner/Banner";

function Configuracion() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const obtenerDatosUsuario = () => {
    const usuario = GestionarConfiguracion.obtenerUsuario();
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setTelefono(usuario.telefono);
  };

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

  const guardarCambios = (e) => {
    e.preventDefault();
    const usuario = new GestionarConfiguracion.obtenerUsuario();
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.telefono = telefono;

    GestionarConfiguracion.guardarUsuario(usuario);
    setMensaje("✅ Cambios guardados exitosamente");
  };

  const cambiarContrasena = (e) => {
    e.preventDefault();
    const usuario = GestionarConfiguracion.obtenerUsuario();

    if (GestionarConfiguracion.cambiarContrasena(usuario, contrasenaActual, nuevaContrasena)) {
      setMensaje("✅ Contraseña cambiada exitosamente");
      setContrasenaActual("");
      setNuevaContrasena("");
    } else {
      setMensaje("⚠️ La contraseña actual es incorrecta");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        {/* Banner */}
        <Banner message="Configuración de la Cuenta" />

        <div className="ajustes">

          <div className="settings-container">
            {/* Información personal */}
            <div className="settings-section">
              <h3>Información personal</h3>
              <form onSubmit={guardarCambios}>
                <div className="input-row">
                  <label>Nombre completo</label>
                  <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    placeholder="Usuario Ejemplo" 
                  />
                </div>
                <div className="input-row">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="usuario@correo.com" 
                  />
                </div>
                <div className="input-row">
                  <label>Teléfono</label>
                  <input 
                    type="text" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                    placeholder="1234567890" 
                  />
                </div>
                <button type="submit">Guardar cambios</button>
              </form>
            </div>

            {/* Seguridad */}
            <div className="settings-section">
              <h3>Seguridad</h3>
              <form onSubmit={cambiarContrasena}>
                <div className="input-row">
                  <label>Contraseña actual</label>
                  <input 
                    type="password" 
                    value={contrasenaActual} 
                    onChange={(e) => setContrasenaActual(e.target.value)} 
                  />
                </div>
                <div className="input-row">
                  <label>Nueva contraseña</label>
                  <input 
                    type="password" 
                    value={nuevaContrasena} 
                    onChange={(e) => setNuevaContrasena(e.target.value)} 
                  />
                </div>
                <button type="submit">Cambiar contraseña</button>
              </form>
            </div>
          </div>

          {/* Mensaje de resultado */}
          {mensaje && <p style={{ color: mensaje.includes("correctamente") ? "green" : "red" }}>{mensaje}</p>}
        </div>
      </div>
    </div>
  );
}

export default Configuracion;
