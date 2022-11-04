import React from 'react';
import _ from 'lodash';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

export default ({
  children,
}) => {
  const theme = {
    overrides: {
      MuiTab: {
        root: {
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
          borderTop: '2px solid',
          borderRight: '2px solid',
          borderLeft: '2px solid',
          marginRight: '15px',
          minWidth: '130px',
          '@media (min-width: 600px)': {
            minWidth: '110px',
          },
          '&.Mui-selected': {
            borderBottom: '7px solid #fff',
          },
        },
        textColorInherit: {
          opacity: '1',
        },
      }
    },
    MuiTabs: {
      root: {
        borderBottom: '2px solid #fff',
      },
      fixed: {
        paddingLeft: '10px',
      }
    },
    Mui: {
      selected: {
        borderBottom: '2px solid',
      },
    } 
  };

  return (
    <ThemeProvider theme={createTheme(theme)}>
      {children}
    </ThemeProvider>
  );
};
