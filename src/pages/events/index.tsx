import { StatisticCard, TablePagination } from "@/components/common";
import { EventsTable, FilterSelect } from "@/components/events";
import { EEventPrivacy, EEventType } from "@/enums";
import { ICategory, IEvent, IEventFilter, IMetadata } from "@/interfaces";
import { categoriesService, eventsService } from "@/services";
import { Button, Divider, Space, Spin, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useRef, useState } from "react";
import { AiFillSignal } from "react-icons/ai";
import { BiSolidHide } from "react-icons/bi";
import { MdOutlinePublic } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

export function EventsPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [metadata, setMetadata] = useState<IMetadata>();
  const [filter, setFilter] = useState<IEventFilter>({
    size: PAGE_SIZE,
    page: 1,
    takeAll: false,
    eventPrivacy: EEventPrivacy.ALL,
  });

  const handleFetchEvents = useRef<(() => Promise<void>) | null>(null);
  const handleFetchCategories = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    handleFetchCategories.current = async () => {
      try {
        const { data } = await categoriesService.getCategories();
        const { items } = data;
        setCategories(items);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchCategories.current();
    return () => {
      handleFetchCategories.current = null;
    };
  }, []);

  useEffect(() => {
    handleFetchEvents.current = async () => {
      setIsLoading(true);
      try {
        const { data } = await eventsService.getEvents(filter);
        const { items, metadata } = data;
        setEvents(items);
        setMetadata(metadata);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    handleFetchEvents.current();
    return () => {
      handleFetchEvents.current = null;
    };
  }, [filter]);

  return (
    <Space size="large" direction="vertical" style={{ width: "100%" }}>
      <Typography.Title level={2}>Events Management</Typography.Title>
      <div className="grid grid-cols-3 gap-8">
        <StatisticCard
          title="Total"
          value={metadata?.totalCount || 0}
          icon={<AiFillSignal className="text-blue-600" />}
          postfix="Events"
        />
        <StatisticCard
          title="Public"
          value={metadata?.totalPublic || 0}
          icon={<MdOutlinePublic className="text-green-600" />}
          postfix="Events"
        />
        <StatisticCard
          title="Private"
          value={metadata?.totalPrivate || 0}
          icon={<BiSolidHide className="text-orange-600" />}
          postfix="Events"
        />
      </div>
      <div className="flex justify-between">
        <div>
          <Search
            placeholder="Enter event name"
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
            Create new event
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <FilterSelect
          onChange={(value) =>
            setFilter((curFilter) => ({ ...curFilter, type: value }))
          }
          title="Status"
          options={[
            { value: EEventType.ALL, label: "All" },
            { value: EEventType.CLOSED, label: "Closed" },
            { value: EEventType.OPENING, label: "Opening" },
            { value: EEventType.UPCOMING, label: "Upcoming" },
          ]}
        />
        <Divider orientation="center" type="vertical" style={{ height: 32 }} />
        <FilterSelect
          title="Accessibility"
          onChange={(value) =>
            setFilter((curFilter) => ({ ...curFilter, eventPrivacy: value }))
          }
          options={[
            { value: EEventPrivacy.ALL, label: "All" },
            { value: EEventPrivacy.PRIVATE, label: "Private" },
            { value: EEventPrivacy.PUBLIC, label: "Public" },
          ]}
        />
        <Divider orientation="center" type="vertical" style={{ height: 32 }} />
        {categories && categories.length > 0 ? (
          <FilterSelect
            title="Categories"
            multiple
            onChange={(values) =>
              setFilter((curFilter) => ({
                ...curFilter,
                categoryIds: values?.map(
                  (value: string) => value?.split("_")[0]
                ),
              }))
            }
            options={categories.map((category) => ({
              label: category.name,
              value: `${category.id}_${category.color}`,
            }))}
          />
        ) : (
          <></>
        )}
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <Spin spinning={isLoading} size="large" />
        </div>
      ) : (
        <>
          <EventsTable events={events ?? []} />
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
