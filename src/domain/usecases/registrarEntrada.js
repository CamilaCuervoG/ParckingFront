export function registrarEntrada(placa, tipo, entradas) {
  const placaRegex = /^[A-Za-z]{3}-\d{4}$/;

  if (!placaRegex.test(placa)) {
    return { error: "⚠️ La placa debe seguir el formato: ABC-1234" };
  }

  const nuevaEntrada = {
    placa,
    tipo,
    fecha: new Date().toLocaleString("es-CO"),
  };

  return {
    nuevaLista: [nuevaEntrada, ...entradas],
    mensaje: "✅ Entrada registrada correctamente.",
  };
}
