"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _graph = require("../../Store/actions/graph");
var _NodeView = _interopRequireDefault(require("./NodeView"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ReduxNodeView = function ReduxNodeView(props) {
  return /*#__PURE__*/_react["default"].createElement(_NodeView["default"], props);
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    isSearchMode: state.ddgraph.isSearchMode,
    ddgraph: state.ddgraph,
    currentSearchKeyword: state.ddgraph.currentSearchKeyword,
    expandNodeView: state.ddgraph.expandNodeView,
    highlightingNode: state.ddgraph.highlightingNode,
    focusedNodeId: state.ddgraph.focusedNodeId
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onClickNode: function onClickNode(nodeID) {
      return dispatch((0, _graph.clickNode)(nodeID));
    },
    onNodeFocus: function onNodeFocus(nodeID) {
      return dispatch((0, _graph.focusNode)(nodeID));
    },
    onViewTable: function onViewTable(hide) {
      return dispatch((0, _graph.setOverlayPropertyTableHidden)(hide));
    },
    onCollapseNodeView: function onCollapseNodeView() {
      dispatch((0, _graph.onPanelViewClick)());
    }
  };
};
var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReduxNodeView);
exports["default"] = _default;