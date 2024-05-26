import { IResponse, LoginPayload, TokenPayload, IUser } from "@/interfaces";

export interface IAuthService {
  login: (data: LoginPayload) => Promise<IResponse<TokenPayload>>;
  getProfile: (data: LoginPayload) => Promise<IResponse<IUser>>;
}
