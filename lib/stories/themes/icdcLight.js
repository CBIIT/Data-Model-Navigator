"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _tinycolor = _interopRequireDefault(require("tinycolor2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var navyBlue = '#0B3556';
var curiousBlue = '#CBE2EE';
var airForceBlue = '#5E8CA5';
var qQhite = '#EEEEEE';
var orange = '#FF7F15';
var green = '#2FA000';
var dodgeBlue = '#0296C9';
var cobolt = '#FBB35D';
var warning = '#ff7f0b';
var success = '#3CD4A0';
var info = '#3f2b2f';
var tableHeader = '#f5f5f5';
var black = 'black';
var lightenRate = 7.5;
var darkenRate = 15;
var tableHeaderBorder = '#004c73 3px solid';
var tableHeaderFontColor = '#194563';
var tableFontFamily = "'Raleway', sans-serif";
var _default = {
  custom: {
    maxContentWidth: '1440px',
    maxContent: 'white',
    bodyBackGround: 'white',
    cardBackGround: '#f0f6f8',
    footorBackground: '#325068',
    fontFamilySans: '"Open Sans", sans-serif',
    fontFamilyRaleway: "'Raleway', sans-serif",
    drawerWidth: '240px'
  },
  palette: {
    primary: {
      main: navyBlue,
      light: (0, _tinycolor["default"])(navyBlue).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(navyBlue).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    curiousBlue: {
      main: curiousBlue,
      light: (0, _tinycolor["default"])(curiousBlue).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(curiousBlue).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    airForceBlue: {
      main: airForceBlue,
      light: (0, _tinycolor["default"])(airForceBlue).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(navyBlue).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    qQhite: {
      main: qQhite,
      light: (0, _tinycolor["default"])(qQhite).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(qQhite).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    orange: {
      main: orange,
      light: (0, _tinycolor["default"])(orange).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(orange).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    dodgeBlue: {
      main: dodgeBlue,
      light: (0, _tinycolor["default"])(dodgeBlue).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(dodgeBlue).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    green: {
      main: green,
      light: (0, _tinycolor["default"])(green).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(green).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    cobolt: {
      main: cobolt,
      light: (0, _tinycolor["default"])(cobolt).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(cobolt).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    widgetBackground: {
      main: '#F3F8FB',
      light: (0, _tinycolor["default"])(black).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(black).darken(darkenRate).toHexString(),
      contrastText: 'black',
      lattice: '#F3F8F8'
    },
    warning: {
      main: warning,
      light: (0, _tinycolor["default"])(warning).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(warning).darken(darkenRate).toHexString()
    },
    success: {
      main: success,
      light: (0, _tinycolor["default"])(success).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(success).darken(darkenRate).toHexString()
    },
    info: {
      main: info,
      light: (0, _tinycolor["default"])(info).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(info).darken(darkenRate).toHexString()
    },
    textWithBackground: {
      main: 'black',
      light: (0, _tinycolor["default"])(info).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(info).darken(darkenRate).toHexString()
    },
    text: {
      withbackground: 'white',
      primary: '#4A4A4A',
      secondary: '#6E6E6E',
      hint: '#B9B9B9',
      link: '#1669aa',
      footerText: 'white'
    },
    background: {
      "default": '#fafafa',
      light: '#F3F5FF'
    }
  },
  customShadows: {
    widget: '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetDark: '0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetWide: '0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A'
  },
  overrides: {
    MuiExpansionPanelDetails: {
      root: {
        padding: '0px'
      }
    },
    MuiList: {
      root: {
        width: '100%'
      }
    },
    MuiListItemText: {
      root: {
        padding: '0 8px'
      }
    },
    MuiListItem: {
      gutters: {
        paddingTop: '4px',
        paddingRight: '8px',
        paddingBottom: '4px',
        paddingLeft: '35px'
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        minHeight: '38px',
        padding: '0 12px 0 35px'
      },
      content: {
        margin: '4px 0'
      }
    },
    MuiPaper: {
      elevation4: {
        boxShadow: 'none'
      },
      elevation2: {
        boxShadow: 'none'
      }
    },
    MUIDataTableSelectCell: {
      fixedHeader: {
        position: 'relative'
      },
      headerCell: {
        borderTop: tableHeaderBorder,
        borderBottom: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader
      },
      checkboxRoot: {
        color: 'inherit'
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: '#4A4A4A1A'
      }
    },
    MuiSelect: {
      icon: {
        color: '#B9B9B9'
      }
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: 'white'
      }
    },
    MUIDataTableHeadCell: {
      fixedHeaderCommon: {
        borderTop: tableHeaderBorder,
        borderBottom: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,
        textDecoration: 'underline',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '11pt',
        fontWeight: 'bold'
      },
      fixedHeader: {
        borderTop: tableHeaderBorder,
        borderBottom: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,
        textDecoration: 'underline',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '11pt',
        fontWeight: 'bold'
      },
      sortActive: {
        color: tableHeaderFontColor
      },
      toolButton: {
        cursor: 'pointer',
        display: 'inline-flex',
        outline: 'none'
      }
    },
    MuiTableSortLabel: {
      active: {
        color: '#ff8a00'
      }
    },
    MUIDataTableBodyRow: {
      root: {
        '&:nth-child(even)': {
          color: '#223d4c',
          background: '#f5f5f5 !important'
        },
        '&:nth-child(even) td': {
          background: '#f5f5f5'
        },
        '&:nth-child(odd)': {
          color: '#223d4c !important'
        },
        '&:nth-child(odd) td': {
          background: '#fff'
        }
      }
    },
    MuiTableRow: {
      head: {
        height: '54px'
      },
      root: {
        height: '54px'
      }
    },
    MuiTableCell: {
      root: {
        borderBottom: '0px',
        padding: '5px',
        '&:last-child': {
          paddingRight: '30px'
        }
      },
      paddingCheckbox: {
        padding: '0px 5px'
      },
      body: {
        color: 'inherit',
        fontFamily: '"Open Sans", sans-serif',
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '10pt',
        fontWeight: 'bold',
        paddingLeft: '8px'
      },
      head: {
        fontSize: '0.95rem',
        paddingLeft: '8px'
      }
    },
    MUIDataTableToolbar: {
      root: {
        backgroundColor: tableHeader,
        minHeight: '15px'
      },
      titleText: {
        color: tableHeaderFontColor,
        fontSize: '25.2pt',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal'
      }
    },
    MUIDataTableToolbarSelect: {
      root: {
        backgroundColor: tableHeader
      },
      titleText: {
        color: tableHeaderFontColor,
        fontSize: '25.2pt',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal'
      }
    },
    MuiIconButton: {
      root: {
        padding: '5px'
      }
    },
    MuiGrid: {
      container: {
        width: '100% !important'
      }
    },
    MuiSwitch: {
      bar: {
        backgroundColor: '#ABADB0'
      }
    },
    MUIDataTableBodyCell: {
      stackedCommon: {
        height: 'auto !important',
        whiteSpace: 'normal !important'
      }
    },
    MuiPrivateTabIndicator: {
      root: {
        top: 0,
        bottom: 'auto',
        height: '3px'
      }
    }
  }
};
exports["default"] = _default;