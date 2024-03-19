import { accountApi } from "../api/accountApi";
import { createSlice } from "@reduxjs/toolkit";
import { transactionApi } from "../api/transactionApi";
import { authApi } from "../api/authApi";

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: {
    accounts: window.sessionStorage.getItem("Account")
      ? JSON.parse(window.sessionStorage.getItem("Account")).account
      : [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(
      accountApi.endpoints.getAccount.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.accounts = payload;
      }
    );

    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.accounts = payload.account;
        window.sessionStorage.setItem(
          "Account",
          JSON.stringify({
            account: payload.account,
          })
        );
      }
    );

    builder.addMatcher(
      accountApi.endpoints.createAccount.matchFulfilled,
      (state, { payload }) => {
        const accounts = Object.assign([], state.accounts);
        accounts.push(payload);
        state.accounts = accounts; //returns all account
      }
    );

    builder.addMatcher(
      accountApi.endpoints.getAccountDetails.matchFulfilled,
      (state, { payload }) => {
        console.log("hit");
        state.accounts = payload;
      }
    );

    //deposit
    builder.addMatcher(
      transactionApi.endpoints.deposit.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        let account = Object.assign([], state.accounts);
        account = account.map((account) => {
          if (account.accountid === payload.updatedaccount.accountid) {
            let obj = { ...payload.updatedaccount };
            account.transactions.push({
              ...payload.newTransaction,
              transactionDetails: payload.transactiondetails,
            });
            obj.transactions = account.transactions;
            console.log(obj);
            return obj;
          } else return account;
        });
        console.log(account);
        state.accounts = account;
      }
    );
    //withdrawal
    builder.addMatcher(
      transactionApi.endpoints.withdrawal.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        let account = Object.assign([], state.accounts);
        account = account.map((account) => {
          if (account.accountid === payload.updatedaccount.accountid) {
            let obj = { ...payload.updatedaccount };
            account.transactions.push({
              ...payload.newTransaction,
              transactionDetails: payload.transactiondetails,
            });
            obj.transactions = account.transactions;
            console.log(obj);
            return obj;
          } else return account;
        });
        console.log(account);
        state.accounts = account;
      }
    );
    //transfer
    builder.addMatcher(
      transactionApi.endpoints.transfer.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        let account = Object.assign([], state.accounts);
        account = account.map((account) => {
          if (account.accountid === payload.fromaccount.accountid) {
            let obj = { ...payload.fromaccount };
            account.transactions.push({
              ...payload.fromaccountTransaction,
            });
            obj.transactions = account.transactions;
            console.log(obj);
            return obj;
          } else if (
            payload.toaccount &&
            payload.toaccount.accountid === account.accountid
          ) {
            let obj = { ...payload.toaccount };
            account.transactions.push({
              ...payload.toaccountTransaction,
            });
            obj.transactions = account.transactions;
            console.log(obj);
            return obj;
          } else return account;
        });
        console.log(account);
        state.accounts = account;
      }
    );
  },
});
export default accountSlice.reducer;
