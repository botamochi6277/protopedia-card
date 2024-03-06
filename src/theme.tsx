import { createTheme } from '@mui/material/styles';

// A custom theme for this app
// original protopedia color: 05adbc
// https://coolors.co/0798a2-3c153b-d81e5b-fbb13c-084887
const theme = createTheme({
  palette: {
    primary: {
      main: '#0798A2',
    },
    secondary: {
      main: '#3C153B',
    },
    error: {
      main: "#D81E5B",
    },
    warning: { main: "#FBB13C" },
    info: { main: "#084887" },
    success: { main: "#36842B" },
    background: {
      default: '#e0e0e0',
      paper: "#ffffff"
    },
  },
});

export default theme;