

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
import { Autocomplete, Backdrop, CircularProgress, Fab, Button as MuiButton, TextField } from '@mui/material';
import Button  from '../../../ui-component/Controls/Button';
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomH2 from '../../../ui-component/Headings/CustomH2';
import CustomDashedBorder from '../../../ui-component/CustomDashedBorder';
import SuccessAlert from '../../../ui-component/snackbar';
import getColor, { tableHeaderBgColor } from '../../ra/colorCodes';


import AddIcon from '@mui/icons-material/Add';
import LoadingError from '../../../ui-component/LoadingError';
import TableDataLoading from '../../../ui-component/TableDataLoading';
import { getThreatActor, saveThreatActor } from '../../../slice/ThreatActorSlice';
import { isString } from 'formik';

const ThreatActor = (props) => {

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
    { id: 'ta', label: 'Threat Actor', minWidth: 120, readonly: true },
    { id: 'person', label: 'Persons', minWidth: 120, isString: true },
    { id: 'tac', label: 'TAc', minWidth: 120},
  ];

  const dispatch = useDispatch();
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);


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


    const v_rows = [...rows2];
    v_rows[rowID][column.id] = value;

    setRows2(v_rows);
  }

    const handleChange3 = (e, column, rowID) => {
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

    const v_rows = [...rows3];
    v_rows[rowID][column.id] = value;

    setRows3(v_rows);
  }

    const makeTacNull = (x) =>
    {
        x.tac = x.tac === 0 ? null : x.tac;
        return x;
    }
    const fetchList = () =>{
      setIsFetching(true);
      dispatch(getThreatActor(raid)).unwrap()
      .then((resp) => {
        if (resp && resp.data && resp.data.length > 0) {
          const v_rows1 = [...resp.data].filter((x)=>x.ta === 'Insider').map(makeTacNull);
          setRows1([...v_rows1])
          const v_rows2 = [...resp.data].filter((x)=>x.ta === 'Outsider').map(makeTacNull);
          setRows2([...v_rows2])
          const v_rows3 = [...resp.data].filter((x)=>x.ta === 'Collusion').map(makeTacNull);
          setRows3([...v_rows3])
        }
        else {
          setFetchError('Something went wrong');
        setIsFetching(false);
        return;
        }
         setFetchError(false);
          setIsFetching(false);
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
    const v_rows1 = rows1.filter(item => item.person && item.person.trim() !== '');
    const v_rows2 = rows2.filter(item => item.person && item.person.trim() !== '');
    const v_rows3 = rows3.filter(item => item.person && item.person.trim() !== '');

    const arr1 = v_rows1.map((row, index) => {return row.person.trim() ;})
    const dupArr1 = arr1.filter((e, i, a) => a.indexOf(e) !== i) // [2, 4]
    if(dupArr1.length>0)
    {
      setsuccessAlert({...successAlert, open: true, message: `Duplicate Person found - ${dupArr1[0]}`, isError: true});
      return;
    }

    const arr2 = v_rows2.map((row, index) => {return row.person.trim() ;})
    const dupArr2 = arr2.filter((e, i, a) => a.indexOf(e) !== i) // [2, 4]
    if(dupArr2.length>0)
    {
      setsuccessAlert({...successAlert, open: true, message: `Duplicate Person found - ${dupArr2[0]}`, isError: true});
      return;
    }

    const arr3 = v_rows3.map((row, index) => {return row.person.trim() ;})
    const dupArr3 = arr3.filter((e, i, a) => a.indexOf(e) !== i) // [2, 4]
    if(dupArr3.length>0)
    {
      setsuccessAlert({...successAlert, open: true, message: `Duplicate Person found - ${dupArr3[0]}`, isError: true});
      return;
    }

    const data = [...v_rows1, ...v_rows2, ...v_rows3];

    setIsSubmitting(true)
    dispatch(saveThreatActor({ data, raid })).unwrap()
      .then((res) => {
        setIsSubmitting(false)
        //setIsDisabled(true);
        setsuccessAlert({
          ...successAlert, open: true, message: res.message, isError: false
        });
        setRows1([]);
        setRows2([]);
        setRows3([]);
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

          <CustomH2 headingName='Threat Actor'></CustomH2>
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
                :rows2
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
                                      onChange={(event, newValue) => {handleChange2({target:{value:newValue}},column,index)}}
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
                :rows3
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
                                      onChange={(event, newValue) => {handleChange3({target:{value:newValue}},column,index)}}
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
                                        onChange={(e) => handleChange3(e, column,index)}
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
                const v_rows = [...rows3, {ta:'Collusion', active:'Y'}];
                setRows3(v_rows);
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

export default ThreatActor
