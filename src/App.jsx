import { useState } from 'react'
// import './App.css'
import Routes from './routes'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch } from 'react-redux';
import { setLogin, setMyRa, setMySite,   setMySiteName, setMySiteBusiness, setMyRaName } from './slice/AuthSlice';

function App() {
  const [count, setCount] = useState(0)
      const dispatch = useDispatch();

      
      const site = sessionStorage.getItem("site") || '';
      const ra = sessionStorage.getItem("ra") || '';
      const token = sessionStorage.getItem("token") || '';

      const sitename = sessionStorage.getItem("sitename") || '';
      const sitebusiness = sessionStorage.getItem("sitebusiness") || '';
      const raname = sessionStorage.getItem("raname") || '';

      site !== '' && dispatch(setMySite(site));
      ra !== '' && dispatch(setMyRa(ra));

      sitename !== '' && dispatch(setMySiteName(sitename));
      sitebusiness !== '' && dispatch(setMySiteBusiness(sitebusiness));
      raname !== '' && dispatch(setMyRaName(raname));

      token !== '' && dispatch(setLogin(true));


  return (
      <StyledEngineProvider injectFirst>
        {/* <ThemeProvider theme={themes({customization:1})}> */}
          <CssBaseline />
          {/* <NavigationScroll> */}
            <Routes />
          {/* </NavigationScroll> */}
        {/* </ThemeProvider> */}
      </StyledEngineProvider>
  )
}

export default App
