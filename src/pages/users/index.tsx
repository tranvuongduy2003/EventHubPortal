import { UsersTable } from "@/components/users";
import { TablePagination } from "@/components/common";
import { IFilter, IMetadata, IUser } from "@/interfaces";
import { usersService } from "@/services";
import { Button, Space, Spin, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

export function UsersPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [metadata, setMetadata] = useState<IMetadata>();
  const [filter, setFilter] = useState<IFilter>({
    size: PAGE_SIZE,
    page: 1,
    takeAll: false,
  });
  const handleFetchUsers = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    handleFetchUsers.current = async () => {
      setIsLoading(true);
      try {
        const { data } = await usersService.getUsers(filter);
        const { items, metadata } = data;
        setUsers(items);
        setMetadata(metadata);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    handleFetchUsers.current();
    return () => {
      handleFetchUsers.current = null;
    };
  }, [filter]);

  return (
    <Space size="large" direction="vertical" style={{ width: "100%" }}>
      <Typography.Title level={2}>Users Management</Typography.Title>
      <div className="flex justify-between">
        <div>
          <Search
            placeholder="Enter user name"
            className="w-96"
            allowClear
            loading={isLoading}
            enterButton="Search"
            onSearch={(value) =>
              setFilter((curFilter) => ({
                ...curFilter,
                search: value,
              }))
            }
          />
        </div>
        <div>
          <Button type="primary" onClick={() => navigate("create")}>
            Create new user
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <Spin spinning={isLoading} size="large" />
        </div>
      ) : (
        <>
          <UsersTable users={users ?? []} />
          <TablePagination
            filter={filter}
            metadata={metadata!}
            setFilter={setFilter}
          />
        </>
      )}
    </Space>
  );
}

export * from "./create";
export * from "./edit";
