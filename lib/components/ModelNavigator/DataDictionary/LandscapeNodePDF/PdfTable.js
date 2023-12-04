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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
var _default = PdfTable;
exports["default"] = _default;