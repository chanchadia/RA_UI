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
import AddIcon from '@mui/icons-material/Add';
import TableRow from '@mui/material/TableRow';
import { StyledButton as StyledLoginButton } from "../../auth/StyledLoginComponents/styledButton";
import CustomH2 from '../../../ui-component/Headings/CustomH2';
import Grid from '@mui/material/GridLegacy';
import CustomDashedBorder from '../../../ui-component/CustomDashedBorder';
import { Autocomplete, Backdrop, CircularProgress, Fab, InputAdornment, TextField } from '@mui/material';
import Button  from '../../../ui-component/Controls/Button';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate,useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import CustomTextInput from '../../../ui-component/CustomTextInputField/customTextInput';
import SuccessAlert from '../../../ui-component/snackbar';
import getColor, { tableHeaderBgColor } from '../../ra/colorCodes';
import LoadingError from '../../../ui-component/LoadingError';
import TableDataLoading from '../../../ui-component/TableDataLoading';
import { getPerimeterProfile, savePerimeterProfile } from '../../../slice/PerimeterProfileSlice';
import MultipleSelect from '../../../ui-component/CustomMultiSelectDD/MultipleSelect';

const PerimeterProfileEntry = () => {
  const { mySite, myRa: raid } = useSelector((state) => state.auth);
  const [fetchError, setFetchError] = useState(false);    
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
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
        { id: 'segment_from', label: 'segment_from', minWidth: 170 },
        { id: 'segment_to', label: 'segment_to', minWidth: 170 },
        { id: 'len_mtr', label: 'len_mtr', minWidth: 30 },
        { id: 'peri_type', label: 'peri_type', minWidth: 170 },
        { id: 'height_out_mtr_from', label: 'height_out_mtr_from', minWidth: 30 },
        { id: 'height_out_mtr_to', label: 'height_out_mtr_to', minWidth: 30 },
        { id: 'anti_climb_type', label: 'anti_climb_type', minWidth: 170 },
        { id: 'petrol_track', label: 'petrol_track', minWidth: 30 },
        { id: 'obs_posts_count', label: 'obs_posts_count', minWidth: 30 },
        { id: 'std_light_mtr', label: 'std_light_mtr', minWidth: 30 },
        { id: 'veg_status_mtr', label: 'veg_status_mtr', minWidth: 30 },
        { id: 'proxi_mtr', label: 'proxi_mtr', minWidth: 30 },
        { id: 'instruct_cnt', label: 'instruct_cnt', minWidth: 30 },
        { id: 'fix_cctv_mtr', label: 'fix_cctv_mtr', minWidth: 30 },
        { id: 'ptz_cctv_mtr', label: 'ptz_cctv_mtr', minWidth: 30 },
    
      ];
  const DDOnChange = (event,newValue,row_index) => {
    debugger;
      let v_rows = [...rows];
      v_rows[row_index].petrol_track = newValue;
      setRows(v_rows); 
  }
  
const handleChange = (e, columnId,rowID) => {
    let value = e.target.value;
    if(['len_mtr','obs_posts_count','std_light_mtr','veg_status_mtr','proxi_mtr','instruct_cnt','fix_cctv_mtr','ptz_cctv_mtr'].includes(columnId) )
    {
        value = value.replace(/[^0-9]/g, '');

        // Convert to a number for range validation
        const num = parseInt(value, 10);
      debugger
        if (value === '' || (!isNaN(num) && num >= 1 && num.toString().length <= 7)) {
        }
        else {
            return;
        }
    }
    if(['height_out_mtr_from','height_out_mtr_to'].includes(columnId) )
    {
        const matches = value.match(/\./g); // Global search for all dots
        if(matches !== null && matches.length >= 2) //contains more than one dot
        {
          return;
        }
        value = value.replace(/[^0-9.]/g, '');

        // Convert to a number for range validation
        const num = parseFloat(value, 10);
debugger
        if (value === '' || (!isNaN(num) && num >= 1 && num.toString().length <= 9)) {
        }
        else {
            return;
        }
    }
    const v_rows = [...rows];
    v_rows[rowID][columnId] = value;
    setRows(v_rows);
}
  const handleSave = () => {
     dispatch(savePerimeterProfile({ rows, raid })).unwrap()
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

    const fetchList = () =>{
      setIsFetching(true);
       dispatch(getPerimeterProfile(raid)).unwrap()
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

  const ddPetrol_track =['Yes','No']
  return (
    <>
         <Grid container flexDirection={'column'}>
        <Grid item container display={'flex'} justifyContent={'space-between'}>
          <CustomH2 headingName='Perimeter Profile'></CustomH2>
          <Button variant="contained" type='submit' sx={{ m: 1, minWidth: 150 }}
             onClick={handleSave}>Save</Button>
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
                                {column.id==='petrol_track' ?
                              <Autocomplete 
                                      disableClearable={true}
                                      options =  {ddPetrol_track}
                                      fullWidth
                                      value={row.petrol_track || ''}   
                                      //getOptionLabel={(option) => option || ""}
                                      onChange={(event, newValue) => {DDOnChange(event,newValue,index)}}
                                      renderInput={(params) => (
                                      <TextField {...params}  variant="standard" />
                                      )}
                                  />
                                :
                                <TextField placeholder='Numeric Value'
                                        variant="standard"
                                        fullWidth
                                        multiline={true}
                                        value={value || ''}
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
            <Fab color="primary" size='small' aria-label="add" style={{    margin: 0,
              top: 'auto',
              right: 20, // Distance from the right edge
              bottom: 40, // Distance from the bottom edge
              left: 'auto',
              position: 'fixed',}}
              onClick={()=>{
                const v_rows = [...rows, { active: 'Y' }]
                setRows(v_rows);
              }}
              >
            <AddIcon />
          </Fab>
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

        <SuccessAlert successAlert={successAlert} />
    </>
  )
}

export default PerimeterProfileEntry
