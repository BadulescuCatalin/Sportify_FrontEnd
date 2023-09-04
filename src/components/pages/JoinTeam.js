import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Court from "../Court";
import { Button } from "../Button";
import "./Add.css";
import { useLocation } from "react-router-dom";
import loadingImage from "../loading.gif"; // Import your loading image

function JoinTeam({ obiect }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const index = queryParams.get("index");
  const [nrMembriActuali, setNrMembriActuali] = useState(0);
  const [emailCapitan, setEmailCapitan] = useState(
    localStorage.getItem("email")
  );
  const [totok, setTotok] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [mesajEroare, setMesajEroare] = useState("");

  const checkAll = () => {
    if (nrMembriActuali <= 0) {
      setTotok(false);
      setMesajEroare("All fields must be completed");
      return 0;
    } else if (nrMembriActuali > localStorage.getItem("maximumPlayers")) {
      setTotok(false);
      setMesajEroare(
        "The maximum number of players you can add is " +
          localStorage.getItem("maximumPlayers")
      );
      return 0;
    } else {
      setTotok(true);
      return 1;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log();
    setIsLoading(true); // Set loading state to true

    if (checkAll()) {
      const formData = new FormData();
      formData.append("nrMembri", nrMembriActuali);
      formData.append("email", emailCapitan);
      try {
        await axios.put(`http://localhost:8080/echipe/add/${index}`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        window.history.pushState({}, "", "/Main/FindTeam");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false); // Set loading state back to false
    } else {
      setIsLoading(false);
      return;
    }
  };

  return (
    <div>
      <div>
        <Navigation></Navigation>
      </div>
      <div style={{}}>
        <div className="addSection">
          <form className="add-form">
            <p>Welcome to the team!</p>
            <label className="labelAdd">Number of players</label>
            <input
              className="address-input"
              value={nrMembriActuali}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setNrMembriActuali(parseInt(value, 10));
                // checkAll();
                // handleChangeMembri(e);
              }}
              type="text"
              placeholder="Enter the current number of players"
            ></input>

            {totok === false && (
              <div
                style={{
                  alignSelf: "center",
                  maxWidth: "200px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: "red",
                    alignSelf: "center",
                    fontSize: "0.85rem",
                  }}
                >
                  {mesajEroare}{" "}
                </p>
              </div>
            )}
            <button
              className="btn btn-outline btn--medium"
              onClick={handleSubmit}
            >
              Join the team!
            </button>

            {isLoading && (
              <div className="loading-container">
                <div className="loading-overlay" />
                <div className="loading-box">
                  <img
                    src={loadingImage}
                    alt="Loading"
                    className="loading-image"
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default JoinTeam;
