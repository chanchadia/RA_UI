import * as React from 'react';
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker as DatePickerr} from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';

export default function DatePicker(props) {
  const { name, label, value, onChange } = props
  
  const convertToDefEventPara = (name, value) => ({
    target: {
        name, value
    }
})
  return (
    <Box mt={2}>
<LocalizationProvider dateAdapter={AdapterDateFns} >
      <DatePickerr 
        label={label}
        name={name}
        value={value}
        onChange={date =>onChange(convertToDefEventPara(name,date))}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </Box>
    
  );
}
