import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navigation.css";

function Navigation({ email, username, role }) {
  return (
    <div className="navigation-container">
      <Link to="/" className="navbar-logo">
        <img
          style={{ width: "100px", height: "100px" }}
          src={require("../sportify_logo.png")}
          alt=""
        />
      </Link>

      <div className="credentials-container">
        <h5> Email: {email}</h5>
        <h5> Username: {username}</h5>
        <h5> Role: {role}</h5>
      </div>
      <div className="buttons-container">
        <Button destinationPage="/Main/Book" buttonStyle="btn--outline">
          {" "}
          Book it!{" "}
        </Button>
        {role === "Owner" && (
          <Button
            destinationPage="/Main/ManageCourts"
            buttonStyle="btn--outline"
          >
            {" "}
            Manage courts{" "}
          </Button>
        )}
        <Button destinationPage="/Main/ManageCourts" buttonStyle="btn--outline">
          {" "}
          Find a team!{" "}
        </Button>
      </div>
    </div>
  );
}

export default Navigation;
