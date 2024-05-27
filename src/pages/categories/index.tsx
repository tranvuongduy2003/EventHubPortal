import { CategoriesTable } from "@/components/categories";
import { StatisticCard, TablePagination } from "@/components/common";
import { ICategory, IFilter, IMetadata } from "@/interfaces";
import { categoriesService } from "@/services";
import { Button, Space, Spin, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useRef, useState } from "react";
import { AiFillSignal } from "react-icons/ai";
import { BiSolidHide } from "react-icons/bi";
import { MdOutlinePublic } from "react-icons/md";

const PAGE_SIZE = 10;

export function CategoriesPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [metadata, setMetadata] = useState<IMetadata>();
  const [filter, setFilter] = useState<IFilter>({
    size: PAGE_SIZE,
    page: 1,
    takeAll: false,
  });
  const handleFetchCategories = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    handleFetchCategories.current = async () => {
      setIsLoading(true);
      try {
        const { data } = await categoriesService.getCategories(filter);
        const { items, metadata } = data;
        setCategories(items);
        setMetadata(metadata);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    handleFetchCategories.current();
    return () => {
      handleFetchCategories.current = null;
    };
  }, [filter]);

  return (
    <Space size="large" direction="vertical" style={{ width: "100%" }}>
      <Typography.Title level={2}>Categories Management</Typography.Title>
      <div className="flex justify-between">
        <div>
          <Search
            placeholder="Enter category name"
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
          <Button type="primary">Create new category</Button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <Spin spinning={isLoading} size="large" />
        </div>
      ) : (
        <>
          <CategoriesTable categories={categories ?? []} />
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
