import { httpRequest } from "@/interceptors";
import { IDetailEvent, IEvent, IEventFilter, IListData } from "@/interfaces";
import { IEventsService } from "./contracts";
import qs from "qs";

class EventsService implements IEventsService {
  // Queries
  getEvents = (params?: IEventFilter) => {
    return httpRequest.get<IListData<IEvent[]>>("/api/events", {
      params,
      paramsSerializer: (params) => qs.stringify(params),
    });
  };
  getEventById = (id: string) => {
    return httpRequest.get<IDetailEvent>(`/api/events/${id}`);
  };

  // Commands
  createEvent = (data: FormData) => {
    return httpRequest.post<FormData, IEvent>("/api/events", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  updateEvent = (id: string, data: FormData) => {
    return httpRequest.put<FormData, IEvent>(`/api/events/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  deleteEvent = (id: string) => {
    return httpRequest.delete<IEvent>(`/api/events/${id}`);
  };
}

export const eventsService = new EventsService();
