import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App/App'

import './app/global.css';        // CSS base (colores, tipografías, variables)

// 3 CSS originales, SIN cambiar nada
import './presentation/pages/login/Login.css'
import './presentation/pages/index/Index.css';
import './presentation/pages/start/Start.css';

// reset + variables globales
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

