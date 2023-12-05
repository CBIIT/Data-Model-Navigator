"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _core = require("@material-ui/core");
var _reactflow = _interopRequireWildcard(require("reactflow"));
var _ReduxNodeView = _interopRequireDefault(require("../Node/ReduxNodeView"));
var _ReduxEdgeView = _interopRequireDefault(require("../Edge/ReduxEdgeView"));
var _CanvasStyle = _interopRequireDefault(require("./CanvasStyle"));
var _ReduxViewPort = _interopRequireDefault(require("./ReduxViewPort"));
var _ReduxAutoFitView = _interopRequireDefault(require("./ReduxAutoFitView"));
var _util = require("./util");
var _ReduxLegendView = _interopRequireDefault(require("../Legend/ReduxLegendView"));
require("./Canvas.css");
require("./assets/style.css");
var _ReduxActionLayer = _interopRequireDefault(require("./components/ReduxActionLayer"));
var _Reset = _interopRequireDefault(require("./assets/graph_icon/Reset.svg"));
var _ZoomIn = _interopRequireDefault(require("./assets/graph_icon/ZoomIn.svg"));
var _ZoomOut = _interopRequireDefault(require("./assets/graph_icon/ZoomOut.svg"));
var _OverlayPropertyTable = _interopRequireDefault(require("../OverlayPropertyTable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var nodeTypes = {
  custom: _ReduxNodeView["default"]
};
var edgeTypes = {
  custom: _ReduxEdgeView["default"]
};
var minimapStyle = {
  height: 120
};

/**
 * 
 * @param {*} param0 
 * @returns 
 * reactflow requires to create child component
 *  to add customize control buttons
 */
var CustomFlowView = function CustomFlowView(_ref) {
  var classes = _ref.classes,
    nodes = _ref.nodes,
    edges = _ref.edges,
    onConnect = _ref.onConnect,
    onNodesChange = _ref.onNodesChange,
    onEdgesChange = _ref.onEdgesChange,
    highlightedNodes = _ref.highlightedNodes,
    graphViewConfig = _ref.graphViewConfig,
    onGraphPanelClick = _ref.onGraphPanelClick;
  var _useReactFlow = (0, _reactflow.useReactFlow)(),
    setViewport = _useReactFlow.setViewport,
    zoomIn = _useReactFlow.zoomIn,
    zoomOut = _useReactFlow.zoomOut;
  var _graphViewConfig$canv = graphViewConfig.canvas,
    fit = _graphViewConfig$canv.fit,
    width = _graphViewConfig$canv.width;
  var _useState = (0, _react.useState)(fit === null || fit === void 0 ? void 0 : fit.minZoom),
    _useState2 = _slicedToArray(_useState, 2),
    minZoom = _useState2[0],
    setMinZoom = _useState2[1];
  (0, _react.useEffect)(function () {
    var zoom = (0, _util.getMinZoom)(_objectSpread({
      width: width
    }, fit));
    setMinZoom(zoom);
  }, [width]);
  var handleTransform = (0, _react.useCallback)(function () {
    setViewport({
      x: fit === null || fit === void 0 ? void 0 : fit.x,
      y: fit === null || fit === void 0 ? void 0 : fit.y,
      zoom: (0, _util.getMinZoom)(_objectSpread({
        width: width
      }, fit))
    }, {
      duration: 200
    });
  }, [setViewport, width]);

  /**
   * pdf configuration
   */
  var pdfDownloadConfig = (0, _reactRedux.useSelector)(function (state) {
    return state.ddgraph.pdfDownloadConfig;
  });
  if (!pdfDownloadConfig) {
    return /*#__PURE__*/_react["default"].createElement(_core.CircularProgress, null);
  }
  var overlayPropertyHidden = (0, _reactRedux.useSelector)(function (state) {
    return state.ddgraph.overlayPropertyHidden;
  });

  /**
   * collapse all property dialog box
   * @param {*} event 
   */
  var onPanelClick = function onPanelClick(event) {
    onGraphPanelClick();
  };
  return /*#__PURE__*/_react["default"].createElement(_reactflow["default"], {
    nodes: nodes,
    edges: edges,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    onConnect: onConnect,
    nodeTypes: nodeTypes,
    edgeTypes: edgeTypes,
    minZoom: minZoom,
    maxZoom: fit !== null && fit !== void 0 && fit.maxZoom ? fit.maxZoom : 3,
    onPaneClick: onPanelClick,
    fitView: true,
    className: classes.reactFlowView
  }, /*#__PURE__*/_react["default"].createElement(_OverlayPropertyTable["default"], {
    pdfDownloadConfig: pdfDownloadConfig
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.controls
  }, /*#__PURE__*/_react["default"].createElement("div", {
    onClick: handleTransform,
    title: "reset",
    className: classes.controlBtn
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: _Reset["default"],
    alt: "reset_icon"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    title: "zoom in",
    onClick: function onClick() {
      return zoomIn({
        duration: 200
      });
    },
    className: classes.controlBtn
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: _ZoomIn["default"],
    alt: "ZoomInIcon"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    title: "zoom out",
    onClick: function onClick() {
      return zoomOut({
        duration: 200
      });
    },
    className: classes.controlBtn
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: _ZoomOut["default"],
    alt: "ZoomOutIcon"
  }))), /*#__PURE__*/_react["default"].createElement(_ReduxAutoFitView["default"], {
    canvasWidth: width
  }), /*#__PURE__*/_react["default"].createElement(_ReduxViewPort["default"], null), /*#__PURE__*/_react["default"].createElement(_reactflow.Background, {
    style: {
      backgroundColor: highlightedNodes && !!highlightedNodes.length ? '#C5DEEA' : '#E7F3F7'
    },
    color: "#aaa",
    gap: 12
  }));
};
var CanvasView = function CanvasView(_ref2) {
  var classes = _ref2.classes,
    nodes = _ref2.nodes,
    edges = _ref2.edges,
    onConnect = _ref2.onConnect,
    onNodesChange = _ref2.onNodesChange,
    onEdgesChange = _ref2.onEdgesChange,
    categories = _ref2.categories,
    onClearSearchResult = _ref2.onClearSearchResult,
    highlightedNodes = _ref2.highlightedNodes,
    graphViewConfig = _ref2.graphViewConfig,
    onGraphPanelClick = _ref2.onGraphPanelClick;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.mainWindow
  }, /*#__PURE__*/_react["default"].createElement(_ReduxLegendView["default"], {
    categoryItems: categories
  }), /*#__PURE__*/_react["default"].createElement(_ReduxActionLayer["default"], {
    handleClearSearchResult: onClearSearchResult
  }), /*#__PURE__*/_react["default"].createElement(_reactflow.ReactFlowProvider, null, /*#__PURE__*/_react["default"].createElement(CustomFlowView, {
    nodes: nodes,
    edges: edges,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    onConnect: onConnect,
    classes: classes,
    highlightedNodes: highlightedNodes,
    graphViewConfig: graphViewConfig,
    onGraphPanelClick: onGraphPanelClick
  })));
};
var _default = exports["default"] = (0, _core.withStyles)(_CanvasStyle["default"])(CanvasView);