// src/domain/repositories/salidaRepository.js
import { Salida } from "../entities/salida";

export class SalidaRepository {
  static obtenerSalidas() {
    const salidasGuardadas = JSON.parse(localStorage.getItem("salidas")) || [];
    return salidasGuardadas.map((salidaData) => new Salida(salidaData.placa, salidaData.tipo, salidaData.fecha));
  }

  static agregarSalida(salida) {
    const salidasGuardadas = JSON.parse(localStorage.getItem("salidas")) || [];
    salidasGuardadas.push(salida);
    localStorage.setItem("salidas", JSON.stringify(salidasGuardadas));
  }
}