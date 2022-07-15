import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PersonalisedPage } from "./pages/PersonalisedPage";
import NotAuth from "./pages/NotAuth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// axios.defaults.withCredentials = true;

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
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

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
  };

  const registerPasswordHandler = (e) => {
    setRegisterPassword(e.target.value);
  };

  // custom hook valid user
  const useAuth = () => {
    const user = validUser;
    return user;
  };

  const ProtectedRoutes = () => {
    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <Login />;
  };

  const navigate = useNavigate();

  // return a boolean

  useEffect(() => {
    const result = EMAIL_REGEX.test(registerEmail);
    setValidEmail(result);
  }, [registerEmail, EMAIL_REGEX]);

  useEffect(() => {
    const result = PWD_REGEX.test(registerPassword);
    setValidPwd(result);
  }, [registerPassword, PWD_REGEX]);

  useEffect(() => {
    isAuthenticated();
  }, [token]);

  //login user
  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8001/login", {
        email,
        password,
      });

      console.log(response);

      setUser(response?.data);
      setToken(response?.data?.token);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  };
  // register user
  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8001/register", {
        first_name: firstname,
        last_name: lastname,
        email: registerEmail,
        password: registerPassword,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const isAuthenticated = async () => {
    try {
      const response = await axios.post("http://localhost:8001/personal", {
        first_name: firstname,
        accesstoken: localStorage.getItem("token"),
      });

      response.status === 200 && setValidUser(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
              validEmail={validEmail}
              validPwd={validPwd}
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
            path="/personalised"
            element={
              <PersonalisedPage
                user={user}
                setValidUser={setValidUser}
                validUser={validUser}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
