import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#71a8c1',
      main: '#003366',
      // main: '#007AFF',
      dark: '#001933',
    },
    secondary: {
      light: '#675eff',
      main: '#3395FF',
      dark: '#0008ff',
    },
    gradient: {
      main: '#003366',
    },
  },
  typography: {
    fontFamily: ['Public Sans', 'sans-serif'].join(','),
  },
});

export default theme;
