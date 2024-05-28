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
  createCategory = (data: FormData) => {
    return httpRequest.post<FormData, ICategory>("/api/categories", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  updateCategory = (id: string, data: FormData) => {
    return httpRequest.put<FormData, ICategory>(`/api/categories/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  deleteCategory = (id: string) => {
    return httpRequest.delete<ICategory>(`/api/categories/${id}`);
  };
}

export const categoriesService = new CategoriesService();
