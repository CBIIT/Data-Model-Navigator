"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _core = require("@material-ui/core");
var _graph = require("./Store/actions/graph");
var _DataDictionary = _interopRequireDefault(require("./DataDictionary"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import DataDictionaryController from './DataDictionaryController';

// eslint-disable-next-line no-unused-vars

var ReduxDataDictionary = function ReduxDataDictionary(props) {
  if (!props.dictionary) {
    return /*#__PURE__*/_react["default"].createElement(_core.CircularProgress, null);
  }
  return /*#__PURE__*/_react["default"].createElement(_DataDictionary["default"], props);
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    isGraphView: state.ddgraph.isGraphView,
    dictionary: state.submission.dictionary
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSetGraphView: function onSetGraphView(isGraphView) {
      return dispatch((0, _graph.setGraphView)(isGraphView));
    }
  };
};
var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReduxDataDictionary);
exports["default"] = _default;