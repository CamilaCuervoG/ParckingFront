import Sidebar from '../../components/layout/sidebar/Sidebar';
import Header from "../../components/layout/header/Header";
import ProgressCard from '../../components/ui/cards/ProgressCard/ProgressCard';
import ArticleCard from '../../components/ui/cards/ArticleCard/ArticleCard';
import PriceCard from '../../components/ui/cards/PriceCard/PriceCard';
import CalendarWidget from '../../components/ui/widgets/calendarWidget/CalendarWidget';
import IncomeCard from '../../components/ui/cards/IncomeCard/IncomeCard';
import StatsCard from '../../components/ui/cards/StatsCard/StatsCards';
import Banner from '../../components/layout/banner/Banner';
import './Index.css';

function Index() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />

        <div className="content-grid">
          <section className="left-section">
            
            {/* banner */}
            <Banner message="Estado actual de tu parqueadero"/>              

            {/* Progress */}
            <div className="progress-cards">
              <ProgressCard title="Celdas disponibles automoviles" current={30} total={60} color="deepSkyBlue" />
              <ProgressCard title="Celdas disponibles motocicletas" current={10} total={40} color="midnightBlue" />
            </div>

            <div className="datescards-container">

            {/* Estadísticas de Entradas y Salidas */}
              <StatsCard className="entradaSalida"
                title="Estadísticas de Entradas y Salidas" 
                entries={200} 
                exits={100} 
                footer="Datos del día de hoy"
              />
              {/* Dinero diario */}
              <IncomeCard className="ingresosDia" title="Ingresos del Día" value="$500.000" footer="Total ingresos del día" />        
              
              {/* Dinero mensual */}
              <IncomeCard className="ingresosMensual" title="Ingresos mensual" value="$9'000.000" footer="Total ingresos del mes" />        
            </div>

               {/* Articles */}
            <div className="articles">
              <ArticleCard
                title="Sede Laureles" 
                image="/assets/sedeLaureles.jpg" // Ruta desde la carpeta public
                 description="Calle 44 #70-23, Medellín"
                 label="Principal"
              />
              <ArticleCard 
                title="Sede San Javier" 
                image="/assets/sedeSanJavier.jpg" // Ruta desde la carpeta public
                description="Cerca al metro, salida San Javier"
                label="Sucursal"
              />
              <ArticleCard 
                title="Sede Poblado" 
                image="/assets/sedePoblado.jpg" // Ruta desde la carpeta public
                description="Carrera 43A #7-50, El Poblado, Medellín"
                label="Nueva"
              />
            </div>
          </section>

          {/* Calendario */}
          <aside className="right-section">
            <CalendarWidget />

            {/* PriceCard (Automóviles y Motocicletas) */}
            <div className="prices">
              <PriceCard title="Precio fracción" autoPrice={3000} motoPrice={2000} />
              <PriceCard title="Precio hora" autoPrice={7000} motoPrice={5000} />           
              <PriceCard title="Precio día" autoPrice={35000} motoPrice={20000} />
              <PriceCard title="Precio mensualidad" autoPrice={140000} motoPrice={100000} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Index;