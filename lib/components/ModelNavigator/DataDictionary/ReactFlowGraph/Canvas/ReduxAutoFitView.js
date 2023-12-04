"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactflow = require("reactflow");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ReduxAutoFitView = function ReduxAutoFitView(_ref) {
  var canvasWidth = _ref.canvasWidth;
  var _useReactFlow = (0, _reactflow.useReactFlow)(),
    fitView = _useReactFlow.fitView;
  // const store = useStoreApi();
  // const state = store.getState();
  // const nodeInternals = useMemo(() => state.nodeInternals);
  (0, _react.useEffect)(function () {
    fitView();
  }, [canvasWidth]);
  return null;
  // useEffect(() => {
  //     if (nodeInternals && nodeInternals.size > 0) {
  //         console.log('fig', nodeInternals)
  //         const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  //             flowData.nodes,
  //             flowData.edges,
  //             nodeInternals
  //         );
  //         setNodes(layoutedNodes);
  //         setEdges(layoutedEdges);
  //     }
  // }, [flowData])
};
var mapStateToProps = function mapStateToProps(state) {
  return {};
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};
var _default = exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReduxAutoFitView);