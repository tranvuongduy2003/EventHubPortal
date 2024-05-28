import { IListData } from "./../../interfaces/response.interface";
import { IFilter, IResponse, IUser } from "@/interfaces";

export interface IUsersService {
  // Queries
  getUsers: (params?: IFilter) => Promise<IResponse<IListData<IUser[]>>>;
  getUserById: (id: string) => Promise<IResponse<IUser>>;

  // Commands
  deleteUser: (id: string) => Promise<IResponse<IUser>>;
}
