import React, { useEffect } from "react";

//Project Import
import PasswordValidationCSS from "../AuthLoginForm.module.css";

//MUI import
import { Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material";

import { PasswordValidationCriteriaCheckFn } from "../userSlice";
import { useDispatch } from "react-redux";

//Reusable code for below validations it can be modifeid if need to add more.

const StyledSpan = styled("span")`
  padding: 10px;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #414749;
`;

let color1 = "#414749",
  color2 = "#414749",
  color3 = "#414749",
  color4 = "#414749",
  color5 = "#414749";

const Falsyobj1 = {
  value1Fl: false,
  value2Fl: false,
  value3Fl: false,
  value4Fl: false,
  value5Fl: false,
};

function StyledValidations(props) {
  const dispatch = useDispatch();
  if (props.newPassword.length >= "8") {
    color1 = "#75D02D";
    Falsyobj1.value1Fl = true;
  } else {
    color1 = "#414749";
    Falsyobj1.value1Fl = false;
  }
  if (props.newPassword.match(/[A-Z]/)) {
    color2 = "#75D02D";
    Falsyobj1.value2Fl = true;
  } else {
    color2 = "#414749";
    Falsyobj1.value2Fl = false;
  }
  if (props.newPassword.match(/[a-z]/)) {
    color3 = "#75D02D";
    Falsyobj1.value3Fl = true;
  } else {
    color3 = "#414749";
    Falsyobj1.value3Fl = false;
  }
  if (props.newPassword.match(/\d+/g)) {
    color4 = "#75D02D";
    Falsyobj1.value4Fl = true;
  } else {
    color4 = "#414749";
    Falsyobj1.value4Fl = false;
  }
  // eslint-disable-next-line no-useless-escape
  if (props.newPassword.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    color5 = "#75D02D";
    Falsyobj1.value5Fl = true;
  } else {
    color5 = "#414749";
    Falsyobj1.value5Fl = false;
  }
  const areFalse = Object.values(Falsyobj1).every((value) => value === true);
  useEffect(() => {
    dispatch(PasswordValidationCriteriaCheckFn(areFalse));
  }, [areFalse,dispatch]);

  return (
    <>
      <Typography className={PasswordValidationCSS.PwdValidatorHeading}>
        Choose a password that contains:
      </Typography>
      <Typography>
        <CircleIcon sx={{ height: "12px", width: "12px", color: color1 }} />
        <StyledSpan>Atleast 8 characters </StyledSpan>
      </Typography>
      <Typography>
        <CircleIcon sx={{ height: "12px", width: "12px", color: color2 }} />
        <StyledSpan>Atleast 1 Uppercase letter </StyledSpan>
      </Typography>
      <Typography>
        <CircleIcon sx={{ height: "12px", width: "12px", color: color3 }} />
        <StyledSpan>Atleast 1 Lowercase letter </StyledSpan>
      </Typography>
      <Typography>
        <CircleIcon sx={{ height: "12px", width: "12px", color: color4 }} />
        <StyledSpan>Atleast 1 Number </StyledSpan>
      </Typography>
      <Typography>
        <CircleIcon sx={{ height: "12px", width: "12px", color: color5 }} />
        <StyledSpan>Special Characters</StyledSpan>
      </Typography>
    </>
  );
}

export default StyledValidations;
