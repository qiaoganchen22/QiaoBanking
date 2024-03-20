import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetAccountQuery,
  useGetAccountDetailsQuery,
} from "../api/accountApi";
import { useCreateAccountMutation } from "../api/accountApi";
import { useDepositMutation } from "../api/transactionApi";
import { useWithdrawalMutation } from "../api/transactionApi";
import { useTransferMutation } from "../api/transactionApi";
import Navigate from "./Navigate";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./usersaccount.css";

export default function Account() {
  const [transaction, setTransaction] = useState(null);

  const [error, setError] = useState(null);
  const { users, token } = useSelector((state) => state.authSlice);
  const [depositMutation] = useDepositMutation();
  const [withdrawalMutation] = useWithdrawalMutation();
  const [transferMutation] = useTransferMutation();
  const [amount, setAmount] = useState(0);

  const { accounts } = useSelector((state) => state.accountSlice);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const obj = {};
    for (let x of accounts) {
      obj[x.accountid] = false;
    }
    setTransaction(obj);
  }, [accounts]);
  // console.log(transaction);
  const [form, setForm] = useState({
    type: "checking",
    balance: 0,
  });

  const [transferform, setTransferForm] = useState({
    toaccountid: 0,
    amount: 0,
  });

  const [createAccout] = useCreateAccountMutation();
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const Change = (e) => {
    setTransferForm({ ...transferform, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const create = await createAccout({
      token,
      ...form,
      balance: Number(Number(form.balance).toFixed(2)),
    });
    handleClose();
    // console.log(create);
  };
  console.log(accounts);
  const updateAmount = (e) => {
    setAmount(e.target.value);
  };
  const deposit = (e) => {
    e.preventDefault();
    depositMutation({ id, amount: Number(amount), token });
    closeDeposit();
  };
  const withdrawal = async (e) => {
    e.preventDefault();
    const result = await withdrawalMutation({
      id,
      amount: Number(amount),
      token,
    });
    if (result.error) {
      return setError(result.error.data);
    }
    setError(null);
    console.log(result);
    closeWith();
  };
  const transfer = (e) => {
    e.preventDefault();
    // console.log(transferform, e.target.id);
    transferMutation({ ...transferform, token, fromaccountid: id });
    closeTrans();
  };

  const [id, setId] = useState(null);
  const [showDep, setShowDep] = useState(false);
  const showDeposit = () => setShowDep(true);
  const closeDeposit = () => setShowDep(false);

  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const showWith = () => setShowWithdrawal(true);
  const closeWith = () => setShowWithdrawal(false);

  const [showTransfer, setShowTransfer] = useState(false);
  const showTrans = () => setShowTransfer(true);
  const closeTrans = () => setShowTransfer(false);

  return (
    <div>
      <div>
        <Navigate></Navigate>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Button variant="primary" onClick={handleShow}>
            Create Account
          </Button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label htmlFor="type">Type:</label>
              <select id="type" name="type" onChange={onChange}>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
              <label>
                Balance:{" "}
                <input type="number" name="balance" onChange={onChange}></input>
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              Create Account
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDep} onHide={closeDeposit} centered>
          <Modal.Header closeButton>
            <Modal.Title>Deposit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
              {" "}
              Deposit Amount <input type="number" onChange={updateAmount} />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDeposit}>
              Close
            </Button>
            <Button variant="primary" onClick={deposit}>
              Deposit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showWithdrawal} onHide={closeWith} centered>
          <Modal.Header closeButton>
            <Modal.Title>Withdrawal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
              {" "}
              Withdrawal Amount <input type="number" onChange={updateAmount} />
            </label>
            <hr />
            {error}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeWith}>
              Close
            </Button>
            <Button variant="primary" onClick={withdrawal}>
              Withdrawal
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showTransfer} onHide={closeTrans} centered>
          <Modal.Header closeButton>
            <Modal.Title>Transfer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id={accounts.accountid}>
              <label>
                Amount:{" "}
                <input type="number" name="amount" onChange={Change}></input>
              </label>
              <label>
                To Account:{" "}
                <input
                  type="number"
                  name="toaccountid"
                  onChange={Change}
                ></input>
              </label>
              {/* <button id={accounts.accountid}>Transfer</button> */}
            </form>
            <hr />
            {error}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeTrans}>
              Close
            </Button>
            <Button variant="primary" onClick={transfer}>
              Transfer
            </Button>
          </Modal.Footer>
        </Modal>

        {accounts.map((account) => {
          return (
            <div className="accounts" key={account.accountid}>
              <div
                className="row"
                onClick={() => {
                  setTransaction({
                    ...transaction,
                    [account.accountid]: !transaction[account.accountid],
                  });
                }}
              >
                <h2
                  className="col-sm"
                  onClick={() => {
                    setTransaction({
                      ...transaction,
                      [account.accountid]: !transaction[account.accountid],
                    });
                  }}
                >
                  AccountId: {account.accountid}
                </h2>
                <h2 className="col-sm">
                  Type:{" "}
                  {account.type[0].toUpperCase() + account.type.substring(1)}{" "}
                </h2>
                <h2 className="col-sm">
                  Balance: $
                  {Intl.NumberFormat("en-US", {
                    maximumFractionDigits: 2,
                  }).format(account.balance)}
                </h2>
                {/* <input type="number" onChange={updateAmount} /> */}
              </div>
              <div className="row">
                <div className="apple col-sm-4">
                  <Button
                    style={{ marginRight: "20px" }}
                    className="col-sm "
                    variant="primary"
                    id={account.accountid}
                    onClick={(e) => {
                      setId(e.target.id);
                      showDeposit();
                    }}
                  >
                    Deposit
                  </Button>

                  {/* <button onClick={deposit} id={account.accountid}>
                Deposit
              </button> */}

                  <Button
                    style={{ marginRight: "20px" }}
                    className="col-sm "
                    variant="primary"
                    id={account.accountid}
                    onClick={(e) => {
                      setId(e.target.id);
                      showWith();
                    }}
                  >
                    Withdrawal
                  </Button>

                  <Button
                    style={{ marginRight: "20px" }}
                    className="col-sm"
                    variant="primary"
                    id={account.accountid}
                    onClick={(e) => {
                      setId(e.target.id);
                      showTrans();
                    }}
                  >
                    Transfer
                  </Button>
                </div>
              </div>
              {transaction && transaction[account.accountid] && <hr />}
              {transaction &&
                transaction[account.accountid] &&
                (account.transactions?.length ? (
                  <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-bordered table-striped mb-0">
                      {account.transactions.map((transaction) => {
                        return (
                          <tr
                            className="tablebox"
                            key={transaction.transactionid}
                          >
                            <div className="row">
                              <h4 className="col-sm">
                                Transaction ID: {transaction.transactionid}
                              </h4>
                              <h4 className="col-sm">
                                Transaction Type: {transaction.type}{" "}
                              </h4>

                              <h4 className="col-sm">
                                Date: {transaction.created_at.split("T")[0]}{" "}
                                {
                                  transaction.created_at
                                    .split("T")[1]
                                    .split(".")[0]
                                }
                              </h4>
                            </div>
                            <div className="row">
                              <h5 className="col-sm">
                                Transaction Amount: $
                                {Intl.NumberFormat("en-US", {
                                  maximumFractionDigits: 2,
                                }).format(
                                  transaction.transactionDetails.amount
                                )}
                              </h5>
                              <h5 className="col-sm">
                                From Account:{" "}
                                {transaction.transactionDetails.fromaccount}
                              </h5>
                              <div className="col-sm"></div>
                            </div>
                            <hr />
                          </tr>
                        );
                      })}{" "}
                    </table>
                  </div>
                ) : (
                  <>No transactions</>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
