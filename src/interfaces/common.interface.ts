import { EEventPrivacy, EEventType, EPageOrder, EPaymentStatus } from "@/enums";
import { IPriceRange } from "./event.interface";

export interface IFilter {
  page?: number;
  size?: number;
  takeAll?: boolean;
  order?: EPageOrder;
  search?: string;
}

export interface IEventFilter extends IFilter {
  type?: EEventType;
  location?: string;
  priceRange?: IPriceRange;
  categoryIds?: string[];
  eventPrivacy?: EEventPrivacy;
  rates?: number[];
}

export interface IPaymentFilter extends IFilter {
  status?: EPaymentStatus;
}
