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
import { lightBlue } from '@mui/material/colors';
import Grid from '@mui/material/GridLegacy';
import { Backdrop, Button, CircularProgress, InputAdornment, TextField } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate,useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import CustomTextInput from '../../../ui-component/CustomTextInputField/customTextInput';
import { getWeightage, saveWeightage } from '../../../slice/SurveAssessmentSlice';
import CustomH2 from '../../../ui-component/Headings/CustomH2';
import CustomDashedBorder from '../../../ui-component/CustomDashedBorder';
import SuccessAlert from '../../../ui-component/snackbar';

const Weightage = (props) => {

     const navigate = useNavigate();
     const {siteid} = useParams();

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

      const columns = [
        { id: 'security_layer', label: 'Security layer', minWidth: 120 },
        { id: 'category', label: 'Category', minWidth: 170 },
        { id: 'security_comp', label: 'Security Component', minWidth: 170 },
        { id: 'checklist', label: 'Checklist', minWidth: 170 },
        
        //{ id: 'obs_score', label: 'Observation Or Scoring', minWidth: 170 },
        { id: 'obs_score', label: 'Type', minWidth: 50 },

        { id: 'weightage', label: 'Weightage', minWidth: 50 },
        { id: 'remarks', label: 'Remarks', minWidth: 170 },
    
      ];

  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);


const handleChange = (e, columnId,rowID) => {
    let value = e.target.value;
    if(columnId === 'weightage')
    {
        debugger;
        value = value.replace(/[^0-9]/g, '');

        // Convert to a number for range validation
        const num = parseInt(value, 10);

        // Validate if it's a number and within the range 1-100
        if (value === '' || (!isNaN(num) && num >= 1 && num <= 10)) {
        }
        else {
            return;
        }
    }
    const v_rows = [...rows];
    v_rows[rowID][columnId] = value;
    setRows(v_rows);
}

useEffect(() => {
     dispatch(getWeightage(siteid)).unwrap()
        .then((resp)=>{
            if(resp && resp.data && resp.data.length>0)
            {
                setRows(resp.data)
            } 
        })
        .catch((err) => {
            //setSingleSiteData(true); // to disable form
            //setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
        });
}, []);


const onSubmit = () =>{
        setIsSubmitting(true)
        dispatch(saveWeightage(rows)).unwrap()
        .then((res)=>{
            setIsSubmitting(false)
            //setIsDisabled(true);
            setsuccessAlert({ ...successAlert, open: true, message: res.message, isError: false
             });
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

          <CustomH2 headingName='Survey Weightage'></CustomH2>
       <Button variant="contained" type='submit' sx={{ m: 1, minWidth: 150 }}
       onClick={onSubmit}
       >Save</Button>

        </Grid>
        <Grid item flexGrow={1}>
          <CustomDashedBorder />
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '65vh' }}>
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
                .map((row,index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px' }}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, }}
                          >
                            {column.id==='weightage' && row.obs_score === 'Scoring' ?
                             <TextField placeholder='1 to 10'
                                    /*slotProps={{ input: { endAdornment: '%'}}}
                                    sx={{
                                            '& .MuiInputBase-input': {
                                            textAlign: 'right',
                                            },
                                        }}*/
                                    variant="standard"
                                    fullWidth
                                    value={value}
                                    onChange={(e) => handleChange(e, column.id,index)}
                                  />
                            : column.id==='remarks' ?
                             <TextField
                                    //multiline
                                    variant="standard"
                                    fullWidth
                                    rows={2}
                                    //value={value}
                                    onChange={(e) => handleChange(e, column.id,index)}
                                  />
                            : value
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

export default Weightage
