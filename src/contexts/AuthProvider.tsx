import { authService } from "@/services";
import { IResponse, LoginPayload } from "@/interfaces";
import { useAppStore, useAuthStore } from "@/stores";
import { notification } from "antd";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContextProps {
  logIn: (payload: LoginPayload) => Promise<void>;
  logOut: () => void;
}

export const AuthContext = React.createContext<Partial<AuthContextProps>>({});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const { setIsLoading } = useAppStore((state) => state);
  const { setToken, setLoggedIn, setProfile } = useAuthStore((state) => state);

  const logIn = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      // LOGIN THEN GET AND SET TOKENS
      const { data } = await authService.login(payload);

      // SAVE USER SESSION
      setToken(data.accessToken);
      setLoggedIn(true);

      const { data: profileData } = await authService.getProfile();
      setProfile(profileData);

      // NAVIGATE TO HOME PAGE
      setIsLoading(false);
      notification.success({
        message: "Login successfully!",
        duration: 0.25,
        onClose: () => navigate("/"),
      });
    } catch (error: unknown) {
      setIsLoading(false);
      console.log("🚀 ~ logIn ~ error:", error);
      notification.error({
        message: (error as IResponse<unknown>).message,
      });
    }
  };

  const logOut = () => {
    setToken("");
    setProfile(null);
    setLoggedIn(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
