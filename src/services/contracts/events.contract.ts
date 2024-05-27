import { IEvent, IEventFilter, IListData, IResponse } from "@/interfaces";

export interface IEventsService {
  // Queries
  getEvents: (params?: IEventFilter) => Promise<IResponse<IListData<IEvent[]>>>;

  // Commands
  deleteEvent: (id: string) => Promise<IResponse<IEvent>>;
}
