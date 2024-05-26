import { useAppStore, useAuthStore } from "@/stores";

class AuthExtensions {
  logOut = () => {
    const setIsLoading = useAppStore.getState().setIsLoading;
    const reset = useAuthStore.getState().reset;

    setIsLoading(true);
    reset();

    setIsLoading(false);
  };

  getAccessToken = () => {
    const token = useAuthStore.getState().token;
    return token;
  };
}

export const authExtensions = new AuthExtensions();
