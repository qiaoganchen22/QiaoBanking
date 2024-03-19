import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetUserForAdminQuery } from "../api/usersApi";
import { useSelector } from "react-redux";
import Navigate from "./Navigate";

export default function UsersAccount() {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.authSlice);
  const { id } = useParams();
  const result = useGetUserForAdminQuery({userid:id,token});
  // console.log(result,token);
const back=()=>{
  navigate("/users")
}
  return (
  <>
  <Navigate></Navigate>
  <button type="button" class="btn btn-primary" onClick={back}>Back</button>
  {result.data && result.data.array.map((account) => {
          return (
            <div key={account.accountid}>
              {/* <h2>User Id: {account.userid} </h2> */}
              <h2>Account Id: {account.accountid} </h2>
              <hr/>
              <h2>Account Type: {account.type} </h2>
              <h2>Balance: {Intl.NumberFormat("en-US",{maximumFractionDigits: 2}).format(account.balance)} </h2>
              {account.transaction.map((transaction)=>{
                return(
                    <>
                    <h2>Transactions</h2>
                    <h3>Transaction Id: {transaction.transactionid} </h3>
                    <h3>User Id: {transaction.userid} </h3>
                    <h3>Account Id:{transaction.accountid} </h3>
                    <h3>Transaction Type: {transaction.type} </h3>
                    <h3>Date {transaction.created_at} </h3>
                    <h3>Transaction Details Id: {transaction.transactiondetails.transactiondetailsid} </h3>
                    <h3>Deposit to: {transaction.transactiondetails.toaccount} </h3>
                    <h3>Withdrawal From: {transaction.transactiondetails.fromaccount} </h3>
                    <h3>Amount: {Intl.NumberFormat("en-US",{maximumFractionDigits: 2}).format(transaction.transactiondetails.amount)} </h3>
                    </>
                )
              })}
              <hr />
            </div>
          );
        })}
 

  </>
  );
}
