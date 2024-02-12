// Funkcionalna komponenta koja predstavlja prilagođena dugmad.

import React, { useContext } from "react";
import { ThemeContext } from "../../../App";

const CustomButtons = ({
  text,
  variant = "default",
  style = {},
  className = "",
  ...props
}) => {
  const { theme } = useContext(ThemeContext); // pristup trenutnoj temi

  // Definisanje boja za dugmad
  let backgroundColor, hoverBackgroundColor;

  switch (variant) {
    case "save":
      backgroundColor = "#2ecc40";
      hoverBackgroundColor = "#39cccc";
      break;
    case "delete":
      backgroundColor = "red";
      hoverBackgroundColor = "orange";
      break;
    default:
      backgroundColor = theme === "dark" ? "#bb86fc" : "#39cccc";
      hoverBackgroundColor = theme === "dark" ? " #008080" : "#2ecc40";
      break;
  }

  // Definisanje stila dugmeta
  const buttonStyle = {
    backgroundColor,
    color: "white",
    border: "none",
    outline: "none",
    padding: "12px 0",
    borderRadius: "20px",
    width: "180px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: hoverBackgroundColor,
    },
    ...style,
  };

  // JSX sa primjenom stilova i ostalih propertija koji su proljeđeni komponenti.
  return (
    <button className={className} style={buttonStyle} {...props}>
      {text}
    </button>
  );
};

export default CustomButtons;
