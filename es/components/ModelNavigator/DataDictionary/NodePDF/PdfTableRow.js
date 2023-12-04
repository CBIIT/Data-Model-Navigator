"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _util = require("./util");
var _key_icon = _interopRequireDefault(require("./assets/key_icon.png"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var styles = _renderer.StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: '5px'
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
    width: '30%'
  },
  tableColRequired: {
    width: '12%'
  },
  tableCell: {
    fontSize: 8,
    overflowWrap: 'break-word',
    paddingLeft: '2px',
    paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: (0, _util.FontRegistry)('NunitoNormal')
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
  },
  boldLabeled: {
    fontSize: 8,
    fontFamily: (0, _util.FontRegistry)('NunitoExtraBold')
  },
  labeled: {
    fontSize: 8
  },
  labeledContainer: {
    marginTop: '16px'
  }
});
var PdfTableRow = function PdfTableRow(_ref) {
  var node = _ref.node;
  var keys = Object.keys(node.properties);
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
    return lines.map(function (line, index) {
      return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
        key: index,
        style: styles.tableCell
      }, line);
    });
  };
  var getStyles = function getStyles(classes, index) {
    return index % 2 === 0 ? _objectSpread(_objectSpread({}, classes), styles.evenRow) : _objectSpread({}, classes);
  };
  var rows = keys.map(function (key, index) {
    return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: getStyles(styles.row, index),
      key: key
    }, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: styles.tableCol
    }, node.properties[key].key ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: String(key).length > 20 ? styles.tableColKey2 : styles.tableColKey1
    }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.key
    }, key, ' ', /*#__PURE__*/_react["default"].createElement(_renderer.Image, {
      style: styles.keyIcon,
      src: _key_icon["default"],
      alt: "key icon"
    })))) : /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.tableCell
    }, textContent(key, '_'))), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: styles.tableColType
    }, node.properties[key]["enum"] ? /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.tableCell
    }, 'Acceptable Values: ', validateEnums(node.properties[key]["enum"])) : /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.tableCell
    }, validateType(node.properties[key].type))), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: styles.tableColRequired
    }, required(key)), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: styles.tableColDesc
    }, node.properties[key].key ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, null, displayKeyPropsDiscription(node.properties[key].description)), node.properties[key].labeled && /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.labeledContainer
    }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.boldLabeled
    }, "Displayed as:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.labeled
    }, " ".concat(node.properties[key].labeled)))) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.tableCell
    }, node.properties[key].description), node.properties[key].labeled && /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.labeledContainer
    }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.boldLabeled
    }, "Displayed as:"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.labeled
    }, " ".concat(node.properties[key].labeled))))), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: styles.tableColSource
    }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: styles.tableCell
    }, textContent(node.properties[key].src, '/'))));
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, rows);
};
var _default = PdfTableRow;
exports["default"] = _default;