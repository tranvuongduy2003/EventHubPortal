import { IListData } from "./../interfaces/response.interface";
import { httpRequest } from "@/interceptors";
import { IEventsService } from "./contracts";
import { IEvent, IEventFilter } from "@/interfaces";
import qs from "qs";

class EventsService implements IEventsService {
  // Queries
  getEvents = (params?: IEventFilter) => {
    return httpRequest.get<IListData<IEvent[]>>("/api/events", {
      params,
      paramsSerializer: (params) => qs.stringify(params),
    });
  };

  // Commands
  deleteEvent = (id: string) => {
    return httpRequest.delete<IEvent>(`/api/events/${id}`);
  };
}

export const eventsService = new EventsService();
