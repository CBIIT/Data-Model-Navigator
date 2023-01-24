import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = {
  overrides: {
    Mui: {
      '&$expanded': {
        margin: '0px 0px',
      }
    },
    MuiAccordionDetails: {
      root: {
        padding: '0px 0px 0px',
      },
    },
    MuiAccordion: {
      root: {
        '&$expanded': {
            margin: 'auto',
          },
      }
    }
  },
};

export default ({
  children,
}) => {
  const computedTheme = createTheme(theme);
  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};
