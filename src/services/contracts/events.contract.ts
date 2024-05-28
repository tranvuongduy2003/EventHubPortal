import {
  IDetailEvent,
  IEvent,
  IEventFilter,
  IListData,
  IResponse,
} from "@/interfaces";

export interface IEventsService {
  // Queries
  getEvents: (params?: IEventFilter) => Promise<IResponse<IListData<IEvent[]>>>;
  getEventById: (id: string) => Promise<IResponse<IDetailEvent>>;

  // Commands
  createEvent: (data: FormData) => Promise<IResponse<IEvent>>;
  updateEvent: (id: string, data: FormData) => Promise<IResponse<IEvent>>;
  deleteEvent: (id: string) => Promise<IResponse<IEvent>>;
}
