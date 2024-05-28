import { ICategory, IResponse } from "@/interfaces";
import { categoriesService } from "@/services";
// eslint-disable-next-line no-redeclare
import { Image, Modal, notification } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { Dispatch, SetStateAction } from "react";
import { AiFillDelete, AiFillEdit, AiFillWarning } from "react-icons/ai";

interface CategoriesTableHookProps {
  setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedCategory: Dispatch<SetStateAction<ICategory | undefined>>;
  refetch?: (() => Promise<void>) | null;
}

export function useCategoriesTable({
  setIsUpdateModalOpen,
  setSelectedCategory,
  refetch,
}: CategoriesTableHookProps) {
  const [modal, contextHolder] = Modal.useModal();

  async function handleDeleteCategory(id: string) {
    try {
      await categoriesService.deleteCategory(id);

      refetch && refetch();

      notification.success({ message: "Delete category succesfully!" });
    } catch (error: any) {
      console.log(error);
      notification.error({ message: (error as IResponse<any>).message });
    }
  }

  const columns: ColumnsType<ICategory | AnyObject> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      colSpan: 1,
      render: (name) => <span className="font-medium">{name}</span>,
    },
    {
      title: "Icon",
      dataIndex: "iconImage",
      key: "iconImage",
      colSpan: 1,
      render: (iconImage: string, category) => (
        <div
          style={{ backgroundColor: category.color }}
          className="flex items-center justify-center w-10 h-10 rounded-md"
        >
          <Image
            src={iconImage}
            alt="category-icon"
            preview={false}
            className="object-cover"
            style={{ margin: 0, padding: 0 }}
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
          <span>{color}</span>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      colSpan: 1,
      render: (id: string, category) => (
        <div className="flex items-center gap-4">
          <div
            className="p-2 text-xl text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={() => {
              setIsUpdateModalOpen(true);
              setSelectedCategory(category as ICategory);
            }}
          >
            <AiFillEdit />
          </div>
          <div
            className="p-2 text-xl text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
            onClick={async () =>
              await modal.warning({
                title: "Delete Category",
                content: `Are you sure you want to delete categoy ${category.name}?`,
                onOk: () => handleDeleteCategory(id),
                okButtonProps: { style: { background: "red" } },
                okText: "Delete",
                icon: <AiFillWarning className="mx-1 text-2xl text-red-500" />,
                okCancel: true,
                closable: true,
                centered: true,
              })
            }
          >
            <AiFillDelete />
          </div>
          {contextHolder}
        </div>
      ),
    },
  ];

  return [columns];
}
