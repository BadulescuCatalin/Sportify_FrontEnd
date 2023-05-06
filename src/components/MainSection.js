import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./MainSection.css";
import TextComponent from "./TextComponent";

function MainSection() {
  return (
    <div className="main-container">
      <TextComponent
        image="../teren_fotbal.jpg"
        textButon="Book it!"
        textMare="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... "
        textMic="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      />
      <img src={require("../teren_fotbal.jpg")} />
      <TextComponent
        image="../teren_fotbal.jpg"
        textButon="Book it!"
        textMare="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... "
        textMic="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      />
      <TextComponent
        image="../teren_fotbal.jpg"
        textButon="Book it!"
        textMare="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... "
        textMic="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      />
    </div>
  );
}

export default MainSection;
