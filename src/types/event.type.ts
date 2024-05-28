import { EEventCycleType, EEventPaymentType } from "@/enums";

export type CreateEventTicketPayload = {
  name: string;
  quantity: number;
  price: number;
};

export const InitCreateEventTicketPayload = {
  name: "",
  quantity: 100,
  price: 0,
} as CreateEventTicketPayload;

export type CreateEventPayload = {
  id?: string;
  creatorId?: string;
  name: string;
  categoryIds: string[];
  eventCycleType: EEventCycleType;
  startTime: any;
  endTime: any;
  location: any;
  description: string;
  reasons: string[];
  coverImage: any;
  eventSubImages: any[];
  eventPaymentType: EEventPaymentType;
  ticketTypes: CreateEventTicketPayload[];
  isPrivate: boolean;
};

export const InitCreateEventPayload = {
  name: "",
  categoryIds: [],
  eventCycleType: EEventCycleType.SINGLE,
  startTime: null,
  endTime: null,
  location: "",
  description: "",
  reasons: [],
  coverImage: "",
  eventSubImages: ["", "", "", ""],
  eventPaymentType: EEventPaymentType.FREE,
  ticketTypes: [],
  isPrivate: false,
} as CreateEventPayload;
