import { IEvent } from "@/interfaces";
import { Table } from "antd";
import { useEventsTable } from ".";

interface EventsTableProps {
  events: IEvent[];
}

export const EventsTable = ({ events }: EventsTableProps) => {
  const [columns] = useEventsTable();

  return (
    <Table
      columns={columns}
      dataSource={events}
      pagination={false}
      scroll={{ x: 1800 }}
      expandable={{
        expandedRowRender: (event) => (
          <p style={{ margin: 0 }}>{event.description}</p>
        ),
      }}
      locale={{
        emptyText: "No events found",
      }}
      rowKey={(record) => record.id}
    />
  );
};
