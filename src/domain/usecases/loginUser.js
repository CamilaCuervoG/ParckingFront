export const loginUser = (authRepository) => async (email, password) => {
  return await authRepository.login(email, password);
};
