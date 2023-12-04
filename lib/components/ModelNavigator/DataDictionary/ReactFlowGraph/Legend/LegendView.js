"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
var _helper = require("../../NodeCategories/helper");
var _lg_relationship_links = _interopRequireDefault(require("../../NodeCategories/icons/Legend/lg_relationship_links.svg"));
var _lg_link = _interopRequireDefault(require("../../NodeCategories/icons/Legend/lg_link.svg"));
var _LegendStyle = _interopRequireDefault(require("./LegendStyle"));
var _utils = require("../../utils");
var _clsx2 = _interopRequireDefault(require("clsx"));
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
var Legend = function Legend(_ref) {
  var _clsx;
  var classes = _ref.classes,
    categoryItems = _ref.categoryItems,
    styles = _ref.styles,
    overlayPropertyHidden = _ref.overlayPropertyHidden;
  var _useState = (0, _react.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    display = _useState2[0],
    setDisplay = _useState2[1];
  var toggleLegend = function toggleLegend() {
    return setDisplay(!display);
  };

  /**
  * set legend position - scroll bar width varies based on browser so
  * legend position must be
  * adjusted by window.innerWidth and document.documentElement.clientWidth
  * (refrane from using hard coded value)
  * latest version of browse will have scroll bar over browser
  */
  var scrollBarWidth = document.documentElement.clientWidth;
  var rightMargin = window.innerWidth - scrollBarWidth;
  var positionRight = rightMargin > 0 ? rightMargin : 17;
  var position = {
    right: positionRight
  };
  var categoryListComponent = categoryItems.map(function (category) {
    var imgUrl = "".concat(_helper.legendIconUrl).concat(category, ".svg");
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: category,
      className: classes.category
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: classes.categoryIcon
    }, /*#__PURE__*/_react["default"].createElement("img", {
      src: imgUrl,
      alt: "icon"
    })), /*#__PURE__*/_react["default"].createElement("span", {
      className: classes.text
    }, (0, _utils.capitalizeFirstLetter)(category)));
  });
  var ToggleBtn = function ToggleBtn() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: display ? classes.headerExpand : classes.headerCollapse
    }, display && /*#__PURE__*/_react["default"].createElement("span", {
      className: classes.headerTitle
    }, "Node Category"), /*#__PURE__*/_react["default"].createElement("span", {
      className: classes.toggleBtn,
      onClick: toggleLegend,
      role: "button",
      tabIndex: 0
    }, /*#__PURE__*/_react["default"].createElement("img", {
      src: _lg_link["default"],
      alt: "toggle Legend"
    })));
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx2["default"])((_clsx = {}, _defineProperty(_clsx, classes.zvlaue, overlayPropertyHidden), _defineProperty(_clsx, classes.legendExpand, display), _defineProperty(_clsx, classes.legendCollapse, !display), _clsx)),
    style: display ? _objectSpread(_objectSpread({}, styles === null || styles === void 0 ? void 0 : styles.legendExpand), position) : _objectSpread(_objectSpread({}, styles === null || styles === void 0 ? void 0 : styles.legendCollapse), position)
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(ToggleBtn, null), display && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.item
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: _lg_relationship_links["default"],
    alt: "relation"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.text
  }, "relationship links")), categoryListComponent))));
};
var _default = (0, _core.withStyles)(_LegendStyle["default"])(Legend);
exports["default"] = _default;