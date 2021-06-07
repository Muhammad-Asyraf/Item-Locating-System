import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#008cff',
      main: '#007AFF',
      dark: '#0069db',
    },
    secondary: {
      light: '#675eff',
      main: '#0d00ff',
      dark: '#0008ff',
    },
  },
  typography: {
    fontFamily: ['Public Sans', 'sans-serif'].join(','),
  },
});

export default theme;
