import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

export default ({
    children,
}) => {
  const theme = {
    overrides: {
        
    }
  };
  const computedTheme = createTheme({});
  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};