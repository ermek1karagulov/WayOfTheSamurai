import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="item">
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div className="item">
        <NavLink to="/users">Users</NavLink>
      </div>
      <div className="item">
        <NavLink to="/dialogs">Messages</NavLink>
      </div>
      <div className="item">
        <a href="">News</a>
      </div>
      <div className="item">
        <a href="">Music</a>
      </div>
      <div className="item">
        <a href="">Settings</a>
      </div>
    </nav>
  );
};

export default Navbar;
