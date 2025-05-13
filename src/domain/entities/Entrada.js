export default class Entrada {
  constructor(placa, tipo, fecha = new Date()) {
    this.placa = placa;
    this.tipo = tipo;
    this.fecha = fecha.toLocaleString("es-CO");
  }
}

