import { ICategory, IFilter, IListData, IResponse } from "@/interfaces";

export interface ICategoriesService {
  // Queries
  getCategories: (
    params?: IFilter
  ) => Promise<IResponse<IListData<ICategory[]>>>;

  // Commands
  createCategory: (data: FormData) => Promise<IResponse<ICategory>>;
  updateCategory: (id: string, data: FormData) => Promise<IResponse<ICategory>>;
  deleteCategory: (id: string) => Promise<IResponse<ICategory>>;
}
