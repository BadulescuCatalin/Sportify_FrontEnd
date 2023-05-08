import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Court from "../Court";
import { Button } from "../Button";

function Add({ obiect }) {
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [Basket, setBasket] = useState(false);
  const [Fotbal, setFotbal] = useState(false);
  const [Tenis, setTenis] = useState(false);
  const [pret, setPret] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [totok, setTotok] = useState(false);

  const checkAll = () => {
    if (
      description === "" ||
      city === "" ||
      address === "" ||
      pret === null ||
      selectedFile === null
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
    //console.log(Basket, Fotbal, Tenis);
    if (checkAll()) {
      await axios({
        url: "http://localhost:8080/fields",
        method: "POST",
        data: {
          owner: localStorage.getItem("username"),
          city: city,
          address: address,
          description: description,
          price: pret,
          basketball: Basket,
          football: Fotbal,
          tennis: Tenis,
          //fileData: selectedFile,
        },
      }).catch((err) => console.log(err));
      window.history.pushState({}, "", "/Main/ManageCourts");
      window.location.reload();
    } else return;
  };

  const handleFileInputChange = (event) => {
    //console.log(event.target);
    setSelectedFile(event.target.files[0]);
  };
  // TODO document
  return (
    <div>
      <div>
        <Navigation></Navigation>
      </div>
      <div
        style={{
          marginTop: "80px",
        }}
      >
        <form className="add-form">
          <label className="labelAdd"> Descriere teren </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              checkAll();
            }}
            placeholder="Enter the description"
          ></textarea>

          <label className="labelAdd">City</label>
          <input
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              checkAll();
            }}
            type="text"
            placeholder="Enter the city"
          ></input>

          <label className="labelAdd">Address</label>
          <input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              checkAll();
            }}
            type="text"
            placeholder="Enter the address"
          ></input>

          <label className="labelAdd">Basket</label>
          <input
            value={Basket}
            onChange={(e) => {
              setBasket(e.target.checked);
              checkAll();
            }}
            type="checkbox"
          ></input>

          <label className="labelAdd">Football</label>
          <input
            value={Fotbal}
            onClick={(e) => {
              setFotbal(e.target.checked);
              checkAll();
            }}
            type="checkbox"
          ></input>

          <label className="labelAdd">Tennis</label>
          <input
            value={Tenis}
            onClick={(e) => {
              setTenis(e.target.checked);
              checkAll();
            }}
            type="checkbox"
          ></input>

          <label for="number-input" className="labelAdd">
            Price
          </label>
          <input
            value={pret}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setPret(value);
              checkAll();
            }}
            type="text"
          ></input>

          <label for="number-input" className="labelAdd">
            Document
          </label>
          <input
            onChange={(e) => {
              //console.log(e);
              //console.log(e.target);
              handleFileInputChange(e);
            }}
            type="file"
            accept=".pdf"
          ></input>
        </form>
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
          Add the court!
        </button>
      </div>
    </div>
  );
}
export default Add;
