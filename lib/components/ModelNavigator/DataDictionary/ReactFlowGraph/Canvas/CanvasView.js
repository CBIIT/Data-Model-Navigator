"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
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
var _default = (0, _core.withStyles)(_CanvasStyle["default"])(CanvasView);
exports["default"] = _default;