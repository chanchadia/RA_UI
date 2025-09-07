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
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { Backdrop, Box, CircularProgress, IconButton, Link } from '@mui/material';
import { setMyRa, setMySite } from '../../../slice/AuthSlice';
import { getRiskRatingColor, tableHeaderBgColor } from '../../ra/colorCodes';
import LoadingError from '../../../ui-component/LoadingError';
import { getRaDetails, getRaSummary } from '../../../slice/RADashboardSlice';
import RiskRatingDetails from './RiskRatingDetails';

const circleStyle = {
 height: '30px',
 width: '30px',
 backgroundColor: '#0a4f98ff',
 borderRadius: '50%',
 display: 'flex',
 justifyContent: 'center',
 alignItems: 'center',
 color: 'white',
 cursor: 'pointer',
 fontSize: 13
}

const RiskRating = () => {
  const [isDetailView, setIsDetailView] = useState(false); 

  const { mySite, myRa } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const columns = [
    { id: 's', label: 'Severity', minWidth: 170 },
    { id: 'risk_5', label: 'Certain (5)', minWidth: 170},
    { id: 'risk_4', label: 'Likely (4)', minWidth: 170 },
    { id: 'risk_3', label: 'Possible (3)', minWidth: 170 },
    { id: 'risk_2', label: 'Unlikely (2)', minWidth: 170 },
    { id: 'risk_1', label: 'Rare (1)', minWidth: 170 },

  ];


  const [fetchError, setFetchError] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [detailRows, setDetailRows] = useState([]);
  const [headers, setHeaders] = useState([]);

  const fetchList = () =>{
    setIsSubmitting(true);
    dispatch(getRaSummary(myRa)).unwrap().then((action) => {
      if (action.data.length > 0) {
        setRows(action.data)
        setHeaders(Object.keys(action.data[0]));
      }
      setFetchError(false);
      setIsSubmitting(false);
    }).catch((err) => {
        setFetchError(err.message);
        setIsSubmitting(false);
    });
  }

  useEffect(() => {
    myRa && fetchList();
  }, [myRa]);

  const showDetails = (severity, risk) => {
    setIsSubmitting(true);
    dispatch(getRaDetails({ra_id: myRa, severity, risk})).unwrap().then((action) => {
      setDetailRows(action.data)
      setIsSubmitting(false);
      setIsDetailView(true);
    }).catch((err) => {
        setIsSubmitting(false);
    });
    
  };

  if(isDetailView)
  {
    return (<RiskRatingDetails onClose={()=>setIsDetailView(false)} rows={detailRows} />);
  }

  return (
    <>

      {!fetchError && 
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table" >
            <TableHead>
              <TableRow sx={{ "& th": { backgroundColor: tableHeaderBgColor, color: "black", padding:0.5, } }}>
                <TableCell align='center' sx={{border: '1px solid silver'}}>R</TableCell>
                <TableCell align='center' colSpan={5} sx={{border: '1px solid silver'}}>Likelihood</TableCell>
              </TableRow>
              <TableRow sx={{ "& th": { backgroundColor: tableHeaderBgColor, color: "black", padding:1, } }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{ minWidth: column.minWidth }}
                    sx={{border: '1px solid silver'}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, r) => {
                  return (
                    <TableRow tabIndex={-1} key={row.code} sx={{ height: '70px' }}>
                      {columns.map((column, c) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align='center' sx={{ paddingTop: 0.8, paddingBottom: 0,
                            background: column.id !== 's' ? getRiskRatingColor(r, c-1):tableHeaderBgColor, 
                            border: column.id === 's' ? '1px solid silver':'1px solid white'
                           }}>
                            
                                  {
                                    column.id === 's' ?
                                    <>{row['txt']}<br/>({value})</>
                                    : !value || value === 0 ? '' 
                                    : <div style={{display:'flex', justifyContent:'center'}}>
                                        <Box style={circleStyle} boxShadow={1} onClick={()=>{
                                          showDetails(row['s'], column.id.split('_')[1]);
                                        }}>{value}</Box>
                                      </div>
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
        {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
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
    </>
  )
}

export default RiskRating