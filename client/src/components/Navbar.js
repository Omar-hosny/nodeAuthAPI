import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logoutUser, user } = authContext;

  const logout = () => {
    logoutUser();
  };

  const authLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          {user && user.name}
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link" onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
        <div className="container">
          <h2 className="navbar-brand"> AuthApp </h2>

          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
