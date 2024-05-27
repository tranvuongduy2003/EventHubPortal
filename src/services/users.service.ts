import { IFilter, IListData, IUser } from "@/interfaces";
import { httpRequest } from "@/interceptors";
import { IUsersService } from "./contracts";
import qs from "qs";

class UsersService implements IUsersService {
  getUsers = (params?: IFilter) => {
    return httpRequest.get<IListData<IUser[]>>("/api/users", {
      params: params,
      paramsSerializer: (params) => qs.stringify(params),
    });
  };
}

export const usersService = new UsersService();
