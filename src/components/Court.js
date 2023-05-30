import React from "react";
import "./Court.css";

function Court({ obiect, key }) {
  //console.log(obiect);
  var id = obiect.id;
  var city = obiect.city;
  var owner = obiect.owner;
  var address = obiect.address;
  var description = obiect.description;
  var price = obiect.price;
  var isFotbal = obiect.football;
  var isBasket = obiect.basketball;
  var isTenis = obiect.tennis;

  return (
    <div className="court-div">
      <img
        src={require("../teren_fotbal.jpg")}
        style={{ height: "100%", borderRadius: "20px" }}
      ></img>
      <p id="description"> {description} </p>
      <div className="sporturi-container">
        <div>
          <input type="checkbox" name="basket" checked={isBasket} disabled />
          <label htmlFor="basket" style={{ color: isBasket ? 'green' : 'black' }}>Basket</label>
        </div>

        <div>
          <input type="checkbox" name="fotbal" checked={isFotbal} disabled />
          <label htmlFor="fotbal" style={{ color: isFotbal ? 'green' : 'black' }}>Football</label>
        </div>

        <div>
          {" "}
          <input type="checkbox" name="tenis" checked={isTenis} disabled />
          <label htmlFor="tenis" style={{ color: isTenis ? 'green' : 'black' }}>Tenis</label>
        </div>
      </div>
      <div className="pret-container">
        <p id="city">City : {city} </p>
        <p id="address">Address: {address} </p>
        <p id="price"> Price : {price} RON / ora</p>
      </div>
    </div>
  );
}

export default Court;
