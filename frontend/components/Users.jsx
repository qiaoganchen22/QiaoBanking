import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../api/usersApi";
import { useNavigate } from 'react-router-dom';
import Navigate from './Navigate';
import { useState } from 'react';

export default function Users() {
  const navigate=useNavigate()

  const { token } = useSelector((state) => state.authSlice);
  const { data } = useGetUsersQuery({ token }); // making api call
  const { users } = useSelector((state) => state.usersSlice); // making call to state
  const [user,setData]=useState(null)
  useEffect(()=>{
    setData(users)
  },[users])

  const search = (e) => {
    setData(
      users.filter((user) =>
        user.firstname.toUpperCase().includes(e.target.value.toUpperCase())
      )
    );
  };
  return (
    <div >
      <Navigate></Navigate>

      <input type="text" onChange={search} placeholder='Search'></input>

        {user&&user.map((user) => {
          return (
            <div key={user.userid}>
              <h2 onClick={() => {
                      navigate(`/usersAccount/${user.userid}`);
                    }}>ID: {user.userid} </h2>
              <h2>First Name: {user.firstname}</h2>
              <h2>Last Name: {user.lastname}</h2>
              <h2>Address: : {user.address}</h2>
              <h2>Email: {user.email}</h2>
              <hr />
            </div>
          );
        })}
      </div>
  )
}
