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
import { Backdrop, Box, Button, CircularProgress, InputAdornment, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { getDashboardDD,getSAComponentALL,getSAComponentWise } from '../../../slice/SADashboardSlice';
import LoadingError from '../../../ui-component/LoadingError';
import getColor,{ tableHeaderBgColor } from '../../ra/colorCodes';
import CustomH2 from '../../../ui-component/Headings/CustomH2';
import CustomDashedBorder from '../../../ui-component/CustomDashedBorder';
import { getRaAMSummary,saveRaAMSummary } from '../../../slice/RADashboardSlice';
import SuccessAlert from '../../../ui-component/snackbar';
import { CancelButton } from '../../../ui-component/Controls/Button';
import TableDataLoading from '../../../ui-component/TableDataLoading';

export default function RiskAdditionalMeasures()
{
      const { mySite, myRa: raid } = useSelector((state) => state.auth);
      const [fetchError, setFetchError] = useState(false);    
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [rows, setRows] = useState([]);
      const dispatch = useDispatch();
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
        { id: 'layer', label: 'Security layer', minWidth: 120 },
        { id: 'addlm', label: 'Additional Measures', minWidth: 200  },
        { id: 'cnt', label: 'Covered in # of Risks', minWidth: 30 },
        { id: 'r_1', label: '1', minWidth: 50 },
        { id: 'r_2', label: '2', minWidth: 50 },
        { id: 'r_3', label: '3', minWidth: 50 },
        { id: 'r_4', label: '4', minWidth: 50 },
        { id: 'r_5', label: '5', minWidth: 50 },
        { id: 'r', label: '', minWidth: 50 },
        { id: 'rr_1', label: '1', minWidth: 50 },
        { id: 'rr_2', label: '2', minWidth: 50 },
        { id: 'rr_3', label: '3', minWidth: 50 },
        { id: 'rr_4', label: '4', minWidth: 50 },
        { id: 'rr_5', label: '5', minWidth: 50 },
        { id: 'rr', label: '', minWidth: 50 },
        { id: 'perc', label: '%age', minWidth: 80 },
        { id: 'priority', label: 'Priority', minWidth: 50 },
        { id: 'priority_m', label: 'Manual Priority', minWidth: 100 },

      ];
  const fetchList = () =>{
  
    //     const all = [
    //     { security_layer: 'security_layer 1', Additional_Measures: 'AM 1', Covered_Risk: 'risk 1',one_one:'1',two_two:'2',three_three:'3',four_four:'4',five_five:'5', cal1:'50',one_1:'1',two_2:'2',three_3:'3',four_4:'4',five_5:'5', cal2:'50',perc:'50%',priority:'99',manual_priority:'99' },
    //     { security_layer: 'security_layer 2', Additional_Measures: 'AM 2', Covered_Risk: 'risk 2',one_one:'1',two_two:'2',three_three:'3',four_four:'4',five_five:'5', cal1:'50',one_1:'1',two_2:'2',three_3:'3',four_4:'4',five_5:'5', cal2:'50',perc:'50%',priority:'99',manual_priority:'99' },
    //     { security_layer: 'security_layer 3', Additional_Measures: 'AM 2', Covered_Risk: 'risk 2',one_one:'1',two_two:'2',three_three:'3',four_four:'4',five_five:'5', cal1:'50',one_1:'1',two_2:'2',three_3:'3',four_4:'4',five_5:'5', cal2:'50',perc:'50%',priority:'99',manual_priority:'99' },
    //     ];
    // setRows(all);

         setIsSubmitting(true)
            dispatch(getRaAMSummary(raid)).unwrap()
            .then((res)=>{
                setIsSubmitting(false);
                 setFetchError(false);
                setRows(res.data);

            })
            .catch((err) => {
                setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
                setIsSubmitting(false);
                setFetchError(err.message);
            });

    }
      const handleChange = (e, column, rowID) => {
    let value = e.target.value;
      value = value.replace(/[^0-9]/g, '');

      // Convert to a number for range validation
      const num = parseInt(value);

      // Validate if it's a number and within the range 1-100
      if (value === '' || (!isNaN(num) && num >= 1 && num <= rows.length) ) {
      }
      else {
        return;
      }
    const v_rows = [...rows];
    v_rows[rowID][column.id] = value;
    setRows(v_rows);
}

const onSubmit = () => {
            setIsSubmitting(true)
            const payload = {rows, raid: raid}
            dispatch(saveRaAMSummary(payload)).unwrap()
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
    useEffect(() => {
        fetchList();
    }, []);
    return (
    <>
    
      <Grid container flexDirection={'column'}>
        <Grid item container display={'flex'} justifyContent={'space-between'} sx={{pb:2}}>
          <div></div>
          <div>
            <CancelButton variant="contained" type='submit' sx={{ m: 1, minWidth: 150 }}
            >Download</CancelButton>
          <Button variant="contained" type='submit' sx={{ m: 1, minWidth: 150 }}
            onClick={onSubmit}>Save</Button>

          </div>
        </Grid>
   
      </Grid>
          {!fetchError && 
          <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                            <TableRow sx={{ "& th": { backgroundColor: tableHeaderBgColor, color: "black",height:30, padding: 1 } }}>
                                {columns.map((column) => {
                                  
                                  if(['layer', 'addlm', 'cnt'].includes(column.id))
                                  {
                                    return (<TableCell rowSpan={2} sx={{verticalAlign: 'top', border: '1px solid silver'}} key={column.id}>
                                                {column.label}
                                           </TableCell>);
                                  }
                                }
                                )}

                              <TableCell sx={{border: '1px solid silver'}} align='center' colSpan={6} >R</TableCell>
                              <TableCell sx={{border: '1px solid silver'}} align='center' colSpan={6} >Rr</TableCell>
                              <TableCell sx={{border: '1px solid silver'}} align='center' ></TableCell>
                                {columns.map((column) => {
                                  
                                  if(['priority', 'priority_m'].includes(column.id))
                                  {
                                    return (<TableCell rowSpan={2} sx={{verticalAlign: 'top', border: '1px solid silver'}} key={column.id}>
                                                {column.label}
                                           </TableCell>);
                                  }
                                }
                                )}

                            </TableRow>
                        
                            <TableRow sx={{ "& th": { backgroundColor: tableHeaderBgColor, color: "black", padding: 1 } }}>
                                {columns.map((column) => {
                                  
                                  if(!['layer', 'addlm', 'cnt', 'priority', 'priority_m'].includes(column.id))
                                  {
                                    return (<TableCell align='center' sx={{verticalAlign: 'top', border: '1px solid silver', background: ['1','2','3','4','5'].includes(column.label) ? getColor(parseInt(column.label)):''}} key={column.id}>
                                                {column.label}
                                           </TableCell>);
                                  }
                                }
                                )}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {isSubmitting ? <TableDataLoading cols={columns.length} />
                              :rows
                                .map((row,index) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px'}}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                        <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0, border: '1px solid white',
                                            width: column.minWidth, background : ['1', '2', '3', '4','5'].includes(column.label) ? getColor(parseInt(column.label)): ''
                                        }}>
                                            {column.id === 'priority_m' ? 
                                            <TextField
                                                variant="standard"
                                                fullWidth
                                                value={value}
                                                onChange={(e) => handleChange(e, column, index)}
                                                />
                                            :
                                            ['1', '2', '3', '4','5'].includes(column.label) && value === 0
                                            ? ""
                                            :
                                            column.id === 'perc' ? value + '%' :
                                            value
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
        </>
          }

            {fetchError && <LoadingError err={fetchError} onClick={fetchList} />}

            {/* <Backdrop 
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isSubmitting}
                //onClick={handleClose}
            >
                <CircularProgress sx={{ color: "white" }} />
            </Backdrop> */}
             <SuccessAlert successAlert={successAlert} />
    </>
    );
}