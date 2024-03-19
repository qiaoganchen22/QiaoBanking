import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../slice/authSlice";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

export default function Navigate() {
  const { token, users } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setToken(null));
    navigate("/");
  };
  return (
    <div>
      {token && (
        <>
          <nav className=" py-4 navbar navbar-expand-lg navbar-light bg-dark">
            <a style={{ color: "white" }} className="navbar-brand">
              QiaoBanking
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item" style={{ color: "white" }}>
                  <Link
                    style={{ color: "white" }}
                    className="nav-link"
                    to="/account"
                  >
                    Account
                  </Link>
                </li>
                {users && users.isadmin && (
                  <li className="nav-item">
                    <Link
                      style={{ color: "white" }}
                      className="nav-link"
                      to="/users"
                    >
                      Users
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link
                    style={{ color: "white" }}
                    className="nav-link"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={{ color: "white" }}
                    className="nav-link"
                    to="/"
                    onClick={logout}
                  >
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
