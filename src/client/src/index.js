import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

import theme from './assets/theme';
import App from './components/App';
import store from './redux/store';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
