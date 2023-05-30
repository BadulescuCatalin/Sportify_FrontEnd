import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./MainSection.css";
import TextComponent from "./TextComponent";

function MainSection() {
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  return (
    <div className="main-container">
      <div className="section-container section-container1">
        <TextComponent
          textButon="Book it!"
          textMare="Do you want to reserve a  sport court?"
          textMic="Experience an unforgettable sports adventure! Reserve a sports field now and turn your passion into reality!
          With every step we take, we learn that our health and well-being are incredibly important. 
          And what could be more fitting than cultivating these values through a fun and energizing physical activity? "
          pathButon="/Main/Book"
        />
        <img
  style={{
    width: "300px",
    height: "300px",
    borderRadius: "10px",
    objectFit: "cover",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
  }}
  src={require("../teren_fotbal.jpg")}
  alt="Football field"
/>

      </div>

      <div className="section-container section-container2">
        <img
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "10px",
            objectFit: "cover",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          src={require("../team.jpg")}
        />
        <TextComponent
          textButon="Find a team!"
          textMare="Are you passionate about sports and looking for a team to play with?"
          textMic="Join fellow sports enthusiasts and experience the thrill of playing basketball, football, or tennis with like-minded individuals. Whether you're a seasoned player or just starting out, 
          our team finder will connect you with the right people who share your passion for the game."
          pathButon="/Main/FindTeam"
        />
      </div>

      {role === "owner" && (
        <div className="section-container section-container3">
          <TextComponent
            textButon="Manage courts!"
            textMare="Manage your sport field with ease!"
            textMic="Are you a sports facility owner or manager? Take control of your sport field operations and streamline your management processes. Click the button below to access our comprehensive management platform "
            pathButon="/Main/ManageCourts"
          />
          <img
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "10px",
              objectFit: "cover",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            src={require("../manage.jpg")}
          />
        </div>
      )}
    </div>
  );
}

export default MainSection;
