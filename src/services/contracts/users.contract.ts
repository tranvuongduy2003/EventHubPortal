import { IListData } from "./../../interfaces/response.interface";
import { IFilter, IResponse, IUser } from "@/interfaces";

export interface IUsersService {
  // Queries
  getUsers: (params?: IFilter) => Promise<IResponse<IListData<IUser[]>>>;
  getUserById: (id: string) => Promise<IResponse<IUser>>;

  // Commands
  createUser: (data: FormData) => Promise<IResponse<IUser>>;
  updateUser: (id: string, data: FormData) => Promise<IResponse<IUser>>;
  deleteUser: (id: string) => Promise<IResponse<IUser>>;
}
