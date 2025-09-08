

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SADashboard from './SADashboard/SADB';
import RiskRating from './RADashboard/RiskRating';
import RiskAdditionalMeasures from './RAAdditionalMeasures/RiskAdditionalMeasures';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Risk Rating" {...a11yProps(0)} />
          <Tab label="Additional Measures" {...a11yProps(2)} />
          <Tab label="Survey Assessment" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RiskRating/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RiskAdditionalMeasures/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SADashboard />
      </CustomTabPanel>
    </Box>
  );
}
