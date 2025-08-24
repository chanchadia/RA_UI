import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import LogoSection from '../../layout/MainLayout/LogoSection';

export default function AuthHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"white"}}>
        <Toolbar variant="regular">
         <LogoSection/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
