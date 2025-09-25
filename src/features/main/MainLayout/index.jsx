import * as React from "react";
import { useEffect } from "react";

// Material UI Import
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Outlet, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Button from '../../../ui-component/Controls/Button';

// project imports CSS
import Header from "./Header";
import Footer from "./Footer";
import "./mainlayout.css";
import { useDispatch, useSelector } from "react-redux";

//import { SetEmailBodyCollapsed } from "../../store/customizationSlice";

import AppMenu from '../Accordion';
import { Card, CardActions, CardContent, GridLegacy as Grid, Typography } from "@mui/material";

// New Layout
const drawerWidth = 260;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Drawer
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Appbar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { isLogout } = useSelector((state) => state.auth);
  const navigate = useNavigate();

    const { mySiteName, mySiteBusiness, myRaName } = useSelector((state) => state.auth);
  const MainDetail = () =>{
    if(mySiteName)
    {
      if(myRaName)
      {
        return (<>{mySiteName} / {mySiteBusiness} / {myRaName}</>);
      }
      return (<>{mySiteName} / {mySiteBusiness}</>);
    }
    return <>&nbsp;</>;
  }


  // const { isEmailBodyCollapsed } = useSelector((state) => state.customization);
  // const { jobStatusReportCalled } = useSelector(
  //   (state) => state.reportManagement
  // );
  // const {
  //   userData,
  //   userAllocationReportVisibleFl,
  //   rolesAndPermission,
  //   reportMenuVisibleFl,
  //   isSysAdminFl,
  //   isDeptAdminFl,
  //   jobStatusReportVisibleFl,
  // } = useSelector((state) => state.auth);

  useEffect(() => {
    setOpen(true);
  }, []);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   //setOpen(isEmailBodyCollapsed)
  //   if (isEmailBodyCollapsed) {
  //     handleDrawerOpen();
  //   } else {
  //     handleDrawerClose();
  //   }
  // }, [isEmailBodyCollapsed]);

  // //FOR WIP Report Screen
  // useEffect(() => {
  //   //setOpen(isEmailBodyCollapsed)
  //   if (!jobStatusReportCalled) {
  //     handleDrawerOpen();
  //   } else {
  //     handleDrawerClose();
  //   }
  // }, [jobStatusReportCalled]);

  // Drawer open
  const handleDrawerOpen = () => {
    setOpen(true);
    //dispatch(SetEmailBodyCollapsed(true));
    // setTimeout(() => {
    //   document.getElementById("tohideHome").style.display = "inline-block";
    //   if (isSysAdminFl === true || isDeptAdminFl === true) {
    //     document.getElementById("tohideClients").style.display = "inline-block";
    //   }

    //   document.getElementById("menuicon").style.display = "block";

    //   if (isSysAdminFl === true || isDeptAdminFl === true) {
    //     document.getElementById("tohideAdmin").style.display = "inline-block";

    //     document.getElementById("menuMob").style.marginLeft = "62px";
    //     document.getElementById("menuMob1").style.marginLeft = "62px";
    //     document.getElementById("menuMob2").style.marginLeft = "62px";
    //     // document.getElementById("menuMob3").style.marginLeft = "62px";
    //     document.getElementById("menuMob4").style.marginLeft = "62px";
    //     if (
    //       Object.keys(userData).length > 0 &&
    //       userData?.roles[0]?.rolename === "ROLE_SYSADMIN"
    //     ) {
    //       document.getElementById("menuMob5").style.marginLeft = "62px";
    //       document.getElementById("submenuRoles").style.marginLeft = "12px";
    //     }

    //     document.getElementById("submenuDept").style.marginLeft = "12px";
    //     document.getElementById("submenuTeam").style.marginLeft = "12px";
    //     document.getElementById("submenuUser").style.marginLeft = "12px";
    //     // document.getElementById("submenuClient").style.marginLeft = "12px";
    //     document.getElementById("submenuServices").style.marginLeft = "12px";
    //   }

    //   document.getElementById("tohideCases").style.display = "inline-block";
    //   document.getElementById("menuMob20").style.marginLeft = "62px";
    //   document.getElementById("menuMob21").style.marginLeft = "62px";
    //   document.getElementById("submenuMyCases").style.marginLeft = "12px";
    //   // document.getElementById("submenuTeamCases").style.marginLeft = "12px";
    //   document.getElementById("submenuDepartmentCases").style.marginLeft =
    //     "12px";

    //   document.getElementById("tohideTasks").style.display = "inline-block";
    //   document.getElementById("menuMob30").style.marginLeft = "62px";
    //   document.getElementById("menuMob31").style.marginLeft = "62px";
    //   document.getElementById("submenuMyTasks").style.marginLeft = "12px";
    //   // document.getElementById("submenuTeamTasks").style.marginLeft = "12px";
    //   document.getElementById("submenuDepartmentTasks").style.marginLeft =
    //     "12px";

    //   document.getElementById("tohideJobs").style.display = "inline-block";
    //   document.getElementById("menuMob40").style.marginLeft = "62px";
    //   document.getElementById("menuMob41").style.marginLeft = "62px";
    //   document.getElementById("menuMob42").style.marginLeft = "62px";
    //   document.getElementById("menuMob43").style.marginLeft = "62px";
    //   document.getElementById("submenuMyJobs").style.marginLeft = "12px";
    //   document.getElementById("submenuMyStages").style.marginLeft = "12px";
    //   document.getElementById("submenuMySubtasks").style.marginLeft = "12px";
    //   document.getElementById("submenuDepartmentJobs").style.marginLeft =
    //     "12px";

    //   //Handling Roles and Permission for Reports
    //   if (reportMenuVisibleFl) {
    //     document.getElementById("tohideReports").style.display = "inline-block";
    //     if (userAllocationReportVisibleFl) {
    //       document.getElementById("menuMob51").style.marginLeft = "62px";
    //       document.getElementById(
    //         "submenuUserAllocationReport"
    //       ).style.marginLeft = "12px";
    //     }

    //     if (jobStatusReportVisibleFl) {
    //       document.getElementById("menuMob50").style.marginLeft = "62px";
    //       document.getElementById("submenuJobStatusReport").style.marginLeft =
    //         "12px";
    //     }
    //     if (
    //       document.getElementsByClassName(
    //         "MuiAccordionSummary-expandIconWrapper"
    //       )[4]
    //     ) {
    //       document.getElementsByClassName(
    //         "MuiAccordionSummary-expandIconWrapper"
    //       )[4].style.display = "inline-block";
    //     }
    //   }

    //   if (
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[0]
    //   ) {
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[0].style.display = "inline-block";
    //   }

    //   if (
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[1]
    //   ) {
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[1].style.display = "inline-block";
    //   }
    //   if (
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[2]
    //   ) {
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[2].style.display = "inline-block";
    //   }
    //   if (
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[3]
    //   ) {
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[3].style.display = "inline-block";
    //   }

    //   // if (
    //   //   Object.keys(userData).length !== 0 &&
    //   //   userData.roles.length !== 0 &&
    //   //   userData.roles[0].rolename === "ROLE_SYSADMIN"
    //   // ) {
    //   // document.getElementsByClassName(
    //   //   "MuiAccordionSummary-expandIconWrapper"
    //   // )[4].style.display = "inline-block";
    //   // }
    // }, 150);
    // document.getElementById("tohideAuditPlanner").style.display = "inline-block";
    // document.getElementById("QCLink").style.display = "inline-block";
  };

  // Drawer Close
  const handleDrawerClose = () => {
    setOpen(false);
    //SetEmailBodyCollapsed function is handling collapse expand feture in emailqueue screen
    // dispatch(SetEmailBodyCollapsed(false));
    // setTimeout(() => {
    //   document.getElementById("tohideHome").style.display = "none";
    //   if (isSysAdminFl === true || isDeptAdminFl === true) {
    //     document.getElementById("tohideClients").style.display = "none";
    //   }

    //   document.getElementById("menuicon").style.disply = "none";
    //   // if(Object.keys(userData).length !== 0 && ( userData.roles.length!==0 && userData.roles[0].rolename === "ROLE_SYSADMIN")){
    //   if (isSysAdminFl === true || isDeptAdminFl === true) {
    //     document.getElementById("tohideAdmin").style.display = "none";

    //     document.getElementById("menuMob").style.marginLeft = "17px";
    //     document.getElementById("menuMob1").style.marginLeft = "17px";
    //     document.getElementById("menuMob2").style.marginLeft = "17px";
    //     // document.getElementById("menuMob3").style.marginLeft = "17px";
    //     document.getElementById("menuMob4").style.marginLeft = "17px";
    //     if (
    //       Object.keys(userData).length > 0 &&
    //       userData?.roles[0]?.rolename === "ROLE_SYSADMIN"
    //     ) {
    //       document.getElementById("menuMob5").style.marginLeft = "17px";
    //       document.getElementById("submenuRoles").style.marginLeft = "23px";
    //     }

    //     document.getElementById("submenuDept").style.marginLeft = "23px";
    //     document.getElementById("submenuTeam").style.marginLeft = "23px";
    //     document.getElementById("submenuUser").style.marginLeft = "23px";
    //     // document.getElementById("submenuClient").style.marginLeft = "23px";

    //     document.getElementById("submenuServices").style.marginLeft = "23px";
    //   }

    //   document.getElementById("tohideCases").style.display = "none";
    //   document.getElementById("menuMob20").style.marginLeft = "17px";
    //   document.getElementById("menuMob21").style.marginLeft = "17px";
    //   document.getElementById("submenuMyCases").style.marginLeft = "23px";
    //   // document.getElementById("submenuTeamCases").style.marginLeft = "23px";
    //   document.getElementById("submenuDepartmentCases").style.marginLeft =
    //     "23px";

    //   document.getElementById("tohideTasks").style.display = "none";
    //   document.getElementById("menuMob30").style.marginLeft = "17px";
    //   document.getElementById("menuMob31").style.marginLeft = "17px";
    //   document.getElementById("submenuMyTasks").style.marginLeft = "23px";
    //   // document.getElementById("submenuTeamTasks").style.marginLeft = "23px";
    //   document.getElementById("submenuDepartmentTasks").style.marginLeft =
    //     "23px";

    //   document.getElementById("tohideJobs").style.display = "none";
    //   document.getElementById("menuMob40").style.marginLeft = "17px";
    //   document.getElementById("menuMob41").style.marginLeft = "17px";
    //   document.getElementById("menuMob42").style.marginLeft = "17px";
    //   document.getElementById("menuMob43").style.marginLeft = "17px";
    //   document.getElementById("submenuMyJobs").style.marginLeft = "23px";
    //   document.getElementById("submenuMyStages").style.marginLeft = "23px";
    //   document.getElementById("submenuMySubtasks").style.marginLeft = "23px";
    //   document.getElementById("submenuDepartmentJobs").style.marginLeft =
    //     "23px";

    //   //Handling Roles and Permission for Reports
    //   if (reportMenuVisibleFl) {
    //     document.getElementById("tohideReports").style.display = "none";
    //     if (userAllocationReportVisibleFl) {
    //       document.getElementById("menuMob51").style.marginLeft = "17px";
    //       document.getElementById(
    //         "submenuUserAllocationReport"
    //       ).style.marginLeft = "23px";
    //     }

    //     if (jobStatusReportVisibleFl) {
    //       document.getElementById("menuMob50").style.marginLeft = "17px";
    //       document.getElementById("submenuJobStatusReport").style.marginLeft =
    //         "23px";
    //     }

    //     if (
    //       document.getElementsByClassName(
    //         "MuiAccordionSummary-expandIconWrapper"
    //       )[4]
    //     ) {
    //       document.getElementsByClassName(
    //         "MuiAccordionSummary-expandIconWrapper"
    //       )[4].style.display = "none";
    //     }
    //   }
    //   if (
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[0]
    //   ) {
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[0].style.display = "none";
    //   }
    //   if (
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[1]
    //   ) {
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[1].style.display = "none";
    //   }
    //   if (
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[2]
    //   ) {
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[2].style.display = "none";
    //   }
    //   if (
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[3]
    //   ) {
    //     document.getElementsByClassName(
    //       "MuiAccordionSummary-expandIconWrapper"
    //     )[3].style.display = "none";
    //   }

    //   // if (
    //   //   Object.keys(userData).length !== 0 &&
    //   //   userData.roles.length !== 0 &&
    //   //   userData.roles[0].rolename === "ROLE_SYSADMIN"
    //   // ) {

    //   // }
    //   // }
    //   document.getElementById("tohideAuditPlanner").style.display = "none";
    //   document.getElementById("QCLink").style.display = "none";
      
    // }, 200);
  };
  return (
    <div className="main">
      {isLogout ?
    <>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '60px' }}>
        <Card sx={{ minWidth: 400, maxWidth: 1000 }} elevation={3}>
          <CardContent>

            <Typography variant="h5" sx={{ mb: 3, color: 'error.main' }}>
              Error
            </Typography>

            <Typography>
              Your login session expired, kindly re-login and try again.
            </Typography>

          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ m: 2, width: 100 }} onClick={()=>{
              navigate('/login');
            }}>Re-Login</Button>
          </CardActions>
        </Card>
      </div>
      <br />
      <br />
    </>
      :
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Header />
          </Toolbar>
        </AppBar>
        <div className="headerDrawer">
          <Drawer variant="permanent" open={open}>
            <DrawerHeader className="menuIconBox">
              <div className="menubackground">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: "none" }),
                  }}
                >
                  <Tooltip title="Menu" placement="right-end" arrow>
                    <MenuIcon />
                  </Tooltip>
                </IconButton>

                <span>
                  <span className="menuicon" id="menuicon">
                    <MenuIcon />
                  </span>
                  <span className="menubtn"> Menu</span>
                </span>
              </div>
              <IconButton onClick={handleDrawerClose}>
                <span className="closeicon">
                  <CloseIcon />
                </span>
              </IconButton>
            </DrawerHeader>
            <Divider />
            {/* <SimpleAccordion /> */}
            {open ? <AppMenu /> : 
            <Typography sx={{color:'white', textOrientation: 'sideways', writingMode: 'vertical-lr', cursor:'pointer'}} 
              py={15} px={2.5} onClick={()=>handleDrawerOpen()}>
              M E N U
              </Typography>
            }
            
            <Divider />
          </Drawer>
        </div>

        <Box component="main" sx={{ flexGrow: 1, py: 0, px:2, overflowX: "auto" }}>
          <div style={{fontSize:15, paddingTop:5}}><MainDetail/></div>
          <Outlet />
        </Box>
        <Footer />
      </Box>
      }
    </div>
  );
};

export default MainLayout;
