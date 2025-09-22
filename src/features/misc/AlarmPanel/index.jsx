
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
import Button  from '../../../ui-component/Controls/Button';
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomH2 from '../../../ui-component/Headings/CustomH2';
import CustomDashedBorder from '../../../ui-component/CustomDashedBorder';
import SuccessAlert from '../../../ui-component/snackbar';
import getColor, { tableHeaderBgColor } from '../../ra/colorCodes';


import AddIcon from '@mui/icons-material/Add';
import LoadingError from '../../../ui-component/LoadingError';
import TableDataLoading from '../../../ui-component/TableDataLoading';
import { getAlarmPanel, saveAlarmPanel } from '../../../slice/AlarmPanelSlice';

const AlarmPanel = (props) => {

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
    { id: 'descr', label: 'Access control/CCTV/PIDS', minWidth: 120, readonly: true },
    { id: 'resp', label: 'Response', minWidth: 50, options: ['Yes', 'No'] },
    { id: 'remarks', label: 'Remarks', minWidth: 120},
  ];

  const dispatch = useDispatch();
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);


  const handleChange1 = (e, column, rowID) => {
    let value = e.target.value;

    const v_rows = [...rows1];
    v_rows[rowID][column.id] = value;

    setRows1(v_rows);
  }

    const handleChange2 = (e, column, rowID) => {
    let value = e.target.value;

    const v_rows = [...rows2];
    v_rows[rowID][column.id] = value;

    setRows2(v_rows);
  }

    const handleChange3 = (e, column, rowID) => {
    let value = e.target.value;

    const v_rows = [...rows3];
    v_rows[rowID][column.id] = value;

    setRows3(v_rows);
  }

    const fetchList = () =>{
      setIsFetching(true);
      dispatch(getAlarmPanel(raid)).unwrap()
      .then((resp) => {
        if (resp && resp.data && resp.data.length > 0) {
          const v_rows1 = [...resp.data].filter((x)=>x.alarm_type === 'ACCESS');
          setRows1([...v_rows1])
          const v_rows2 = [...resp.data].filter((x)=>x.alarm_type === 'CCTV');
          setRows2([...v_rows2])
          const v_rows3 = [...resp.data].filter((x)=>x.alarm_type === 'PIDS');
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
    setIsSubmitting(true)
    const data = [...rows1, ...rows2, ...rows3];

    dispatch(saveAlarmPanel({ data, raid })).unwrap()
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

          <CustomH2 headingName='Alarm Panel'></CustomH2>
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
                    {i !== 0 ? column.label : column.label.split('/')[0]}
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
            <br/><br/>
            <TableHead>
              <TableRow sx={{ "& th": { color: "black", padding:2, textAlign: 'center' } }}>
                {columns.map((column, i) => (
                  column.label &&
                  <TableCell sx={{background: tableHeaderBgColor}}
                    key={column.id}
                    style={{ minWidth: column.minWidth, border: '1px solid white' }}
                  >
                    {i !== 0 ? column.label : column.label.split('/')[1]}
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
            <br/><br/>

            <TableHead>
              <TableRow sx={{ "& th": { color: "black", padding:2, textAlign: 'center' } }}>
                {columns.map((column, i) => (
                  column.label &&
                  <TableCell sx={{background: tableHeaderBgColor}}
                    key={column.id}
                    style={{ minWidth: column.minWidth, border: '1px solid white' }}
                  >
                    {i !== 0 ? column.label : column.label.split('/')[2]}
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
            <br/><br/>

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

export default AlarmPanel
