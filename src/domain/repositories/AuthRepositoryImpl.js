export class AuthRepositoryImpl {
  async login(email, password) {
    // Simulación de autenticación
    if (email === 'usuario@correo.com' && password === '12345') {
      return true;
    }
    return false;
  }

  async register(email, password) {
    // Simulación de registro
    console.log('Usuario registrado:', email);
    return true;
  }
}
