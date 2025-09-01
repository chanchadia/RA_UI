import { useState } from 'react'
// import './App.css'
import Routes from './routes'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch } from 'react-redux';
import { setLogin, setMyRa, setMySite } from './slice/AuthSlice';

function App() {
  const [count, setCount] = useState(0)
      const dispatch = useDispatch();

      
      const site = sessionStorage.getItem("site") || '';
      const ra = sessionStorage.getItem("ra") || '';
      const token = sessionStorage.getItem("token") || '';

      site !== '' && dispatch(setMySite(site));
      ra !== '' && dispatch(setMyRa(ra));

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
