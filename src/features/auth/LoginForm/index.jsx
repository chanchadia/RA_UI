//React imports
import { useEffect, useState } from "react";

//MUI imports
import {
  Backdrop,
  Box,
  CircularProgress,
  ClickAwayListener,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// IMPORT 3rd Party
import * as Yup from "yup";
import { Formik, Form } from "formik";

//Projet imports
//import { login } from "../userSlice";
import SuccessAlert from "../../../ui-component/snackbar";

//import { getToken } from "../../../utils/HelperFunctions";
import loginFormCSS from "../AuthLoginForm.module.css";
import { StyledTextField as CustomTextField } from "../StyledLoginComponents/styledInputFields";
import { StyledButton as StyledLoginButton } from "../StyledLoginComponents/styledButton";
import { StyledLink as StyledForgotPwdButton } from "../StyledLoginComponents/styledLink";
import StyledTooltipError from "../StyledLoginComponents/styledTooltipError";
import { loginUser, setLogin, setMyRa, setMyRaName, setMySite, setMySiteBusiness, setMySiteName } from "../../../slice/AuthSlice";
//IMPORT FROM React-redux
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";
//import { getUserList } from "../../../utils/commonSlice";

import packageFile from "../../../../package.json";


async function chkVersion()
{
  const resp = await fetch(`/meta.json?${new Date().getTime()}`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  }).catch(err=>err);

  if (resp.ok) {
    return await resp.json();
  } else {
    return {error: 'Please check your network connection'}; //resp.message
  }
}
const sxTxt={ width: "300px", 
            "input:-webkit-autofill" : {
                "-webkit-box-shadow": "0 0 0 1000px #06556F inset",
                "-webkit-text-fill-color": "white",
                "color": "white"
              } 
          };
//Login Page screen

function LoginForm(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [TokenFlag, setTokenFlag] = useState(false);
  const { token } = useSelector((state) => state.auth);

  //handling user found or not after login.
  const {
    userNotFoundMsg,
    userNotFoundFlag,
    redirectto,
    clientId,
    redirectPath,
  } = useSelector((state) => state.auth);
  const navPath = redirectto && clientId ? redirectPath : "/dashboard";

  useEffect(() => {
    if (token && getToken()) {
      setTokenFlag(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  //Handling Password field visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Handling success alert
  const [successAlert, setsuccessAlert] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  //Handling close the alert
  const handleClose = () => {
    setsuccessAlert({ ...successAlert,  open: false, message: "" });
  };

  //Initial alues for the form
  const initialValues = {
    email: "",
    password: "",
    submit: null,
  };

  //Validating login form fields
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email.")
      .max(255)
      .required("Email is required."),
    password: Yup.string().max(255).required("Password is required."),
  });

  //handling form submission
  const [isLoginError, setIsLoginError] = useState(false);
  const [loginErrMsg, setLoginErrMsg] = useState("");
  const handleTooltipClose = () => {
    setIsLoginError(false);
  };
  //const { userList } = useSelector((state) => state.commonSlice);
  const userList  = [];
  const onSubmitNow = (values) => {
    setIsSubmitting(true);
     dispatch(loginUser({
       login_id: values.email,
       login_pwd: values.password
    })).unwrap()
    .then((originalPromiseResult)=>{
      setIsSubmitting(false);
      if(originalPromiseResult)
      {
        dispatch(setLogin(true));
        sessionStorage.setItem('token', originalPromiseResult.detail);
        sessionStorage.setItem('login_name', originalPromiseResult.data.login_name);
        dispatch(setMySite(null));
        dispatch(setMyRa(null));
        dispatch(setMySiteName(null));
        dispatch(setMySiteBusiness(null));
        dispatch(setMyRaName(null));
        navigate('/site');
      } 
    })
    .catch((err) => {
      setIsSubmitting(false);
      sessionStorage.setItem('token', "");
        setLoginErrMsg(err.message === 'Failed to fetch' ? 'Please check your network connection.' : err.message);
        setIsLoginError(true);
    });
  }
  const onSubmit = (values) => {
    if(import.meta.env.REACT_APP_API_ENVIRONMENT === 'Dev')
    {
      onSubmitNow(values);
      return;
    }
    chkVersion().then((resp)=>{
      if(resp.error)
      {
        setLoginErrMsg(resp.error);
        setIsLoginError(true);
      }
      else if(packageFile.version !== resp.version)
      {
        setLoginErrMsg("You are using old version. Kindly press Ctrl+F5 keys to fetch latest version.");
        setIsLoginError(true);
      }
      else
      {
        onSubmitNow(values);
      }
      return;
    });

  };

  return (
    <>
      <SuccessAlert successAlert={successAlert} handleClose={handleClose} />
      {TokenFlag ? (
        navigate(navPath)
      ) : (
        <>
          {userNotFoundFlag && (
            <Grid item xs={12}>
              <Box sx={{ mb: 1, ml: 17 }}>
                <Typography variant="caption" color="red">
                  {userNotFoundMsg}
                </Typography>
              </Box>
            </Grid>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              setFieldValue,
              touched,
              errors,
              handleBlur,
              handleChange,
            }) => (
              <Form>
                <Grid
                  item
                  container
                  flexDirection={"column"}
                  alignItems="center"
                  mb={"150px"}
                  mt={"-80px"}
                >
                  <Grid item>
                    <p className={loginFormCSS.Heading}>Login</p>
                  </Grid>
                  <Grid item>
                    <CustomTextField
                      sx={sxTxt}
                      required
                      variant="standard"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Email"
                      // InputLabelProps={{className:loginFormCSS.emailField}}
                      error={touched.email && errors.email ? true : false}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item>
                    <CustomTextField
                      sx={sxTxt}
                      required
                      variant="standard"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label="Password"
                      error={touched.password && errors.password ? true : false}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>

                  <Grid item>
                    <StyledLoginButton
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Login
                    </StyledLoginButton>
                  </Grid>
                  <Grid item>
                    <div style={{marginTop:30, color:'white', cursor:'pointer'}}>Forgot Password?</div>
                    {/* <StyledForgotPwdButton
                      variant="text"
                      component="button"
                      type="password"
                      onClick={() => navigate("/forgotpwd")}
                    >
                      Forgot Password?
                    </StyledForgotPwdButton> */}
                  </Grid>
                  <Grid item>
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                      <div>
                        <StyledTooltipError
                          sx={{
                            "& .MuiTooltip-tooltip": {
                              textAlign: "center",
                              width: "300px",
                              fontSize: "15px",
                            },
                          }}
                          open={isLoginError}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          title={loginErrMsg}
                        >
                          <div></div>
                        </StyledTooltipError>
                      </div>
                    </ClickAwayListener>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>

          <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isSubmitting}
              //onClick={handleClose}
          >
              <CircularProgress sx={{ color: "white" }} />
          </Backdrop>
        </>
      )}
    </>
  );
}

export default LoginForm;
