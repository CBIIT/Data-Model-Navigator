"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _RenderSvg = _interopRequireDefault(require("./RenderSvg"));
var _helper = require("../NodeCategories/helper");
var _utils = require("../utils");
var _util = require("./util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var styles = _renderer.StyleSheet.create({
  row: {
    margin: 'auto',
    flexDirection: 'row'
  },
  categoryStyle: {
    flexDirection: 'row',
    padding: '7px 0px 7px 10px'
  },
  hr: {
    height: '4px',
    backgroundColor: '#E7E5E5'
  },
  nodeInfo: {
    flexDirection: 'row',
    padding: '6px 0px 2px 15px',
    backgroundColor: '#f4f5f5',
    display: 'flex',
    justifyContent: 'space-between'
  },
  tagsInfo: {
    flexDirection: 'row',
    padding: '6px 0px 2px 15px',
    backgroundColor: '#f4f5f5',
    display: 'flex'
  },
  nodeTitle: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    fontFamily: (0, _util.FontRegistry)('NunitoBold')
    // marginRight: '75px',
  },

  nodeDesc: {
    color: '#000000',
    fontSize: '9px',
    paddingRight: '15px',
    paddingTop: '-2px',
    lineHeight: 1.2,
    width: '350px',
    fontFamily: (0, _util.FontRegistry)('NunitoNormal'),
    textAlign: 'justify'
  },
  categoryHeader: {
    marginLeft: '10px',
    fontWeight: 'heavy',
    fontSize: '11.25px',
    paddingTop: '8px',
    fontFamily: (0, _util.FontRegistry)('NunitoExtraBold')
  },
  nodeAssignment: {
    // float: 'right',
    paddingTop: '3px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '0.5px solid #cdcdcd',
    marginRight: '176px'
  },
  nodeClass: {
    paddingTop: '3px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '0.5px solid #cdcdcd'
  },
  tagContainer: {
    position: 'relative',
    left: '141.5em',
    display: 'flex',
    flexDirection: 'row'
  },
  label: {
    fontWeight: '900',
    fontSize: '7px',
    paddingTop: '0px',
    paddingBottom: '2px',
    "float": 'left',
    color: '#6c6c6c',
    fontFamily: (0, _util.FontRegistry)('NunitoExtraBold')
  },
  assignment: {
    fontSize: '8px',
    paddingTop: '2px',
    marginRight: '10px',
    border: '0.5px solid #cdcdcd',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#2982af',
    fontFamily: (0, _util.FontRegistry)('NunitoNormal')
  },
  "class": {
    fontSize: '8px',
    paddingRight: '4px',
    paddingTop: '2px',
    border: '0.5px solid #cdcdcd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#2982af',
    height: '13px',
    fontFamily: (0, _util.FontRegistry)('NunitoNormal')
  }
});
var createStyle = function createStyle(classes, categoryColor) {
  return _objectSpread(_objectSpread({}, classes), {
    borderLeft: "5px solid ".concat(categoryColor)
  });
};
var PdfTitle = function PdfTitle(_ref) {
  var category = _ref.category,
    assignment = _ref.assignment,
    title = _ref.title,
    desc = _ref.desc,
    nodeClass = _ref.nodeClass;
  var svgNode = document.querySelector("svg.".concat(category));
  var SvgIcon = (0, _RenderSvg["default"])(svgNode);
  var categoryColor = (0, _helper.getCategoryColor)(category);
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: createStyle(styles.categoryStyle, categoryColor)
  }, SvgIcon, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _objectSpread({
      color: categoryColor
    }, styles.categoryHeader)
  }, (0, _utils.capitalizeFirstLetter)(category))), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: createStyle(styles.hr, categoryColor)
  }), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: createStyle(styles.nodeInfo, categoryColor)
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.nodeTitle
  }, (0, _utils.capitalizeFirstLetter)(title)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.nodeDesc
  }, desc)), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: createStyle(styles.tagsInfo, categoryColor)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: styles.tagContainer
  }, assignment ? /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.nodeAssignment
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: styles.label
  }, 'Assignment: '), /*#__PURE__*/_react["default"].createElement("span", {
    style: styles.assignment
  }, (0, _utils.capitalizeFirstLetter)(assignment))) : /*#__PURE__*/_react["default"].createElement(_renderer.Text, null), nodeClass ? /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.nodeClass
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: styles.label
  }, 'Class: '), /*#__PURE__*/_react["default"].createElement("span", {
    style: styles["class"]
  }, (0, _utils.capitalizeFirstLetter)(nodeClass))) : /*#__PURE__*/_react["default"].createElement(_renderer.Text, null))));
};
var _default = PdfTitle;
exports["default"] = _default;