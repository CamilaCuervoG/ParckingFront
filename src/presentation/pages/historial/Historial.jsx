import { useEffect, useState } from 'react';

import Sidebar       from '../../components/layout/sidebar/Sidebar';
import Header        from '../../components/layout/header/Header';
import TablaEntradas from '../../components/ui/widgets/tablaEntradas/TablaEntradas';
import TablaSalidas  from '../../components/ui/widgets/tablaSalidas/TablaSalidas';

import { listEntries, listExits } from '../../../services/parkingService';
import './Historial.css';

export default function Historial() {
  const [entradas, setEntradas] = useState([]);
  const [salidas,  setSalidas]  = useState([]);

  /* ───────── cargar datos reales ───────── */
  useEffect(() => {
    (async () => {
      try {
        const [{ data: inData }, { data: outData }] = await Promise.all([
          listEntries(),  // sin exitTime
          listExits()     // con exitTime, duración y valor
        ]);
        setEntradas(inData);
        setSalidas(outData);
      } catch (err) {
        console.error('Error al cargar historial:', err);
      }
    })();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Header />

        {/* -------- TABLA ENTRADAS -------- */}
        <div className="tabla-scroll-history">
          <TablaEntradas entradas={[...entradas].reverse()} />
        </div>

        {/* -------- TABLA SALIDAS --------  
            (Trae su propio div .tabla-scroll desde el componente)   */}
        <div className="tabla-scroll-history">
          <TablaSalidas salidas={[...salidas].reverse()} />
        </div>
      </div>
    </div>
  );
}
