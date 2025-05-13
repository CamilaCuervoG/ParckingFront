import historialRepository from "../repositories/historialRepository";

export default class GetHistorial {
  constructor() {
    this.historialRepository = new historialRepository();
  }

  execute() {
    const entradas = this.historialRepository.getEntradas();
    const salidas = this.historialRepository.getSalidas();
    return { entradas, salidas };
  }
}