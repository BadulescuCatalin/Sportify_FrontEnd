import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home.js";
import Login from "./components/pages/Login.js";
import Register from "./components/pages/Register.js";
import Main from "./components/pages/Main.js";
import Book from "./components/pages/Book.js";
import ManageCourts from "./components/pages/ManageCourts";
import Add from "./components/pages/Add";
import Modify from "./components/pages/Modify";
import Reservation from "./components/pages/Reservation";
import FindTeam from "./components/pages/FindTeam";
import AddTeam from "./components/pages/AddTeam"
import JoinTeam from "./components/pages/JoinTeam"


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
          <Route path="/Main" exact>
            <Main />
          </Route>
          <Route path="/Main/Book" exact>
            <Book />
          </Route>
          <Route path="/Main/ManageCourts" exact>
            <ManageCourts />
          </Route>
          <Route path="/Main/ManageCourts/Add" exact>
            <Add />
          </Route>
          <Route path="/Main/ManageCourts/Modify" exact>
            <Modify />
          </Route>
          <Route path="/Main/Book/Reservation" exact>
            <Reservation />
          </Route>
          <Route path="/Main/FindTeam" exact>
            <FindTeam />
          </Route>
          <Route path="/Main/FindTeam/AddTeam" exact>
            <AddTeam />
          </Route>
          <Route path="/Main/FindTeam/JoinTeam" exact>
            <JoinTeam />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;