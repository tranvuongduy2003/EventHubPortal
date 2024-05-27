import { IListData } from "./../../interfaces/response.interface";
import { IFilter, IResponse, IUser } from "@/interfaces";

export interface IUsersService {
  // Queries
  getUsers: (params?: IFilter) => Promise<IResponse<IListData<IUser[]>>>;

  // Commands
  deleteUser: (id: string) => Promise<IResponse<IUser>>;
}
