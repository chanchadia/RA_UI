import PropTypes from "prop-types";
// import "../Sidebar/styles.css"
import "../Sidebar/styles.min.css";
import "./sidebar.css";
// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Drawer, useMediaQuery } from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

import { BrowserView, MobileView } from "react-device-detect";

// project imports
import MenuList from "./MenuList";
import LogoSection from "../LogoSection";

import {  } from "../../../store/constant";
import { DrawerBgColor, DrawerTextColor } from "../../../store/constant";

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const drawer = (
    <div className="sidebarContainer">
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <MenuList />
        </PerfectScrollbar>
      </BrowserView>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: DrawerBgColor,
            color: DrawerTextColor,
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              top: "70px",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
