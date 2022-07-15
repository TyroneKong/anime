import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Register.scss";
import { NavLink } from "react-router-dom";
import "./Register.scss";

import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Register = ({
  register,
  firstnameHandler,
  lastnameHandler,
  registerEmailHandler,
  registerPasswordHandler,
  validEmail,
  validPwd,
}) => {
  const [pwdFocus, setPwdFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  return (
    <div className="register">
      <nav className="register__nav">
        <NavLink to="/">Homepage</NavLink>

        <NavLink to="/login">Login</NavLink>
      </nav>

      <div className="form-wrapper">
        <form className="form" onSubmit={register}>
          <h1 className="register__title">Register</h1>

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

          <span className={validEmail ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={emailFocus && !validEmail ? "invalid" : "hide"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <TextField
            className="form__fields"
            onChange={registerEmailHandler}
            label="Email"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          ></TextField>
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <TextField
            className="form__fields"
            onChange={registerPasswordHandler}
            label="Password"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            disabled={!validEmail ? true : false}
          ></TextField>
          <p className={pwdFocus && !validPwd ? "error" : "offscreen"}>
            <span>
              8 to 24 characters.
              <br />
              must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              <span>Allowed special characters:@</span>{" "}
              <span aria-label="exclamtion mark">!</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="pound sign">£</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
              <span aria-label="underscore">_</span>
            </span>
          </p>

          <Button type="submit" variant="contained">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};
