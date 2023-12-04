"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var TabPanel = function TabPanel(_ref) {
  var children = _ref.children,
    value = _ref.value,
    index = _ref.index,
    classes = _ref.classes;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.content,
    role: "tabpanel",
    hidden: value !== index
  }, children);
};
var styles = function styles() {
  return {
    content: {
      height: '100%'
    }
  };
};
var _default = (0, _core.withStyles)(styles)(TabPanel);
exports["default"] = _default;