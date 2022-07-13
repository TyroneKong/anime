import React from "react";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import "./Login.scss";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = ({ emailHandler, passwordHandler, token, login }) => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <NavLink to="/">Homepage</NavLink>
      <div className="form-wrapper">
        <form className="form" onSubmit={login}>
          <h1 className="login__title">Login</h1>

          <TextField
            className="form__fields"
            onChange={emailHandler}
            label="Email"
            required
          ></TextField>
          <TextField
            className="form__fields"
            onChange={passwordHandler}
            label="Password"
            autoComplete="off"
            required
          ></TextField>

          <Button className="button" type="submit" variant="contained">
            Login
          </Button>

          {token ? <Navigate to="/personalised" /> : null}
        </form>
      </div>
    </div>
  );
};
