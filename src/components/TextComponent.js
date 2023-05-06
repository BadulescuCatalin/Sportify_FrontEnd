import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./TextComponent.css";

function TextComponent({ textMare, textMic, textButon, pathButon }) {
  return (
    <div className="texte-container">
      <p className="textMare">{textMare}</p>
      <p className="textMic">{textMic}</p>
      <Button destinationPage={pathButon}>{textButon}</Button>
    </div>
  );
}

export default TextComponent;
