import React from "react";
import { NavLink } from "react-router-dom";
import "./Homepage.scss";

export const Homepage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <nav>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/Login">Login</NavLink>
      </nav>
    </div>
  );
};
