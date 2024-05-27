import { IListData } from "./../../interfaces/response.interface";
import { IFilter, IResponse, IUser } from "@/interfaces";

export interface IUsersService {
  getUsers: (params?: IFilter) => Promise<IResponse<IListData<IUser[]>>>;
}
