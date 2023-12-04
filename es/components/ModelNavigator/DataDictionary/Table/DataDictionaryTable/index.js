"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRedux = require("react-redux");
var _graph = require("../../Store/actions/graph");
var _DataDictionaryTable = _interopRequireDefault(require("./DataDictionaryTable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ReduxDataDictionaryTable = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      dictionary: state.submission.dictionary,
      highlightingNodeID: state.ddgraph.tableExpandNodeID,
      dictionaryName: 'Dictionary Utils Viz'
    };
  };
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onExpandNode: function onExpandNode(nodeID, nodeState) {
        return dispatch((0, _graph.setExpandNodes)(nodeID, nodeState));
      }
    };
  };
  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_DataDictionaryTable["default"]);
}();
var _default = exports["default"] = ReduxDataDictionaryTable;