import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSite } from '../../slice/SiteSlice';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { lightBlue } from '@mui/material/colors';
import { StyledButton as StyledLoginButton } from "../auth/StyledLoginComponents/styledButton";
import CustomH2 from '../../ui-component/Headings/CustomH2';
import Grid from '@mui/material/GridLegacy';
import CustomDashedBorder from '../../ui-component/CustomDashedBorder';
import { Button } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

const SiteTranList = (props) => {
      const navigate = useNavigate();

useEffect(() => {
    // dispatch(getSite("")).then((action, state) => {

    // if (action.payload != null && action.payload.data.length > 0) {
    //     setRows(action.payload.data)
    //     setHeaders(Object.keys(action.payload.data[0]));
    // }
    // });
}, []);
    
  return (
    <>
        <Grid container flexDirection={'column'}>
        <Grid item container display={'flex'} justifyContent={'space-between'}>

          <CustomH2 headingName='Survey Assessment (SA)'></CustomH2>
       <Button variant="contained" type='submit' sx={{ m: 1, minWidth: 150 }}
       onClick={()=>{
          navigate('/site/create/');
       }}
       >Create New SA</Button>

        </Grid>
        <Grid item flexGrow={1}>
          <CustomDashedBorder />
        </Grid>
      </Grid>
    </>
  )
}

export default SiteTranList
