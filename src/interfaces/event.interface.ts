import { EEventCycleType, EEventPaymentType, EEventStatus } from "@/enums";
import { ICategory } from "./category.interface";
import { IUser } from "./user.interface";
import { ITicketType } from "./ticket.interface";
import { IFileStorage } from "./file.interface";

export interface IDetailEvent
  extends Omit<
    IEvent,
    "creatorName" | "creatorAvatar" | "priceRange" | "categories"
  > {
  creatorId: string;
  creator: IUser;
  categoryIds: string[];
  subImages: string[];
  reasons: string[];
  ticketTypes: ITicketType[];
  emailContent: IEmailContent;
  isFavourite?: boolean;
  numberOfFavourites?: number;
  numberOfShares?: number;
  numberOfSoldTickets?: number;
}

export interface IEmailContent {
  id: string;
  eventId: string;
  content: string;
  attachments: IFileStorage[];
}

export interface IEvent {
  id: string;
  creatorName: string;
  creatorAvatar: string;
  coverImage: string;
  name: string;
  description: string;
  location: string;
  priceRange: IPriceRange;
  startTime: Date;
  endTime: Date;
  eventCycleType: EEventCycleType;
  eventPaymentType: EEventPaymentType;
  isPrivate: boolean;
  isTrash: boolean;
  categories: ICategory[];
  averageRating: number;
  promotion: number;
  status: EEventStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IPriceRange {
  startRange: number;
  endRange: number;
}
