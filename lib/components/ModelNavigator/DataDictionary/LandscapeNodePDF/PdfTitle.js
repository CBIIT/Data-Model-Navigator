"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _helper = require("../NodeCategories/helper");
var _util = require("./util");
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// import logo from '../NodeCategories/icons/Pdf/administrative.png';

var styles = _renderer.StyleSheet.create({
  row: {
    margin: 'auto',
    flexDirection: 'row'
  },
  categoryStyle: {
    flexDirection: 'row',
    padding: '7px 0px 7px 10px'
    // height: '50px'
  },
  hr: {
    height: '4px',
    backgroundColor: '#E7E5E5'
  },
  nodeInfo: {
    flexDirection: 'row',
    padding: '6px 15px 2px 15px',
    backgroundColor: '#f4f5f5',
    display: 'flex'
  },
  tagsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '15px',
    paddingBottom: '5px',
    height: '30px',
    padding: '6px 0px 2px 15px',
    backgroundColor: '#f4f5f5',
    display: 'flex',
    marginBottom: '-12px'
  },
  nodeTitle: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    fontFamily: (0, _util.FontRegistry)('NunitoBold'),
    width: '158.5px',
    flex: '1'
    // marginRight: '75px',
  },
  nodeDesc: {
    color: '#000000',
    fontSize: '9px',
    paddingTop: '-2px',
    lineHeight: 1.2,
    overflowWrap: 'break-word',
    width: '650px',
    textAlign: 'justify',
    flex: '3',
    fontFamily: (0, _util.FontRegistry)('NunitoNormal')
  },
  categoryHeader: {
    marginLeft: '10px',
    fontWeight: 'heavy',
    fontSize: '11.25px',
    paddingTop: '8px',
    flex: '1',
    fontFamily: (0, _util.FontRegistry)('NunitoExtraBold')
  },
  nodeAssignment: {
    // float: 'right',
    // width: '105px',
    height: '17px',
    paddingTop: '3px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '0.5px solid #cdcdcd',
    textAlign: 'center',
    marginLeft: '192px',
    marginRight: '11px'
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
    left: '139em',
    display: 'flex',
    flexDirection: 'row'
  },
  label: {
    fontWeight: '900',
    fontSize: '7px',
    height: '15px',
    paddingTop: '0px',
    paddingBottom: '2px',
    dispaly: 'block',
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
  },
  icon: {
    width: "30px",
    height: "30px",
    backgroundColor: '#ffffff'
  }
});
var createStyle = function createStyle(classes, categoryColor) {
  return _objectSpread(_objectSpread({}, classes), {
    borderLeft: "5px solid ".concat(categoryColor)
  });
};
var PdfTitle = function PdfTitle(node) {
  var _pdfNodeCategoryList$;
  var category = node.category,
    desc = node.desc,
    title = node.title,
    assignment = node.assignment,
    nodeClass = node.nodeClass;
  var categoryColor = (0, _helper.getCategoryColor)(category);
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: createStyle(styles.categoryStyle, categoryColor)
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Image, {
    style: styles.icon,
    src: (_pdfNodeCategoryList$ = _helper.pdfNodeCategoryList[category]) === null || _pdfNodeCategoryList$ === void 0 ? void 0 : _pdfNodeCategoryList$.icon
  }), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _objectSpread({
      color: categoryColor
    }, styles.categoryHeader)
  }, (0, _utils.capitalizeFirstLetter)(category))), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: createStyle(styles.hr, categoryColor)
  }), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: {
      display: "flex",
      flexDirection: "row",
      padding: '6px 15px 5px 15px',
      borderLeft: "5px solid ".concat(categoryColor),
      backgroundColor: '#f4f5f5'
    }
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.nodeTitle
  }, (0, _utils.capitalizeFirstLetter)(title)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.nodeDesc
  }, desc)), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: {
      display: "flex",
      flexDirection: "row",
      // marginBottom: 1,
      borderLeft: "5px solid ".concat(categoryColor),
      backgroundColor: '#f4f5f5',
      paddingBottom: '10px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.nodeAssignment
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, 'Assignment: '), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.assignment
  }, (0, _utils.capitalizeFirstLetter)(assignment))), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.nodeClass
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.label
  }, 'Class: '), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles["class"]
  }, (0, _utils.capitalizeFirstLetter)(nodeClass)))));
};
var _default = exports["default"] = PdfTitle;