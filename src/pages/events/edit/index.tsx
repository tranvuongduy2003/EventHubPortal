import { ModifyEvent } from "@/components/events";
import { IDetailEvent } from "@/interfaces";
import { eventsService } from "@/services";
import { Space, Spin, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export function EditEventPage() {
  const { eventId } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<IDetailEvent>();

  const handleFetchEvent = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    handleFetchEvent.current = async () => {
      setIsLoading(true);
      try {
        const { data } = await eventsService.getEventById(eventId!);
        setEvent(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    handleFetchEvent.current();
    return () => {
      handleFetchEvent.current = null;
    };
  }, []);

  return (
    <Space size="large" direction="vertical" style={{ width: "100%" }}>
      <div>
        <Typography.Title level={2}>Events Management</Typography.Title>
        <div>
          <Typography.Title
            level={3}
            className="!text-gray-500"
            style={{ marginTop: 0 }}
          ></Typography.Title>
          <Typography.Title
            level={3}
            className="!text-gray-500"
            style={{ marginTop: 0 }}
          >
            Update event
          </Typography.Title>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <Spin spinning={isLoading} size="large" />
        </div>
      ) : (
        <ModifyEvent event={event!} />
      )}
    </Space>
  );
}
