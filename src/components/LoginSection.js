import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginSection.css";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';

export const LoginSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(0);
  const secretKey = 'D6C417240AF0429FA0DC45861F7A90B344BEEB2F3FA66328FF7B3AED0598E0D8';
  const jwt = require('jsonwebtoken')
  
  const login = async (e) => {
    e.preventDefault();

    console.log(email);
    console.log(password);
    
    await axios({
      url: "http://localhost:8080/login",
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      //withCredentials: true,
      // headers: {
      //   "Content-Type": "application/json",
      //   Accept: "text/plain;charset=UTF-8",
      //   Authorization: "Basic",
      // },
    })
      .then((res) => {
        console.log(res);
        console.log(res.headers);
        console.log(res.data);
        console.log(jwtDecode(res.data));

        switch (res.data) {
          case "Wrong credentials":
            setError(2);
            return;

          default:
            console.log("OK");
            setDone(true);
            // TODO: verificare semnat
            return;
        }
      })
      .catch((err) => console.log(err));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="loginSection">
      <div className="login-container">
        <h1>Log into your account</h1>
        <form className="login-form">
          <label className="labelField" for="emailLogin">
            {" "}
            E-mail{" "}
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Enter your e-mail"
            id="emailLogin"
            name="emailLogin"
          />
          <label className="labelField" for="passwordLogin">
            {" "}
            Password{" "}
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            id="passwordLogin"
            name="passwordLogin"
          />
          <div className="checkbox-container">
            <input
              onClick={togglePassword}
              type="checkbox"
              id="showPasswordCheckbox"
              name="showPasswordCheckbox"
              value="show"
            />
            <label style={{ fontSize: "0.85rem" }} for="showPasswordCheckbox">
              {" "}
              Show Password
            </label>
          </div>
          <br></br>
          <button
            type="submit"
            className="btn btn--primary btn--medium"
            onClick={login}
          >
            Log in
          </button>
        </form>
        {/* TODO */}
        <Link className="linkRegister" to={"/Register"}>
          Don't have an account? Click here to register!
        </Link>
      </div>
    </div>
  );
};
export default LoginSection;
