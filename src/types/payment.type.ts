import { EPaymentStatus } from "@/enums";

export type UpdatePaymentPayload = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: EPaymentStatus;
};
