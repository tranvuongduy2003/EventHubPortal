import { IEvent, IEventFilter, IListData, IResponse } from "@/interfaces";

export interface IEventsService {
  getEvents: (params?: IEventFilter) => Promise<IResponse<IListData<IEvent[]>>>;
}
