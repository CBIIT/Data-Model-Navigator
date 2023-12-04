"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CanvasController);
exports["default"] = _default;