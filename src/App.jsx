import { useState } from 'react'
// import './App.css'
import Routes from './routes'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const [count, setCount] = useState(0)

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
