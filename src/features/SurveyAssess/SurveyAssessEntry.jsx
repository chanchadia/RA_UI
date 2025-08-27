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
import { getSurveyAssessment,saveSurveyAssessment } from '../../slice/SurveAssessmentSlice';
import CustomH2 from '../../ui-component/Headings/CustomH2';
import CustomDashedBorder from '../../ui-component/CustomDashedBorder';
import Autocomplete from '@mui/material/Autocomplete';
import SuccessAlert from '../../ui-component/snackbar';

const SurveyAssessEntry = (props) => {

   const {raid} = useParams();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
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
        { id: 'category', label: 'Category', minWidth: 100 },
        { id: 'security_comp', label: 'Security Component', minWidth: 100 },
        { id: 'checklist', label: 'Checklist', minWidth: 170 },
        //{ id: 'obs_score', label: 'Observation Or Scoring', minWidth: 170 },
        { id: 'obs_score', label: 'Type', minWidth: 100 },
        { id: 'a_or_na', label: 'Applicable ?', minWidth: 200 },
        { id: 'observation', label: 'Observation', minWidth: 100 },
        { id: 'weightage', label: 'Weightage', minWidth: 30 },
        { id: 'max_marks', label: 'Maximum Marks', minWidth: 30 },
        { id: 'scored_marks', label: 'Scored Marks', minWidth: 30 },
        { id: 'remarks', label: 'Remarks', minWidth: 170 },
    
      ];

      const onSubmit = () =>{
              setIsSubmitting(true)
              dispatch(saveSurveyAssessment({data:rows,raid})).unwrap()
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
      
const DDOnChange = (event,newValue,row_index) => {
    const v_rows = [...rows];
    if(newValue.label==='Applicable')
    {
         v_rows[row_index]['max_marks']=v_rows[row_index]['weightage'];
    }
    else
    {
         v_rows[row_index]['max_marks']="0";
         v_rows[row_index]['scored_marks']="0";
         v_rows[row_index]['observation']="";
    }
    v_rows[row_index]['a_or_na']=newValue.label;
    setRows(v_rows);
   
}
const handleChange = (e, columnId,rowID) => {
    let value = e.target.value;
    const v_rows = [...rows];

    if(columnId === 'observation')
    {
        value = value.replace(/[^0-9]/g, '');

        //Convert to a number for range validation
        const num = parseInt(value, 10);

        //Validate if it's a number and within the range 1-100
        if (value === '' || (!isNaN(num) && num >= 1 && num <= 100)) {
        }
        else {
            return;
        }
        try
        {
         v_rows[rowID]['scored_marks'] =  (parseInt(v_rows[rowID]['weightage']) *  (isNaN(parseInt(value))?0:parseInt(value)) )/100;
        }
        catch(ex)
        {
            
        }
        //scored_marks = weightage * observation / 100
    }
    v_rows[rowID][columnId] = value;
    setRows(v_rows);
}
useEffect(() => {
     dispatch(getSurveyAssessment(raid)).unwrap()
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
  const [value, setValue] = React.useState(null);
  const DDOption = [
  {label:"Applicable"},
  {label:"Not Applicable"},
]
  return (
    <>
    <Grid container flexDirection={'column'}>
        <Grid item container display={'flex'} justifyContent={'space-between'}>

          <CustomH2 headingName='Survey Assessment'></CustomH2>
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
              <TableRow sx={{ "& th": { backgroundColor: "lightBlue", color: "black", verticalAlign: 'top' } }}>
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
                            {column.id==='observation' //&& row.obs_score === 'Scoring' 
                            ?
                             <TextField placeholder='1 to 100'
                                    slotProps={{ input: { endAdornment: '%'}}}
                                    sx={{
                                            '& .MuiInputBase-input': {
                                            textAlign: 'right',
                                            },
                                        }}
                                    variant="standard"
                                    fullWidth
                                    value={value}
                                    onChange={(e) => handleChange(e, column.id,index)}
                                    disabled={row.a_or_na === 'Not Applicable' || row.obs_score === 'Observation'}
                                  />
                            
                            : column.id==='a_or_na' ?
                            <Autocomplete
                                disableClearable={true}
                                options =  {DDOption}
                                fullWidth
                                value={{label:row.a_or_na}}   
                                getOptionLabel={(option) => option.label || ""}
                                id="select-type"
                                onChange={(event, newValue) => {DDOnChange(event,newValue,index)}}
                                renderInput={(params) => (
                                <TextField {...params}  variant="standard" />
                                )}
                            />
                            :value
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

export default SurveyAssessEntry
