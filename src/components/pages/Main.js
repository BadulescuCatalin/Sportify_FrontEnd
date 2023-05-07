import React from "react";
import "../../App.css";
import Navigation from "../Navigation.js";
import MainSection from "../MainSection";

// TODO
/*
Trebuie primite e-mailul, usernameul si rolul ca argumente la 
aceasta pagina.
*/
function Main({ email, username, role }) {
  return (
    <>
      <Navigation email={email} username={username} role={role} />
      <MainSection email={email} username={username} role={role} />
    </>
  );
}

export default Main;
