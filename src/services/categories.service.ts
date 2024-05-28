import { httpRequest } from "@/interceptors";
import { ICategory, IFilter, IListData } from "@/interfaces";
import { ICategoriesService } from "./contracts";
import qs from "qs";

class CategoriesService implements ICategoriesService {
  // Queries
  getCategories = (params?: IFilter) => {
    return httpRequest.get<IListData<ICategory[]>>("/api/categories", {
      params,
      paramsSerializer: (params) => qs.stringify(params),
    });
  };

  // Commands
  deleteCategory = (id: string) => {
    return httpRequest.delete<ICategory>(`/api/categories/${id}`);
  };
}

export const categoriesService = new CategoriesService();
