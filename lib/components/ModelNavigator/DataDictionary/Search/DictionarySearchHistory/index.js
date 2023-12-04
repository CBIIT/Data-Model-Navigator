"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRedux = require("react-redux");
var _graph = require("../../Store/actions/graph");
var _DictionarySearchHistory = _interopRequireDefault(require("./DictionarySearchHistory"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ReduxDictionarySearchHistory = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      searchHistoryItems: state.ddgraph.searchHistoryItems
    };
  };
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onClearSearchHistoryItems: function onClearSearchHistoryItems() {
        return dispatch((0, _graph.clearSearchHistoryItems)());
      }
    };
  };
  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_DictionarySearchHistory["default"]);
}();
var _default = ReduxDictionarySearchHistory;
exports["default"] = _default;