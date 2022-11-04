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
          background: 'rgba(28,29,29,0.31)',
          marginRight: '10px',
          marginLeft: '25px',
          marginTop: '20px',
          minWidth: '130px',
          '@media (min-width: 600px)': {
            minWidth: '110px',
          },
          '&.Mui-selected': {
            boxShadow: '-1px -3px 5px 6px rgba(50, 50, 50, 0.25)',
            borderBottom: '10px solid #fff',
            background: '#ffffff',
            border: '1px solid #fffff5',
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
