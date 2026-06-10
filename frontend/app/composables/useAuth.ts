import { authService } from "../services/auth.service";
export const useAuth = () => {
  const register = async () => {
    const response = await authService.register();
    return response;
  };

  return {
    register,
  };
};
