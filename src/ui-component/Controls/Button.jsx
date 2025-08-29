import React from "react";
import { Button as MuiButton, styled } from "@mui/material";
//import { makeStyles } from "@mui/system";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // margin: theme.spacing(0.5)
//   },
//   label: {
//     textTransform: "none",
//   },
// }));


const StyledButton = styled(MuiButton)`
  color: #ffffff !important;
  background-color: #1c87abff !important ;
  font-family: "Roboto";
  font-style: normal;
  font-size: 16px;
  line-height: 16px;
  width: 165px;
  height: 36px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 50px;
  gap: 10px;
  text-transform: none;
`;

export default StyledButton;
