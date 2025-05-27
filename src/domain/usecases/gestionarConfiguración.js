class gestionarConfiguracion {
  // Guardar usuario
  static guardarUsuario(usuario) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }

  // Obtener usuario
  static obtenerUsuario() {
    const data = localStorage.getItem("usuario");
    return data ? JSON.parse(data) : null;
  }

  // Métodos para configuración del parking
  static obtenerConfiguracionParking() {
    try {
      const config = JSON.parse(localStorage.getItem('parkingConfig'));
      return config || {
        totalEspacios: 20,
        umbralAlta: 70,
        filas: 4,
        columnas: 5
      };
    } catch (error) {
      console.error('Error al obtener configuración del parking:', error);
      return {
        totalEspacios: 20,
        umbralAlta: 70,
        filas: 4,
        columnas: 5
      };
    }
  }

  static guardarConfiguracionParking(config) {
    try {
      localStorage.setItem('parkingConfig', JSON.stringify(config));
      this.generarDatosParking(config); // Regenerar el parking
      return true;
    } catch (error) {
      console.error('Error al guardar configuración del parking:', error);
      return false;
    }
  }

  static generarDatosParking(config = null) {
    if (!config) {
      config = this.obtenerConfiguracionParking();
    }

    const cells = Array.from({ length: config.totalEspacios }, (_, i) => {
      const fila = Math.floor(i / config.columnas);
      const columna = i % config.columnas;

      return {
        id: `${String.fromCharCode(65 + fila)}${columna + 1}`,
        occupied: Math.random() > 0.4,
      };
    });

    const parkingData = { cells, config };

    try {
      localStorage.setItem('parkingData', JSON.stringify(parkingData));
      return parkingData;
    } catch (error) {
      console.error('Error al generar datos del parking:', error);
      return { cells: [], config };
    }
  }

  static obtenerDatosParking() {
    try {
      const data = JSON.parse(localStorage.getItem('parkingData'));
      return data || this.generarDatosParking();
    } catch (error) {
      console.error('Error al obtener datos del parking:', error);
      return this.generarDatosParking();
    }
  }

  static actualizarEspacioParking(espacioId, ocupado) {
    try {
      const data = this.obtenerDatosParking();
      const espacio = data.cells.find(cell => cell.id === espacioId);

      if (espacio) {
        espacio.occupied = ocupado;
        localStorage.setItem('parkingData', JSON.stringify(data));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error al actualizar espacio del parking:', error);
      return false;
    }
  }

  static resetearParking() {
    try {
      localStorage.removeItem('parkingData');
      localStorage.removeItem('parkingConfig');
      this.generarDatosParking();
      return true;
    } catch (error) {
      console.error('Error al resetear parking:', error);
      return false;
    }
  }

  static obtenerEstadisticasParking() {
    const data = this.obtenerDatosParking();
    const config = this.obtenerConfiguracionParking();

    const total = data.cells.length;
    const ocupados = data.cells.filter(cell => cell.occupied).length;
    const disponibles = total - ocupados;
    const porcentaje = Math.round((ocupados / total) * 100);
    const altaOcupacion = porcentaje > config.umbralAlta;

    return {
      total,
      ocupados,
      disponibles,
      porcentaje,
      altaOcupacion,
      config
    };
  }

  static obtenerEstadisticasDesdeData(data) {
    const total = data.cells.length;
    const ocupados = data.cells.filter(cell => cell.occupied).length;
    const disponibles = total - ocupados;
    const porcentaje = total > 0 ? Math.round((ocupados / total) * 100) : 0;
    const umbral = data.config?.umbralAlta || 70;
    const altaOcupacion = porcentaje >= umbral;

    return {
      total,
      ocupados,
      disponibles,
      porcentaje,
      altaOcupacion
    };
  }

  // Precios predeterminados
static obtenerPrecios() {
  try {
    const precios = JSON.parse(localStorage.getItem("preciosParqueadero"));
    return precios || {
      fraccion: { auto: 3000, moto: 2000 },
      hora: { auto: 7000, moto: 5000 },
      dia: { auto: 35000, moto: 20000 },
      mensualidad: { auto: 140000, moto: 100000 }
    };
  } catch (error) {
    console.error("Error al obtener precios:", error);
    return {
      fraccion: { auto: 3000, moto: 2000 },
      hora: { auto: 7000, moto: 5000 },
      dia: { auto: 35000, moto: 20000 },
      mensualidad: { auto: 140000, moto: 100000 }
    };
  }
}

static guardarPrecios(nuevosPrecios) {
  try {
    localStorage.setItem("preciosParqueadero", JSON.stringify(nuevosPrecios));
    return true;
  } catch (error) {
    console.error("Error al guardar precios:", error);
    return false;
  }
}

  
}

export default gestionarConfiguracion;
