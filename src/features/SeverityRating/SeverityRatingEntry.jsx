import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSeverity } from '../../slice/SeverityRatingSlice';
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
import { Button, TextField } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate,useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import CustomTextInput from '../../ui-component/CustomTextInputField/customTextInput';

const SeverityRatingEntry = (props) => {

     const navigate = useNavigate();
     const {raid} = useParams();
      const columns = [
        { id: 'sr', label: 'Rating', minWidth: 50 },
        { id: 'p', label: 'P', minWidth: 170 },
        { id: 'e', label: 'E', minWidth: 170 },
        { id: 'a', label: 'A', minWidth: 170 },
        { id: 'r', label: 'R', minWidth: 170 },
    
      ];
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);

  const colorCodes = (val) => {
    if(val === 5) return '#f90606ff';
    else if(val === 4) return '#fa7b04ff';
    else if(val === 3) return '#dffc07ff';
    else if(val === 2) return '#03cbfdff';
    else if(val === 1) return '#05fd32ff';
    else return '';
    
  } 
const handleChange = (e, columnId,rowID) => {
    const v_rows = [...rows];
    v_rows[rowID][columnId] = e.target.value;
    setRows(v_rows);
}

useEffect(() => {
     dispatch(getSeverity(raid)).unwrap()
        .then((resp)=>{
            debugger;
            if(resp && resp.data && resp.data.length>0)
            {
                    setRows(resp.data)
                    setHeaders(Object.keys(resp.data[0]));
            } 
        })
        .catch((err) => {
            //setSingleSiteData(true); // to disable form
            //setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
        });
}, []);
  return (
    <>
       <Grid container flexDirection={'column'}>
        <Grid item container display={'flex'} justifyContent={'space-between'}>
          <CustomH2 headingName='Severity Rating Matrix'></CustomH2>
        </Grid>
        <Grid item flexGrow={1}>
          <CustomDashedBorder />
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ "& th": { backgroundColor: "lightBlue", color: "black" } }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .map((row,index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px' }}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, backgroundColor: column.id==='sr' ? colorCodes(value): '' }}
                          >
                            {column.id==='sr' ? value
                            :
                             <TextField
                                    multiline
                                   // id="standard-basic"
                                    //label={label}
                                    variant="standard"
                                    fullWidth
                                    rows={2}
                                    value={value}
                                    onChange={(e) => handleChange(e, column.id,index)}
                                  />
                            }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

export default SeverityRatingEntry
