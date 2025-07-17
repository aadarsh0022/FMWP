import { appApi } from "@/app/store/api";

type RecurringPaymentResponse = {
  success: boolean;
  data: RecurringPayment[];
  totalDueThisMonth: number;
};

type RecurringPayment = {
  title: string;
  dueDate: string;
  amount: number;
  status: string;
  type: string;
  account: string;
  category: string;
  description?: string;
};

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUpcomingRecurringPayments: builder.query<
      RecurringPaymentResponse,
      { month: string; status?: string }
    >({
      query: ({ month, status = "upcoming" }) => ({
        url: `/get-recurring-payments`,
        params: { month, status },
      }),
    }),
  }),
});

export const { useGetUpcomingRecurringPaymentsQuery } = authApi;
