// material-ui
import { Typography, Box,Grid } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Grid item xs={12} container alignItems="center" justifyContent="center" sx={{
        backgroundColor:'#0b4564'
    }}>
    <Box sx={{ mb: 2 ,mt:1}}>
        <Typography color="white" variant="body1">Copyright SKS Business Services Ltd, All Rights Reserved. Registered in England & Wales.</Typography>
    </Box>
</Grid>
    
);

export default AuthFooter;
