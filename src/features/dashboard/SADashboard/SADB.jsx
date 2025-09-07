import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/GridLegacy';
import { Backdrop, Box, CircularProgress, InputAdornment, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { getSAComponentWise } from '../../../slice/SADashboardSlice';


const SADashboard = () => {

  const { mySite, myRa: raid } = useSelector((state) => state.auth);
  const [fetchError, setFetchError] = useState(false);    
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const fetchList = () =>{
      setIsSubmitting(true);
    dispatch(getSAComponentWise(raid)).unwrap()
        .then((resp)=>{
            if(resp && resp.data && resp.data.length>0)
            {
                setRows(resp.data)
            } 
            setFetchError(false);
            setIsSubmitting(false);
        })
        .catch((err) => {
                 setFetchError(err.message);
                 setIsSubmitting(false);
        });
}

    useEffect(() => {
         fetchList();
    }, []);
  return (
   <>
   abc
    <Autocomplete
         disableClearable={true}
        // options =  {row.obs_options.split('|')}
         fullWidth
        // value={value}   
         //getOptionLabel={(option) => option.label || ""}
        // onChange={(event, newValue) => {handleChange({target:{value: newValue}}, column.id,rowIndex)}}
         renderInput={(params) => (
         <TextField {...params}  variant="standard" />
         )}
    />
   </>
  )
}

export default SADashboard
