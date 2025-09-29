
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
import { getRAG, saveRAG } from '../../../slice/RAGSlice';


const RAG = (props) => {

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
    { id: 'descr', label: '', minWidth: 120, readonly:true },
    { id: 'req', label: 'Required', minWidth: 120,  },
    { id: 'avl', label: 'Available', minWidth: 120,  },
    { id: 'gap', label: 'Gap', minWidth: 120, readonly:true },
  ];

  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [totalManpower, setTotalManpower] = useState(0); // As per Security Posts


  const handleChange = (e, column, rowID) => {
    let value = e.target.value;

    if (!column.isString) {
      value = value.replace(/[^0-9]/g, '');

      // Convert to a number for range validation
      const num = parseInt(value, 10);

      // Validate if it's a number and within the range 1-100
      if (value === '' || (!isNaN(num) && num >= 0 && num <= 99999)) {
      }
      else {
        return;
      }
    }

    const v_rows = [...rows];
    v_rows[rowID][column.id] = value;
    v_rows[rowID]['gap'] = v_rows[rowID]['req'] - v_rows[rowID]['avl'];

    setRows(v_rows);
  }

    const fetchList = () =>{
      setIsFetching(true);
      dispatch(getRAG(raid)).unwrap()
      .then((resp) => {
        if (resp && resp.data && resp.data.length > 0) {
          setRows([...resp.data[0]])
          const totMp = resp.data[1] && resp.data[1].length > 0 ? resp.data[1][0]["m_total"] : 0;
          setTotalManpower(totMp);
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
    const data = [...rows];

    dispatch(saveRAG({ data, raid })).unwrap()
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

          <CustomH2 headingName='RAG'></CustomH2>
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
        Total manpower : {totalManpower}<br/>
        <div style={{fontSize: 12, color: '#403f3fff'}}>(As per Security Posts - Available)</div>
        <TableContainer sx={{ height: '65vh', pt:1 }}>
          <Table>
            <TableHead sx={{
                position: "sticky",
                top: 0,
                zIndex: 1,
            }}>
              <TableRow sx={{ "& th": { color: "black", padding:2, textAlign: 'center' } }}>
                {columns.map((column, i) => (
                  
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
                                {column.readonly ?
                             value
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

export default RAG
