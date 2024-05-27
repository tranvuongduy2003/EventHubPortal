import {
  EEventCycleType,
  EEventPaymentType,
  EEventPrivacy,
  EEventStatus,
} from "@/enums";
import { ICategory, IEvent, IPriceRange, IResponse } from "@/interfaces";
import { eventsService } from "@/services";
import { converter } from "@/utils";
// eslint-disable-next-line no-redeclare
import { Image, Modal, Rate, Space, Tag, notification } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { AiFillDelete, AiFillEdit, AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// interface EventsTableHookProps {}

export function useEventsTable() {
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();

  async function handleDeleteEvent(id: string) {
    try {
      await eventsService.deleteEvent(id);
      notification.success({ message: "Delete event succesfully!" });
    } catch (error: any) {
      console.log(error);
      notification.error({ message: (error as IResponse<any>).message });
    }
  }

  const columns: ColumnsType<IEvent | AnyObject> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      colSpan: 1,
      width: 320,
      render: (name: string, event) => (
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
              {name}
            </span>
            <span>
              {event.status === EEventStatus.OPENING ? (
                <Tag className="capitalize" color="blue">
                  {EEventStatus.OPENING.toLowerCase()}
                </Tag>
              ) : event.status === EEventStatus.UPCOMING ? (
                <Tag className="capitalize" color="yellow">
                  {EEventStatus.UPCOMING.toLowerCase()}
                </Tag>
              ) : (
                <Tag className="capitalize" color="black">
                  {EEventStatus.CLOSED.toLowerCase()}
                </Tag>
              )}
              {event.promotion && event.promotion > 0 ? (
                <Tag color="red">- {event.promotion * 100}%</Tag>
              ) : (
                <></>
              )}
            </span>
          </div>
        </Space>
      ),
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (categories: ICategory[]) => (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Tag key={category.id} color={category.color}>
              {category.name}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location: string) => <p>{location}</p>,
    },
    {
      title: "Price",
      dataIndex: "priceRange",
      key: "priceRange",
      render: (priceRange: IPriceRange, event) =>
        event.promotion && event.promotion > 0 ? (
          <div>
            <p>
              <span className="line-through">
                {converter.toVND(priceRange.startRange * 1000)}
              </span>{" "}
              -{" "}
              <span className="line-through">
                {converter.toVND(priceRange.endRange * 1000)}
              </span>
            </p>
            <p>
              <span>
                {converter.toVND(
                  priceRange.startRange * 1000 * (1 - event.promotion)
                )}
              </span>{" "}
              -{" "}
              <span>
                {converter.toVND(
                  priceRange.endRange * 1000 * (1 - event.promotion)
                )}
              </span>
            </p>
          </div>
        ) : (
          <p>
            <span>{converter.toVND(priceRange.startRange * 1000)}</span> -{" "}
            <span>{converter.toVND(priceRange.endRange * 1000)}</span>
          </p>
        ),
    },
    {
      title: "Timeline",
      dataIndex: "timeline",
      key: "timeline",
      render: (_, event) => (
        <p>
          {dayjs(event.startTime).format("DD/MM/YYYY")} -{" "}
          {dayjs(event.endTime).format("DD/MM/YYYY")}
        </p>
      ),
    },
    {
      title: "Event Type",
      dataIndex: "eventCycleType",
      key: "eventCycleType",
      width: 120,
      render: (eventCycleType: EEventCycleType) =>
        eventCycleType === EEventCycleType.RECURRING ? (
          <div className="px-3 py-2 font-medium text-center text-blue-600 capitalize bg-blue-200 border-2 border-blue-500 border-solid rounded-full">
            {EEventCycleType.RECURRING.toLowerCase()}
          </div>
        ) : eventCycleType === EEventCycleType.SINGLE ? (
          <div className="px-3 py-2 font-medium text-center text-indigo-600 capitalize bg-indigo-200 border-2 border-indigo-500 border-solid rounded-full">
            {EEventCycleType.SINGLE.toLowerCase()}
          </div>
        ) : (
          <></>
        ),
    },
    {
      title: "Payment Type",
      dataIndex: "eventPaymentType",
      key: "eventPaymentType",
      width: 130,
      render: (eventPaymentType: EEventPaymentType) =>
        eventPaymentType === EEventPaymentType.FREE ? (
          <div className="px-3 py-2 font-medium text-center text-white capitalize bg-yellow-600 rounded-full">
            {EEventPaymentType.FREE.toLowerCase()}
          </div>
        ) : eventPaymentType === EEventPaymentType.PAID ? (
          <div className="px-3 py-2 font-medium text-center text-white capitalize bg-red-600 rounded-full">
            {EEventPaymentType.PAID.toLowerCase()}
          </div>
        ) : (
          <></>
        ),
    },
    {
      title: "Accessibility",
      dataIndex: "isPrivate",
      key: "isPrivate",
      width: 120,
      render: (isPrivate: boolean) =>
        isPrivate ? (
          <div className="font-medium text-center text-orange-600 capitalize">
            {EEventPrivacy.PRIVATE.toLowerCase()}
          </div>
        ) : (
          <div className="font-medium text-center text-green-600 capitalize">
            {EEventPrivacy.PUBLIC.toLowerCase()}
          </div>
        ),
    },
    {
      title: "Rating",
      dataIndex: "averageRating",
      key: "averageRating",
      width: 200,
      render: (averageRating: number) => (
        <Rate allowHalf value={averageRating} />
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      colSpan: 1,
      render: (id: string, event) => (
        <div className="flex items-center gap-4">
          <div
            className="p-2 text-xl text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={() => navigate(`/events/edit/${id}`)}
          >
            <AiFillEdit />
          </div>
          <div
            className="p-2 text-xl text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
            onClick={async () =>
              await modal.warning({
                title: "Delete Event",
                content: `Are you sure you want to delete event ${event.name}?`,
                onOk: () => handleDeleteEvent(id),
                okButtonProps: { style: { background: "red" } },
                okText: "Delete",
                icon: <AiFillWarning className="mx-1 text-2xl text-red-500" />,
                okCancel: true,
                closable: true,
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
