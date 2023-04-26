import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--medium", "btn--large"];
const DESTINATIONS = ["/", "/Login", "/Register"];

export const Button = ({
  destinationPage,
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonPage = DESTINATIONS.includes(destinationPage)
    ? destinationPage
    : DESTINATIONS[0];

  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to={checkButtonPage} className="btn-mobile">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
