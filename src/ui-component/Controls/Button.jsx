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




export default function Button(props) {
  const { text, size, color, variant, onClick,isButtonDisabled, ...other } = props;
  //const classes = useStyles();
  return (
    <MuiButton
      sx={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #2C68B1",
                borderRadius: "4px",
                padding: "8px 14px",
                color: "#2c68b1",
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "300",
                fontSize: "14px",
                lineHeight: "16px",
                width: "110px",
                boxShadow: "none",
                transition: "none",
                cursor: "pointer",
                "&:hover": {
                  border: "2px solid #2196f3",
                  cursor: "pointer",
                },
              }}
      variant={variant || "contained"}
      onClick={onClick}
      size={size || "large"}
      color={"primary"}
      disabled = {isButtonDisabled || false}
      {...other}
      //classes={{ label: {textTransform: "none"} }}
    >
      {text}
    </MuiButton>
  );
}
