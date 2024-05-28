import { ICategory } from "@/interfaces";
import { useTranslation } from "react-i18next";

interface ICategoryItemProps {
  category: ICategory;
}

export function CategoryItem({ category }: ICategoryItemProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center gap-2">
      <div
        style={{ backgroundColor: category.color }}
        className={`w-[30px] h-[30px] rounded-lg bg-[${category.color}] flex items-center justify-center`}
      >
        <img
          loading="lazy"
          className="w-[20px] h-[20px]"
          src={category.iconImage}
        />
      </div>
      <p className="text-header">{category.name}</p>
    </div>
  );
}
