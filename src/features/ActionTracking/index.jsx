


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
import { Autocomplete, Backdrop, CircularProgress, Fab, InputAdornment, TextField } from '@mui/material';
import Button  from '../../ui-component/Controls/Button';
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomH2 from '../../ui-component/Headings/CustomH2';
import CustomDashedBorder from '../../ui-component/CustomDashedBorder';
import SuccessAlert from '../../ui-component/snackbar';
import getColor, { tableHeaderBgColor } from '../ra/colorCodes';


import AddIcon from '@mui/icons-material/Add';
import LoadingError from '../../ui-component/LoadingError';
import TableDataLoading from '../../ui-component/TableDataLoading';
import { getActionTracking, saveActionTracking } from '../../slice/ActionTrackingSlice';
import CustomDatePicker from '../../ui-component/CustomDueDatePicker';

import dayjs from 'dayjs';


const ActionTracking = (props) => {

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
    { id: 'layer', label: 'Security layer', minWidth: 80, isString: true },
    { id: 'addlm', label: 'Additional measures', minWidth: 200,  isString: true },
    { id: 'person_resp', label: 'Person Responsible', minWidth: 200,  },
    { id: 'target_dt', label: 'Target date', minWidth: 120, isDate: true },
    { id: 'forcast_dt', label: 'Forcast Date', minWidth: 120, isDate: true },
    { id: 'dt_change_count', label: '#of Change of Dates', minWidth: 100, readonly: true  },
    { id: 'status', label: 'Status', minWidth: 130, options:['Open','Close','Hold','Rejected'] },
    { id: 'close_dt', label: 'Close date', minWidth: 120, readonly: true }
  ];

  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [prevRows, setPrevRows] = useState([]);


  const handleChange = (e, column, rowID) => {
    let value = e.target.value;
    /*
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
    */

    const v_rows = [...rows];
    v_rows[rowID][column.id] = value;

    if(column.id === 'target_dt')
    {
      v_rows[rowID]['forcast_dt'] = value;
    }

    setRows(v_rows);
  }

    const fetchList = () =>{
      setIsFetching(true);
      dispatch(getActionTracking(raid)).unwrap()
      .then((resp) => {
        if (resp && resp.data && resp.data.length > 0) {
          setRows([...resp.data])
          const data = [...resp.data];
          const jsData = JSON.stringify(data);
          setPrevRows(JSON.parse(jsData));
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
    const data = [...rows];
    
    setIsSubmitting(true)

    dispatch(saveActionTracking({ data, raid })).unwrap()
      .then((res) => {
        setIsSubmitting(false)
        //setIsDisabled(true);
        setsuccessAlert({
          ...successAlert, open: true, message: res.message, isError: false
        });
        setRows([]);
        setPrevRows([]);
        fetchList();
      })
      .catch((err) => {
        setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
        setIsSubmitting(false)
      });
  }

  const getDateField = (row, column, index) =>
  {
    if(column.id === 'forcast_dt')
    {
      if(prevRows[index]['target_dt'] === null)
      {
        return row[column.id];
      }
    }
    if(column.id === 'target_dt')
    {
      if(prevRows[index]['target_dt'] !== null)
      {
        return row[column.id];
      }
    }
    return (                      
        <CustomDatePicker
          onChange={(date) => {
              if (date === null) {
                handleChange({target:{value:null}}, column,index);
              } else {
                dayjs(date).format('DD-MM-YYYY') !== 'Invalid Date' && handleChange({target:{value:dayjs(date).format('DD-MM-YYYY')}}, column,index);
              }
          }}
          valuedata={ row[column.id] ? dayjs( row[column.id], 'DD-MM-YYYY') : null}
      />
    );
  }

  return (
    <>


      <Grid container flexDirection={'column'}>
        <Grid item container display={'flex'} justifyContent={'space-between'}>

          <CustomH2 headingName='Action Tracking'></CustomH2>
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
            <TableHead sx={{
                position: "sticky",
                top: 0,
                zIndex: 1,
            }}>
              <TableRow sx={{ "& th": { color: "black", padding:1, textAlign: 'center' } }}>
                {columns.map((column, i) => (
                  column.label &&
                  <TableCell sx={{background: tableHeaderBgColor, verticalAlign:'top'}}
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
                :rows
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px' }}>
                      {columns.map((column) => {
                        const value = row[column.id] || '';
                        return (
                              <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, width: column.minWidth }}
                              >
                                {column.options ?
                              <Autocomplete 
                                      disableClearable={true}
                                      options =  {column.options}
                                      fullWidth
                                      value={value || ''}   
                                      //getOptionLabel={(option) => option || ""}
                                      onChange={(event, newValue) => {handleChange({target:{value:newValue}},column,index)}}
                                      renderInput={(params) => (
                                      <TextField {...params}  variant="standard" />
                                      )}
                                  />
                                : column.isString || column.readonly ? value
                                : column.isDate ? getDateField(row, column, index)
                                : <TextField 
                                        variant="standard"
                                        fullWidth
                                        // multiline={true}
                                        value={value || ''}
                                        onChange={(e) => handleChange(e, column,index)}
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

export default ActionTracking
