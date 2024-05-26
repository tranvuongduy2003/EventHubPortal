import { IResponse, IUser } from "@/interfaces";

export interface IUsersService {
  getUsers: (search?: string) => Promise<IResponse<IUser[]>>;
}
