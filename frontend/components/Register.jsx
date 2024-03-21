import React, { useState } from "react";
import { useRegisterUserMutation } from "../api/authApi";

export default function Register() {
  const [addNewUser] = useRegisterUserMutation();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    ssn: -1,
    address: "",
    password: "",
    email: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const results = addNewUser({ ...form, ssn: Number(form.ssn) });
  };

  return (
    <>
      <div
        style={{
          boxSizing: "border-box",
          border: "1px solid black",
          backgroundColor: "white",
          width: "100%",
          padding: "12px",
          borderRadius: "30px",
        }}
      >
        <h2 style={{ color: "black" }}>Register</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              placeholder="Enter first name"
              name="firstname"
              onChange={onChange}
              style={{ width: "75%", margin:"auto" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              placeholder="Enter last name"
              name="lastname"
              onChange={onChange}
              style={{ width: "75%", margin:"auto" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ssn">SSN</label>
            <input
              type="password"
              className="form-control"
              id="ssn"
              placeholder="Enter SSN"
              name="ssn"
              onChange={onChange}
              style={{ width: "75%", margin:"auto" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter Address"
              name="address"
              onChange={onChange}
              style={{ width: "75%", margin:"auto" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={onChange}
              style={{ width: "75%", margin:"auto" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={onChange}
              style={{ width: "75%", margin:"auto" }}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
