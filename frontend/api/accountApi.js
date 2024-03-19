import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    getAccount: builder.query({
      query: ({ id, token }) => ({
        url: "/api/account/" + id,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getAccountDetails: builder.query({
      query: (token) => ({
        url: "/api/transaction/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    createAccount: builder.mutation({
      query: (body) => ({
        url: "/api/account",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${body.token}`,
        },
        body: {
          type: body.type,
          balance: body.balance,
        },
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAccountQuery,
  useCreateAccountMutation,
  useGetAccountDetailsQuery,
} = accountApi;
