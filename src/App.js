import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home.js";
import Login from "./components/pages/Login.js";
import Register from "./components/pages/Register.js";
import Main from "./components/pages/Main.js";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Navbar />
            <Home />
          </Route>
          <Route path="/Login" exact>
            <Navbar />
            <Login />
          </Route>
          <Route path="/Register" exact>
            <Navbar />
            <Register />
          </Route>
          <Route path="/Main" exact component={Main} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
