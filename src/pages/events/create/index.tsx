import { ModifyEvent } from "@/components/events";
import { Space, Typography } from "antd";

export function CreateEventPage() {
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
            Create new event
          </Typography.Title>
        </div>
      </div>
      <ModifyEvent create={true} />
    </Space>
  );
}
