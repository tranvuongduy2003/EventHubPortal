import { httpRequest } from "@/interceptors";
import { IFilter, IListData, IUser } from "@/interfaces";
import qs from "qs";
import { IUsersService } from "./contracts";

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
  createUser = (data: FormData) => {
    return httpRequest.post<FormData, IUser>(`/api/users`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  updateUser = (id: string, data: FormData) => {
    return httpRequest.put<FormData, IUser>(`/api/users/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  deleteUser = (id: string) => {
    return httpRequest.delete<IUser>(`/api/users/${id}`);
  };
}

export const usersService = new UsersService();
