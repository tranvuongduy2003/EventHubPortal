import { httpRequest } from "@/interceptors";
import { LoginPayload, TokenPayload, IUser } from "@/interfaces";
import { IAuthService } from "./contracts";

class AuthService implements IAuthService {
  login = (data: LoginPayload) => {
    return httpRequest.post<LoginPayload, TokenPayload>(
      "/api/auth/signin",
      data
    );
  };

  getProfile = () => {
    return httpRequest.get<IUser>("/api/auth/profile");
  };
}

export const authService = new AuthService();
