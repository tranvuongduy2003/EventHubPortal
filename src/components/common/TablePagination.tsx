import { IFilter, IMetadata } from "@/interfaces";
import { Pagination } from "antd";
import { SetStateAction } from "react";

export interface ITablePaginationProps {
  filter: IFilter;
  metadata: IMetadata;
  setFilter: (value: SetStateAction<IFilter>) => void;
}

export function TablePagination({
  filter,
  metadata,
  setFilter,
}: ITablePaginationProps) {
  return (
    <div className="flex justify-center w-full">
      <Pagination
        current={filter.page}
        pageSize={filter.size}
        total={metadata?.totalCount}
        onChange={(page, pageSize) =>
          setFilter((curFilter) => ({
            ...curFilter,
            page: page,
            size: pageSize,
          }))
        }
        showSizeChanger
        onShowSizeChange={(current, pageSize) =>
          setFilter((curFilter) => ({
            ...curFilter,
            page: current,
            size: pageSize,
          }))
        }
      />
    </div>
  );
}
