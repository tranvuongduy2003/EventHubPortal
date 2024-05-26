import { httpRequest } from "@/interceptors";
import { ICategory, IFilter } from "@/interfaces";
import { IListData } from "./../interfaces/response.interface";
import { ICategoriesService } from "./contracts";
import qs from "qs";

class CategoriesService implements ICategoriesService {
  getCategories = (params?: IFilter) => {
    return httpRequest.get<IListData<ICategory[]>>("/api/categories", {
      params,
      paramsSerializer: (params) => qs.stringify(params),
    });
  };
}

export const categoriesService = new CategoriesService();
