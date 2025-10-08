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
import { Autocomplete, Backdrop, CircularProgress, Fab, InputAdornment, TextField, Tooltip } from '@mui/material';
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
import parseErr from '../../../util/parseErr';

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
      setsuccessAlert({ ...successAlert,  open: false, message: "" });
          }
      });

//  const columns = [
//         { id: 'segment_from', label: 'segment_from', minWidth: 170 },
//         { id: 'segment_to', label: 'segment_to', minWidth: 170 },
//         { id: 'len_mtr', label: 'len_mtr', minWidth: 30 },
//         { id: 'peri_type', label: 'peri_type', minWidth: 170 },
//         { id: 'height_out_mtr_from', label: 'height_out_mtr_from', minWidth: 30 },
//         { id: 'height_out_mtr_to', label: 'height_out_mtr_to', minWidth: 30 },
//         { id: 'anti_climb_type', label: 'anti_climb_type', minWidth: 170 },
//         { id: 'petrol_track', label: 'petrol_track', minWidth: 30 },
//         { id: 'obs_posts_count', label: 'obs_posts_count', minWidth: 30 },
//         { id: 'std_light_mtr', label: 'std_light_mtr', minWidth: 30 },
//         { id: 'veg_status_mtr', label: 'veg_status_mtr', minWidth: 30 },
//         { id: 'proxi_mtr', label: 'proxi_mtr', minWidth: 30 },
//         { id: 'instruct_cnt', label: 'instruct_cnt', minWidth: 30 },
//         { id: 'fix_cctv_mtr', label: 'fix_cctv_mtr', minWidth: 30 },
//         { id: 'ptz_cctv_mtr', label: 'ptz_cctv_mtr', minWidth: 30 },
    
//       ];

       const columns = [
        { id: 'segment_from', label: 'Perimeter Segment From (ground marking)', minWidth: 300 },
        { id: 'segment_to', label: 'Perimeter Segment To (ground marking)', minWidth: 120 },
        { id: 'len_mtr', label: 'Segment length in mtrs', minWidth: 30 },
        { id: 'peri_type', label: 'Perimeter barrier type', minWidth: 180, options: ['RR', 'Concrete Slab', 'Brick Masonry', 'Concrete-block', 'Chain link'] },
        { id: 'height_out_mtr_from', label: 'Height from outside in mtrs', minWidth: 50 },
        { id: 'height_out_mtr_to', label: 'Height from inside in mtrs', minWidth: 100 },
        { id: 'anti_climb_type', label: 'Anti-climb infra type Concertina coil / barbed wire etc.', minWidth: 180, options:['None', 'Concertina Coil', 'Barbed wire', 'Buried glasses', 'Other'] },
        { id: 'petrol_track', label: 'Patrol Track along the length available or not? (to respond)', minWidth: 170, options:['Yes', 'No'] },
        { id: 'obs_posts_count', label: 'Only Standard Observation posts - count in this segment', minWidth: 170 },
        { id: 'std_light_mtr', label: 'Standard light (5 to 10Lux) available along the wall? (In mtrs)', minWidth: 170, tooltip: 'Value cannot be more than Segment Length in Mtrs' },
        { id: 'veg_status_mtr', label: 'Vegetation status Length in mtrs along the segment where perimeter is not visible due to vegetation, hindrance to physical or electronic surveillance?', minWidth: 250 , tooltip: 'Value cannot be more than Segment Length in Mtrs'},
        { id: 'proxi_mtr', label: 'Proximity of vital installation near the wall for the segment.(nearest point in mtrs)', minWidth: 200 },
        { id: 'instruct_cnt', label: 'Number Instrusions in last 1 year', minWidth: 30 },
        { id: 'fix_cctv_mtr', label: 'Fix CCTV coverage in meters How much length (in mtrs) is covered with fix cameras along the wall? In night', minWidth: 200 , tooltip: 'Value cannot be more than Segment Length in Mtrs'},
        { id: 'ptz_cctv_mtr', label: 'PTZ CCTV coverage in meters How much length (in mtrs) is covered with PTZ cameras along the wall? In night', minWidth: 200 , tooltip: 'Value cannot be more than Segment Length in Mtrs'},
    
      ];


  const DDOnChange = (event,newValue,row_index, column) => {
      let v_rows = [...rows];
      v_rows[row_index][column.id] = newValue;
      setRows(v_rows); 
  }
  
const handleChange = (e, columnId,rowID) => {
    let value = e.target.value;
    if(['len_mtr','obs_posts_count','std_light_mtr','veg_status_mtr','proxi_mtr','instruct_cnt','fix_cctv_mtr','ptz_cctv_mtr'].includes(columnId) )
    {
        value = value.replace(/[^0-9]/g, '');

        // Convert to a number for range validation
        const num = parseInt(value, 10);
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
        if (value === '' || (!isNaN(num) && num >= 1 && num <= 15)) {
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
    //validation
    let varValidation=false;
    rows.forEach((row, index) => {
      if(!varValidation && parseFloat(row.std_light_mtr)>parseFloat(row.len_mtr))
      {
        setsuccessAlert({
          ...successAlert, open: true, message: `Row ${index+1}: Standard light (5 to 10Lux) available along the wall cannot be more than Segment Length in Mtrs`, isError: true
        });
        varValidation=true;
      }
      if(!varValidation && parseFloat(row.veg_status_mtr)>parseFloat(row.len_mtr))
      {
        setsuccessAlert({
          ...successAlert, open: true, message: `Row ${index+1}: Vegetation status Length in mtrs along the segment where perimeter is not visible due to vegetation, hindrance to physical or electronic surveillance cannot be more than Segment Length in Mtrs`, isError: true
        });
        varValidation=true;
      }
      if(!varValidation && parseFloat(row.fix_cctv_mtr)>parseFloat(row.len_mtr))
      {
        setsuccessAlert({
          ...successAlert, open: true, message: `Row ${index+1}: Fix CCTV coverage in meters How much length (in mtrs) is covered with fix cameras along the wall? In night cannot be more than Segment Length in Mtrs`, isError: true
        });
        varValidation=true;
      }
      if(!varValidation && parseFloat(row.ptz_cctv_mtr)>parseFloat(row.len_mtr))
      {
        setsuccessAlert({
          ...successAlert, open: true, message: `Row ${index+1}: PTZ CCTV coverage in meters How much length (in mtrs) is covered with PTZ cameras along the wall? In night cannot be more than Segment Length in Mtrs`, isError: true
        });
        varValidation=true;
      }
    })
    if(varValidation) return;


    //duplicate check from and to should not be same for entire table
    const arr = rows.map((row, index) => {
      return row.segment_from + '|'+ row.segment_to ;
    })
    const dupArr = arr.filter((e, i, a) => a.indexOf(e) !== i) // [2, 4]
    if(dupArr.length>0)
    {
      const dupstr = dupArr[0].split('|');
      setsuccessAlert({
          ...successAlert, open: true, message: `Duplicate Perimeter Segment From and To found - ${dupstr[0]}`, isError: true
        });
        return;
    }
    //duplicate check from and to should not be same for entire table

    //validation


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
            setsuccessAlert({ ...successAlert, open: true, message: parseErr(err, columns), isError: true });
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
              else{
                 setRows([{ active: 'Y' }]);
              }
              setFetchError(false);
              setIsFetching(false);
          })
          .catch((err) => {
               setFetchError(err.message);
               setIsFetching(false);
          });
  }
   const percCal = (columnId) =>{
debugger
    let total = (rows.reduce((acc, obj) => acc + (parseFloat(obj[columnId]) || 0), 0) );
    let len_total = (rows.reduce((acc, obj) => acc + (parseFloat(obj.len_mtr) || 0), 0) );
    if(len_total===0) len_total=1;
    let perc = (total*100)/len_total;
    return perc.toFixed(2) + '%';
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
            <TableContainer sx={{ height: '65vh' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow sx={{ "& th": { backgroundColor: tableHeaderBgColor, color: "black" } }}>
                    {columns.map((column) => (
                      <TableCell 
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, verticalAlign:'top' }}
                      >
                        {
                        column.tooltip ? <Tooltip title={column.tooltip}>{column.label}</Tooltip> : column.label
                        }
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
                              <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, width: column.minWidth}}
                              >
                                {column.options ?
                              <Autocomplete 
                                      disableClearable={true}
                                      options =  {column.options}
                                      fullWidth
                                      value={value || ''}   
                                      //getOptionLabel={(option) => option || ""}
                                      onChange={(event, newValue) => {DDOnChange(event,newValue,index, column)}}
                                      renderInput={(params) => (
                                      <TextField {...params}  variant="standard" />
                                      )}
                                  />
                                :
                                <Tooltip title={column.tooltip}>
                                <TextField 
                                        variant="standard"
                                        fullWidth
                                        multiline={true}
                                        value={value || ''}
                                        onChange={(e) => handleChange(e, column.id,index)}
                                      />
                                </Tooltip>
                                }
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                    {rows.length>0 && rows[0].segment_from &&
                    <>
                      <TableRow hover tabIndex={-1} key='99998' sx={{ height: '40px', backgroundColor: tableHeaderBgColor }}>
                          {columns.map((column) => {
                            return (
                              <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, }}>
                                {column.id==='segment_from' ? 'Total' : 
                                column.id==='len_mtr' ? rows.reduce((acc, obj) => acc + (parseFloat(obj.len_mtr) || 0), 0) :
                                column.id==='std_light_mtr' ? rows.reduce((acc, obj) => acc + (parseFloat(obj.std_light_mtr) || 0), 0) :
                                column.id==='veg_status_mtr' ? rows.reduce((acc, obj) => acc + (parseFloat(obj.veg_status_mtr) || 0), 0) :
                                column.id==='instruct_cnt' ? rows.reduce((acc, obj) => acc + (parseFloat(obj.instruct_cnt) || 0), 0) :
                                column.id==='fix_cctv_mtr' ? rows.reduce((acc, obj) => acc + (parseFloat(obj.fix_cctv_mtr) || 0), 0) :
                                column.id==='ptz_cctv_mtr' ? rows.reduce((acc, obj) => acc + (parseFloat(obj.ptz_cctv_mtr) || 0), 0)
                                :''
                              }
                              </TableCell>
                            );
                          })}
                        </TableRow>
                        <TableRow hover tabIndex={-1} key='99999' sx={{ height: '40px', backgroundColor: tableHeaderBgColor }}>
                          {columns.map((column) => {
                            return (
                              <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, }}>
                                {column.id==='segment_from' ? '%age' : 
                                column.id==='std_light_mtr' ? percCal(column.id) :
                               column.id==='veg_status_mtr' ? percCal(column.id) :
                               column.id==='fix_cctv_mtr' ? percCal(column.id) :
                               column.id==='ptz_cctv_mtr' ? percCal(column.id) 
                                :''
                              }
                              </TableCell>
                            );
                          })}
                        </TableRow>
                        </>
          }
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
