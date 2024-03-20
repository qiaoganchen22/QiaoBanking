import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetUserForAdminQuery } from "../api/usersApi";
import { useSelector } from "react-redux";
import Navigate from "./Navigate";
import { useState } from "react";
import { useEffect } from "react";
import "./usersaccount.css";

export default function UsersAccount() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.authSlice);
  const { id } = useParams();
  const result = useGetUserForAdminQuery({ userid: id, token });

  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const arrow = () => {
      const obj = {};
      for (let x of result.data.array) {
        obj[x.accountid] = false;
      }
      setTransaction(obj);
    };
    if (result && result.data) {
      arrow();
    }
  }, [result]);

  const back = () => {
    navigate("/users");
  };
  return (
    <>
      <Navigate></Navigate>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <button type="button" class="btn btn-primary" onClick={back}>
          Back
        </button>
      </div>
      {result.data &&
        result.data.array.map((account) => {
          return (
            <div className="accounts" key={account.accountid}>
              {/* <h2>User Id: {account.userid} </h2> */}
              <div
                className="row"
                onClick={() => {
                  setTransaction({
                    ...transaction,
                    [account.accountid]: !transaction[account.accountid],
                  });
                }}
              >
                <h2 className="col-sm">Account ID: {account.accountid} </h2>
                <h2 className="col-sm">
                  Account Type:{" "}
                  {account.type[0].toUpperCase() + account.type.substring(1)}
                </h2>
                <h2 className="col-sm">
                  Balance: $
                  {Intl.NumberFormat("en-US", {
                    maximumFractionDigits: 2,
                  }).format(account.balance)}{" "}
                </h2>
                {transaction && transaction[account.accountid] && (
                  <hr className="hrshow" />
                )}
              </div>
              {transaction && transaction[account.accountid] && (
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                  <table className="table table-bordered table-striped mb-0">
                    {account.transaction.map((transaction) => {
                      return (
                        <tr className=" tablebox">
                          <div className="row">
                            <h4 className="col-sm">
                              Transaction Id: {transaction.transactionid}{" "}
                            </h4>
                            {/* <h3>User Id: {transaction.userid} </h3>
                          <h3>Account Id:{transaction.accountid} </h3> */}
                            <h4 className="col-sm">
                              Transaction Type:{" "}
                              {transaction.type[0].toUpperCase() +
                                transaction.type.substring(1)}{" "}
                            </h4>
                            <h4 className="col-sm">
                              Date: {transaction.created_at.split("T")[0]}{" "}
                            </h4>
                          </div>
                          {/* <h3>
                            Transaction Details Id:{" "}
                            {
                              transaction.transactiondetails
                                .transactiondetailsid
                            }{" "}
                          </h3> */}

                          <div className="row">
                            <h5 className="col-sm">
                              Amount: $
                              {Intl.NumberFormat("en-US", {
                                maximumFractionDigits: 2,
                              }).format(
                                transaction.transactiondetails.amount
                              )}{" "}
                            </h5>
                            {transaction.type === "transfer" && (
                              <>
                                <h5 className="col-sm">
                                  Deposit to Account ID:{" "}
                                  {transaction.transactiondetails.toaccount}{" "}
                                </h5>
                                <h5 className="col-sm">
                                  Withdrawal From Account ID:{" "}
                                  {transaction.transactiondetails.fromaccount}{" "}
                                </h5>
                              </>
                            )}
                          </div>
                          <hr />
                        </tr>
                      );
                    })}
                  </table>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}
