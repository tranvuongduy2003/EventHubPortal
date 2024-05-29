import { IResponse, IToken, IUser } from "@/interfaces";
import { LoginPayload } from "@/types";

export interface IAuthService {
  login: (data: LoginPayload) => Promise<IResponse<IToken>>;
  logout: () => Promise<IResponse<any>>;
  getProfile: (data: LoginPayload) => Promise<IResponse<IUser>>;
}
