//React imports
import React from "react";

//MUI imports
import CssBaseline from "@mui/material/CssBaseline";
//import Grid from "@mui/material/Grid";
import Grid from "@mui/material/GridLegacy";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//Router imports
import { Outlet } from "react-router";

//Project imports
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import LoginBackGimage from "../../../assets/LoginImage.png";

const theme = createTheme();

export default function LoginLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" flexDirection={"row"}>
        {/* <CssBaseline /> */}
        <Grid  xs={12} sm={12} md={7} lg={8}>
          <Grid
            xs={12}
            sm={12}
            md={12}
            sx={{
              backgroundImage: `url(${LoginBackGimage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          >
            <AuthHeader />
          </Grid>
        </Grid>

        <Grid
          container
          xs={12}
          sm={12}
          md={5}
          lg={4}
          flexDirection={"column"}
          justifyContent="center"
          sx={{
            backgroundColor: "#06556F",
            position: "relative",
          }}
        >
          <Outlet />
          <Grid
            xs={12}
            sx={{
              bottom: "0px",
              position: "absolute",
              flexGrow: "1",
              width: "100%",
            }}
          >
            <AuthFooter />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
