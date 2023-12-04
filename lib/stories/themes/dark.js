"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _tinycolor = _interopRequireDefault(require("tinycolor2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var whisper = '#E7E5E5';
var midNightBlue = '#142D64';
var curiousBlue = '#CBE2EE';
var deepSkyBlue = '#8DCAFF';
var airForceBlue = '#5E8CA5';
var neonBlue = '#5D53F6';
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
var lochmara = '#B7C5CF';
var lightenRate = 7.5;
var darkenRate = 15;
var tableHeaderBorder = '#42779A 3px solid';
var tableHeaderFontColor = '#13344A';
var tableFontFamily = "'Lato Regular','Raleway', sans-serif";
var white = '#FFFFFF';
var _default = exports["default"] = {
  custom: {
    maxContentWidth: '1440px',
    maxContent: 'white',
    bodyBackGround: 'white',
    cardBackGround: '#f0f6f8',
    fontFamilySans: '"Open Sans", sans-serif',
    footorBackground: '#325068',
    fontFamily: 'Lato,"Open Sans", sans-serif',
    fontFamilyRaleway: "'Raleway', sans-serif",
    drawerWidth: '240px',
    widgetDivider: '#4A4A4A'
  },
  palette: {
    primary: {
      main: midNightBlue,
      light: (0, _tinycolor["default"])(midNightBlue).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(midNightBlue).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: deepSkyBlue,
      light: (0, _tinycolor["default"])(deepSkyBlue).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(deepSkyBlue).darken(darkenRate).toHexString(),
      contrastText: '#0E273A'
    },
    curiousBlue: {
      main: curiousBlue,
      light: (0, _tinycolor["default"])(curiousBlue).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(curiousBlue).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    neonBlue: {
      main: neonBlue,
      light: (0, _tinycolor["default"])(curiousBlue).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(curiousBlue).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    deepSkyBlue: {
      main: deepSkyBlue,
      light: (0, _tinycolor["default"])(deepSkyBlue).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(deepSkyBlue).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    lochmara: {
      main: lochmara,
      light: (0, _tinycolor["default"])(lochmara).lighten(lochmara).toHexString(),
      dark: (0, _tinycolor["default"])(lochmara).darken(darkenRate).toHexString(),
      contrastText: 'lochmara',
      contrastTextColor: '#3478A5'
    },
    white: {
      main: white,
      light: (0, _tinycolor["default"])(white).lighten(white).toHexString(),
      dark: (0, _tinycolor["default"])(white).darken(white).toHexString(),
      contrastText: 'white'
    },
    airForceBlue: {
      main: airForceBlue,
      light: (0, _tinycolor["default"])(airForceBlue).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(whisper).darken(darkenRate).toHexString(),
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
      main: '#3A3B3B',
      light: (0, _tinycolor["default"])(black).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(black).darken(darkenRate).toHexString(),
      contrastText: '#CBCACA',
      contrastSwicthColor: '#60479D'
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
      main: 'white',
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
    MuiListItemText: {
      root: {
        padding: '0 8px',
        '&:first-child': {
          wordBreak: 'break-word'
        }
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
    MUIDataTable: {
      responsiveStacked: {
        transform: 'rotateX(180deg)'
      },
      responsiveBase: {
        transform: 'rotateX(180deg)'
      },
      tableRoot: {
        transform: 'rotateX(180deg)',
        borderTop: '3px solid #e7e5e5'
      }
    },
    MUIDataTableSelectCell: {
      fixedHeader: {
        position: 'relative'
      },
      fixedLeft: {
        background: '#000'
      },
      headerCell: {
        borderBottom: '#004c73 3px solid',
        color: tableHeaderFontColor,
        backgroundColor: tableHeader
      },
      checkboxRoot: {
        color: 'inherit',
        '&$checked': {
          color: '#8DCAFF'
        }
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
      fixedHeader: {
        position: 'relative',
        borderTop: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,
        textDecoration: 'underline',
        fontFamily: tableFontFamily,
        letterSpacing: '0.06em',
        fontStyle: 'normal',
        fontSize: '11pt',
        fontWeight: 'bold',
        paddingLeft: '20px',
        '&:first-child': {
          paddingLeft: '30px'
        }
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
      },
      icon: {
        marginTop: '12px'
      }
    },
    MUIDataTableBodyRow: {
      root: {
        backgroundColor: 'transparent !important',
        '&:nth-child(even)': {
          color: '#004C73',
          background: '#f3f3f3 !important'
        },
        '&:nth-child(odd)': {
          color: '#004C73 !important'
        }
      }
    },
    MUIDataTableFooter: {
      root: {
        borderTop: '#004c73 3px solid'
      }
    },
    MuiTableRow: {
      head: {
        height: '54px',
        borderBottom: '3px solid #42779A'
      },
      root: {
        height: '54px'
      }
    },
    MuiTableCell: {
      root: {
        borderBottom: '0px',
        padding: '5px'
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
        backgroundColor: tableHeader
      },
      titleText: {
        color: tableHeaderFontColor,
        // fontSize: '25.2pt',
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
      },
      iconButton: {
        marginRight: '0.3%',
        '@media (max-width: 2560px)': {
          marginRight: '0.5%'
        },
        '@media (max-width: 2000px)': {
          marginRight: '0.7%'
        },
        '@media (max-width: 1600px)': {
          marginRight: '0.9%'
        },
        '@media (max-width: 1300px)': {
          marginRight: '1.1%'
        },
        '@media (max-width: 1024px)': {
          marginRight: '1.3%'
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: '5px'
      }
    },
    MuiTablePagination: {
      toolbar: {
        textTransform: 'uppercase',
        marginTop: '-10px'
      },
      select: {
        border: '2px #fff solid',
        background: '#fff'
      },
      caption: {
        color: '#000000',
        fontFamily: 'Open Sans',
        fontSize: '10px'
      },
      actions: {
        marginRight: '39px'
      }
    },
    MuiSwitch: {
      bar: {
        backgroundColor: '#ABADB0'
      }
    },
    MuiTableFooter: {
      root: {
        borderTop: '0px'
      }
    },
    MUIDataTableBodyCell: {
      stackedParent: {
        '&:first-child': {
          paddingLeft: '30px'
        }
      }
    },
    MuiExpansionPanel: {
      root: {
        '&$expanded': {
          margin: 'unset'
        }
      }
    },
    MuiCheckbox: {
      colorSecondary: {
        '&:first-child': {
          color: '#000000'
        }
      }
    }
  }
};