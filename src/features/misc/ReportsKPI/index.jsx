

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
import { Autocomplete, Backdrop, Box, CircularProgress, Fab, Button as MuiButton, TextField } from '@mui/material';
import Button  from '../../../ui-component/Controls/Button';
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomH2 from '../../../ui-component/Headings/CustomH2';
import CustomDashedBorder from '../../../ui-component/CustomDashedBorder';
import SuccessAlert from '../../../ui-component/snackbar';
import getColor, { tableHeaderBgColor } from '../../ra/colorCodes';


import AddIcon from '@mui/icons-material/Add';
import LoadingError from '../../../ui-component/LoadingError';
import TableDataLoading from '../../../ui-component/TableDataLoading';
import { getReports, saveReports, getKPI, saveKPI } from '../../../slice/ReportsKPISlice';
import { isString } from 'formik';

const ReportsKPI = (props) => {

    const { mySite, myRa: raid } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();

  const [fetchError, setFetchError] = useState(false);    
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  
  const [isDisabled, setIsDisabled] = useState(false);
  const [successAlert, setsuccessAlert] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    isError: false,
    handleClose: () => {
      setsuccessAlert({ ...successAlert, open: false, message: "", isError: false });
      setIsDisabled(false);
    }
  });

  const columns = [		
    { id: 'rpt_name', label: 'Report Name', minWidth: 120, isString: true },
    { id: 'freq', label: 'Frequency', minWidth: 120, isString: true, options:['Daily','Weekly','Bi-weekly','Monthly','Quarterly','Bi-annual','Annual'] },
    { id: 'rpt_from', label: 'From', minWidth: 120, isString: true },
    { id: 'rpt_to', label: 'To', minWidth: 120, isString: true },
    { id: 'validator', label: 'Validator', minWidth: 120, isString: true },
    { id: 'data_src', label: 'Data source', minWidth: 120, isString: true },
    { id: 'remarks', label: 'Remarks', minWidth: 120, isString: true },
  ];

  const columns1 = [		
    { id: 'kpi_name', label: 'KPI', minWidth: 240, isString: true },
    { id: 'measure', label: 'Measurement', minWidth: 240, isString: true },
    { id: 'target_perc', label: 'Target', minWidth: 50},
  ];

  const dispatch = useDispatch();
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);


  const handleChange1 = (e, column, rowID) => {
    let value = e.target.value;

    if (!column.isString) {
      value = value.replace(/[^0-9]/g, '');

      // Convert to a number for range validation
      const num = parseInt(value, 10);

      // Validate if it's a number and within the range 1-100
      if (value === '' || (!isNaN(num) && num >= 1 && num <= 5)) {
      }
      else {
        return;
      }
    }

    const v_rows = [...rows1];
    v_rows[rowID][column.id] = value;

    setRows1(v_rows);
  }

    const handleChange2 = (e, column, rowID) => {
    let value = e.target.value;

    if (!column.isString) {
        const matches = value.match(/\./g); // Global search for all dots
        if(matches !== null && matches.length >= 2) //contains more than one dot
        {
          return;
        }
        value = value.replace(/[^0-9.]/g, '');

        //Convert to a number for range validation
        const num = parseFloat(value, 10);

        //Validate if it's a number and within the range 1-100
        if (value === '' || (!isNaN(num) && num > 0 && num <= 100)) 
        {
        }
        else 
        {
            return;
        }
    }


    const v_rows = [...rows2];
    v_rows[rowID][column.id] = value;
    setRows2(v_rows);
  }

 
    const fetchList = () =>{
      setIsFetching(true);
      dispatch(getReports(raid)).unwrap()
      .then((resp) => {
        if (resp && resp.data && resp.data.length > 0) {
          setRows1([...resp.data])
        }
        else
        {
            setRows1([{active: 'Y'}])
        }
        //setFetchError(false);
        //setIsFetching(false);

        dispatch(getKPI(raid)).unwrap()
            .then((resp) => {
                if (resp && resp.data && resp.data.length > 0) {
                    setRows2([...resp.data])
                }
                else
                {
                    setRows2([{active: 'Y'}])
                }
                setFetchError(false);
                setIsFetching(false);
                
            })
            .catch((err) => {
                setFetchError(err.message);
                setIsFetching(false);
            });

      })
      .catch((err) => {
         setFetchError(err.message);
        setIsFetching(false);
      });
}

  useEffect(() => {
   fetchList();
  }, []);


  const onSubmit = () => {
    const v_rows1 = rows1.filter(item => item.rpt_name && item.rpt_name.trim() !== '');
    const v_rows2 = rows2.filter(item => item.kpi_name && item.kpi_name.trim() !== '');

    const chk = [...v_rows2].filter(item => !item.measure || item.measure.trim() === '' || !item.target_perc || item.target_perc === 0);
    if(chk.length > 0)
    {
        setsuccessAlert({ ...successAlert, open: true, message: 'Please input Measurement and Target', isError: true });
        return;
    }

    const arr1 = v_rows1.map((row, index) => {return row.rpt_name.trim() ;})
    const dupArr1 = arr1.filter((e, i, a) => a.indexOf(e) !== i) // [2, 4]
    if(dupArr1.length>0)
    {
      setsuccessAlert({...successAlert, open: true, message: `Duplicate Report name found - ${dupArr1[0]}`, isError: true});
      return;
    }

    const arr2 = v_rows2.map((row, index) => {return row.kpi_name.trim() ;})
    const dupArr2 = arr2.filter((e, i, a) => a.indexOf(e) !== i) // [2, 4]
    if(dupArr2.length>0)
    {
      setsuccessAlert({...successAlert, open: true, message: `Duplicate KPI found - ${dupArr2[0]}`, isError: true});
      return;
    }

    const data = [...v_rows1];

    setIsSubmitting(true)
    dispatch(saveReports({ data, raid })).unwrap()
      .then((res) => {

        dispatch(saveKPI({ data: v_rows2, raid })).unwrap()
        .then((res) => {
            setIsSubmitting(false)
            
            
            setsuccessAlert({
            ...successAlert, open: true, message: res.message, isError: false
            });

        })
        .catch((err) => {
            setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
            setIsSubmitting(false);
        });


        setIsSubmitting(false)
        
        setRows1([]);
        setRows2([]);
        fetchList();
      })
      .catch((err) => {
        setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
        setIsSubmitting(false)
      });
  }


  return (
    <>


      <Grid container flexDirection={'column'}>
        <Grid item container display={'flex'} justifyContent={'space-between'}>

          <CustomH2 headingName='Reports and KPI'></CustomH2>
          <Button variant="contained" type='submit' sx={{ m: 1, minWidth: 150 }}
            onClick={onSubmit}
          >Save</Button>

        </Grid>
        <Grid item flexGrow={1}>
          <CustomDashedBorder />
        </Grid>
      </Grid>

      {!fetchError && 
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ height: '65vh' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { color: "black", padding:2, textAlign: 'center' } }}>
                {columns.map((column, i) => (
                  column.label &&
                  <TableCell sx={{background: tableHeaderBgColor}}
                    key={column.id}
                    style={{ minWidth: column.minWidth, border: '1px solid white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetching ? <TableDataLoading cols={columns.length} />
                :rows1
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px' }}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                              <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, width: column.minWidth }}
                              >
                                {
                                column.readonly ? value
                                :column.options ?
                                <Autocomplete 
                                      disableClearable={true}
                                      options =  {column.options}
                                      fullWidth
                                      value={value || ''}   
                                      //getOptionLabel={(option) => option || ""}
                                      onChange={(event, newValue) => {handleChange1({target:{value:newValue}},column,index)}}
                                      renderInput={(params) => (
                                      <TextField {...params}  variant="standard" />
                                      )}
                                  />
                                :
                                <TextField 
                                        variant="standard"
                                        fullWidth
                                        // multiline={true}
                                        value={value || ''}
                                        onChange={(e) => handleChange1(e, column,index)}
                                      />
                                }
                              </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
            <MuiButton onClick={()=>{
                const v_rows = [...rows1, {ta:'Insider', active:'Y'}];
                setRows1(v_rows);
            }}>Add</MuiButton>
            <TableHead>
              <TableRow sx={{ "& th": { color: "black", padding:2, textAlign: 'center' } }}>
                {columns1.map((column, i) => (
                  column.label &&
                  <TableCell sx={{background: tableHeaderBgColor}}
                    key={column.id}
                    style={{ minWidth: column.minWidth, border: '1px solid white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetching ? <TableDataLoading cols={columns.length} />
                :rows2
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px' }}>
                      {columns1.map((column) => {
                        const value = row[column.id];
                        return (
                              <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, width: column.minWidth }}
                              >
                                {
                                column.readonly ? value
                                :column.options ?
                                <Autocomplete 
                                      disableClearable={true}
                                      options =  {column.options}
                                      fullWidth
                                      value={value || ''}   
                                      //getOptionLabel={(option) => option || ""}
                                      onChange={(event, newValue) => {handleChange2({target:{value:newValue}},column,index)}}
                                      renderInput={(params) => (
                                      <TextField {...params}  variant="standard" />
                                      )}
                                  />
                                :column.isString ?
                                <TextField 
                                        variant="standard"
                                        fullWidth
                                        // multiline={true}
                                        value={value || ''}
                                        onChange={(e) => handleChange2(e, column,index)}
                                      />
                                :
                                <TextField 
                                    slotProps={{ input: { endAdornment: <Box pl={0.5}>%</Box>}}}
                                    sx={{
                                        '& .MuiInputBase-input': {
                                        textAlign: 'right',
                                        },
                                        }}
                                        variant="standard"
                                        fullWidth
                                        // multiline={true}
                                        value={value || ''}
                                        onChange={(e) => handleChange2(e, column,index)}
                                      />
                                }
                              </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
            <MuiButton onClick={()=>{
                const v_rows = [...rows2, {ta:'Outsider', active:'Y'}];
                setRows2(v_rows);
            }}>Add</MuiButton>

    
          </Table>
        </TableContainer>

      </Paper>
      }

      {fetchError && <LoadingError err={fetchError} onClick={fetchList} />}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      //onClick={handleClose}
      >
        <CircularProgress sx={{ color: "white" }} />
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        open={isDisabled}
      //onClick={handleClose}
      ></Backdrop>
      <SuccessAlert successAlert={successAlert} />

    </>
  )
}

export default ReportsKPI
