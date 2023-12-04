"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRedux = require("react-redux");
var _LegendView = _interopRequireDefault(require("./LegendView"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ReduxLegend = function () {
  var mapStateToProps = function mapStateToProps(state) {
    var _state$submission$gra;
    return {
      categoryItems: state.ddgraph.legendItems,
      styles: (_state$submission$gra = state.submission.graphViewConfig) === null || _state$submission$gra === void 0 || (_state$submission$gra = _state$submission$gra.legend) === null || _state$submission$gra === void 0 ? void 0 : _state$submission$gra.styles
    };
  };
  return (0, _reactRedux.connect)(mapStateToProps)(_LegendView["default"]);
}();
var _default = exports["default"] = ReduxLegend;