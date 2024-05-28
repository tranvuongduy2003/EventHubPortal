import { httpRequest } from "@/interceptors";
import { IEvent, IEventFilter } from "@/interfaces";
import qs from "qs";
import { IListData } from "./../interfaces/response.interface";
import { IEventsService } from "./contracts";

class EventsService implements IEventsService {
  // Queries
  getEvents = (params?: IEventFilter) => {
    return httpRequest.get<IListData<IEvent[]>>("/api/events", {
      params,
      paramsSerializer: (params) => qs.stringify(params),
    });
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
