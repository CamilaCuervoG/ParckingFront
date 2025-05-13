// src/domain/usecase/logoutUser.js

export const logoutUser = async () => {
  try {
    // Elimina cualquier dato de sesión que pueda estar almacenado
    localStorage.removeItem('userToken');  // O cualquier otro valor de token que estés utilizando

    // Si usas algún servicio de autenticación, aquí también puedes hacer la llamada para invalidar la sesión en el servidor
    // Ejemplo: await authService.logout();
    
    // Otros pasos que puedas necesitar para cerrar la sesión

  } catch (error) {
    console.error("Error al cerrar sesión: ", error);
    throw error;
  }
};
