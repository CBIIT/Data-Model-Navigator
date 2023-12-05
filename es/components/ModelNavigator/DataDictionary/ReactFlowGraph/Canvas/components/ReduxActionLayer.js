"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _ActionLayer = _interopRequireDefault(require("./ActionLayer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ReduxActionLayer = function ReduxActionLayer(props) {
  return /*#__PURE__*/_react["default"].createElement(_ActionLayer["default"], props);
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    isSearchMode: state.ddgraph.isSearchMode,
    overlayPropertyHidden: state.ddgraph.overlayPropertyHidden
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};
var _default = exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReduxActionLayer);