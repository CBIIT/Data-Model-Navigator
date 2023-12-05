"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));
var _reactflow = require("reactflow");
var _clsx3 = _interopRequireDefault(require("clsx"));
var _NodeStyle = _interopRequireDefault(require("./NodeStyle"));
var _util = require("./util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var NodeView = function NodeView(_ref) {
  var classes = _ref.classes,
    id = _ref.id,
    handleId = _ref.handleId,
    data = _ref.data,
    onViewTable = _ref.onViewTable,
    isSearchMode = _ref.isSearchMode,
    ddgraph = _ref.ddgraph,
    currentSearchKeyword = _ref.currentSearchKeyword,
    onClickNode = _ref.onClickNode,
    expandNodeView = _ref.expandNodeView,
    onCollapseNodeView = _ref.onCollapseNodeView,
    highlightingNode = _ref.highlightingNode,
    onNodeFocus = _ref.onNodeFocus,
    focusedNodeId = _ref.focusedNodeId;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    display = _useState2[0],
    setDisplay = _useState2[1];
  /**
   * expand node in normal mode (when search mode is false)
   * use view option to adjust the fontSize on property dialog
   */
  var expandNode = function expandNode() {
    var view = localStorage.getItem("reactflowGraphView");
    onClickNode(id);
    setDisplay(!display);
    if (display) {
      onCollapseNodeView();
    }
  };
  var label = data.label,
    icon = data.icon,
    iconColor = data.iconColor,
    category = data.category,
    matchedNodeNameQuery = data.matchedNodeNameQuery,
    nodeAssignment = data.nodeAssignment,
    nodeClass = data.nodeClass,
    reqPropsCount = data.reqPropsCount,
    prefPropsCount = data.prefPropsCount,
    optPropsCount = data.optPropsCount;

  //dispatch event - on table view
  var displayOverviewTable = function displayOverviewTable() {
    onClickNode(id);
    onViewTable(false);
  };

  /**
   * light node based on reasult of search query
   */
  (0, _react.useEffect)(function () {
    if (!expandNodeView) {
      setDisplay(false);
    } else {
      if ("".concat(label).toLowerCase() === (highlightingNode === null || highlightingNode === void 0 ? void 0 : highlightingNode.id)) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    }
  }, [expandNodeView, highlightingNode]);
  (0, _react.useEffect)(function () {
    if ("".concat(label).toLowerCase() !== (focusedNodeId === null || focusedNodeId === void 0 ? void 0 : focusedNodeId.id)) {
      setDisplay(false);
    }
  }, [focusedNodeId]);

  /**
   * highlight nodes based on search query
   */
  var nodeClasses = (0, _util.setMatchingNodeClasses)(ddgraph, label, classes, category);
  /**
   * button on focus
   */
  var nodeFocusEvent = function nodeFocusEvent() {
    onNodeFocus(id);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx3["default"])(_defineProperty({}, classes.propDialog, display))
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: display ? classes.customNodeExpand : classes.customNodeCollapse
  }, display && /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.iconBar
  }, /*#__PURE__*/_react["default"].createElement(_Close["default"], {
    className: classes.closeIcon,
    onClick: expandNode
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.contentWrapper
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx3["default"])(classes.nodeTitle, _defineProperty({}, classes.btnPadding, display))
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: isSearchMode ? nodeClasses : classes.nodeButtonOuterWrapper,
    style: {
      border: display && "2px solid white"
    },
    onClick: isSearchMode ? displayOverviewTable : expandNode
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.nodeButtonInnerWrapper
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      borderRadius: "11px",
      backgroundColor: iconColor
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.iconWrapper,
    style: {
      backgroundColor: iconColor
    }
  }, /*#__PURE__*/_react["default"].createElement("img", {
    className: classes.icon,
    src: icon,
    alt: "category icon"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.labelWrapper
  }, isSearchMode && matchedNodeNameQuery ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _util.highlightMatchingTitle)(label, matchedNodeNameQuery, classes)) : "".concat(label).toLowerCase())))), /*#__PURE__*/_react["default"].createElement("div", {
    className: display ? classes.viewSection : classes.hideSection
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    className: classes.list
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: classes.listItem
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.listItemLabel
  }, "Assignment:"), /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.listItemValue
  }, nodeAssignment)), /*#__PURE__*/_react["default"].createElement("hr", {
    className: classes.divider
  }), /*#__PURE__*/_react["default"].createElement("li", {
    className: classes.listItem
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.listItemLabel
  }, "Class: "), /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.listItemValue
  }, nodeClass)), /*#__PURE__*/_react["default"].createElement("hr", {
    className: classes.divider
  }), /*#__PURE__*/_react["default"].createElement("li", {
    className: classes.listItem
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.listItemLabel
  }, "Required Properties: "), /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.listItemValue
  }, reqPropsCount)), /*#__PURE__*/_react["default"].createElement("hr", {
    className: classes.divider
  }), /*#__PURE__*/_react["default"].createElement("li", {
    className: classes.listItem
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.listItemLabel
  }, "Preferred Properties: "), /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.listItemValue
  }, prefPropsCount)), /*#__PURE__*/_react["default"].createElement("hr", {
    className: classes.divider
  }), /*#__PURE__*/_react["default"].createElement("li", {
    className: classes.listItem
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.listItemLabel
  }, "Optional Properties: "), /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.listItemValue
  }, optPropsCount)))), /*#__PURE__*/_react["default"].createElement(_reactflow.Handle, {
    type: "target",
    position: "top",
    style: {
      top: "12px"
    }
  }), /*#__PURE__*/_react["default"].createElement(_reactflow.Handle, {
    type: "source",
    position: "bottom",
    id: handleId,
    style: {
      background: "transparent",
      border: "none",
      top: "37px"
    }
  }))), display && /*#__PURE__*/_react["default"].createElement("button", {
    className: classes.viewPropBtn,
    onClick: displayOverviewTable
  }, "View Properties")));
};
var _default = exports["default"] = (0, _core.withStyles)(_NodeStyle["default"])( /*#__PURE__*/(0, _react.memo)(NodeView));