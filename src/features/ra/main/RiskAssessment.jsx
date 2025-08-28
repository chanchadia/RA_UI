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
import { Backdrop, Button, CircularProgress, Fab, InputAdornment, TextField } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import CustomTextInput from '../../../ui-component/CustomTextInputField/customTextInput';
import { getWeightage, saveWeightage } from '../../../slice/SurveAssessmentSlice';
import CustomH2 from '../../../ui-component/Headings/CustomH2';
import CustomDashedBorder from '../../../ui-component/CustomDashedBorder';
import SuccessAlert from '../../../ui-component/snackbar';
import { getRiskAssessment, saveRiskAssessment } from '../../../slice/RiskAssessmentSlice';

import AddIcon from '@mui/icons-material/Add';
import getColor from '../colorCodes';

const RiskAssessment = (props) => {

    const { mySite, myRa: raid } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  //const { siteid, raid } = useParams();

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

  const columns1 = [
    { label: <>People<br/>Loss</>, minWidth: 120, color: '#BF8F00' },
    { label: <>Environment<br/>Loss</>, minWidth: 120, color: '#BF8F00' },
    { label: <>Asset<br/>Loss</>, minWidth: 120, color: '#BF8F00' },
    { label: <>Reputation<br/>Loss</>, minWidth: 120, color: '#BF8F00' },
    { label: 'Severity', minWidth: 120, color: '#BF8F00' },
    { label: 'Threat Actor Capability', minWidth: 120, color: '#C9C9C9' },
    { label: 'Threat Actor Intent', minWidth: 120, color: '#C9C9C9' },
    { label: 'Threat Rank in (Capability x Intent)', minWidth: 120, color: '#C9C9C9' },
    { label: 'Vulnerability', minWidth: 120, color: '#F4B084' },
    { label: 'Likelihood', minWidth: 120, color: '#8EA9DB' },
    { label: 'Risk', minWidth: 120, color: '#8497B0' },
    { label: ' ', minWidth: 120, color: '#8F8F8F' },
    { label: ' ', minWidth: 120, color: '#8F8F8F' },
    { label: ' ', minWidth: 120, color: '#8F8F8F' },
    { label: ' ', minWidth: 120, color: '#8F8F8F' },
    { label: 'Vulnerability', minWidth: 120, color: '#F4B084' },
    { label: 'Revised Likelihood', minWidth: 120, color: '#8EA9DB' },
    { label: 'Risk', minWidth: 120, color: '#8497B0' },

  ];

    const columns0 = [
      { label: 'Scenarios which management considers as critical', minWidth: 350, rowSpan: 3, verticalAlign: 'middle', color: 'whitesmoke' },
      { label: 'Impact if attack is sucessful', minWidth: 120, colSpan: 5, verticalAlign: 'middle', color: '#FFD966'},
      { label: 'Threat Ranking of Threat Actor (TA)', minWidth: 120, colSpan: 3, verticalAlign: 'middle', color: '#DBDBDB' },
      { label: 'Vulnerability - prepardness against scenario', minWidth: 120, verticalAlign: 'top', color: '#F8CBAD' },
      { label: 'Auto calculated T and V', minWidth: 120, verticalAlign: 'top', color: '#B4C6E7' },
      { label: 'Risk Rating based on S and L', minWidth: 120, verticalAlign: 'top', color: '#ACB9CA' },
      { label: 'Additional measures', minWidth: 120, colSpan: 4, verticalAlign: 'middle', color: '#ADADAD' },
      { label: 'Revised after measures', minWidth: 120, verticalAlign: 'top', color: '#F8CBAD' },
      { label: 'Auto calculated T and V', minWidth: 120, verticalAlign: 'top', color: '#B4C6E7' },
      { label: 'Revised Risk Rating based on S and L', minWidth: 120, verticalAlign: 'top', color: '#ACB9CA' },
    ];

  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);


  const handleChange = (e, column, rowID) => {
    let value = e.target.value;
    if (!column.isString) {
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

  if(['attack_p', 'attack_e', 'attack_a', 'attack_r', 'tr_tac', 'tr_tai', 'vulnerability', 'vulnerability_r'].includes(column.id))
  {
    let attack_p = v_rows[rowID].attack_p;
    let attack_e = v_rows[rowID].attack_e;
    let attack_a = v_rows[rowID].attack_a;
    let attack_r = v_rows[rowID].attack_r;

    let attack_s = Math.max(attack_p, attack_e, attack_a, attack_r);

    if(isNaN(attack_s) || attack_s === 0)
    {
      attack_s = null;
    }
    
    v_rows[rowID].attack_s = attack_s;

    //----------------------------------------------------------------------------------------------------------

    let tr_tac = v_rows[rowID].tr_tac;
    let tr_tai = v_rows[rowID].tr_tai;

    let tr_t = 1;

    if(tr_tac > tr_tai)
    {
      tr_t = 5;
    }
    else if((tr_tac * tr_tai) > 15)
    {
      tr_t = 4;
    }
    else if((tr_tac * tr_tai) >= 8)
    {
      tr_t = 3;
    }
    else if((tr_tac * tr_tai) >= 5)
    {
      tr_t = 2;
    }
    else
    {
      tr_t = 1;
    }
    
    v_rows[rowID].tr_t = tr_t;

    //----------------------------------------------------------------------------------------------------------

    let vulnerability = v_rows[rowID].vulnerability;

    let likelihood = 1;

    if((tr_t * vulnerability)>=20)
    {
      likelihood = 5;
    }
    else if((tr_t * vulnerability)>=12)
    {
      likelihood = 4;
    }
    else if((tr_t * vulnerability)>=6)
    {
      likelihood = 3;
    }
    else if((tr_t * vulnerability)>=3)
    {
      likelihood = 2;
    }
    else
    {
      likelihood = 1;
    }

    v_rows[rowID].likelihood = likelihood;


    //----------------------------------------------------------------------------------------------------------

    let risk = 1;

    if((attack_s * likelihood)>=20)
    {
      risk = 5;
    }
    else if((attack_s * likelihood)>=12)
    {
      risk = 4;
    }
    else if((attack_s * likelihood)>=6)
    {
      risk = 3;
    }
    else if((attack_s * likelihood)>=3)
    {
      risk = 2;
    }
    else
    {
      risk = 1;
    }

    v_rows[rowID].risk = risk;

    //----------------------------------------------------------------------------------------------------------

    let vulnerability_r = v_rows[rowID].vulnerability_r;

    let likelihood_r = 1;

    if((tr_t*vulnerability_r)>=20)
    {
      likelihood_r = 5;
    }
    else if((tr_t*vulnerability_r)>=12)
    {
      likelihood_r = 4;
    }
    else if((tr_t*vulnerability_r)>=6)
    {
      likelihood_r = 3;
    }
    else if((tr_t*vulnerability_r)>=3)
    {
      likelihood_r = 2;
    }
    else
    {
      likelihood_r = 1;
    }

    v_rows[rowID].likelihood_r = likelihood_r;

    //----------------------------------------------------------------------------------------------------------

    let risk_r = 1;

    if((attack_s*likelihood_r)>=20)
    {
      risk_r = 5;
    }
    else if((attack_s*likelihood_r)>=12)
    {
      risk_r = 4;
    }
    else if((attack_s*likelihood_r)>=6)
    {
      risk_r = 3;
    }
    else if((attack_s*likelihood_r)>=3)
    {
      risk_r = 2;
    }
    else
    {
      risk_r = 1;
    }

    v_rows[rowID].risk_r = risk_r;


  }

    setRows(v_rows);
  }

  useEffect(() => {
    dispatch(getRiskAssessment(raid)).unwrap()
      .then((resp) => {
        if (resp && resp.data && resp.data.length > 0) {
          setRows(resp.data)
        }
        else {
          //setRows([{},{},{},{},{},{},{},{},{},{}]);
          setRows([{ active: 'Y' }]);
        }
      })
      .catch((err) => {
        //setSingleSiteData(true); // to disable form
        //setsuccessAlert({ ...successAlert, open: true, message: err.message, isError: true });
      });
  }, []);


  const onSubmit = () => {
    setIsSubmitting(true)
    const data = rows.filter(item => item.scenarios && item.scenarios.trim() !== '');
    dispatch(saveRiskAssessment({ data, raid })).unwrap()
      .then((res) => {
        setIsSubmitting(false)
        //setIsDisabled(true);
        setsuccessAlert({
          ...successAlert, open: true, message: res.message, isError: false
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
        <TableContainer sx={{ height: '65vh' }}>
          <Table>
            <TableHead sx={{
                position: "sticky",
                top: 0,
                zIndex: 1,
            }}>
              <TableRow sx={{ "& th": {color: "black", padding: 0,  textAlign: 'center'} }}>
                {columns0.map((column) => (
                  column.label &&
                  <TableCell colSpan={column.colSpan} rowSpan={column.rowSpan} sx={{verticalAlign: column.verticalAlign, background: column.color}}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, border: '1px solid white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow sx={{ "& th": { color: "black", padding: 0, textAlign: 'center', verticalAlign: 'top' } }}>
                {columns1.map((column) => (
                  column.label &&
                  <TableCell sx={{background: column.color}}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, border: '1px solid white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow sx={{ "& th": { color: "black", padding:0, textAlign: 'center' } }}>
                {columns.map((column, i) => (
                  column.label &&
                  <TableCell sx={{background: columns1[i-1].color}}
                    key={column.id}
                    style={{ minWidth: column.minWidth, border: '1px solid white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.code} sx={{ height: '40px' }}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0,
                            background : column.readonly && getColor(value)
                           }}
                          >
                            {column.readonly ? <center>{value}</center>
                              :
                              <TextField placeholder={column.isString ? '' : '1 to 5'}
                                sx={{'& .MuiInputBase-input': {
                                            textAlign: column.isString ? 'left' : 'center',
                                            }}}
                                variant="standard"
                                fullWidth
                                value={value}
                                onChange={(e) => handleChange(e, column, index)}
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
