import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PersonalisedPage } from "./pages/PersonalisedPage";
import axios from "axios";
import { Outlet } from "react-router";

function App() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [validUser, setValidUser] = useState(false);

  // only valid 4-24 characters alpha numeric
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

  // only uppercase, alphanumeric with special characters
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;

  // check valid email
  const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const firstnameHandler = (e) => {
    setFirstname(e.target.value);
  };

  const lastnameHandler = (e) => {
    setLastname(e.target.value);
  };

  const registerEmailHandler = (e) => {
    setRegisterEmail(e.target.value);
    console.log(e.target.value);
  };

  const registerPasswordHandler = (e) => {
    setRegisterPassword(e.target.value);
    console.log(e.target.value);
  };

  const useAuth = () => {
    const user = validUser;
    return user;
  };

  const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Login />;
  };

  // return a boolean

  useEffect(() => {
    const result = EMAIL_REGEX.test(registerEmail);

    console.log(result);
  }, [registerEmail]);

  useEffect(() => {
    const result = PWD_REGEX.test(registerPassword);
    console.log(result);
  }, [registerPassword]);

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8001/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setUser(response?.data);
        setToken(response?.data?.token);
        setValidUser(true);
        localStorage.setItem("token", response.data.token);
        console.log(localStorage.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const register = (e) => {
    e.preventDefault();
    console.log(registerEmail, registerPassword);
    axios
      .post("http://localhost:8001/register", {
        first_name: firstname,
        last_name: lastname,
        email: registerEmail,
        password: registerPassword,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/register"
          element={
            <Register
              register={register}
              firstnameHandler={firstnameHandler}
              lastnameHandler={lastnameHandler}
              registerEmailHandler={registerEmailHandler}
              registerPasswordHandler={registerPasswordHandler}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              user={user}
              emailHandler={emailHandler}
              passwordHandler={passwordHandler}
              login={login}
              token={token}
              validUser={validUser}
            />
          }
        />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/login/personalisedPage"
            element={<PersonalisedPage user={user} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
