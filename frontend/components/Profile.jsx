import React from "react";
import { useSelector } from "react-redux";
import Navigate from "./Navigate";
import pic from "../src/assets/img/Profilepic.webp";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUpdateUserMutation } from "../api/usersApi";
import { useEffect } from "react";
import "./usersaccount.css";

export default function Profile() {
  const { users, token } = useSelector((state) => state.authSlice);
  const [show, setShow] = useState(false);
  const [updateUsers] = useUpdateUserMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState(null);

  useEffect(() => {
    setForm({ users, password: "" });
  }, [users]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const results = await updateUsers({ ...form, token });
    // console.log(results);
    setShow(false);
  };

  // console.log(users)
  return (
    <div>
      <Navigate></Navigate>
      {
        <div className="prof">
          <h2>Profile</h2>
          <hr />
          <img
            src={pic}
            alt="pic"
            style={{ height: "300px", width: "300px" }}
          />
          <h3>User ID: {users?.userid}</h3>
          <h4>
            {users?.firstname} {users?.lastname}
          </h4>
          <h5>SSN: ***-**-{String(users?.ssn).substring(5)}</h5>
          <h5>Address: {users?.address}</h5>
          <Button variant="primary" onClick={handleShow}>
            Update
          </Button>{" "}
        </div>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="Enter first name"
                name="firstname"
                defaultValue={users?.firstname}
                onChange={onChange}
              />
            </div>
            <div className="">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Enter last name"
                name="lastname"
                defaultValue={users?.lastname}
                onChange={onChange}
              />
            </div>
            <div className="">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Address"
                name="address"
                defaultValue={users?.address}
                onChange={onChange}
              />
            </div>
            <div className="">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                onChange={onChange}
              />
            </div>
          </div>
          <form></form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
