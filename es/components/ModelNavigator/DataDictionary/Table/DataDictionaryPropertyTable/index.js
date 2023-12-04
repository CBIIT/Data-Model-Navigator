"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _utils = require("../../Utils/utils");
var _highlightHelper = require("../../Utils/highlightHelper");
var _DialogComponent = _interopRequireDefault(require("./component/DialogComponent"));
var _dataDictionaryData = require("../../../bento/dataDictionaryData");
var _tableHead = _interopRequireDefault(require("./component/tableHead"));
var _tableRow = _interopRequireDefault(require("./component/tableRow"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } /* eslint-disable react/forbid-prop-types */ /* eslint-disable no-empty */ /* eslint-disable no-unused-vars */
var DataDictionaryPropertyTable = function DataDictionaryPropertyTable(_ref) {
  var classes = _ref.classes,
    onlyShowMatchedProperties = _ref.onlyShowMatchedProperties,
    properties = _ref.properties,
    hasBorder = _ref.hasBorder,
    needHighlightSearchResult = _ref.needHighlightSearchResult,
    matchedResult = _ref.matchedResult,
    hideIsRequired = _ref.hideIsRequired,
    tideIsRequired = _ref.tideIsRequired,
    requiredProperties = _ref.requiredProperties,
    preferredProperties = _ref.preferredProperties,
    isSearchMode = _ref.isSearchMode,
    title = _ref.title;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    display = _useState2[0],
    setDisplay = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    items = _useState4[0],
    setItems = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    matchedItem = _useState6[0],
    setMatchedItems = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    property = _useState8[0],
    setProperty = _useState8[1];
  var config = (0, _reactRedux.useSelector)(function (state) {
    return state.submission && state.submission.ctrlVocabConfig ? state.submission.ctrlVocabConfig : _dataDictionaryData.controlVocabConfig;
  });
  var openBoxHandler = function openBoxHandler(values) {
    var typeMatchList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var propertyKey = arguments.length > 2 ? arguments[2] : undefined;
    setDisplay(true);
    setItems(values);
    setMatchedItems(typeMatchList);
    setProperty(propertyKey);
  };
  var closeHandler = function closeHandler() {
    setDisplay(false);
    setItems([]);
  };
  var propertyKeysList = tideIsRequired ? Object.keys(properties) : Object.keys(properties);
  var needHighLgSearchResult = onlyShowMatchedProperties || needHighlightSearchResult;
  var matchedPropertiesSummary = needHighlightSearchResult ? (0, _highlightHelper.getMatchesSummaryForProperties)(properties, matchedResult.matches) : [];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.propertyTable
  }, /*#__PURE__*/_react["default"].createElement("table", {
    className: classes.propertyTable
  }, /*#__PURE__*/_react["default"].createElement(_tableHead["default"], {
    hideIsRequired: hideIsRequired
  }), /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement(_tableRow["default"], {
    propertyKeysList: propertyKeysList,
    requiredProperties: requiredProperties,
    onlyShowMatchedProperties: onlyShowMatchedProperties,
    matchedPropertiesSummary: matchedPropertiesSummary,
    preferredProperties: preferredProperties,
    properties: properties,
    needHighlightSearchResult: needHighLgSearchResult,
    hideIsRequired: hideIsRequired,
    openBoxHandler: openBoxHandler,
    isSearchMode: isSearchMode,
    title: title
  }))), items.length > 0 && /*#__PURE__*/_react["default"].createElement(_DialogComponent["default"], {
    display: display,
    closeHandler: closeHandler,
    items: items,
    maxNoOfItems: config.maxNoOfItems,
    maxNoOfItemDlgBox: config.maxNoOfItemDlgBox,
    isSearchMode: isSearchMode,
    typeMatchList: matchedItem,
    node: title,
    property: property
  }));
};
DataDictionaryPropertyTable.propTypes = {
  properties: _propTypes["default"].object.isRequired,
  requiredProperties: _propTypes["default"].array,
  hasBorder: _propTypes["default"].bool,
  needHighlightSearchResult: _propTypes["default"].bool,
  matchedResult: _utils.SearchResultItemShape,
  hideIsRequired: _propTypes["default"].bool,
  onlyShowMatchedProperties: _propTypes["default"].bool
};
DataDictionaryPropertyTable.defaultProps = {
  requiredProperties: [],
  hasBorder: true,
  needHighlightSearchResult: false,
  matchedResult: {},
  hideIsRequired: false,
  onlyShowMatchedProperties: false
};
var styles = function styles() {
  return {
    propertyTable: {
      backgroundColor: "var(--g3-color__white)",
      borderCollapse: 'collapse',
      width: '100%',
      borderBottom: '1px solid #adbec4'
    },
    withOutBorder: {}
  };
};
var _default = exports["default"] = (0, _core.withStyles)(styles)(DataDictionaryPropertyTable);