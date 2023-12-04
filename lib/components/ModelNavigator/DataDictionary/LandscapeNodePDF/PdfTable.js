"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _PdfTableHeader = _interopRequireDefault(require("./PdfTableHeader"));
var _PdfTableRow = _interopRequireDefault(require("./PdfTableRow"));
var _util = require("./util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var styles = _renderer.StyleSheet.create({
  tableContainer: {
    display: 'table',
    width: 'auto',
    paddingTop: '10px',
    paddingLeft: '18px',
    paddingRight: '15px',
    paddingBottom: '10px'
  },
  properties: {
    color: '#7a7a7a',
    fontSize: '8px',
    marginLeft: '10px',
    marginTop: '5px',
    fontFamily: (0, _util.FontRegistry)('NunitoExtraLightItalic')
  }
});
var PdfTable = function PdfTable(_ref) {
  var node = _ref.node,
    categoryColor = _ref.categoryColor;
  var properties = node.properties;
  var propKeys = Object.keys(properties);
  var count = propKeys.length;
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: _objectSpread(_objectSpread({}, styles.tableContainer), {}, {
      borderLeft: "5px solid ".concat(categoryColor)
    })
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.properties
  }, "This node has ".concat(count, " properties")), propKeys.map(function (property) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_PdfTableHeader["default"], {
      propInfo: node && node.properties[property],
      value: property
    }), /*#__PURE__*/_react["default"].createElement(_PdfTableRow["default"], {
      thisProperty: property,
      propInfo: node && node.properties[property],
      node: node
    }));
  }));
};
var _default = exports["default"] = PdfTable;