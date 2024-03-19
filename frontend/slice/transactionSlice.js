import { transactionApi } from "../api/transactionApi";
import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "transactionSlice",
    initialState: { transactions:[]},
    reducers: {},
  
    extraReducers: (builder) => {
      // builder.addMatcher(
      //   transactionApi.endpoints.deposit.matchFulfilled,
      //   (state, { payload }) => {
      //       const transaction = Object.assign([], state.transactions);
      //       transaction.push(payload);
      //       state.transactions = transaction;
      //   }
      // );

      builder.addMatcher(
        transactionApi.endpoints.getTransactions.matchFulfilled,
        (state,{payload})=>{
            state.transactions
        }
      )
  
    },
  });
  export default transactionSlice.reducer;