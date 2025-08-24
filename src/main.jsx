import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
//import authReducer from './slice/authSlice.js'
import { store } from './store'



// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// }); 

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
    </Provider>
)



