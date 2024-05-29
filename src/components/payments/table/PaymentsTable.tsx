import { IPayment } from "@/interfaces";
import { Table } from "antd";
import { useState } from "react";
import { usePaymentsTable } from ".";
import { UpdatePaymentModal } from "../modals";

interface PaymentsTableProps {
  payments: IPayment[];
  refetch?: (() => Promise<void>) | null;
}

export const PaymentsTable = ({ payments, refetch }: PaymentsTableProps) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<IPayment>();

  const [columns] = usePaymentsTable({
    setIsUpdateModalOpen,
    setSelectedPayment,
    refetch,
  });

  return (
    <>
      <Table
        columns={columns}
        dataSource={payments}
        pagination={false}
        scroll={{ x: 1600 }}
        locale={{
          emptyText: "No payments found",
        }}
        rowKey={(record) => record.id}
      />
      {isUpdateModalOpen && selectedPayment && (
        <UpdatePaymentModal
          refetch={refetch}
          payment={selectedPayment}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
        />
      )}
    </>
  );
};
