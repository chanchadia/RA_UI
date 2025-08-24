import React from 'react'
import { TextField } from '@mui/material';
// import { Box } from '@mui/system';

export default function Input(props) {

    const { name, label, value,error=null, onChange,width,height,marginTop,disabled,shrink, ...other } = props;
    return (
    //     <Box
     
    //   sx={{
    //     '& .MuiTextField-root': { m: 1, width: 'ch' },
    //   }}
      
    // >
        <TextField sx={{marginTop:{marginTop},marginBottom:'10px',width:{width},height:{height}}}
           disabled={disabled}   
           InputLabelProps={{
               shrink:shrink,
           }}
           variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
           
            {...other}
            {...(error && {error:true,helperText:error})}
        />
        // </Box>
    )
}
