"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactflow = require("reactflow");
var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));
var _CanvasView = _interopRequireDefault(require("./CanvasView"));
var _utils = require("../GraphUtils/utils");
var _util = require("./util");
var _graph = require("../../Store/actions/graph");
var _CanvasHelper = require("./CanvasHelper");
var _study = _interopRequireDefault(require("./assets/graph_icon/study.svg"));
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
/**
 * Handles all canvas state
 * 1. nodes
 * 2. edges
 * 3. positioning of nodes with BFS 
 * 4. tracks search mode
 * @param {*} param0 
 * @returns canvas component
 */

var CanvasController = function CanvasController(_ref) {
  var ddgraph = _ref.ddgraph,
    currentSearchKeyword = _ref.currentSearchKeyword,
    tabViewWidth = _ref.tabViewWidth,
    dictionary = _ref.dictionary,
    searchResults = _ref.searchResults,
    isSearchMode = _ref.isSearchMode,
    onClearSearchResult = _ref.onClearSearchResult,
    setGraphData = _ref.setGraphData,
    nodeTree = _ref.nodeTree,
    unfilteredDictionary = _ref.unfilteredDictionary,
    highlightedNodes = _ref.highlightedNodes,
    graphViewConfig = _ref.graphViewConfig,
    onGraphPanelClick = _ref.onGraphPanelClick,
    assetConfig = _ref.assetConfig;
  if (tabViewWidth === 0 || !graphViewConfig) {
    return /*#__PURE__*/_react["default"].createElement(_CircularProgress["default"], null);
  }
  var _useNodesState = (0, _reactflow.useNodesState)([]),
    _useNodesState2 = _slicedToArray(_useNodesState, 3),
    nodes = _useNodesState2[0],
    setNodes = _useNodesState2[1],
    onNodesChange = _useNodesState2[2];
  var _useEdgesState = (0, _reactflow.useEdgesState)([]),
    _useEdgesState2 = _slicedToArray(_useEdgesState, 3),
    edges = _useEdgesState2[0],
    setEdges = _useEdgesState2[1],
    onEdgesChange = _useEdgesState2[2];
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    categories = _useState2[0],
    setCategories = _useState2[1];
  var _useState3 = (0, _react.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    iconsURL = _useState4[0],
    setIconsURL = _useState4[1];

  /**
   * initalize category item for Legend
   */
  (0, _react.useEffect)(function () {
    var categories = (0, _util.getDistinctCategoryItems)(Object.values(unfilteredDictionary));
    setCategories(categories);
    var urls = (0, _util.getCategoryIconUrl)(categories, "".concat(assetConfig === null || assetConfig === void 0 ? void 0 : assetConfig.iconUrl));
    setIconsURL(urls);
  }, []);

  /** node
  * 1. position (x, y)
  * 2. title
  * 3. highlight node based on matching search query to desc, properties and title
  */
  var getLayoutedElements = function getLayoutedElements(nodes, edges, nodeInternals) {
    var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'TB';
    /**
     * highlight node based on matching search query to desc, properties and title
     * setMatchingNodeTitle return indexes to highlight node title (string)
     */
    if (isSearchMode) {
      var matchingNodeTitle = (0, _util.setMatchingNodeTitle)(searchResults);
      nodes.forEach(function (node) {
        if (matchingNodeTitle[node.id]) {
          node.data.matchedNodeNameQuery = currentSearchKeyword;
        }
      });
    }
    /**
     * assign node position
     * canvas configuration
     * 1. custom node tree
     * 2. xIntervel & yIntervel
     */
    var canvas = graphViewConfig.canvas;
    if (dictionary && nodeTree) {
      var nodePosition = (0, _CanvasHelper.getNodePosition)(_objectSpread({
        dictionary: dictionary,
        nodeTree: (canvas === null || canvas === void 0 ? void 0 : canvas.nodeTree) || nodeTree,
        tabViewWidth: tabViewWidth
      }, canvas === null || canvas === void 0 ? void 0 : canvas.fit));
      nodes.forEach(function (node) {
        if (!node.data.icon) {
          node.data.icon = _study["default"];
        }
        var position = nodePosition[node.id];
        node.position = {
          x: position[0],
          y: position[1]
        };
      });
    }
    return {
      nodes: nodes,
      edges: edges
    };
  };

  /**
   * update states
   * 1. nodes and edges
   * 2. toggle between on/off for serach mode
   */
  (0, _react.useEffect)(function () {
    var flowData = (0, _utils.createNodesAndEdges)({
      dictionary: dictionary
    }, true, []);
    var _getLayoutedElements = getLayoutedElements(flowData.nodes, flowData.edges),
      layoutedNodes = _getLayoutedElements.nodes,
      layoutedEdges = _getLayoutedElements.edges;
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [dictionary, currentSearchKeyword]);
  var onConnect = (0, _react.useCallback)(function (params) {
    return setEdges(function (eds) {
      var _ConnectionLineType;
      return (0, _reactflow.addEdge)(_objectSpread(_objectSpread({}, params), {}, {
        type: (_ConnectionLineType = ConnectionLineType) === null || _ConnectionLineType === void 0 ? void 0 : _ConnectionLineType.SmoothStep,
        animated: true
      }), eds);
    });
  }, []);
  if (nodes.length === 0 && edges.length === 0) {
    return /*#__PURE__*/_react["default"].createElement(_CircularProgress["default"], null);
  }
  return /*#__PURE__*/_react["default"].createElement(_CanvasView["default"], {
    nodes: nodes,
    edges: edges,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    onConnect: onConnect,
    categories: categories,
    onClearSearchResult: onClearSearchResult,
    highlightedNodes: highlightedNodes,
    graphViewConfig: graphViewConfig,
    canvasWidth: tabViewWidth,
    onGraphPanelClick: onGraphPanelClick
  });
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    ddgraph: state.ddgraph,
    isSearchMode: state.ddgraph.isSearchMode,
    currentSearchKeyword: state.ddgraph.currentSearchKeyword,
    searchResults: state.ddgraph.searchResult,
    nodeTree: state.submission.node2Level,
    highlightedNodes: state.ddgraph.highlightedNodes,
    unfilteredDictionary: state.submission.unfilteredDictionary,
    graphViewConfig: state.ddgraph.graphViewConfig,
    assetConfig: state.ddgraph.assetConfig
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setGraphData: function setGraphData(graphData) {
      dispatch((0, _graph.setReactFlowGraphData)(graphData));
    },
    onGraphPanelClick: function onGraphPanelClick() {
      dispatch((0, _graph.onPanelViewClick)());
    }
  };
};
var _default = exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CanvasController);