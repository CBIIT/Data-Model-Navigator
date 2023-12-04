"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _util = require("./util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var styles = _renderer.StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: '5px'
  },
  test: {
    flexDirection: 'row'
  },
  horizontalCells: {
    flexDirection: 'row',
    paddingBottom: '5px'
  },
  boldLabeled: {
    fontSize: 8,
    fontFamily: (0, _util.FontRegistry)('NunitoExtraBold')
  },
  labeledContainer: {
    marginTop: '8px',
    marginBottom: '8px'
  },
  evenRow: {
    backgroundColor: '#f4f5f5'
  },
  tableCol: {
    width: '24%'
  },
  tableCol2: {
    width: '24%'
  },
  tableColKey: {
    width: '4%'
  },
  tableColType: {
    width: '18%'
  },
  tableColSource: {
    width: '14%',
    paddingLeft: 5
  },
  tableColDesc: {
    textAlign: 'left',
    width: '100%'
  },
  tableColRequired: {
    width: '12%'
  },
  labeled: {
    fontSize: 8
  },
  cellHeader: {
    fontSize: '6px',
    overflowWrap: 'break-word',
    fontWeight: '600',
    paddingLeft: '6px',
    paddingTop: '5px',
    // paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: (0, _util.FontRegistry)('NunitoSans'),
    textAlign: 'justify',
    width: '78px'
  },
  cellHorizontalHeader: {
    fontSize: '6px',
    overflowWrap: 'break-word',
    fontWeight: '600',
    paddingLeft: '6px',
    paddingTop: '5px',
    // paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: (0, _util.FontRegistry)('NunitoSans'),
    textAlign: 'justify',
    width: '70.5px'
  },
  tableCell: {
    fontSize: 8,
    overflowWrap: 'break-word',
    // paddingLeft: '2px',
    paddingTop: '3px',
    paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: (0, _util.FontRegistry)('NunitoNormal'),
    width: '100%',
    textAlign: 'justify'
  },
  descriptionCell: {
    width: '100%',
    paddingLeft: '6px'
  },
  horizontalTableCell: {
    fontSize: 8,
    overflowWrap: 'break-word',
    // paddingLeft: '2px',
    paddingTop: '3px',
    // paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: (0, _util.FontRegistry)('NunitoNormal'),
    width: '126px',
    textAlign: 'justify'
  },
  key: {
    fontSize: 8,
    color: '#0d71a3',
    paddingLeft: '2px',
    paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: 1.2,
    width: '90%',
    // justifyContent: 'left',
    fontFamily: (0, _util.FontRegistry)('NunitoSemiBold')
  },
  tableColKey1: {
    width: '90%',
    justifyContent: 'center'
  },
  brText: {
    marginTop: '8px',
    marginBottom: '2px',
    fontFamily: (0, _util.FontRegistry)('NunitoNormal'),
    fontSize: 8,
    width: '100%'
  },
  tableColKey2: {
    width: '114%'
  },
  keyText: {
    marginRight: '10px'
  },
  keyIcon: {
    width: '12px',
    marginLeft: '20px'
  },
  keyIconView: {
    position: 'absolute',
    left: '20px'
  },
  required: {
    color: '#ff5a20',
    fontFamily: (0, _util.FontRegistry)('NunitoExtraBold')
  }
});
var PdfTableRow = function PdfTableRow(_ref) {
  var propInfo = _ref.propInfo,
    node = _ref.node,
    thisProperty = _ref.thisProperty;
  var textContent = function textContent(text, symbol) {
    if (String(text).length > 20) {
      return String(text).replace(symbol, "".concat(symbol, "\n"));
    }
    return text;
  };
  var validateEnums = function validateEnums(enums) {
    if (Array.isArray(enums)) {
      var concatEnums = '';
      enums.forEach(function (value) {
        concatEnums += textContent("'".concat(value, "'; "), '/');
      });
      return concatEnums;
    }
    return JSON.stringify(enums);
  };
  var validateType = function validateType(property) {
    if (Array.isArray(property)) {
      if (property.length > 10) {
        return textContent("".concat(property), '_');
      }
      return property;
    }
    var type = _typeof(property);
    if (type === 'object') {
      return textContent(JSON.stringify(property), ']');
    }
    return property;
  };
  var required = function required(key) {
    if (node.required.includes(key)) {
      return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
        style: _objectSpread(_objectSpread({}, styles.tableCell), styles.required)
      }, "Required");
    }
    if (node.preferred.includes(key)) {
      return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
        style: styles.tableCell
      }, "Preferred");
    }
    return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.tableCell
    }, "Optional");
  };
  var displayKeyPropsDiscription = function displayKeyPropsDiscription(description) {
    var lines = description.split('<br>');
    return lines[0];
  };
  var displayKeyPropsDescriptionBlurb = function displayKeyPropsDescriptionBlurb(description) {
    var lines = description.split('<br>');
    return lines[1];
  };
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.test
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.cellHeader
  }, "DESCRIPTION"), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.tableColDesc
  }, propInfo.key ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.tableCell
  }, displayKeyPropsDiscription(propInfo.description)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.brText
  }, displayKeyPropsDescriptionBlurb(propInfo.description)), propInfo.labeled && /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.labeledContainer
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.boldLabeled
  }, "Displayed as:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.labeled
  }, " ".concat(propInfo.labeled)))) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.tableCell
  }, propInfo.description), propInfo.labeled && /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.labeledContainer
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.boldLabeled
  }, "Displayed as:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.labeled
  }, " ".concat(propInfo.labeled)))))), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.test
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.cellHeader
  }, "TYPE"), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, propInfo["enum"] ? /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.tableCell
  }, 'Acceptable Values: ', validateEnums(propInfo["enum"])) : /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.tableCell
  }, validateType(propInfo.type)))), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.horizontalCells
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.cellHorizontalHeader
  }, "REQUIRED"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.horizontalTableCell
  }, required(thisProperty)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.cellHeader
  }, "SOURCE"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.horizontalTableCell
  }, textContent(propInfo.src, '/')), propInfo.labeled && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _objectSpread({}, styles.cellHeader)
  }, "DISPLAYED AS"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.horizontalTableCell
  }, propInfo.labeled))));
};
var _default = exports["default"] = PdfTableRow;