"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _graph = require("../../Store/actions/graph");
var _NodeView = _interopRequireDefault(require("./NodeView"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
var _default = exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReduxNodeView);