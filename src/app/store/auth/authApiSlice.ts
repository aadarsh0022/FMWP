import { appApi } from "../api";

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
  }),
});

export const { useGetUserQuery } = authApi;
