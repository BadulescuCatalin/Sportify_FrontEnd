import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./NavbarLogged.css";

function NavbarLogged() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  useEffect(() => {
    showButton();
  }, []);

  return (
    <div>
      <>
        <nav className="navbarLogged">
          <div className="navbarLogged-container">
            <Link to="/" className="navbarLogged-logo" onClick={closeMobileMenu}>
              <img
                style={{ width: "100px", height: "100px" }}
                src={require("../sportify_logo.png")}
                alt=""
              />{" "}
              SPORT
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/HomeLogged" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <p className="username">user_din_baza</p>
              </li>
              <li className="nav-item">
                <Link
                  to="/Register"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </li>
            </ul>
            {button && (
              <Button destinationPage="/" buttonStyle="btn--outline">
                {" "}
                Logout{" "}
              </Button>
            )}
          </div>
        </nav>
      </>
    </div>
  );
}

export default NavbarLogged;
