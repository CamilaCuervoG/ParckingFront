export default class Personal {
  constructor(nombre, cargo, fecha = new Date()) {
    this.nombre = nombre;
    this.cargo = cargo;
    this.fecha = fecha.toLocaleString("es-CO");
  }
}