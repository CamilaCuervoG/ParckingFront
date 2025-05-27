import { Routes, Route, Navigate } from 'react-router-dom';

import Start         from '../../presentation/pages/start/Start';
import Login         from '../../presentation/pages/login/Login';
import Index         from '../../presentation/pages/index/Index';
import Entradas      from '../../presentation/pages/entradas/Entradas';
import Salidas       from '../../presentation/pages/salidas/Salidas';
import Historial     from '../../presentation/pages/historial/Historial';
import Personal      from '../../presentation/pages/personal/Personal';
import Configuracion from '../../presentation/pages/configuración/Configuracion';

import PrivateRoute  from '../../presentation/components/PrivateRoute';
import './App.css';

export default function App() {
  return (
    <Routes>
      {/* públicas */}
      <Route path="/"      element={<Start />} />
      <Route path="/login" element={<Login />} />

      {/* protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/index"        element={<Index />} />
        <Route path="/entradas"     element={<Entradas />} />
        <Route path="/salidas"      element={<Salidas />} />
        <Route path="/historial"    element={<Historial />} />
        <Route path="/personal"     element={<Personal />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}


