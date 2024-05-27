import { ICategory } from "@/interfaces";
// eslint-disable-next-line no-redeclare
import { Image } from "antd";
// eslint-disable-next-line no-redeclare
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";

interface CategoriesTableHookProps {}

export function useCategoriesTable() {
  const columns: ColumnsType<ICategory | AnyObject> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      colSpan: 1,
      render: (name) => <span className="text-lg font-medium">{name}</span>,
    },
    {
      title: "Icon",
      dataIndex: "iconImage",
      key: "iconImage",
      colSpan: 1,
      render: (iconImage: string, category) => (
        <div
          style={{ backgroundColor: category.color }}
          className="inline-block p-2 rounded-md"
        >
          <Image
            src={iconImage}
            alt="category-icon"
            preview={false}
            className="object-cover"
            width={30}
            height={30}
          />
        </div>
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      colSpan: 1,
      render: (color: string) => (
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: color }}
            className="inline-block w-8 h-8 rounded-md"
          ></div>
          <span className="text-lg">{color}</span>
        </div>
      ),
    },
  ];

  return [columns];
}
