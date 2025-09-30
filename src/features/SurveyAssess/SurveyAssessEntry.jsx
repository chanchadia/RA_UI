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
import { Backdrop, Box, CircularProgress, InputAdornment, TextField } from '@mui/material';
import Button  from '../../ui-component/Controls/Button';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate,useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { getSurveyAssessment,saveSurveyAssessment } from '../../slice/SurveAssessmentSlice';
import CustomH2 from '../../ui-component/Headings/CustomH2';
import CustomDashedBorder from '../../ui-component/CustomDashedBorder';
import Autocomplete from '@mui/material/Autocomplete';
import SuccessAlert from '../../ui-component/snackbar';
import { tableHeaderBgColor } from '../ra/colorCodes';
import LoadingError from '../../ui-component/LoadingError';
import TableDataLoading from '../../ui-component/TableDataLoading';

const SurveyAssessEntry = (props) => {

    const { mySite, myRa: raid } = useSelector((state) => state.auth);
  
   //const {raid} = useParams();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
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
        { id: 'security_layer', label: 'Security layer', minWidth: 120 },
        { id: 'category', label: 'Category', minWidth: 100 },
        { id: 'security_comp', label: 'Security Component', minWidth: 100 },
        { id: 'checklist', label: 'Checklist', minWidth: 170 },
        //{ id: 'obs_score', label: 'Observation Or Scoring', minWidth: 170 },
        { id: 'obs_score', label: 'Type', minWidth: 100 },
        { id: 'a_or_na', label: 'Applicable ?', minWidth: 200 },
        { id: 'observation', label: 'Observation', minWidth: 200 },
        { id: 'weightage', label: 'Weightage', minWidth: 30 },
        { id: 'max_marks', label: 'Maximum Marks', minWidth: 30 },
        { id: 'scored_marks', label: 'Scored Marks', minWidth: 30 },
        { id: 'remarks', label: 'Remarks', minWidth: 170 },
    
      ];

      const onSubmit = () =>{
            const data = [...rows];
            const errData = data.filter((item)=>
              {
                if(item.obs_score === 'Scoring' && item.a_or_na === 'Applicable')
                {
                  if(item.observation == '')
                  {
                    return true;
                  }
                }
                  
                return false;

              });

                if(errData.length > 0)
                {
                  setsuccessAlert({ ...successAlert, open: true, message: 'Please provide Weightage for all the Scoring checklist', isError: true });
                  return;
                }
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
        if(v_rows[row_index].obs_score === 'Scoring')
        {
          v_rows[row_index]['max_marks']=v_rows[row_index]['weightage'];
        }
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

    if(columnId === 'observation' && v_rows[rowID].obs_score === 'Scoring')
    {
      if(v_rows[rowID].obs_type === 'PERC')
      {
        const matches = value.match(/\./g); // Global search for all dots
        if(matches !== null && matches.length >= 2) //contains more than one dot
        {
          return;
        }
        value = value.replace(/[^0-9.]/g, '');

        //Convert to a number for range validation
        const num = parseFloat(value, 10);

        //Validate if it's a number and within the range 1-100
        if (value === '' || (!isNaN(num) && num >= 0 && num <= 100)) 
        {
        }
        else 
        {
            return;
        }

        try
        {
          v_rows[rowID]['scored_marks'] =  (parseInt(v_rows[rowID]['weightage']) *  (isNaN(parseInt(value))?0:parseInt(value)) )/100;
        }
        catch(ex)
        {
            
        }
      }
      else if(v_rows[rowID].obs_type === 'DD')
      {
        const obs_options = v_rows[rowID].obs_options.split('|');
        const obs_opt_percentages = v_rows[rowID].obs_opt_percentages.split('|');
        const obs_index = obs_options.indexOf(value);
        if(obs_index === -1)
        {
          return;
        }
        v_rows[rowID]['scored_marks'] = parseInt(v_rows[rowID]['weightage']) * obs_opt_percentages[obs_index] / 100;
      }

        //scored_marks = weightage * observation / 100
    }
    v_rows[rowID][columnId] = value;
    setRows(v_rows);
}

  const fetchList = () =>{
      setIsFetching(true);
    dispatch(getSurveyAssessment(raid)).unwrap()
        .then((resp)=>{
            if(resp && resp.data && resp.data.length>0)
            {
                setRows(resp.data)
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
  const [value, setValue] = React.useState(null);
  const DDOption = [
  {label:"Applicable"},
  {label:"Not Applicable"},
]


const createObservation=(row, rowIndex, column)=>{
  const value = row[column.id];
  if(row.obs_type === 'DD')
  {
    return (
    <Autocomplete
      disableClearable={true}
      options =  {row.obs_options.split('|')}
      fullWidth
      value={value}   
      //getOptionLabel={(option) => option.label || ""}
      onChange={(event, newValue) => {handleChange({target:{value: newValue}}, column.id,rowIndex)}}
      renderInput={(params) => (
      <TextField {...params}  variant="standard" />
      )}
    />);
  }
  else   if(row.obs_type === 'PERC')
  {
    return (
    <TextField placeholder='1 to 100'
        slotProps={{ input: { endAdornment: <Box pl={0.5}>%</Box>}}}
        sx={{
              '& .MuiInputBase-input': {
              textAlign: 'right',
              },
            }}
        variant="standard"
        fullWidth
        value={value || ''}
        onChange={(e) => handleChange(e, column.id,rowIndex)}
      />);
  }
  else // TEXT or ETC.
  {
    return (
    <TextField 
        variant="standard"
        fullWidth
        value={value}
        onChange={(e) => handleChange(e, column.id,rowIndex)}
      />);
  }

}

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

      {!fetchError &&     
       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '65vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ "& th": { backgroundColor: tableHeaderBgColor, color: "black", verticalAlign: 'top' } }}>
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
              {isFetching ? <TableDataLoading cols={columns.length} />
                :rows
                .map((row,index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px' }}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, }}
                          >
                            {column.id==='observation' 
                            ?
                             row.a_or_na === 'Applicable' && createObservation(row, index, column)
                            : column.id==='a_or_na' ?
                            <Autocomplete
                                disableClearable={true}
                                options =  {DDOption}
                                fullWidth
                                value={{label:row.a_or_na}}   
                                getOptionLabel={(option) => option.label || ""}
                                onChange={(event, newValue) => {DDOnChange(event,newValue,index)}}
                                renderInput={(params) => (
                                <TextField {...params}  variant="standard" />
                                )}
                            />
                            : ['max_marks','weightage','scored_marks'].includes(column.id) && row.obs_score === 'Observation' ? ' '
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

export default SurveyAssessEntry
