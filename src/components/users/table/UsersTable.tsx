import { IUser } from "@/interfaces";
import { Table } from "antd";
import { useUsersTable } from ".";

interface UsersTableProps {
  users: IUser[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  const [columns] = useUsersTable();

  return (
    <Table
      columns={columns}
      dataSource={users}
      pagination={false}
      scroll={{ x: 1300 }}
      expandable={{
        expandedRowRender: (user) => <p style={{ margin: 0 }}>{user.bio}</p>,
      }}
      locale={{
        emptyText: "No users found",
      }}
      rowKey={(record) => record.id}
    />
  );
};
