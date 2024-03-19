import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
    reducerPath: "transactionApi",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
    }),
  
    endpoints: (builder) => ({
      deposit: builder.mutation({
        query: ({ id, amount, token }) => ({
          url: "/api/transaction/deposit",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: {
            accountid: id,
            amount: amount,
          },
          method: "POST",
        }),
      }),

      withdrawal: builder.mutation({
        query: ({ id, amount, token }) => ({
          url: "/api/transaction/withdrawal",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: {
            accountid: id,
            amount: amount,
          },
          method: "POST",
        }),
      }),

      transfer: builder.mutation({
        query: ({ fromaccountid, toaccountid, amount, token }) => ({
          url: "/api/transaction/transfer",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: {
            fromaccountid,
            toaccountid,
            amount
          },
          method: "POST",
        }),
      }),

      getTransactions:builder.query({
        query:({token,id})=>({
            url: "/transaction",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body:{
                accountid:id
            }
        })
      })
  
    }),
  });
  
  export const { useDepositMutation, useWithdrawalMutation ,useTransferMutation} = transactionApi;
  