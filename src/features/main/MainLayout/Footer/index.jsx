import React from "react";

const Footer = () => {
  const footstyle = {
    backgroundColor: "#054960",
    position: "fixed",
    bottom: "0",
    zIndex: "111",
    textAlign: "center",
    padding: "3px",
    width: "100%",
  };
  const FootContent = {
    margin: "0",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "300",
    FontSize: "14px",
    lineHeight: "19px",
    color: "#ffffff",
  };
  return (
    <>
      <footer style={footstyle}>
        <p style={FootContent}>
          Copyright SeRA Pvt. Ltd, All Rights Reserved. Registered in India.
        </p>
      </footer>
    </>
  );
};
export default Footer;
