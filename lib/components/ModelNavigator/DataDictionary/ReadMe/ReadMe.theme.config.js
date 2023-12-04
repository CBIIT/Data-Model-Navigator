"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _styles = require("@material-ui/core/styles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = exports["default"] = function _default(_ref) {
  var children = _ref.children;
  var theme = {
    overrides: {
      MuiDialog: {
        paper: {
          borderRadius: '5px',
          padding: '0px 0px 0px 20px',
          boxShadow: 'none',
          overflowX: 'hidden',
          overflowY: 'hidden'
        },
        paperScrollPaper: {
          maxHeight: '650px'
        },
        paperWidthMd: {
          minWidth: '750px'
        }
      },
      MuiDialogContent: {
        root: {
          padding: '15px 25px 35px 15px'
        }
      },
      MuiBackdrop: {
        root: {
          backgroundColor: '#4a4a4a52'
        }
      },
      MuiButton: {
        root: {
          minWidth: '24px'
        },
        startIcon: {
          marginRight: '0',
          marginLeft: '0'
        }
      },
      MuiIconButton: {
        root: {
          marginRight: '10px',
          textTransform: 'none',
          padding: 'none',
          '&:hover': {
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }
        }
      },
      MuiSvgIcon: {
        root: {
          color: '#0d71a3'
        }
      }
    }
  };
  var computedTheme = (0, _styles.createTheme)(theme);
  return /*#__PURE__*/_react["default"].createElement(_styles.MuiThemeProvider, {
    theme: computedTheme
  }, children);
};