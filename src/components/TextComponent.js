import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./TextComponent.css";

function TextComponent({ textMare, textMic, textButon, pathButon }) {
  const newPath = pathButon + "";
  return (
    <div className="texte-container">
      <p className="textMare">{textMare}</p>
      <p className="textMic">{textMic}</p>
      <Button
  destinationPage={newPath}
  style={{
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "6px",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  }}
>
  {textButon}
</Button>

    </div>
  );
}

export default TextComponent;
