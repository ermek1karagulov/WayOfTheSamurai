import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1GHFzicMYaZPHv7YBikNwffrogSMVnTvLsQ&usqp=CAU"
        alt=""
      />
      <div className="loginBlock">
        <NavLink to={"/login"}>Login</NavLink>
      </div>
    </header>
  );
};

export default Header;
