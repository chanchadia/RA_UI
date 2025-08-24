// material-ui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import ProfileSection from "./ProfileSection";
//import NotificationSection from "./NotificationSection";
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          {/* <LogoSection /> */}
        </Box>
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}>
        {/* <LogoSection /> */}
      </Box>
      <div
        style={{
          height: "40px",
          marginLeft: "112px",
        }}
      >
        <LogoSection />
      </div>

      <Box sx={{ flexGrow: 1 }}></Box>
      {/* Do not delete Dynamically Yet not developed*/}
      {/* <NotificationSection /> */}
      <ProfileSection />
    </>
  );
};
export default Header;
