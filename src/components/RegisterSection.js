import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterSection.css";
import axios from "axios";

export const RegisterSection = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("client");
  const [mismatch, setMismatch] = useState(false);
  const [allEmails, setAllEmails] = useState([]); 

  const getAllEmails = async () => {
    await axios({
      url: "http://localhost:8080/accountsEmails",
      method: "GET",
      data: {
      },
    }).then(res => {
      setAllEmails(res.data);
    })
      .catch((err) => console.log(err));
  };

  // !!!!! DE FACUT RESTRICTII PT FORMATUL DE EMAIL SI PT PAROLA


  const authenticate = async (e) => {
    e.preventDefault();
    getAllEmails();
    if(allEmails.includes(email)) {
      /* TODO: sa afisez mesaj de informare daca emailul este deja folosit */
    } else {
      await axios({
        url: "http://localhost:8080/accounts",
        method: "POST",
        data: {
          email: email,
          password: password
        },
      }).then(res => {
        getAllEmails();
      })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (confirmPassword === password) {
      setMismatch(false);
    } else {
      setMismatch(true);
    }

    /* Check equality of passwords */

    /* Check constraints */

    console.log(username);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    console.log(role);
  };

  return (
    <div className="registerSection">
      <div className="register-container">
        <h1>Create a new account</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <label className="labelField" for="usernameRegister">
            {" "}
            Username{" "}
          </label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Choose your username"
            id="usernameRegister"
            name="usernameRegister"
          />

          <label className="labelField" for="emailRegister">
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
            id="emailRegister"
            name="emailRegister"
          />

          <label className="labelField" for="passwordRegister">
            {" "}
            Password{" "}
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter your password"
            id="passwordRegister"
            name="passwordRegister"
          />

          <label className="labelField" for="confirmPasswordRegister">
            {" "}
            Confirm Password{" "}
          </label>
          <input
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="password"
            placeholder="Rewrite your password"
            id="confirmPasswordRegister"
            name="confirmPasswordRegister"
          />

          {mismatch && (
            <p
              style={{
                color: "red",
                alignSelf: "center",
                fontSize: "0.85rem",
              }}
            >
              The passwords must be the same!{" "}
            </p>
          )}

          <label className="labelField" for="roleRegister">
            {" "}
            Choose your account type{" "}
          </label>
          <select
            defaultValue={"client"}
            onChange={(e) => setRole(e.target.value)}
            id="cars"
            name="cars"
          >
            <option value="client">Client</option>
            <option value="owner">Owner</option>
          </select>

          <div className="checkbox-container"></div>
          <br></br>
          <button type="submit" className="btn btn--primary btn--medium" onClick={authenticate}>
            Register
          </button>
        </form>
        {/* TODO */}
        <Link className="linkRegister" to={"/Login"}>
          Already have an account? Click here to log in!
        </Link>
      </div>
    </div>
  );
};
export default RegisterSection;
