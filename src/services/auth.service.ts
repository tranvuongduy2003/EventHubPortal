import { httpRequest } from "@/interceptors";
import { IToken, IUser } from "@/interfaces";
import { IAuthService } from "./contracts";
import { LoginPayload } from "@/types";

class AuthService implements IAuthService {
  login = (data: LoginPayload) => {
    return httpRequest.post<LoginPayload, IToken>("/api/auth/signin", data);
  };
  logout = () => {
    return httpRequest.post<any, any>("/api/auth/signout", {});
  };

  getProfile = () => {
    return httpRequest.get<IUser>("/api/auth/profile");
  };
}

export const authService = new AuthService();
