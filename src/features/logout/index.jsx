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
import Button, { CancelButton } from '../../ui-component/Controls/Button';
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardActions, CardContent, IconButton, Link, Typography } from '@mui/material';
import { logoutUser, setMyRa, setMySite } from '../../slice/AuthSlice';
import { tableHeaderBgColor } from '../ra/colorCodes';


const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mySite, myRa } = useSelector((state) => state.auth);

  const signOut = () => {
    dispatch(setMyRa(null));
    dispatch(setMySite(null));

    dispatch(logoutUser(null)).unwrap()
      .then((res) => {
        sessionStorage.setItem('token', "");
        navigate('/login');
      })
      .catch((err) => {
        sessionStorage.setItem('token', "");
        navigate('/login');
      });
  }
  const cancel = () => {
    if (myRa) {
      navigate('/sa')
    }
    else if (mySite) {
      navigate('/site/tran')
    }
    else {
      navigate('/site')
    }
  }

  return (
    <>


      <Grid container flexDirection={'column'}>
        <Grid item>
          <br />
          <br />

          <br />
        </Grid>
        <Grid item>
          <center></center>
        </Grid>
        <Grid item>
          <center>
            <br />


          </center>
        </Grid>
      </Grid>

      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '60px' }}>
        <Card sx={{ minWidth: 400, maxWidth: 1000 }} elevation={3}>
          <CardContent>

            <Typography variant="h5" sx={{ mb: 3 }}>
              Log out
            </Typography>

            <Typography>
              Are you sure to Logout ?
            </Typography>

          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ m: 2, minWidth: 150 }} onClick={signOut}>Logout</Button>
            <CancelButton sx={{ m: 2, minWidth: 150 }}
              onClick={cancel}>Cancel</CancelButton>
          </CardActions>
        </Card>
      </div>
      <br />
      <br />

    </>
  )
}

export default Logout
