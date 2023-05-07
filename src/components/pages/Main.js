import React from "react";
import "../../App.css";
import Navigation from "../Navigation.js";
import MainSection from "../MainSection";

// TODO
/*
Trebuie primite e-mailul, usernameul si rolul ca argumente la 
aceasta pagina.
*/
function Main() {
  return (
    <>
      <Navigation email="dummy@dummy" username="dummy_user" role="dummy" />
      <MainSection />
    </>
  );
}

export default Main;
