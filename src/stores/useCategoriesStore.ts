import { ICategory } from "@/interfaces";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  categories: ICategory[];
};

type Action = {
  setCategories: (categories: ICategory[]) => void;
};

export const useCategoriesStore = create(
  persist<State & Action>(
    (set) => ({
      categories: [],
      setCategories: (categories) => set(() => ({ categories: categories })),
    }),
    {
      name: "categories", // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
