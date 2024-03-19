import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../api/store.js";
import Account from '../components/Account.jsx';
import Users from '../components/Users.jsx';
import UsersAccount from '../components/UsersAccount.jsx';
import Profile from '../components/Profile.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/usersAccount/:id" element={<UsersAccount />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
</Provider>
)
