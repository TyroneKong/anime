import React from "react";
import { TextField, Button } from "@mui/material";
import "./Register.scss";
import { NavLink } from "react-router-dom";

export const Register = ({
  register,
  firstnameHandler,
  lastnameHandler,
  registerEmailHandler,
  registerPasswordHandler,
}) => {
  return (
    <div>
      <h1>Register</h1>
      <NavLink to="/">Homepage</NavLink>
      <div className="form-wrapper">
        <form className="form" onSubmit={register}>
          <TextField
            className="form__fields"
            onChange={firstnameHandler}
            label="First Name"
          ></TextField>
          <TextField
            className="form__fields"
            onChange={lastnameHandler}
            label="Last Name"
          ></TextField>
          <TextField
            className="form__fields"
            onChange={registerEmailHandler}
            label="Email"
          ></TextField>
          <TextField
            className="form__fields"
            onChange={registerPasswordHandler}
            label="Password"
          ></TextField>
          <Button type="submit" variant="contained">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};
