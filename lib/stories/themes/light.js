"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _tinycolor = _interopRequireDefault(require("tinycolor2"));
var _icdcLight = _interopRequireDefault(require("./icdcLight"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
var lochmara = '#3478A5';
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
    bodyBackGround: '#ffffff',
    cardBackGround: '#f0f6f8',
    fontFamilySans: '"Open Sans", sans-serif',
    footorBackground: '#325068',
    fontFamily: 'Lato,"Open Sans", sans-serif',
    fontFamilyRaleway: "'Raleway', sans-serif",
    drawerWidth: '240px',
    widgetDivider: '#E2E7EC'
  },
  palette: _objectSpread({
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
      main: '#FFFFFF',
      light: (0, _tinycolor["default"])(black).lighten(lightenRate).toHexString(),
      dark: (0, _tinycolor["default"])(black).darken(darkenRate).toHexString(),
      contrastText: 'black',
      contrastSwicthColor: '#CBCACA'
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
  }, _icdcLight["default"].palette),
  customShadows: {
    widget: '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetDark: '0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetWide: '0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A'
  },
  overrides: _objectSpread({
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
        transform: 'rotateX(180deg)',
        overflow: 'none'
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
          background: '#f4f5f5 !important'
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
        height: 54,
        borderBottom: '3px solid #42779A'
      },
      root: {
        height: 54
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
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '16px',
        fontFamily: 'Nunito',
        fontWeight: 'normal',
        paddingLeft: '20px'
      },
      head: {
        fontSize: '0.95rem',
        paddingLeft: '8px'
      }
    },
    MUIDataTableToolbar: {
      root: {
        backgroundColor: tableHeader,
        minHeight: '44px'
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
        marginTop: '-10px',
        paddingTop: '11px'
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
        marginRight: '0px'
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
    },
    MuiToolbar: {
      gutters: {
        paddingRight: '1px !important'
      }
    }
  }, _icdcLight["default"].overrides)
};