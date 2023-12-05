"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _styles = require("@material-ui/core/styles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = exports["default"] = function _default(_ref) {
  var children = _ref.children;
  var theme = {
    overrides: {
      MuiTab: {
        root: {
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
          background: 'rgba(229, 227, 227, 0.28)',
          // background: '#F3F3F3',
          marginRight: '10px',
          marginLeft: '10px',
          marginTop: '20px',
          minWidth: '130px',
          paddingLeft: '30px',
          paddingRight: '30px',
          fontSize: '18px',
          borderTop: '0.9px solid #C4C4C4',
          borderRight: '0.9px solid #C4C4C4',
          borderLeft: '0.9px solid #C4C4C4',
          height: '50px',
          '@media (min-width: 600px)': {
            minWidth: '110px'
          },
          '&.Mui-selected': {
            boxShadow: '-1px -3px 10px 1px rgb(50 50 50 / 25%)',
            borderBottom: '10px solid #fff',
            background: '#ffffff',
            border: '0.75px solid #fffff5',
            paddingTop: '10px',
            fontWeight: '900'
          }
        },
        textColorInherit: {
          opacity: '1'
        }
      }
    },
    MuiTabs: {
      root: {
        borderBottom: '2px solid #fff'
      },
      fixed: {
        paddingLeft: '10px'
      }
    },
    Mui: {
      selected: {
        borderBottom: '2px solid'
      }
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
    theme: (0, _styles.createTheme)(theme)
  }, children);
};