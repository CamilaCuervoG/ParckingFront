import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App/App';          // tu componente de rutas

/* 3 CSS originales */
import './presentation/pages/login/Login.css';
import './presentation/pages/index/Index.css';
import './presentation/pages/start/Start.css';

/* reset + variables globales */
import './app/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
