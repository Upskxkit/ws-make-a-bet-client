import { createMuiTheme } from "@material-ui/core/styles";
import colors from "../constants/colors";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: "none",
      },
      containedSecondary: {
        backgroundColor: colors.primary.white,
        "&:hover": {
          backgroundColor: colors.secondary.pink,
        },
      },
    },
  },
  typography: {
    fontFamily: "'Roboto'",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 500,
    body1: {
      fontFamily: "Roboto",
      fontWeight: 600,
    },
    h1: {
      letterSpacing: "normal",
      color: "#0a0f67",
      fontFamily: "TiemposText",
      fontSize: "16px",
      fontWeight: 600,
      fontStyle: "normal",
      lineHeight: "1.07",
    },
    h2: {
      fontFamily: "TiemposText",
      fontSize: "24px",
      fontWeight: 600,
      fontStyle: "normal",
      color: "#021074",
      letterSpacing: "-0.31px",
      lineHeight: "normal",
    },
    h3: {
      fontFamily: "TiemposText",
      fontSize: "18px",
      fontWeight: 600,
      fontStyle: "normal",
      lineHeight: "normal",
    },
    h4: {
      letterSpacing: "normal",
      color: "#4c548e",
      fontFamily: "HelveticaNeue",
      fontSize: "15px",
      fontStyle: "normal",
      lineHeight: "normal",
    },
    h5: {
      fontFamily: "HelveticaNeue",
      fontSize: "16px",
      fontWeight: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
    },
    h6: {
      fontFamily: "HelveticaNeue",
      fontSize: "12px",
      color: "#5f718b",
    },
    subtitle1: {
      fontFamily: "HelveticaNeue",
      fontSize: "12px",
      fontWeight: 500,
      color: "#4c548e",
    },
    subtitle2: {
      fontFamily: "HelveticaNeue",
      fontSize: "14px",
      color: "#021074",
    },
    /*body1: {
      fontFamily: "HelveticaNeue",
      fontSize: "12px",
      fontWeight: 600,
      fontStyle: "normal",
      lineHeight: "normal",
    },*/
    body2: {
      fontFamily: "HelveticaNeue",
      fontSize: "12px",
      color: "#021074",
    },
  },
  palette: {
    primary: {
      main: colors.primary.red,
      contrastText: colors.primary.white,
    },
    secondary: {
      main: colors.primary.red,
      contrastText: colors.primary.black,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
