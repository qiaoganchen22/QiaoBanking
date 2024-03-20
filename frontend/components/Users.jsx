import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import Navigate from "./Navigate";
import { useState } from "react";
import "./usersaccount.css";

export default function Users() {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.authSlice);
  const { data } = useGetUsersQuery({ token }); // making api call
  const { users } = useSelector((state) => state.usersSlice); // making call to state
  const [user, setData] = useState(null);
  useEffect(() => {
    setData(users);
  }, [users]);

  const search = (e) => {
    setData(
      users.filter((user) =>
        user.firstname.toUpperCase().includes(e.target.value.toUpperCase())
      )
    );
  };
  return (
    <div>
      <Navigate></Navigate>

      <div
        style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}
      >
        <input
          type="text"
          onChange={search}
          placeholder="Search"
          style={{
            width: "75%",
            height: "40px",
            borderRadius: "25px",
            padding: "10px",
          }}
        ></input>
      </div>

      {user &&
        user.map((user) => {
          return (
            <div className="accounts " key={user.userid}>
              <div className="row">
                <h2
                  className="col-sm"
                  onClick={() => {
                    navigate(`/usersAccount/${user.userid}`);
                  }}
                >
                  ID: {user.userid}{" "}
                </h2>
                <h3 className="col-sm">
                  Name: {user.firstname} {user.lastname}
                </h3>
              </div>
              <div className="row">
                <h3 className="col-sm">Address: : {user.address}</h3>
                <h3 className="col-sm">Email: {user.email}</h3>
              </div>
            </div>
          );
        })}
    </div>
  );
}
