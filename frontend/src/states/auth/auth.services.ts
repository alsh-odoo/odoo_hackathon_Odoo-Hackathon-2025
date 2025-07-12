import API from "@/config/api/api";
import usePostData from "@/hooks/usePostData";
import { useAuthStore, User } from "@/stores/authStore";

export const useUserLogin = (onSuccess) => {
  const { login } = useAuthStore();
  return usePostData({
    url: API.auth.login,
    mutationOptions: {
      onSuccess: (data) => {
        login(data as User);
        onSuccess(data);
      },
    },
  });
};
export const useUserRegister = (onSuccess) => {
  return usePostData({
    url: API.auth.register,
    mutationOptions: {
      onSuccess: () => {
        onSuccess();
      },
    },
  });
};
