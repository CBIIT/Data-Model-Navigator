"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
var _default = (0, _core.withStyles)(styles)(DataDictionaryPropertyTable);
exports["default"] = _default;