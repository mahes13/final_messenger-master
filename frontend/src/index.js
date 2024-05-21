import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; 
import './main.scss';
import {Provider} from 'react-redux';
import store from './store/index.js';
import { StyledEngineProvider } from '@mui/material/styles';
import Preloader from './components/preloader.jsx';
import { positions, transitions, Provider as AlertProvider} from 'react-alert';
import alertTemplate from 'react-alert-template-basic';
import {useSelector} from "redux";

const options = {
  timeout : 5000,
  positions: positions.BOTTOM_CENTER,
  transitions : transitions.SCALE
}


ReactDOM.render(
  <>
  

   <Provider store={store}>

    <StyledEngineProvider injectFirst>
  
    </StyledEngineProvider>

     <AlertProvider template={alertTemplate} {...options} >
    <App />
    </AlertProvider>
    </Provider>

</>
  ,
  document.getElementById('root')
);