import api from './api';

/* 1. Registrar personal */
export const createEntry = ({name, position, dateRegister}) => api.post('/registerpersonal', { name, position,dateRegister });

/* 2. Lista empleados */
export const list = () => api.get('registerpersonal/list');