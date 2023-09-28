import React from "react";
import { Button, createTheme, MuiThemeProvider } from "@material-ui/core";
import { FontRegistry } from "../../../NodePDF/util";

const theme = {
  overrides: {
    MuiButton: {
      root: {
        fontSize: "13px",
        textTransform: "none",
        color: "#1D79A8",
        fontFamily: FontRegistry("Nunito Sans"),
        float: "right",
        background: "none",
        marginTop: "-20px",
        marginRight: "20px",
        fontStyle: "italic",
        "&:hover": {
          backgroundColor: "transparent",
          cursor: "pointer",
        },
      },
    },
  },
};

const ButtonComponent = ({ label, openHandler, disableTouchRipple }) => (
  <MuiThemeProvider theme={createTheme(theme)}>
    <Button onClick={openHandler} disableTouchRipple={disableTouchRipple}>
      {label}
    </Button>
  </MuiThemeProvider>
);

ButtonComponent.defaultProps = {
  disableTouchRipple: true,
};

export default ButtonComponent;
