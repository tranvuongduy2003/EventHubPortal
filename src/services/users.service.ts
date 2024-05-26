import { IUser } from "@/interfaces";
import { httpRequest } from "@/interceptors";
import { IUsersService } from "./contracts";

class UsersService implements IUsersService {
  getUsers = (search?: string) => {
    return httpRequest.get<IUser[]>("/api/users", {
      params: { search },
    });
  };
}

export const usersService = new UsersService();
