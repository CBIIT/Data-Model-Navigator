"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _core = require("@material-ui/core");
var _DictionaryStyle = _interopRequireDefault(require("./DictionaryStyle"));
var _Tab = _interopRequireDefault(require("./Tab/Tab"));
var _TabPanel = _interopRequireDefault(require("./Tab/TabPanel"));
var _TabThemeConfig = _interopRequireDefault(require("./Tab/TabThemeConfig"));
var _DataDictionaryTable = _interopRequireDefault(require("../Table/DataDictionaryTable"));
var _CanvasController = _interopRequireDefault(require("../ReactFlowGraph/Canvas/CanvasController"));
var _graph = require("../Store/actions/graph");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var tabItems = [{
  index: 0,
  label: "Graph View",
  value: "graph_view"
}, {
  index: 1,
  label: "Table View",
  value: "table_view"
}];
var DictionaryView = function DictionaryView(_ref) {
  var classes = _ref.classes,
    pdfDownloadConfig = _ref.pdfDownloadConfig,
    handleClearSearchResult = _ref.handleClearSearchResult,
    dictionary = _ref.dictionary,
    graphView = _ref.graphView,
    onSetGraphView = _ref.onSetGraphView,
    onWidthChange = _ref.onWidthChange;
  var _React$useState = _react["default"].useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    currentTab = _React$useState2[0],
    setCurrentTab = _React$useState2[1];
  /**
   * get witdh of the tab to position nodes in the graph view
   */
  var ref = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    tabViewWidth = _useState2[0],
    setTabViewWidth = _useState2[1];
  var setCanvasWidth = function setCanvasWidth() {
    setTabViewWidth(ref.current.offsetWidth);
    onWidthChange(ref.current.offsetWidth);
  };
  (0, _react.useEffect)(function () {
    onWidthChange(ref.current.offsetWidth);
    window.addEventListener("resize", setCanvasWidth);
    return function () {
      window.removeEventListener("resize", setCanvasWidth);
    };
  }, []);
  (0, _react.useLayoutEffect)(function () {
    setTabViewWidth(ref.current.offsetWidth);
  }, []);

  //set to graph view incase of search entry
  (0, _react.useEffect)(function () {
    if (graphView) {
      // 0 set for graph view
      setCurrentTab(0);
    }
  }, [graphView]);
  var handleTabChange = function handleTabChange(event, value) {
    setCurrentTab(value);
    onSetGraphView(value === 0);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_TabThemeConfig["default"], null, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.container,
    ref: ref
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.tabItems
  }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
    styleClasses: classes,
    tabItems: tabItems,
    currentTab: currentTab,
    handleTabChange: handleTabChange
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.viewTableOuterContainer
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.viewTableContainer
  }, /*#__PURE__*/_react["default"].createElement(_TabPanel["default"], {
    value: currentTab,
    index: 0
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.graphView
  }, /*#__PURE__*/_react["default"].createElement(_CanvasController["default"], {
    dictionary: dictionary,
    tabViewWidth: tabViewWidth,
    onClearSearchResult: handleClearSearchResult
  }))), /*#__PURE__*/_react["default"].createElement(_TabPanel["default"], {
    value: currentTab,
    index: 1
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.tableView
  }, /*#__PURE__*/_react["default"].createElement(_DataDictionaryTable["default"], {
    pdfDownloadConfig: pdfDownloadConfig
  }))))))));
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    graphView: state.ddgraph.isGraphView
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSetGraphView: function onSetGraphView(isGraphView) {
      return dispatch((0, _graph.setGraphView)(isGraphView));
    },
    onWidthChange: function onWidthChange(canvasWidth) {
      return dispatch((0, _graph.setCanvasWidth)(canvasWidth));
    }
  };
};
var _default = exports["default"] = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _core.withStyles)(_DictionaryStyle["default"]))(DictionaryView);