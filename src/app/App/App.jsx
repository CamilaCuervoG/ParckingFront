import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from "../../presentation/context/AuthContext";
import Start from '../../presentation/pages/start/Start';
import Login from '../../presentation/pages/login/Login';
import Index from '../../presentation/pages/index/Index';
import Entradas from '../../presentation/pages/entradas/Entradas';
import Salidas from '../../presentation/pages/salidas/Salidas';
import Historial from '../../presentation/pages/historial/Historial';
import Personal from '../../presentation/pages/personal/Personal';
import Configuracion from '../../presentation/pages/configuración/Configuracion';
import './App.css';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>; // o un spinner

  return user ? children : <Navigate to="/login" replace />;
}


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/entradas"
            element={
              <PrivateRoute>
                <Entradas />
              </PrivateRoute>
            }
          />
          <Route
            path="/salidas"
            element={
              <PrivateRoute>
                <Salidas />
              </PrivateRoute>
            }
          />
          <Route
            path="/historial"
            element={
              <PrivateRoute>
                <Historial />
              </PrivateRoute>
            }
          />
          <Route
            path="/personal"
            element={
              <PrivateRoute>
                <Personal />
              </PrivateRoute>
            }
          />
          <Route
            path="/configuracion"
            element={
              <PrivateRoute>
                <Configuracion />
              </PrivateRoute>
            }
          />

          <Route path="/index" element={
              <PrivateRoute>
                <Index/>
              </PrivateRoute>
            } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

