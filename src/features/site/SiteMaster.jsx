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
import { lightBlue } from '@mui/material/colors';
import { StyledButton as StyledLoginButton } from "../auth/StyledLoginComponents/styledButton";
import CustomH2 from '../../ui-component/Headings/CustomH2';
import Grid from '@mui/material/GridLegacy';
import CustomDashedBorder from '../../ui-component/CustomDashedBorder';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Link } from '@mui/material';
import { setMyRa, setMySite } from '../../slice/AuthSlice';


const SiteMaster = () => {
  const navigate = useNavigate();
  const columns = [
    { id: 'name', label: 'Site Name', minWidth: 170 },
    { id: 'business', label: 'Business', minWidth: 170 },
    { id: 'address', label: 'Address', minWidth: 170 },
    { id: 'spoc_name', label: 'SPOC Name', minWidth: 170 },
    { id: 'spoc_email', label: 'SPOC Email', minWidth: 170 },
    { id: 'EditIcon', label: 'Edit', minWidth: 70 },
 
    // {
    //   id: 'population',
    //   label: 'Population',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // },

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


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);


  useEffect(() => {
    dispatch(setMySite(null));
    dispatch(setMyRa(null));
    
    dispatch(getSite("")).then((action, state) => {

      if (action.payload != null && action.payload.data.length > 0) {
        setRows(action.payload.data)
        setHeaders(Object.keys(action.payload.data[0]));
      }
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/site/${id}`);
  };

  return (
    <>

      <Grid container flexDirection={'column'}>
        <Grid item container display={'flex'} justifyContent={'space-between'}>

          <CustomH2 headingName='Site Master'></CustomH2>
       <Button variant="contained" type='submit' sx={{ m: 1, minWidth: 150 }}
       onClick={()=>{
          navigate('/site/create/');
       }}
       >Create Site</Button>

        </Grid>
        <Grid item flexGrow={1}>
          <CustomDashedBorder />
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ "& th": { backgroundColor: "lightBlue", color: "black" } }}>
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
                                      dispatch(setMySite(row.id));
                                      dispatch(setMyRa(null));
                                      navigate(`/site/tran`);
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

    </>
  )
}

export default SiteMaster
