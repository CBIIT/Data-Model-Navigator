"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _util = require("../../../NodePDF/util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var theme = {
  overrides: {
    MuiButton: {
      root: {
        fontSize: "13px",
        textTransform: "none",
        color: "#1D79A8",
        fontFamily: (0, _util.FontRegistry)("Nunito Sans"),
        "float": "right",
        background: "none",
        marginTop: "-20px",
        marginRight: "20px",
        fontStyle: "italic",
        "&:hover": {
          backgroundColor: "transparent",
          cursor: "pointer"
        }
      }
    }
  }
};
var ButtonComponent = function ButtonComponent(_ref) {
  var label = _ref.label,
    openHandler = _ref.openHandler,
    disableTouchRipple = _ref.disableTouchRipple;
  return /*#__PURE__*/_react["default"].createElement(_core.MuiThemeProvider, {
    theme: (0, _core.createTheme)(theme)
  }, /*#__PURE__*/_react["default"].createElement(_core.Button, {
    onClick: openHandler,
    disableTouchRipple: disableTouchRipple
  }, label));
};
ButtonComponent.defaultProps = {
  disableTouchRipple: true
};
var _default = ButtonComponent;
exports["default"] = _default;