export default class historialRepository {
  getEntradas() {
    return JSON.parse(localStorage.getItem("entradas")) || [];
  }

  getSalidas() {
    return JSON.parse(localStorage.getItem("salidas")) || [];
  }
}