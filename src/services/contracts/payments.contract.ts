import { IPayment, IFilter, IListData, IResponse } from "@/interfaces";
import { UpdatePaymentPayload } from "@/types";

export interface IPaymentsService {
  // Queries
  getPayments: (params?: IFilter) => Promise<IResponse<IListData<IPayment[]>>>;

  // Commands
  updatePayment: (
    id: string,
    data: UpdatePaymentPayload
  ) => Promise<IResponse<IPayment>>;
  deletePayment: (id: string) => Promise<IResponse<IPayment>>;
}
