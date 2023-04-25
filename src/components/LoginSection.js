import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginSection.css";
import axios from "axios";

export const LoginSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [allEmails, setAllEmails] = useState([]); 

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(email);
    console.log(password);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const getAllEmails = () => {
    axios({
      url: "http://localhost:8080/accountsEmails",
      method: "GET",
      data: {
      },
    }).then(res => {
      setAllEmails(res.data);
    })
      .catch((err) => console.log(err));
  };
 
  const login = async () => {
    getAllEmails();
    if(allEmails.includes(email)) {
      // TODO: functionalitatea de login, setez isLoggedIn
    } else {
      // TODO: ai gresit credentialele sau nu ai cont
    }
  };

  return (
    <div className="loginSection">
      <div className="login-container">
        <h1>Log into your account</h1>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn--primary btn--medium" onClick={login}>
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
