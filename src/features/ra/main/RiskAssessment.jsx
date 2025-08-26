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
import { getRiskAssessment, saveRiskAssessment } from '../../../slice/RiskAssessmentSlice';

const RiskAssessment = (props) => {

     const navigate = useNavigate();
     const {siteid, raid} = useParams();

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
        { id: 'scenarios', label: null, minWidth: 120, isString: true },
        { id: 'attack_p', label: 'P', minWidth: 120 },
        { id: 'attack_e', label: 'E', minWidth: 120 },
        { id: 'attack_a', label: 'A', minWidth: 120 },
        { id: 'attack_r', label: 'R', minWidth: 120 },
        { id: 'attack_s', label: 'S', minWidth: 120, readonly: true },
        { id: 'tr_tac', label: 'TAc', minWidth: 120 },
        { id: 'tr_tai', label: 'TAi', minWidth: 120 },
        { id: 'tr_t', label: 'T', minWidth: 120, readonly: true },
        { id: 'vulnerability', label: 'V', minWidth: 120 },
        { id: 'likelihood', label: 'L', minWidth: 120, readonly: true },
        { id: 'risk', label: 'R', minWidth: 120, readonly: true },
        { id: 'am_i', label: 'Infrastructure', minWidth: 120, isString: true },
        { id: 'am_a', label: 'Automation', minWidth: 120, isString: true },
        { id: 'am_p', label: 'Process', minWidth: 120, isString: true },
        { id: 'am_m', label: 'Manpower', minWidth: 120, isString: true },
        { id: 'vulnerability_r', label: 'Vr', minWidth: 120 },
        { id: 'likelihood_r', label: 'Lr', minWidth: 120, readonly: true },
        { id: 'risk_r', label: 'Rr', minWidth: 120, readonly: true },
      ];

  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);


const handleChange = (e, column,rowID) => {
    let value = e.target.value;
    if(!column.isString)
    {
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
    const v_rows = [...rows];
    v_rows[rowID][column.id] = value;
    setRows(v_rows);
}

useEffect(() => {
     dispatch(getRiskAssessment(raid)).unwrap()
        .then((resp)=>{
            if(resp && resp.data && resp.data.length>0)
            {
                setRows(resp.data)
            } 
            else
            {
                //setRows([{},{},{},{},{},{},{},{},{},{}]);
                setRows([{active: 'Y'}]);
            }
        })
        .catch((err) => {
            //setSingleSiteData(true); // to disable form
            //setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
        });
}, []);


const onSubmit = () =>{
        setIsSubmitting(true)
        dispatch(saveRiskAssessment({data: rows, raid})).unwrap()
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

          <CustomH2 headingName='Risk Assessment'></CustomH2>
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
                            {column.readonly ? value
                              :
                             <TextField placeholder={column.isString ? '' : '1 to 5'}
                                    variant="standard"
                                    fullWidth
                                    value={value}
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

export default RiskAssessment
