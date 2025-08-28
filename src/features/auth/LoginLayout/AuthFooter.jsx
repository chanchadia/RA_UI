//MUI imports
import { Typography, Grid, styled } from "@mui/material";
import  packageFile  from '../../../../package.json';

//Project imports

// ==============================|| FOOTER - AUTHENTICATION ||============================== //
const CustomFooterGrid = styled(Grid)`
  height: 45px;
  background: rgba(44, 50, 53, 0.3);
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  opacity: 0.9;
`;

const AuthFooter = () => {
  const version = packageFile.version;
  return (
  <> 
     <center> <font size="2" color="white">v {version}</font></center>
  {/* <CustomFooterGrid
    item
    xs={12}
    container
    alignItems="center"
    justifyContent="center"
  >
 
    <Typography sx={{ fontFamily: "Nunito" }}>
      Copyright SeRA Pvt. Ltd, All Rights Reserved. Registered in India.
    </Typography>
  </CustomFooterGrid> */}
  </>
  );
};

export default AuthFooter;
