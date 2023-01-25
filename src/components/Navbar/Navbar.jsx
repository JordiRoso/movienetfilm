import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/react.svg";
import TokenStorageService from "../../_services/TokenStorageService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {logout} from "../../features/login/authSlice.js"

export default function Navbar() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);


const handleLogout = () => {
  TokenStorageService.logOut();
  dispatch(logout());
  navigate('/');
};

const goToAdmin = () => {
  navigate("/admin");
}

const handleEnterProfile = () => {
  navigate("/user");
}

const handleShowNavbar = () => {
  if (isLoggedIn) {
    return (
      <>
        <li className="nav-item">
          <span
            onClick={handleEnterProfile}
            className="nav-link navbar-username"
          >
            {user.name}
          </span>
        </li>
        <li className="nav-item">
          <span onClick={handleLogout} className="nav-link navbar-logout">
            Logout
          </span>
        </li>
        <li className="nav-item">
          <span onClick={handleEnterProfile } className="nav-link navbar-logout">
           User
           {user.name}
          </span>
        </li>
        {user.message === "User Logged as SUPER_ADMIN" ? (
          
          <li className="nav-item">
          <span onClick={goToAdmin } className="nav-link navbar-logout">
            Admin
          </span>
        </li>
        ) : (
          ""
        )}
      </>
    );
  } else {
    return (
      <>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
        </li>
      </>
    );
  }
}

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fs-6">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Flay net
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/movies" className="nav-link">
                Movies
              </NavLink>
            </li>
            {handleShowNavbar()}
          </ul>
        </div>
      </div>
        
      </nav>
    </div>
  );
}
