import React from "react";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import "./Login.scss";
import { NavLink } from "react-router-dom";

export const Login = ({ emailHandler, passwordHandler, token, login }) => {
  return (
    <div>
      <h1>Login</h1>
      <NavLink to="/">Homepage</NavLink>
      <div className="form-wrapper">
        <form className="form" onSubmit={login}>
          <TextField
            className="form__fields"
            onChange={emailHandler}
            label="Email"
          ></TextField>
          <TextField
            className="form__fields"
            onChange={passwordHandler}
            label="Password"
          ></TextField>

          <Button type="submit" variant="contained">
            Login
          </Button>

          {token ? <Navigate to="personalisedPage" /> : null}
        </form>
      </div>
    </div>
  );
};
