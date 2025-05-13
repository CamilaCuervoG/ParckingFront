import Personal from "../entities/personal";

export default class GestionarPersonal {
  static obtenerPersonal() {
    return JSON.parse(localStorage.getItem("personal")) || [];
  }

  static agregarPersonal(nombre, cargo) {
    if (!nombre.trim() || !cargo.trim()) {
      throw new Error("⚠️ Todos los campos son obligatorios");
    }

    const nuevoPersonal = new Personal(nombre, cargo);
    const actual = [nuevoPersonal, ...GestionarPersonal.obtenerPersonal()];

    localStorage.setItem("personal", JSON.stringify(actual));
    return actual;
  }
}