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

  useEffect(() => {
    (async () => {
      try {
        const [{ data: inData }, { data: outData }] = await Promise.all([
          listEntries(),
          listExits()
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

      <div className="main-content historial-content">
        <div className="header historial-header">
        <Header titulo="Historial Entradas y Salidas"/>
        </div>

        <div className="historial-tablas">
          <TablaEntradas entradas={[...entradas].reverse()} />
          <TablaSalidas salidas={[...salidas].reverse()} />
        </div>
      </div>
    </div>
  );
}

