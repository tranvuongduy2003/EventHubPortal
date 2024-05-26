import { ICategory, IFilter, IListData, IResponse } from "@/interfaces";

export interface ICategoriesService {
  getCategories: (
    params?: IFilter
  ) => Promise<IResponse<IListData<ICategory[]>>>;
}
