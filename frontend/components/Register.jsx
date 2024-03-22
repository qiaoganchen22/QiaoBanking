import React, { useState } from "react";
import { useRegisterUserMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [addNewUser] = useRegisterUserMutation();
  const navigate=useNavigate()

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

    const results = await addNewUser({ ...form, ssn: Number(form.ssn) });
    console.log(results)
    if(results.error){
      return toast.error(results.error.data, { position: "top-right" });
    }
    if(!results.error){
      navigate("/account")
    }
    
  };

  return (
    <>
      <div className="loginReg"><ToastContainer></ToastContainer>
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
