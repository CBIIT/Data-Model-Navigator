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
    overrides: {}
  };
  var computedTheme = (0, _styles.createTheme)(theme);
  return /*#__PURE__*/_react["default"].createElement(_styles.MuiThemeProvider, {
    theme: computedTheme
  }, children);
};