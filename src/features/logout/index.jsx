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
import { StyledButton as StyledLoginButton } from "../auth/StyledLoginComponents/styledButton";
import CustomH2 from '../../ui-component/Headings/CustomH2';
import Grid from '@mui/material/GridLegacy';
import CustomDashedBorder from '../../ui-component/CustomDashedBorder';
import Button, { CancelButton }  from '../../ui-component/Controls/Button';
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Link } from '@mui/material';
import { logoutUser, setMyRa, setMySite } from '../../slice/AuthSlice';
import { tableHeaderBgColor } from '../ra/colorCodes';


const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mySite, myRa } = useSelector((state) => state.auth);

  const signOut = () =>{
    dispatch(setMyRa(null));
    dispatch(setMySite(null));

    dispatch(logoutUser(null)).unwrap()
    .then((res)=>{
        sessionStorage.setItem('token', "");
        navigate('/login');
    })
    .catch((err) => {
        sessionStorage.setItem('token', "");
        navigate('/login');
    });
  }
  const cancel = () =>{
    if(myRa)
    {
        navigate('/sa')
    }
    else if(mySite)
    {
        navigate('/site/tran')
    }
    else
    {
        navigate('/site')
    }
  }

  return (
    <>


      <Grid container flexDirection={'column'}>
        <Grid item>
            <br/>
            <br/>
            <center><CustomH2 headingName='Log out'></CustomH2></center>
            <br/>
        </Grid>
        <Grid item>
            <center>Are you sure to Logout ?</center>
        </Grid>
        <Grid item>
            <center>
                <br />
                <Button variant="contained" sx={{ m: 2, minWidth: 150 }} onClick={signOut}>Logout</Button>
                <CancelButton sx={{ m: 2, minWidth: 150 }}
                onClick={cancel}>Cancel</CancelButton>

            </center>
        </Grid>
      </Grid>

      

    </>
  )
}

export default Logout
