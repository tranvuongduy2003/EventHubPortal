import { EEventStatus } from "@/enums";
import {
  IEvent,
  IPayment,
  IPaymentEvent,
  IResponse,
  IUserPaymentMethod,
} from "@/interfaces";
import { paymentsService } from "@/services";
import { converter } from "@/utils";
// eslint-disable-next-line no-redeclare
import { Image, Modal, Space, Tag, notification } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { AiFillDelete, AiFillEdit, AiFillWarning } from "react-icons/ai";

interface PaymentsTableHookProps {
  setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedPayment: Dispatch<SetStateAction<IPayment | undefined>>;
  refetch?: (() => Promise<void>) | null;
}

export function usePaymentsTable({
  setIsUpdateModalOpen,
  setSelectedPayment,
  refetch,
}: PaymentsTableHookProps) {
  const [modal, contextHolder] = Modal.useModal();

  async function handleDeletePayment(id: string) {
    try {
      await paymentsService.deletePayment(id);

      notification.success({ message: "Delete payment succesfully!" });
    } catch (error: any) {
      console.log(error);
      notification.error({ message: (error as IResponse<any>).message });
    }
  }

  const columns: ColumnsType<IPayment | AnyObject> = [
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      colSpan: 1,
      render: (event: IPaymentEvent) => (
        <Space direction="horizontal" align="center">
          <Image
            src={event.coverImage}
            alt="event-cover-image"
            height={60}
            width={80}
            className="object-cover rounded-md"
          />
          <div className="flex flex-col items-start justify-center gap-2">
            <span className="inline-block h6 !text-sm max-w-[155px]">
              {event.name}
            </span>
          </div>
        </Space>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      colSpan: 1,
      render: (_, payment) => (
        <div>
          <p>
            Name: <span className="font-medium">{payment.customerName}</span>
          </p>
          <p>
            Email: <span className="font-medium">{payment.customerEmail}</span>
          </p>
          <p>
            Phone Number:{" "}
            <span className="font-medium">{payment.customerPhone}</span>
          </p>
        </div>
      ),
    },
    {
      title: "Ticket Quantity",
      dataIndex: "ticketQuantity",
      key: "ticketQuantity",
      colSpan: 1,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      colSpan: 1,
      render: (totalPrice: number) => (
        <span>{converter.toVND(totalPrice * 1000)}</span>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      colSpan: 1,
      render: (discount: number) => <span>{discount * 100} %</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      colSpan: 1,
      render: (status: number) => <span>{status}</span>,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      colSpan: 1,
      render: (paymentMethod: IUserPaymentMethod) => (
        <Space direction="horizontal" align="center">
          <Image
            src={paymentMethod.method.methodLogo}
            alt="event-cover-image"
            height={50}
            width={50}
            className="object-contain rounded-md shadow-md"
            preview={false}
          />
          <div className="flex flex-col items-start justify-center gap-2">
            <span className="inline-block h6 !text-sm max-w-[155px]">
              {paymentMethod.method.methodName}
            </span>
            <span className="inline-block h6 !text-sm max-w-[155px]">
              {paymentMethod.paymentAccountNumber}
            </span>
          </div>
        </Space>
      ),
    },
    {
      title: "Checkout Time",
      dataIndex: "createdAt",
      key: "createdAt",
      colSpan: 1,
      render: (createdAt: Date) => (
        <span>
          {dayjs(createdAt.toLocaleString()).format("hh:mm:ss DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      colSpan: 1,
      render: (id: string, payment) => (
        <div className="flex items-center gap-4">
          <div
            className="p-2 text-xl text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={() => {
              setIsUpdateModalOpen(true);
              setSelectedPayment(payment as IPayment);
            }}
          >
            <AiFillEdit />
          </div>
          <div
            className="p-2 text-xl text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
            onClick={async () =>
              await modal.warning({
                title: "Delete Payment",
                content: `Are you sure you want to delete this payment?`,
                onOk: () => handleDeletePayment(id),
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
