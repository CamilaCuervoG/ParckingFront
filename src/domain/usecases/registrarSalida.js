// src/domain/usecases/registrarSalida.js
import { SalidaRepository } from "../repositories/salidaRepository";
import { Salida } from "../entities/salida";

export class RegistrarSalida {
  static ejecutar(placa, tipo) {
    if (!placa) {
      throw new Error("La placa es obligatoria");
    }

    const salida = new Salida(placa, tipo, new Date().toLocaleString("es-CO"));
    SalidaRepository.agregarSalida(salida);
  }
}