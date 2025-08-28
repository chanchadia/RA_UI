import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};






export default function MultipleSelect(props) {
  /*
  props
  {
    names = {nameInfra}, 
    setNames = {(val) => {setNamesInfra([...val])}},
    selectedValue={row['infra']}, 
    setSelectedValue={(val) => {
      let v_rows = [...row];
      v_rows[index].infra = val;
      setRows(v_rows);
    }}
  }
  */

//   const [names, setNames] = React.useState( [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ]);

  const [myVal, setMyVal] = React.useState('');

  const theme = useTheme();
  //const [selectedValue, setSelectedValue] = React.useState([]);

  const handleChange = (e) => {
    props.setSelectedValue([...e.target.value]);
    setMyVal('');
  };

  const onEnterPress = (e) => {
    const newNames = [...props.names];
    const result = newNames.map(e => e.toLowerCase()).includes(e.target.value.trim().toLowerCase());

    if(!result)
    {
      props.setNames([...props.names, e.target.value.trim()]);
      props.setSelectedValue([...props.selectedValue, e.target.value.trim()]);
    }
    setMyVal('');
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} variant="standard" >
        <InputLabel>Details</InputLabel>
        <Select
          multiple
          value={props.selectedValue}
          onChange={handleChange}
          MenuProps={MenuProps}
          
        >
          <ListSubheader>
            <TextField
              size="small"
              // Autofocus on textfield
              autoFocus
              placeholder="Type to add"
              fullWidth
              value={myVal}
              onChange={(e)=>{setMyVal(e.target.value)}}
              //onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();

                  if (e.key === "Enter")
                  {
                    //alert(e.target.value);
                      //handleChange(e);
                      onEnterPress(e);
                  }
                }
                else
                {
                  setMyVal('');
                }
              }}
            />
          </ListSubheader>
          {props.names.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
}