import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Court from "../Court";
import { Button } from "../Button";
import "./Add.css"
import loadingImage from "../loading.gif"; // Import your loading image

function AddTeam({ obiect }) {
  const [numeEchipa, setNumeEchipa] = useState("");
  const [descriereEchipa, setDescriereEchipa] = useState("");
  const [nrMembriActuali, setNrMembriActuali] = useState(0);
  const [numarMembriDoriti, setNumarMembriDoriti] = useState(0);
  const [emailCapitan, setEmailCapitan] = useState(localStorage.getItem("email"));
  const [totok, setTotok] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  
  const checkAll = () => {
    if (
      numeEchipa === "" ||
      descriereEchipa === "" ||
      nrMembriActuali === 0 ||
      numarMembriDoriti === 0 
    ) {
      setTotok(false);
      return 0;
    } else {
      setTotok(true);
      return 1;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(checkAll());
    setIsLoading(true); // Set loading state to true
    // let fileData = new FormData();
    // fileData.append('fileData', selectedFile);
    //console.log(Basket, Fotbal, Tenis);
    if (checkAll()) {
      const formData = new FormData();
      formData.append('numeEchipa', numeEchipa);
      formData.append('descriereEchipa', descriereEchipa);
      formData.append('nrMembriActuali', nrMembriActuali);
      formData.append('numarMembriDoriti', numarMembriDoriti);
      formData.append('emailCapitan', emailCapitan);
      try {
        await axios.post('http://localhost:8080/echipe', formData, {
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
      <div
        style={{
          
        }}
      >
        <div className="addSection">
        <form className="add-form">
          <label className="labelAdd"> Team Description </label>
          <textarea className="textAreaAdd"
            value={descriereEchipa}
            onChange={(e) => {
              setDescriereEchipa(e.target.value);
              checkAll();
            }}
            placeholder="Enter the description"
          ></textarea>

          <label className="labelAdd">Team Name</label>
          <input className="city-input"
            value={numeEchipa}
            onChange={(e) => {
              setNumeEchipa(e.target.value);
              checkAll();
            }}
            type="text"
            placeholder="Enter the team name"
          ></input>

          <label className="labelAdd">Current number of players</label>
          <input className="address-input"
            value={nrMembriActuali}
            onChange={(e) => {
              setNrMembriActuali(e.target.value);
              checkAll();
            }}
            type="text"
            placeholder="Enter the current number of players"
          ></input>

        <label className="labelAdd">Desired number of players</label>
          <input className="address-input"
            value={numarMembriDoriti}
            onChange={(e) => {
              setNumarMembriDoriti(e.target.value);
              checkAll();
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
              All field must be completed!{" "}
            </p>
          </div>
        )}
        <button className="btn btn-outline btn--medium" onClick={handleSubmit}>
          Add the team!
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
export default AddTeam;
