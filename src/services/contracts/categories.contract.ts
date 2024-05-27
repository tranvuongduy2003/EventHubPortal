import { ICategory, IFilter, IListData, IResponse } from "@/interfaces";

export interface ICategoriesService {
  // Queries
  getCategories: (
    params?: IFilter
  ) => Promise<IResponse<IListData<ICategory[]>>>;

  // Commands
  deleteCategory: (id: string) => Promise<IResponse<ICategory>>;
}
