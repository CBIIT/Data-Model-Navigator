"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _styles = require("@material-ui/core/styles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var theme = {
  overrides: {
    Mui: {
      '&$expanded': {
        margin: '0px 0px'
      }
    },
    MuiAccordionDetails: {
      root: {
        padding: '0px 0px 0px'
      }
    },
    MuiAccordion: {
      root: {
        '&$expanded': {
          margin: 'auto'
        }
      }
    }
  }
};
var _default = function _default(_ref) {
  var children = _ref.children;
  var computedTheme = (0, _styles.createTheme)(theme);
  return /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
    theme: computedTheme
  }, children);
};
exports["default"] = _default;