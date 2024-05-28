import { ICategory } from "@/interfaces";
import { Table } from "antd";
import { useCategoriesTable } from ".";
import { UpdateCategoryModal } from "../modals";
import { useState } from "react";

interface CategoriesTableProps {
  categories: ICategory[];
}

export const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();

  const [columns] = useCategoriesTable({
    setIsUpdateModalOpen,
    setSelectedCategory,
  });

  return (
    <>
      <Table
        columns={columns}
        dataSource={categories}
        pagination={false}
        locale={{
          emptyText: "No categories found",
        }}
        rowKey={(record) => record.id}
      />
      {isUpdateModalOpen && selectedCategory && (
        <UpdateCategoryModal
          category={selectedCategory}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
        />
      )}
    </>
  );
};
