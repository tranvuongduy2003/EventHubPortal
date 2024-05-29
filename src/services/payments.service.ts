import { httpRequest } from "@/interceptors";
import { IFilter, IListData, IPayment } from "@/interfaces";
import { UpdatePaymentPayload } from "@/types";
import qs from "qs";
import { IPaymentsService } from "./contracts";

class PaymentsService implements IPaymentsService {
  // Queries
  getPayments = (params?: IFilter) => {
    return httpRequest.get<IListData<IPayment[]>>("/api/payments", {
      params,
      paramsSerializer: (params) => qs.stringify(params),
    });
  };

  // Commands
  updatePayment = (id: string, data: UpdatePaymentPayload) => {
    return httpRequest.put<UpdatePaymentPayload, IPayment>(
      `/api/payments/${id}`,
      data
    );
  };
  deletePayment = (id: string) => {
    return httpRequest.delete<IPayment>(`/api/payments/${id}`);
  };
}

export const paymentsService = new PaymentsService();
