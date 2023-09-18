// Navbar.jsx

import React, { useState } from "react";
import classes from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null); // Fixed this line to clear the event handler correctly
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to="/home" className={classes.title}>
            ECTC
          </Link>
        </div>
        <div className={classes.center}>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Link to="/home">Dashboard</Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/batches">Manage Batches</Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/branches">Manage Branches</Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/users">Manage Users</Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/courses">Manage Courses</Link>
            </li>
          </ul>
        </div>
        <div className={classes.right}>
          <button onClick={handleLogout} className={classes.logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
