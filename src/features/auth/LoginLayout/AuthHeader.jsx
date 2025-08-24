//React imports
import React from "react";

//MUI imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";

//Project imports
import AppLogo from "../../../assets/Logo.png";

const CustomizedToolbar = styled(Toolbar)`
  &.MuiToolbar-root {
    min-height: 60px;
    left: -1px;
    top: 0px;
    background: #ffffff;
  }
`;
//Header and logo for login screens
export default function AuthHeader() {
  return (
    <AppBar position="static">
      <CustomizedToolbar>
        <Logo />
      </CustomizedToolbar>
    </AppBar>
  );
}

const Logo = () => {
  return (
    <img
      src={AppLogo}
      alt="App"
      style={{
        width: "260.05px",
        height: "100%",
        left: "19px",
        top: "15px",
      }}
    />
  );
};