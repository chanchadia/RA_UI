import React from 'react'
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/GridLegacy';
import { Backdrop, Box, CircularProgress, Fab, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import Button  from '../../../ui-component/Controls/Button';
import CustomDashedBorder from '../../../ui-component/CustomDashedBorder';

import AddIcon from '@mui/icons-material/Add';
import MultipleSelect from '../../../ui-component/CustomMultiSelectDD/MultipleSelect';
import getColor, { tableHeaderBgColor } from '../../ra/colorCodes';
import CustomH2 from '../../../ui-component/Headings/CustomH2';

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import CustomH5 from '../../../ui-component/Headings/CustomH5';

export default function RiskRatingDetails(props)
{
  const [viewIndex, setViewIndex] = useState(0); 
  const [rows, setRows] = useState([]);
  

  const columns = [
   // { id: 'scenarios', label: null, minWidth: 120, isString: true },
    { id: 'attack_p', label: 'P', minWidth: 60 },
    { id: 'attack_e', label: 'E', minWidth: 90 },
    { id: 'attack_a', label: 'A', minWidth: 60 },
    { id: 'attack_r', label: 'R', minWidth: 80 },
    { id: 'attack_s', label: 'S', minWidth: 70, readonly: true },
    { id: 'tr_tac', label: 'TAc', minWidth: 120 },
    { id: 'tr_tai', label: 'TAi', minWidth: 120},
    { id: 'tr_t', label: 'T', minWidth: 120, readonly: true },
    { id: 'vulnerability', label: 'V', minWidth: 120},
    { id: 'likelihood', label: 'L', minWidth: 120, readonly: true },
    { id: 'risk', label: 'R', minWidth: 120, readonly: true },
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


  ];

    const columns0 = [
     // { label: 'Scenarios which management considers as critical', minWidth: 350, rowSpan: 3, verticalAlign: 'middle', color: tableHeaderBgColor },
      { label: 'Impact if attack is successful', minWidth: 120, colSpan: 5, verticalAlign: 'middle', color: '#FFD966'},
      { label: 'Threat Ranking of Threat Actor (TA)', minWidth: 120, colSpan: 3, verticalAlign: 'middle', color: '#DBDBDB' },
      { label: 'Vulnerability - preparedness against scenario', minWidth: 120, verticalAlign: 'top', color: '#F8CBAD' },
      { label: 'Auto calculated T and V', minWidth: 120, verticalAlign: 'top', color: '#B4C6E7' },
      { label: 'Risk Rating based on S and L', minWidth: 120, verticalAlign: 'top', color: '#ACB9CA' },

    ];

  const _columns = [
    { id: 'am_i', label: 'Infrastructure', minWidth: 120, isString: true },
    { id: 'am_a', label: 'Automation', minWidth: 120, isString: true },
    { id: 'am_p', label: 'Process', minWidth: 120, isString: true },
    { id: 'am_m', label: 'Manpower', minWidth: 120, isString: true },
    { id: 'vulnerability_r', label: 'Vr', minWidth: 80 },
    { id: 'likelihood_r', label: 'Lr', minWidth: 80, readonly: true },
    { id: 'risk_r', label: 'Rr', minWidth: 80, readonly: true },
  ];

  const _columns1 = [
    { label: ' ', minWidth: 120, color: '#8F8F8F' },
    { label: ' ', minWidth: 120, color: '#8F8F8F' },
    { label: ' ', minWidth: 120, color: '#8F8F8F' },
    { label: ' ', minWidth: 120, color: '#8F8F8F' },
    { label: 'Vulnerability', minWidth: 120, color: '#F4B084' },
    { label: 'Revised Likelihood', minWidth: 120, color: '#8EA9DB' },
    { label: 'Risk', minWidth: 120, color: '#8497B0' },

  ];

    const _columns0 = [
      { label: 'Additional measures', minWidth: 120, colSpan: 4, verticalAlign: 'middle', color: '#ADADAD' },
      { label: 'Revised after measures', minWidth: 120, verticalAlign: 'top', color: '#F8CBAD' },
      { label: 'Auto calculated T and V', minWidth: 120, verticalAlign: 'top', color: '#B4C6E7' },
      { label: 'Revised Risk Rating based on S and L', minWidth: 120, verticalAlign: 'top', color: '#ACB9CA' },
    ];



  useEffect(()=>{
    setRows([{...props.rows[viewIndex]}]);
  }, [viewIndex, props.rows]);
    

  return (
    <>


      <Grid container flexDirection={'column'}>
        <Grid container display={'flex'} justifyContent={'space-between'}>
          <Grid item>
          <CustomH5 headingName={`Risk ID: ${rows.length > 0 && rows[0].id}`} sx={{mt:0}}></CustomH5>
          {rows.length > 0 && rows[0].scenarios}
          <Typography fontFamily={'Roboto'} fontSize={12}>(Scenarios which management considers as critical)</Typography>
          </Grid>
          <Grid item>

              <CloseOutlinedIcon color='primary' onClick={props.onClose} sx={{cursor:'pointer', width: 40, height: 40}} />

          </Grid>



        </Grid>
        <Grid item flexGrow={1}>
          <CustomDashedBorder />
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": {color: "black", padding: 0,  textAlign: 'center'} }}>
                {columns0.map((column) => (
                  column.label &&
                  <TableCell colSpan={column.colSpan} rowSpan={column.rowSpan} sx={{verticalAlign: column.verticalAlign, background: column.color}}
                    key={column.id}
                    align={column.align}
                    style={{ 
                        //minWidth: column.minWidth, 
                        border: '1px solid white' 
                    }}
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
                    style={{ 
                        //minWidth: column.minWidth, 
                        border: '1px solid white' 
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow sx={{ "& th": { color: "black", padding:0, textAlign: 'center' } }}>
                {columns.map((column, i) => (
                  column.label &&
                  <TableCell sx={{background: columns1[i].color}}
                    key={column.id}
                    style={{ 
                        minWidth: column.minWidth, 
                        border: '1px solid white' 
                    }}
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
                          <TableCell key={column.id} align={'center'} sx={{ paddingTop: 0.8, paddingBottom: 0,
                            background : column.readonly && getColor(value),
                            //verticalAlign:['am_a', 'am_i', 'am_p', 'am_m'].includes(column.id) ? 'bottom' : 'middle'
                           }}
                          >
                              {value}
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

      <Paper sx={{ width: '100%', overflow: 'hidden', mt:5, mb:5 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": {color: "black", padding: 0,  textAlign: 'center'} }}>
                {_columns0.map((column) => (
                  column.label &&
                  <TableCell colSpan={column.colSpan} rowSpan={column.rowSpan} sx={{verticalAlign: column.verticalAlign, background: column.color}}
                    key={column.id}
                    align={column.align}
                    style={{ 
                        //minWidth: column.minWidth, 
                        border: '1px solid white' 
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow sx={{ "& th": { color: "black", padding: 0, textAlign: 'center', verticalAlign: 'top' } }}>
                {_columns1.map((column) => (
                  column.label &&
                  <TableCell sx={{background: column.color}}
                    key={column.id}
                    align={column.align}
                    style={{ 
                        //minWidth: column.minWidth, 
                        border: '1px solid white' 
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow sx={{ "& th": { color: "black", padding:0, textAlign: 'center' } }}>
                {_columns.map((column, i) => (
                  column.label &&
                  <TableCell sx={{background: _columns1[i].color}}
                    key={column.id}
                    style={{ 
                        width: column.minWidth, 
                        border: '1px solid white' 
                    }}
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
                      {_columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ paddingTop: 0.8, paddingBottom: 0,
                            background : column.readonly && getColor(value),
                            verticalAlign:['am_a', 'am_i', 'am_p', 'am_m'].includes(column.id) ? 'top' : 'middle'
                           }}
                          >
                            {column.id==='am_i' || column.id==='am_a' || column.id==='am_p' || column.id==='am_m' ?
                                (value || '') .split('|').map((ele)=>{
                                  return (<>
                                  <Tooltip title={ele} placement="right">
                                    <div style={{whiteSpace:'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: column.minWidth}}>
                                      {ele}
                                    </div>
                                    </Tooltip>
                                    <hr/>
                                  </>);
                                })
                              :
                              <center>{value}</center>
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

<Fab color="primary" size='small' aria-label="add" style={{    margin: 0,
    top: 'auto',
    right: 20, // Distance from the right edge
    bottom: 40, // Distance from the bottom edge
    left: 'auto',
    position: 'fixed',}}
    disabled={viewIndex >= props.rows.length - 1}
    onClick={()=>{
      viewIndex < props.rows.length - 1 && setViewIndex(viewIndex + 1);
    }}
    >
  <ArrowForwardOutlinedIcon/>
</Fab>
<Fab color="primary" size='small' aria-label="add" style={{    margin: 0,
    top: 'auto',
    right: 'auto', // Distance from the right edge
    bottom: 40, // Distance from the bottom edge
    left: '20',
    position: 'fixed',}}
    disabled={viewIndex === 0}
    onClick={()=>{
      viewIndex > 0 && setViewIndex(viewIndex - 1);
    }}
    >
  <ArrowBackOutlinedIcon/>
</Fab>
    </>
  )
}