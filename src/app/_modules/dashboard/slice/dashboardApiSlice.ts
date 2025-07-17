import { appApi } from "@/app/store/api";

type RecurringPayment = {
  _id: string;
  userId: string;
  title: string;
  amount: number;
  startDate: string;
  frequency: string;
  totalOccurrences: number;
  occurrences: {
    dueDate: string;
    status: string;
  }[];
  type: string;
  account: string;
  category: string;
  description?: string;
};

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUpcomingRecurringPayments: builder.query<
      RecurringPayment[],
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
