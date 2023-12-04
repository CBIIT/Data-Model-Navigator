"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _bentoComponents = require("bento-components");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var tabLabel = function tabLabel(_ref) {
  var classes = _ref.classes,
    title = _ref.title,
    primaryColorClass = _ref.primaryColorClass,
    icon = _ref.icon;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _bentoComponents.cn)(classes.defaultStyle, primaryColorClass)
  }, icon && /*#__PURE__*/_react["default"].createElement("img", {
    src: icon,
    alt: "icdc_carousel_tabs"
  }), /*#__PURE__*/_react["default"].createElement("span", null, title, ' '));
};
var styles = function styles() {
  return {
    defaultStyle: {
      fontFamily: 'Open Sans',
      textTransform: 'none',
      fontSize: '17px',
      height: '30px',
      marginBottom: '-5px'
    }
  };
};
var _default = (0, _core.withStyles)(styles, {
  withTheme: true
})(tabLabel);
exports["default"] = _default;