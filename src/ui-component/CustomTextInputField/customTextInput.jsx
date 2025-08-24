import React from "react";
import { useField } from "formik";
import { TextField, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
      MuiInputLabel: {
        styleOverrides: {
          standard: {
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: '16px',
            lineHeight: '22px',
            color: '#384160',
          },
          "root": {
            "&.Mui-error": {
              color: "#c11313"
            },
            "&.Mui-focused": {
              color: "#384160"
            },
            
        },
       
    },
  }, 
}
});


const CustomTextInput = ({ ...props }) => {

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  const { multiline, label, rows } = props;
  return (
    <ThemeProvider theme={theme}>
      <TextField
        {...field}
        {...props}
        multiline={multiline}
        id="standard-basic"
        label={label}
        variant="standard"
        fullWidth
        rows={rows}
        error={meta.touched && meta.error ? true : false}
        // helperText={ field.value === "" && meta.error }
        disabled = {props.disabled || false}
        sx={{"&.Mui-disabled": {
          color: "green"
        }}}
        helperText={ meta.touched &&  meta.error  }
        
      />
    </ThemeProvider>
  );
};

export default React.memo(CustomTextInput);
