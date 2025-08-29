import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSeverity,saveSeverity } from '../../slice/SeverityRatingSlice';
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
import { Backdrop, CircularProgress, TextField } from '@mui/material';
import Button  from '../../ui-component/Controls/Button';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate,useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import CustomTextInput from '../../ui-component/CustomTextInputField/customTextInput';
import SuccessAlert from '../../ui-component/snackbar';
import getColor, { tableHeaderBgColor } from '../ra/colorCodes';

const SeverityRatingEntry = (props) => {
  const { mySite, myRa: raid } = useSelector((state) => state.auth);

     const navigate = useNavigate();
         const [isSubmitting, setIsSubmitting] = useState(false);
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
     //const {raid} = useParams();
      const columns = [
        { id: 'sr', label: 'Rating', minWidth: 50, align: 'center' },
        { id: 'p', label: 'People', minWidth: 170 },
        { id: 'e', label: 'Environment', minWidth: 170 },
        { id: 'a', label: 'Asset', minWidth: 170 },
        { id: 'r', label: 'Reputation', minWidth: 170 },
    
      ];
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);


const handleSave = () => {
    // const v_rows = [...rows];
    // const updatedArray = v_rows.map(item => {
    //   const newItem = {...item}; // Create a shallow copy
    //   delete newItem.ra_id;
    //  // newItem['site_id'] = site_id;
    //   return newItem;
    // });
  //  const updatedArray = {...rows, site_id: raid}
    const payload = [...rows]
            setIsSubmitting(true)
            dispatch(saveSeverity(payload)).unwrap()
            .then((res)=>{
                setIsSubmitting(false)
                setIsDisabled(true);
                setsuccessAlert({ ...successAlert, open: true, message: res.message, isError: false
                 });
            })
            .catch((err) => {
                setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
                setIsSubmitting(false)
            });

}
const handleChange = (e, columnId,rowID) => {
    const v_rows = [...rows];
    v_rows[rowID][columnId] = e.target.value;
    setRows(v_rows);
}

useEffect(() => {
     dispatch(getSeverity(raid)).unwrap()
        .then((resp)=>{
            if(resp && resp.data && resp.data.length>0)
            {
                    setRows(resp.data)
                    setHeaders(Object.keys(resp.data[0]));
            } 
        })
        .catch((err) => {
            //setSingleSiteData(true); // to disable form
            //setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
        });
}, []);
  return (
    <>
       <Grid container flexDirection={'column'}>
        <Grid item container display={'flex'} justifyContent={'space-between'}>
          <CustomH2 headingName='Severity Rating Matrix'></CustomH2>
        </Grid>
        <Grid item flexGrow={1}>
          <CustomDashedBorder />
        </Grid>
      </Grid>

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
              {rows
                .map((row,index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px' }}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, backgroundColor: column.id==='sr' ? getColor(value): '' }}
                          >
                            {column.id==='sr' ? value
                            :
                             <TextField
                                    multiline
                                   // id="standard-basic"
                                    //label={label}
                                    variant="standard"
                                    fullWidth
                                    rows={2}
                                    value={value}
                                    onChange={(e) => handleChange(e, column.id,index)}
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
<br></br>
     <center>  <Button variant="contained" type='submit' sx={{ m: 1, minWidth: 150 }}
             onClick={handleSave}
             >Save</Button></center>

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

                        {/* <AlertDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                        /> */}
                        
                        <SuccessAlert successAlert={successAlert} />
    </>
  )
}

export default SeverityRatingEntry
