import { createTheme } from "@mui/material";


export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    textColor: '#000',

    primary: {
      light: '#92ff9b',
      main: '#278263',
      dark: '#278263',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        style: {
          borderRadius: 8,
        }
      }
    },
    MuiInput: {

      styleOverrides: {
        root: {
          '& input': {

            paddingTop: '1px !important', // Adding !important for higher specificity
          },
        },

      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          paddingTop: '1px !important', // Adding !important for higher specificity
        },

      }
    }
  }
});
