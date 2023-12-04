"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _LegendView = _interopRequireDefault(require("./LegendView"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ReduxLegendView = function ReduxLegendView(props) {
  return /*#__PURE__*/_react["default"].createElement(_LegendView["default"], props);
};
var mapStateToProps = function mapStateToProps(state) {
  var _state$submission$gra, _state$submission$gra2;
  return {
    styles: (_state$submission$gra = state.submission.graphViewConfig) === null || _state$submission$gra === void 0 ? void 0 : (_state$submission$gra2 = _state$submission$gra.legend) === null || _state$submission$gra2 === void 0 ? void 0 : _state$submission$gra2.styles,
    overlayPropertyHidden: state.ddgraph.overlayPropertyHidden
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};
var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReduxLegendView);
exports["default"] = _default;