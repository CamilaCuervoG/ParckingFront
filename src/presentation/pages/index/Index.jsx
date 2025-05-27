import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Header from "../../components/layout/header/Header";
import EntryCard from '../../components/ui/cards/EntryCard/EntryCard';
import ExitCard from '../../components/ui/cards/ExitCard/ExitCard';
import PriceCard from '../../components/ui/cards/PriceCard/PriceCard';
import IncomeCard from '../../components/ui/cards/IncomeCard/IncomeCard';
import Banner from '../../components/layout/banner/Banner';
import ParkingSystem from '../../components/ui/cards/ParkingSystem/ParkingSystem';
import GestionarConfiguracion from '../../../domain/usecases/gestionarConfiguración';
import { listEntries } from '../../../services/parkingService';
import './Index.css';

function Index() {
  const [parkingConfig, setParkingConfig] = useState({
    totalEspacios: 20,
    umbralAlta: 70,
    filas: 4,
    columnas: 5
  });

  const [precios, setPrecios] = useState({
    fraccion: { auto: 0, moto: 0 },
    hora: { auto: 0, moto: 0 },
    dia: { auto: 0, moto: 0 },
    mensualidad: { auto: 0, moto: 0 }
  });

  const [ocupadas, setOcupadas] = useState(0);
  const [disponibles, setDisponibles] = useState(0);

  // Actualiza contadores consultando la base de datos
  const refreshCounters = async () => {
    try {
      const { data } = await listEntries(); // GET /parkings/entries
      const usadas = data.length;
      const libres = Math.max(parkingConfig.totalEspacios - usadas, 0);

      setOcupadas(usadas);
      setDisponibles(libres);
    } catch (err) {
      console.error('No se pudo actualizar contadores', err);
    }
  };

  useEffect(() => {
    if (!parkingConfig.totalEspacios) return;

    refreshCounters();
    const id = setInterval(refreshCounters, 10000);
    return () => clearInterval(id);
  }, [parkingConfig]);

  useEffect(() => {
    const config = GestionarConfiguracion.obtenerConfiguracionParking();
    if (config) setParkingConfig(config);

    const preciosGuardados = GestionarConfiguracion.obtenerPrecios();
    setPrecios(preciosGuardados);
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className='header'>
          <Header />
        </div>

        <div className="content-grid">
          <section className="left-section">
            <Banner message="Estado actual de tu parqueadero" />

            <div className="parkingCard">
              <ParkingSystem config={parkingConfig} />
            </div>

            <div className="entryExit-cards">
              <EntryCard
                title="Registra Entradas"
                current={disponibles}
                totalSlots={parkingConfig.totalEspacios}
                color="deepSkyBlue"
                onSuccess={refreshCounters}
              />
              <ExitCard
                title="Registra Salidas"
                current={ocupadas}
                total={parkingConfig.totalEspacios}
                color="midnightBlue"
                onSuccess={refreshCounters}
              />
            </div>

            <div className="datescards-container">
              <IncomeCard className="ingresosDia" title="Ingresos del Día" value="$500.000" footer="Total ingresos del día" />
              <IncomeCard className="ingresosSemana" title="Ingresos de la Semana" value="$2'000.000" footer="Total ingresos de la semana" />
              <IncomeCard className="ingresosMensual" title="Ingresos del Mes" value="$9'000.000" footer="Total ingresos del mes" />
            </div>
          </section>

          <aside className="right-section">
            <div className="prices">
              <PriceCard title="Precio fracción" autoPrice={precios.fraccion.auto} motoPrice={precios.fraccion.moto} />
              <PriceCard title="Precio hora" autoPrice={precios.hora.auto} motoPrice={precios.hora.moto} />
              <PriceCard title="Precio día" autoPrice={precios.dia.auto} motoPrice={precios.dia.moto} />
              <PriceCard title="Precio mensualidad" autoPrice={precios.mensualidad.auto} motoPrice={precios.mensualidad.moto} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Index;
