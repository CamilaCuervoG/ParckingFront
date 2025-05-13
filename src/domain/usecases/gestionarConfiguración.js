import Usuario from "../entities/usuario";

export default class GestionarConfiguracion {
  static obtenerUsuario() {
    return JSON.parse(localStorage.getItem("usuario")) || new Usuario("Usuario Ejemplo", "usuario@correo.com", "1234567890", "");
  }

  static guardarUsuario(usuario) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }

  static cambiarContrasena(usuario, contrasenaActual, nuevaContrasena) {
    if (usuario.contrasena === contrasenaActual) {
      usuario.contrasena = nuevaContrasena;
      GestionarConfiguracion.guardarUsuario(usuario);
      return true;
    }
    return false;
  }
}