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
import { Backdrop, CircularProgress, IconButton, Link } from '@mui/material';
import { setMyRa, setMySite } from '../../../slice/AuthSlice';
import { getRiskRatingColor, tableHeaderBgColor } from '../../ra/colorCodes';
import LoadingError from '../../../ui-component/LoadingError';
import { getRaSummary } from '../../../slice/RADashboardSlice';

const circleStyle = {
 height: '30px',
 width: '30px',
 backgroundColor: 'blue',
 borderRadius: '50%',
 display: 'flex',
 justifyContent: 'center',
 alignItems: 'center',
 color: 'white'
}

const RiskRating = () => {
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

  const handleEdit = (id) => {
    navigate(`/site/${id}`);
  };

  return (
    <>

      {!fetchError && 
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table" >
            <TableHead>
              <TableRow sx={{ "& th": { backgroundColor: tableHeaderBgColor, color: "black", padding:0.5, } }}>
                <TableCell align='center'>R</TableCell>
                <TableCell align='center' colSpan={5}>Likelihood</TableCell>
              </TableRow>
              <TableRow sx={{ "& th": { backgroundColor: tableHeaderBgColor, color: "black", padding:1, } }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{ minWidth: column.minWidth }}
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
                    <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '70px' }}>
                      {columns.map((column, c) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align='center' sx={{ paddingTop: 0.8, paddingBottom: 0,
                            background: column.id !== 's' && getRiskRatingColor(r, c-1)
                           }}>
                            
                                  {
                                    column.id === 's' ?
                                    <>{row['txt']}<br/>({value})</>
                                    : !value || value === 0 ? '' 
                                    : <div style={circleStyle}>{value}</div>
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