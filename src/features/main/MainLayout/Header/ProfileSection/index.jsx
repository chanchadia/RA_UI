// react Imports
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// project imports

import MainCard    from "../../../../../ui-component/cards/MainCard";
import Transitions from "../../../../../ui-component/extended/Transitions";
// import {
//   GetCachedLoggedInUser,
//   RemoveLoggedInUser,
//   removeToken,
// } from "../../../../utils/HelperFunctions";
// import { logout } from "../../../../features/AuthenticationManagement/userSlice";
import { useDispatch } from "react-redux";

// assets and Css
import ProfilePhoto from "../../../../../assets/BlankUserPNG.png";
import HeaderCss from "../Header.module.css";
import "../headersection.css";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    dispatch(logout())
      .then(() => {
        removeToken();
        RemoveLoggedInUser();
        navigate("/login");
        window.location.reload(false);
      })
      .catch(() => {});
  };
  const handleResetPWD = () => {
    navigate("/changepassword");
    setOpen(false);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    //var userData = GetCachedLoggedInUser();
    //setUser(userData);
  }, []);

  return (
    <div className={HeaderCss.ProfileContainer}>
      {/* <span className={HeaderCss.UserName}>{user ? user.userName : "Anonymous User"}</span> */}
      {/* <span className={HeaderCss.UserName}>{userData.data?.login_name || "Anonymous User"}</span> */}
      <span className={HeaderCss.UserName}>{sessionStorage.getItem("login_name") || "Anonymous User"}</span>
      
      <span className={HeaderCss.ProfileDropDown}>
        {/* <span className="downarrowicon">
          <KeyboardArrowDownIcon onClick={handleToggle} />
        </span> */}

        <Chip
          style={{
            backgroundColor: "transparent",
            border: "none",
            transition: "none",
            width: "0px",
          }}
          sx={{
            "& :hover": {
              backgroundColor: "transparent",
            },
            "& :focus": {
              backgroundColor: "red",
            },
          }}
          icon={
            <Avatar
              src={ProfilePhoto}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
                height: "54px",
                width: "54px",
                top: "4px",
                right: "19px",
              }}
            />
          }
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClickX={handleToggle}
        />

        {/* <Popper
          id="prfileDropDownLists"
          placement="bottom-end"
          open={open}
          style={{ width: "155px" }}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          popperOptions={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 14],
                },
              },
            ],
          }}
        >
          {({ TransitionProps }) => (
            <Transitions in={open} {...TransitionProps}>
              <span className={HeaderCss.ProfileDropDownList}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MainCard
                      border={false}
                      elevation={16}
                      content={false}
                      boxShadow
                      shadow={theme.shadows[16]}
                    >
                      <Box>
                        <List
                          component="nav"
                          sx={{
                            width: "100%",
                            maxWidth: 350,
                            minWidth: 300,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: "10px",
                            [theme.breakpoints.down("md")]: {
                              minWidth: "100%",
                            },
                            "& .MuiListItemButton-root": {
                              mt: 0.5,
                            },
                          }}
                        >
                          <ListItemButton
                            sx={{
                              borderRadius: `${customization.borderRadius}px`,
                            }}
                            selected={selectedIndex === 1}
                            onClick={handleResetPWD}
                          >
                            <ListItemText
                              primary={
                                <Grid
                                  container
                                  spacing={1}
                                  justifyContent="space-between"
                                >
                                  <Grid item>
                                    <Typography variant="body2">
                                      Change Password
                                    </Typography>
                                  </Grid>
                                </Grid>
                              }
                            />
                          </ListItemButton>
                          <ListItemButton
                            sx={{
                              borderRadius: `${customization.borderRadius}px`,
                            }}
                            selected={selectedIndex === 4}
                            onClick={handleLogout}
                          >
                            <ListItemText
                              primary={
                                <Typography variant="body2">Logout</Typography>
                              }
                            />
                          </ListItemButton>
                        </List>
                      </Box>
                    </MainCard>
                  </ClickAwayListener>
                </Paper>
              </span>
            </Transitions>
          )}
        </Popper> */}
      </span>
    </div>
  );
};

export default ProfileSection;
