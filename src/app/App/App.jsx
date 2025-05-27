import { Routes, Route, Navigate } from 'react-router-dom';

import Start         from '../../presentation/pages/start/Start';
import Login         from '../../presentation/pages/login/Login';
import Index         from '../../presentation/pages/index/Index';
import Entradas      from '../../presentation/pages/entradas/Entradas';
import Salidas       from '../../presentation/pages/salidas/Salidas';
import Historial     from '../../presentation/pages/historial/Historial';
import Personal      from '../../presentation/pages/personal/Personal';
import Configuracion from '../../presentation/pages/configuración/Configuracion';
import About         from '../../presentation/pages/about/About';
import Contact       from '../../presentation/pages/contact/Contact';
import Register      from '../../presentation/pages/register/Register'

import PrivateRoute  from '../../presentation/components/PrivateRoute';
import './App.css';

export default function App() {
  return (
    <Routes>
      {/* públicas */}
      <Route path="/"      element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />

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


