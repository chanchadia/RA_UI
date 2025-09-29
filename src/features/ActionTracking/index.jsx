


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
    { id: 'vital_point', label: 'Vital Point', minWidth: 120,  },
    { id: 'cctv_ap', label: <>CCTV Coverage of<br/>access point</>, minWidth: 50, options: ['Yes', 'No']},
    { id: 'cctv_ip', label: <>CCTV coverage of<br/>important point</>, minWidth: 50, options: ['Yes', 'No']  },
    { id: 'access_ctl', label: 'Access control', minWidth: 120, options: ['Smart Card/Magnetic Strip','No Access Control','Biometric','Bar code' ]  },
    { id: 'alerts', label: <>Analytics or sensor<br/>based alert</>, minWidth: 50, options: ['Yes', 'No']  },
  ];

  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);


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

    setRows(v_rows);
  }

    const fetchList = () =>{
      setIsFetching(true);
      dispatch(getActionTracking(raid)).unwrap()
      .then((resp) => {
        if (resp && resp.data && resp.data.length > 0) {
          setRows([...resp.data])
        }
        else {
          setRows([{ active: 'Y' }]);
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
    const data = rows.filter(item => item.vital_point && item.vital_point.trim() !== '');

    const arr1 = data.map((row, index) => {return row.vital_point.trim() ;})
    const dupArr1 = arr1.filter((e, i, a) => a.indexOf(e) !== i) // [2, 4]
    if(dupArr1.length>0)
    {
      setsuccessAlert({...successAlert, open: true, message: `Duplicate Vital point found - ${dupArr1[0]}`, isError: true});
      return;
    }
    
    setIsSubmitting(true)

    dispatch(saveActionTracking({ data, raid })).unwrap()
      .then((res) => {
        setIsSubmitting(false)
        //setIsDisabled(true);
        setsuccessAlert({
          ...successAlert, open: true, message: res.message, isError: false
        });
        setRows([]);
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
              <TableRow sx={{ "& th": { color: "black", padding:0, textAlign: 'center' } }}>
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
                        const value = row[column.id];
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
                                :
                                <TextField 
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
