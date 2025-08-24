import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function Select(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    variant,
    minWidth,
    disabled,
    margin
  } = props;

  return (
    <FormControl
      variant={variant}
      sx={{ m: 1, minWidth: minWidth ? minWidth : 100,margin:margin ? margin : null }}
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange} disabled={disabled}>
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
