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
import { Backdrop, Box, Button, CircularProgress, InputAdornment, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { getDashboardDD,getSAComponentALL,getSAComponentWise } from '../../../slice/SADashboardSlice';
import LoadingError from '../../../ui-component/LoadingError';
import { tableHeaderBgColor } from '../../ra/colorCodes';
import CustomH2 from '../../../ui-component/Headings/CustomH2';
import CustomDashedBorder from '../../../ui-component/CustomDashedBorder';

//security_layer,scored_marks,perc,max_marks
const SADashboard = () => {

  const { mySite, myRa: raid } = useSelector((state) => state.auth);
  const [fetchError, setFetchError] = useState(false);    
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowsDD, setRowsDD] = useState([]);
  const [ddValue, setDDValue] = useState();
  const [rowsComponentWise, setRowsComponentWise] = useState([]);
  const dispatch = useDispatch();

const columns = [
        { id: 'security_layer', label: 'Security layer', minWidth: 120 },
        { id: 'max_marks', label: <>Sum of<br/>Maximum Marks</>, minWidth: 100 },
        { id: 'scored_marks', label: <>Sum of<br/>Scored Marks</>, minWidth: 100 },
        { id: 'perc', label: '%age', minWidth: 100}
      ];

  
const columnsCompWise = [
        { id: 'security_comp', label: 'Security Component', minWidth: 170 },
        { id: 'max_marks', label: <>Sum of<br/>Maximum Marks</>, minWidth: 100 },
        { id: 'scored_marks', label: <>Sum of<br/>Scored Marks</>, minWidth: 100 },
        { id: 'perc', label: '%age', minWidth: 100}
      ];


  const DDOnChange = (event,newValue) => {
    const args ={raid: raid, comp: newValue.security_comp}
    setDDValue({ security_comp: newValue.security_comp});
    setIsSubmitting(true);
    dispatch(getSAComponentALL(args)).unwrap()
        .then((resp)=>{
            if(resp && resp.data && resp.data.length>0)
            {
               let rawData = resp.data;
               const totalMax_marks = rawData.reduce((sum, row) => sum + row.max_marks, 0);
               const totalScored_marks = rawData.reduce((sum, row) => sum + row.scored_marks, 0);
               const totalRow = {
                  security_layer: 'Total',
                  max_marks: totalMax_marks,
                  scored_marks: totalScored_marks,
                  perc: ((totalScored_marks*100)/totalMax_marks).toFixed(2),
                };
                const dataWithTotal = [...rawData, totalRow];
                setRows(dataWithTotal)
            } 
            setFetchError(false);
            setIsSubmitting(false);
        })
        .catch((err) => {
                 setFetchError(err.message);
                 setIsSubmitting(false);
        });

  }
  const fetchList = () =>{
    setIsSubmitting(true);
    dispatch(getDashboardDD(raid)).unwrap()
        .then((resp)=>{
            if(resp && resp.data && resp.data.length>0)
            {
              const rawData = resp.data;
              const all = { security_comp: 'All'}
              setDDValue(all);
              const dataWithAll = [all, ...rawData];
              setRowsDD(dataWithAll)

              DDOnChange(null, all);
            } 
            setFetchError(false);
            setIsSubmitting(false);
        })
        .catch((err) => {
                 setFetchError(err.message);
                 setIsSubmitting(false);
        });


    setIsSubmitting(true);
    dispatch(getSAComponentWise(raid)).unwrap()
        .then((resp)=>{
            if(resp && resp.data && resp.data.length>0)
            {
              let rawData = resp.data;
               const totalMax_marks = rawData.reduce((sum, row) => sum + row.max_marks, 0);
               const totalScored_marks = rawData.reduce((sum, row) => sum + row.scored_marks, 0);
               const totalRow = {
                  security_comp: 'Total',
                  max_marks: totalMax_marks,
                  scored_marks: totalScored_marks,
                  perc: ((totalScored_marks*100)/totalMax_marks).toFixed(2),
                };
                const dataWithTotal = [...rawData, totalRow];
                //setRowsComponentWise(resp.data)
                setRowsComponentWise(dataWithTotal)
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

      <Grid container spacing={2} >
      <Grid item  sm={6}>
         <Autocomplete
                    disableClearable={true}
                    options =  {rowsDD}
                    //sx={{ width: 300, marginBottom:2 }}
                    value={ddValue ? ddValue : "All"} 
                    getOptionLabel={(option) => option.security_comp || ""}
                    onChange={(event, newValue) => {DDOnChange(event,newValue)}}
                    renderInput={(params) => (
                    <TextField {...params}  variant="standard" />
                    )}
                  />
      </Grid>
      <Grid item  sm={6}></Grid>
        <Grid item  sm={6}>
              {!fetchError && 
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer >
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow sx={{ "& th": { backgroundColor: tableHeaderBgColor, color: "black",height:80 } }}>
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
                            .map((row) => {
                              return (
                                <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px', backgroundColor: row.security_layer === 'Total' ? tableHeaderBgColor : ''  }}>
                                  {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, fontWeight: row.security_layer === 'Total' ? 'bold' : 'normal' }}>
                                        {value}
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
              }
        
          </Grid>
          <Grid item  sm={6}>
          <> 
            {!fetchError && 
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 420 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow sx={{ "& th": { backgroundColor: tableHeaderBgColor, color: "black",height:80 } }}>
                        {columnsCompWise.map((column) => (
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
                      {rowsComponentWise
                        .map((row) => {
                          return (
                            <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px', backgroundColor: row.security_comp === 'Total' ? tableHeaderBgColor : '' }}>
                              {columnsCompWise.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0 ,fontWeight: row.security_comp === 'Total' ? 'bold' : 'normal' }}>
                                    {value}
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
            }
          </>
          </Grid>
      </Grid>



         {fetchError && <LoadingError err={fetchError} onClick={fetchList} />}
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isSubmitting}
            //onClick={handleClose}
        >
            <CircularProgress sx={{ color: "white" }} />
        </Backdrop>
   </>
  )
}

export default SADashboard
