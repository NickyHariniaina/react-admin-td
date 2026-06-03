import { defaultTheme } from "react-admin";
import { deepmerge } from "@mui/utils";

export const theme = deepmerge(defaultTheme, {
  palette: {
    primary: {
      main: "#8FAF9F",
      light: "#B8D4C4",
      dark: "#6A8F7A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D4C5A9",
      light: "#E8DFCC",
      dark: "#B8A88A",
      contrastText: "#3D3D3D",
    },
    background: {
      default: "#FAF8F5",
      paper: "#FFFFFF",
    },
    error: {
      main: "#D4A0A0",
    },
    info: {
      main: "#B5CDD6",
    },
    success: {
      main: "#A8C5A8",
    },
    warning: {
      main: "#E0CAA8",
    },
    text: {
      primary: "#2D2D2D",
      secondary: "#7A7A7A",
    },
    divider: "#E8E4DE",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { letterSpacing: "-0.02em" },
    h2: { letterSpacing: "-0.01em" },
    h3: { fontWeight: 600, letterSpacing: "-0.01em" },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none" as const,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined" as const,
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: "outlined" as const,
      },
    },
  },
});
