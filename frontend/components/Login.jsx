import React from "react";
import { useState } from "react";
import { useLoginUserMutation } from "../api/authApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAccountDetailsQuery } from "../api/accountApi";

export default function Login() {
  // const [call,setCall]=useState(false)
  const { users, token } = useSelector((state) => state.authSlice);
  // if (call) {
  //   console.log('asd')
  //   useGetAccountDetailsQuery(token);
  // }
  const navigate = useNavigate();
  const [data] = useLoginUserMutation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    const result = await data(form);
    if (!result.error) {
      // setCall(true)
      navigate("/account");
    }
  };

  return (
    <div className="loginReg"
    >
      <h2 style={{ color: "black" }}>Login</h2>
      <form onSubmit={onSubmit}>
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
            style={{ width: "75%", margin: "auto" }}
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
            style={{ width: "75%", margin: "auto" }}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
      </form>
    </div>
  );
}
