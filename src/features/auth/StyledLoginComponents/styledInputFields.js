//Import MUI
import { TextField, styled } from "@mui/material";

//Reusable Textfield for login screens

export const StyledTextField = styled(TextField)({
  marginTop: "25px",
  "& .MuiInput-root": {
    color: "#FFFFFF",
    borderBottom: "1px solid #FFFFFF !important",
    "&:before": {
      borderBottom: "1px solid #FFFFFF !important",
    },
    "&.Mui-error": {
      "&:after": {
        borderBottomColor: "#FFFFFF !important",
      },
      "&:before": {
        borderBottomColor: "#FFFFFF !important",
      },
    },
  },
  "& .MuiFormHelperText-root": {
    "&.Mui-error": {
      color: "#FFFFFF !important",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#FFFFFF !important",
    "&.Mui-error": {
      color: "#FFFFFF !important",
    },
  },
  "& .MuiIconButton-root": {
    color: "#FFFFFF",
  },
  "&.MuiTextField-root":{
    '& .MuiFormLabel-asterisk':{
      color: "#FFFFFF",
    }
  } 
  
  //backgroundColor: 'aliceblue',
  // padding: 8,
  // borderRadius: 4,
});
