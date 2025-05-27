import api from './api';

/* 1. Registrar entrada */
export const createEntry = (plate, vehicleType) => api.post('/parkings', { plate, vehicleType });

/* 2. Entradas activas */
export const listEntries = () => api.get('/parkings/entries');

/* 3. Cerrar entrada → registrar salida */
export const closeEntry = (id) => api.put(`/parkings/${id}/exit`);

/* 4. Salidas registradas (⇦ faltaba) */
export const listExits = () => api.get('/parkings/exits');

