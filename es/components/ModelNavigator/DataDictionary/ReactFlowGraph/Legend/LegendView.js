"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var Legend = function Legend(_ref) {
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
    className: (0, _clsx2["default"])(_defineProperty(_defineProperty(_defineProperty({}, classes.zvlaue, overlayPropertyHidden), classes.legendExpand, display), classes.legendCollapse, !display)),
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
var _default = exports["default"] = (0, _core.withStyles)(_LegendStyle["default"])(Legend);