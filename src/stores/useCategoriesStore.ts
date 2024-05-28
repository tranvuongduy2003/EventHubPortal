import { ICategory } from "@/interfaces";
import { create } from "zustand";

type State = {
  categories: ICategory[];
};

type Action = {
  setCategories: (categories: ICategory[]) => void;
};

export const useCategoriesStore = create<State & Action>((set) => ({
  categories: [],
  setCategories: (categories) => set(() => ({ categories: categories })),
}));
