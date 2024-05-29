import { PaymentsTable } from "@/components/payments";
import { TablePagination } from "@/components/common";
import { IFilter, IMetadata, IPayment } from "@/interfaces";
import { paymentsService } from "@/services";
import { Space, Spin, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 10;

export function PaymentsPage() {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<IMetadata>();
  const [filter, setFilter] = useState<IFilter>({
    size: PAGE_SIZE,
    page: 1,
    takeAll: false,
  });
  const handleFetchPayments = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    handleFetchPayments.current = async () => {
      setIsLoading(true);
      try {
        const { data } = await paymentsService.getPayments(filter);
        const { items, metadata } = data;
        setPayments(items);
        setMetadata(metadata);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    handleFetchPayments.current();
  }, [filter]);

  return (
    <>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <Typography.Title level={2}>Payments Management</Typography.Title>
        <div className="flex justify-between">
          <div>
            <Search
              placeholder="Enter payment information"
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
          <div></div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <Spin spinning={isLoading} size="large" />
          </div>
        ) : (
          <>
            <PaymentsTable
              payments={payments ?? []}
              refetch={handleFetchPayments.current}
            />
            <TablePagination
              filter={filter}
              metadata={metadata!}
              setFilter={setFilter}
            />
          </>
        )}
      </Space>
    </>
  );
}
