import { ICategory } from "@/interfaces";
import { Table } from "antd";
import { useCategoriesTable } from ".";

interface CategoriesTableProps {
  categories: ICategory[];
}

export const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const [columns] = useCategoriesTable();

  return (
    <Table
      columns={columns}
      dataSource={categories}
      pagination={false}
      locale={{
        emptyText: "No categories found",
      }}
      rowKey={(record) => record.id}
    />
  );
};
