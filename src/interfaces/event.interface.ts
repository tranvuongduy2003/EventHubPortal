import { EEventCycleType, EEventPaymentType, EEventStatus } from "@/enums";
import { ICategory } from "./category.interface";

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
