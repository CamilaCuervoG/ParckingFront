export const registerUser = (authRepository) => async (email, password) => {
  return await authRepository.register(email, password);
};
