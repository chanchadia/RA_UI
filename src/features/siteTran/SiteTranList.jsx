import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSite } from '../../slice/SiteSlice';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { StyledButton as StyledLoginButton } from "../auth/StyledLoginComponents/styledButton";
import CustomH2 from '../../ui-component/Headings/CustomH2';
import Grid from '@mui/material/GridLegacy';
import CustomDashedBorder from '../../ui-component/CustomDashedBorder';

import Button  from '../../ui-component/Controls/Button';
import { useLocation, useNavigate,useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { Backdrop, CircularProgress, IconButton, Link } from '@mui/material';
import { getSiteWiseSA } from '../../slice/SurveAssessmentSlice';
import { setMyRa, setMyRaName, setMySite } from '../../slice/AuthSlice';
import { tableHeaderBgColor } from '../ra/colorCodes';
import LoadingError from '../../ui-component/LoadingError';
import TableDataLoading from '../../ui-component/TableDataLoading';

const SiteTranList = (props) => {
  const { mySite : id, myRa } = useSelector((state) => state.auth);
  const [fetchError, setFetchError] = useState(false);    
  const [isSubmitting, setIsSubmitting] = useState(false);
      const navigate = useNavigate();
      const dispatch = useDispatch();
      //const {id} = useParams();
      const [rows, setRows] = useState([]);
      const [headers, setHeaders] = useState([]);
const columns = [
    { id: 'name', label: 'Description', minWidth: 170 },
    { id: 'site_name', label: 'Site Name', minWidth: 170 },
    { id: 'start_dt', label: 'Start Date', minWidth: 170 },
    { id: 'end_dt', label: 'End Date', minWidth: 170 },
    { id: 'EditIcon', label: 'Edit', minWidth: 70 },
   
  ];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    
const handleEdit = (rowid) => {
    navigate(`/site/tran/${rowid}`);
  };

  const fetchList = () =>{
    setIsSubmitting(true);
    dispatch(getSiteWiseSA(id)).unwrap()
        .then((resp)=>{
            if(resp && resp.data && resp.data.length>0)
            {
                    setRows(resp.data)
                    setHeaders(Object.keys(resp.data[0]));
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
     dispatch(setMyRa(null));
     dispatch(setMyRaName(null));
    
     fetchList();
   
}, []);
    
  return (
    <>
      <Grid container flexDirection={'column'}>
        <Grid item container display={'flex'} justifyContent={'space-between'}>

          <CustomH2 headingName='Assessment'></CustomH2>
       <Button variant="contained" type='submit' sx={{ m: 1, minWidth: 150 }}
       onClick={()=>{
              navigate(`/site/tran/create`);
       }}
       >New Assessment</Button>

        </Grid>
        <Grid item flexGrow={1}>
          <CustomDashedBorder />
        </Grid>
      </Grid>

      {!fetchError && 
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ "& th": { backgroundColor: tableHeaderBgColor, color: "black" } }}>
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
              {isSubmitting ? <TableDataLoading cols={columns.length} rows={4} />
                :rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px' }}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0 }}>
                            {/* {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value} */}
                            {column.id==='EditIcon' ? 
                                  <IconButton aria-label="edit" size="small" onClick={() => handleEdit(row['id'] )}>
                                  <EditIcon fontSize="inherit" />
                                  </IconButton> 
                                  : 
                                  column.id === 'name' ? 
                                   <Link href='javascript:void' onClick={()=>
                                   {
                                      dispatch(setMyRa(row.id));
                                      dispatch(setMyRaName(row.name));

                                      navigate(`/sa`);
                                   }
                                   } >{value}</Link> 
                                  //  <Link to='/change_pwd' state={{ ra_id: row['id']  }} >{value}</Link> 
                                  :
                                  value}
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

      {/* <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSubmitting}
          //onClick={handleClose}
      >
          <CircularProgress sx={{ color: "white" }} />
      </Backdrop> */}
    </>
  )
}

export default SiteTranList
