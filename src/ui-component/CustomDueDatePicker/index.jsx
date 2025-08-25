import React from "react";


//MUI Imports
import { TextField, createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// import "../../App.css";

const CustomDatePicker = ({ ...props }) => {
  const { valuedata, onChange, label } = props;
  // AutoComplete Styled Component
  const theme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          standard: {
            fontFamily: "Nunito",
            fontStyle: "normal",
            fontWeight: "300",
            fontSize: "16px",
            lineHeight: "22px",
            color: "#384160",
          },
          root: {
            "&.Mui-error": {
              color: "#c11313",
            },
            "&.Mui-focused": {
              color: "#384160",
            },
          },
        },
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="dueDate" style={{ display: "flex" }}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ display: "inline-block" }}
          >
              <DesktopDatePicker
                label={label}
                value={valuedata}
                //inputFormat="DD/MM/YYYY"
                format="DD-MM-YYYY"
                onChange={(v) => {
                  onChange(v);
                }}
                //renderInput={(params) => <TextField {...params} />}
                slotProps={{ textField: { variant: 'standard' } }}

                disabled = {props.disabled || false}
                //maxDate={props.minDate || ""}
                PopperProps={{
                  style:{zIndex:130009}
                }}
              />
          </LocalizationProvider>
        </div>
      </ThemeProvider>
    </>
  );
};

export default CustomDatePicker;
