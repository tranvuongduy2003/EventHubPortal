import { IResponse, LoginPayload, IToken, IUser } from "@/interfaces";

export interface IAuthService {
  login: (data: LoginPayload) => Promise<IResponse<IToken>>;
  logout: () => Promise<IResponse<any>>;
  getProfile: (data: LoginPayload) => Promise<IResponse<IUser>>;
}
