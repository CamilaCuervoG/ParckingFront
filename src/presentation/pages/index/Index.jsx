import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Header from "../../components/layout/header/Header";
import EntryCard from '../../components/ui/cards/EntryCard/EntryCard';
import ArticleCard from '../../components/ui/cards/ArticleCard/ArticleCard';
import PriceCard from '../../components/ui/cards/PriceCard/PriceCard';
import CalendarWidget from '../../components/ui/widgets/calendarWidget/CalendarWidget';
import IncomeCard from '../../components/ui/cards/IncomeCard/IncomeCard';
import StatsCard from '../../components/ui/cards/StatsCard/StatsCards';
import Banner from '../../components/layout/banner/Banner';
import ParkingSystem from '../../components/ui/cards/ParkingSystem/ParkingSystem';
import GestionarConfiguracion from '../../../domain/usecases/gestionarConfiguración';
import './Index.css';
import ExitCard from '../../components/ui/cards/ExitCard/ExitCard';

function Index() {
  const [parkingConfig, setParkingConfig] = useState({
    totalEspacios: 20,
    umbralAlta: 70,
    filas: 4,
    columnas: 5
  });

  useEffect(() => {
    const config = GestionarConfiguracion.obtenerConfiguracionParking();
    if (config) {
      setParkingConfig(config);
    }
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />

        <div className="content-grid">
          <section className="left-section">
            
            {/* Banner */}
            <Banner message="Estado actual de tu parqueadero"/>   

            {/* ParkingSystem */}
            <div className="parkingCard">
              <ParkingSystem config={parkingConfig} />
            </div>

            {/* Entry/Exit Cards */}
            <div className="entryExit-cards">
              <EntryCard 
                title="Registra Entradas" 
                current={30} 
                total={60} 
                color="deepSkyBlue" 
              />
              <ExitCard 
                title="Registra Salidas" 
                current={10} 
                total={40} 
                color="midnightBlue" 
              />
            </div>

            {/* Income Cards */}
            <div className="datescards-container">
              <IncomeCard 
                className="ingresosDia" 
                title="Ingresos del Día" 
                value="$500.000" 
                footer="Total ingresos del día" 
              />        
              <IncomeCard 
                className="ingresosSemana" 
                title="Ingresos de la Semana" 
                value="$2'000.000" 
                footer="Total ingresos de la semana" 
              />        
              <IncomeCard 
                className="ingresosMensual" 
                title="Ingresos del Mes" 
                value="$9'000.000" 
                footer="Total ingresos del mes" 
              />        
            </div>

            {/* Articles */}
            <div className="articles">
              <ArticleCard
                title="Sede Laureles" 
                image="/assets/sedeLaureles.jpg"
                description="Calle 44 #70-23, Medellín"
                label="Principal"
              />
              <ArticleCard 
                title="Sede San Javier" 
                image="/assets/sedeSanJavier.jpg"
                description="Cerca al metro, salida San Javier"
                label="Sucursal"
              />
              <ArticleCard 
                title="Sede Poblado" 
                image="/assets/sedePoblado.jpg"
                description="Carrera 43A #7-50, El Poblado, Medellín"
                label="Nueva"
              />
            </div>
          </section>

          {/* Right Section */}
          <aside className="right-section">
            {/* Price Cards */}
            <div className="prices">
              <PriceCard 
                title="Precio fracción" 
                autoPrice={3000} 
                motoPrice={2000} 
              />
              <PriceCard 
                title="Precio hora" 
                autoPrice={7000} 
                motoPrice={5000} 
              />           
              <PriceCard 
                title="Precio día" 
                autoPrice={35000} 
                motoPrice={20000} 
              />
              <PriceCard 
                title="Precio mensualidad" 
                autoPrice={140000} 
                motoPrice={100000} 
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Index;