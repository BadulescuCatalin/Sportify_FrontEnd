import React from "react";
import "./App.css";
import NavbarLogged from "./components/NavbarLogged";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home.js";
import Login from "./components/pages/Login.js";
import Register from "./components/pages/Register.js";
import HomeLogged from "./components/pages/HomeLogged";

function App() {
  return (
    <>
      <Router>
        <NavbarLogged  />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/HomeLogged" exact component={HomeLogged} />
          <Route path="/Login" exact component={Login} />
          <Route path="/Register" exact component={Register} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
