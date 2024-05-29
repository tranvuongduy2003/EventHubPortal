import { EPaymentStatus } from "@/enums";

export interface IPayment {
  id: string;
  eventId: string;
  event: IPaymentEvent;
  ticketQuantity: number;
  userId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  totalPrice: number;
  discount: number;
  status: EPaymentStatus;
  userPaymentMethodId: string;
  paymentMethod: IUserPaymentMethod;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IPaymentEvent {
  id: string;
  coverImage: string;
  name: string;
  creatorId: string;
}

export interface IUserPaymentMethod {
  id: string;
  userId: string;
  methodId: string;
  method: IPaymentMethod;
  paymentAccountNumber: string;
  paymentAccountQRCode?: string;
  checkoutContent?: string;
}

export interface IPaymentMethod {
  id: string;
  methodName: string;
  methodLogo: string;
}
