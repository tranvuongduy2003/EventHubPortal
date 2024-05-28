import { IFilter, IListData, IUser } from "@/interfaces";
import { httpRequest } from "@/interceptors";
import { IUsersService } from "./contracts";
import qs from "qs";

class UsersService implements IUsersService {
  // Queries
  getUsers = (params?: IFilter) => {
    return httpRequest.get<IListData<IUser[]>>("/api/users", {
      params: params,
      paramsSerializer: (params) => qs.stringify(params),
    });
  };
  getUserById = (id: string) => {
    return httpRequest.get<IUser>(`/api/users/${id}`);
  };

  // Commands
  deleteUser = (id: string) => {
    return httpRequest.delete<IUser>(`/api/users/${id}`);
  };
}

export const usersService = new UsersService();
