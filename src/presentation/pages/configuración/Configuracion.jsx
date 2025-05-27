import React, { useState, useEffect } from "react";
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Header from '../../components/layout/header/Header';
import GestionarConfiguracion from '../../../domain/usecases/gestionarConfiguración';
import '../../pages/index/Index.css';
import './Configuracion.css';
import Banner from "../../components/layout/banner/Banner";
import ParkingSystem from "../../components/ui/cards/ParkingSystem/ParkingSystem";

function Configuracion() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [totalEspacios, setTotalEspacios] = useState(20);
  const [umbralAlta, setUmbralAlta] = useState(70);
  const [filas, setFilas] = useState(4);
  const [columnas, setColumnas] = useState(5);

  // ✅ Estado exclusivo para reflejar los datos actuales en la vista previa
  const [parkingConfig, setParkingConfig] = useState({
    totalEspacios: 0,
    umbralAlta: 0,
    filas: 0,
    columnas: 0
  });

  const obtenerDatosUsuario = () => {
    const usuario = GestionarConfiguracion.obtenerUsuario();

    if (usuario) {
      setNombre(usuario.nombre ?? "");
      setEmail(usuario.email ?? "");
      setTelefono(usuario.telefono ?? "");
    } else {
      console.warn("⚠️ No se encontró un usuario válido en el almacenamiento.");
    }

    const configParking = GestionarConfiguracion.obtenerConfiguracionParking();
    if (configParking) {
      setTotalEspacios(configParking.totalEspacios);
      setUmbralAlta(configParking.umbralAlta);
      setFilas(configParking.filas);
      setColumnas(configParking.columnas);

      // ✅ También reflejamos la configuración inicial en la vista previa
      setParkingConfig(configParking);
    }
  };

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

  // ✅ Actualiza la vista previa cuando cambian los valores de la configuración
  useEffect(() => {
    setParkingConfig({
      totalEspacios,
      umbralAlta,
      filas,
      columnas
    });
  }, [totalEspacios, umbralAlta, filas, columnas]);

  useEffect(() => {
    if (totalEspacios > 0) {
      const { filas: nuevasFilas, columnas: nuevasColumnas } = calcularDistribucionCompacta(totalEspacios);
      setFilas(nuevasFilas);
      setColumnas(nuevasColumnas);
    }
  }, [totalEspacios]);

  const guardarCambios = (e) => {
    e.preventDefault();
    const usuario = GestionarConfiguracion.obtenerUsuario();
    if (!usuario) {
      setMensaje("⚠️ No se puede guardar porque no hay usuario cargado.");
      return;
    }

    usuario.nombre = nombre;
    usuario.email = email;
    usuario.telefono = telefono;

    GestionarConfiguracion.guardarUsuario(usuario);
    setMensaje("✅ Cambios guardados exitosamente");
  };

  const cambiarContrasena = (e) => {
    e.preventDefault();
    const usuario = GestionarConfiguracion.obtenerUsuario();

    if (!usuario) {
      setMensaje("⚠️ No se puede cambiar la contraseña porque no hay usuario cargado.");
      return;
    }

    if (GestionarConfiguracion.cambiarContrasena(usuario, contrasenaActual, nuevaContrasena)) {
      setMensaje("✅ Contraseña cambiada exitosamente");
      setContrasenaActual("");
      setNuevaContrasena("");
    } else {
      setMensaje("⚠️ La contraseña actual es incorrecta");
    }
  };

  const guardarConfiguracionParking = (e) => {
    e.preventDefault();

    if (totalEspacios < 1 || totalEspacios > 100) {
      setMensaje("⚠️ El total de espacios debe estar entre 1 y 100");
      return;
    }

    if (umbralAlta < 1 || umbralAlta > 100) {
      setMensaje("⚠️ El umbral debe estar entre 1 y 100%");
      return;
    }

    if (filas * columnas !== totalEspacios) {
      setMensaje("⚠️ El producto de filas × columnas debe igual al total de espacios");
      return;
    }

    const nuevaConfig = {
      totalEspacios,
      umbralAlta,
      filas,
      columnas
    };

    GestionarConfiguracion.guardarConfiguracionParking(nuevaConfig);
    setMensaje("✅ Configuración del parking actualizada exitosamente");
  };

  const resetearParking = () => {
    if (window.confirm("¿Está seguro de resetear toda la configuración del parking?")) {
      GestionarConfiguracion.resetearParking();
      setMensaje("✅ Configuración del parking reseteada");
    }
  };

  function calcularDistribucionCompacta(totalEspacios) {
    let mejorArea = Infinity;
    let mejorFilas = 1;
    let mejorColumnas = totalEspacios;

    for (let filas = 1; filas <= totalEspacios; filas++) {
      const columnas = Math.ceil(totalEspacios / filas);
      const area = filas * columnas;

      if (area < mejorArea || (area === mejorArea && Math.abs(filas - columnas) < Math.abs(mejorFilas - mejorColumnas))) {
        mejorArea = area;
        mejorFilas = filas;
        mejorColumnas = columnas;
      }

      if (columnas < filas) break;
    }

    return { filas: mejorFilas, columnas: mejorColumnas };
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
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

            {/* Configuración del Parking */}
            <div className="settings-section">
              <h3>Configuración del Sistema de Parqueadero</h3>
              <form onSubmit={guardarConfiguracionParking}>
                <div className="input-row">
                  <label>Total de espacios de parqueadero</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="100"
                    value={totalEspacios} 
                    onChange={(e) => setTotalEspacios(parseInt(e.target.value) || 0)} 
                    placeholder="20" 
                  />
                </div>
                <div className="input-row">
                  <label>Umbral de alta ocupación (%)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="100"
                    value={umbralAlta} 
                    onChange={(e) => setUmbralAlta(parseInt(e.target.value) || 0)} 
                    placeholder="70" 
                  />
                  <small style={{color: '#666', fontSize: '12px'}}>
                    Cuando el {umbralAlta}% esté ocupado se mostrará alerta roja
                  </small>
                </div>
                <div className="input-row">
                  <label>Número de filas</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10"
                    value={filas} 
                    onChange={(e) => setFilas(parseInt(e.target.value) || 0)} 
                    placeholder="4" 
                  />
                </div>
                <div className="input-row">
                  <label>Número de columnas</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10"
                    value={columnas} 
                    onChange={(e) => setColumnas(parseInt(e.target.value) || 0)} 
                    placeholder="5" 
                  />
                </div>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                  <button type="submit">Guardar configuración</button>
                  <button 
                    type="button" 
                    onClick={resetearParking}
                    style={{backgroundColor: '#dc3545', color: 'white'}}
                  >
                    Resetear parking
                  </button>
                </div>
              </form>

              {/* Vista previa del parking */}
              <div style={{marginTop: '20px'}}>
                <h4>Vista previa del sistema:</h4>
                <ParkingSystem config={parkingConfig} />
              </div>
            </div>

          </div>

          {/* Mensaje de resultado */}
          {mensaje && (
            <p style={{ 
              color: mensaje.includes("exitosamente") || mensaje.includes("✅") ? "green" : "red",
              padding: '10px',
              backgroundColor: mensaje.includes("exitosamente") || mensaje.includes("✅") ? '#d4edda' : '#f8d7da',
              border: `1px solid ${mensaje.includes("exitosamente") || mensaje.includes("✅") ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '4px',
              marginTop: '15px'
            }}>
              {mensaje}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Configuracion;
