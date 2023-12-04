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
var styles = _renderer.StyleSheet.create({
  container: {
    marginTop: '5px',
    flexDirection: 'row',
    borderTop: '1.5px solid #606060',
    borderBottom: '1.5px solid #606060',
    backgroundColor: '#fff',
    fontSize: 8,
    fontWeight: 900,
    color: '#606060',
    paddingTop: '5px',
    paddingRight: '5px',
    paddingLeft: '5px',
    paddingBottom: '5px',
    fontFamily: (0, _util.FontRegistry)('NunitoBold')
  },
  tableColHeader: {
    width: '9.25%',
    paddingLeft: 2
  },
  tableColKey: {
    width: '4%',
    paddingLeft: 2
  },
  tableColType: {
    width: '18%',
    paddingLeft: 2
  },
  tableColSource: {
    width: '14%',
    paddingLeft: 10
  },
  tableColRequired: {
    width: '12%',
    paddingLeft: 4
  },
  tableColDesc: {
    width: '30%',
    paddingLeft: 5
  },
  tableCellHeader: {
    // margin: 'auto',
    overflowWrap: 'break-word',
    fontWeight: '600',
    color: '#606060',
    fontSize: '6px',
    paddingTop: '1.5px',
    fontFamily: (0, _util.FontRegistry)('NunitoSans')
  },
  key: {
    fontSize: 8,
    color: '#0d71a3',
    // paddingLeft: '2px',
    // paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: 1.2,
    width: '90%',
    // justifyContent: 'left',
    fontFamily: (0, _util.FontRegistry)('NunitoSemiBold')
  },
  keyIcon: {
    width: '12px',
    marginLeft: '20px'
  }
});
var PdfTableHeader = function PdfTableHeader(_ref) {
  var value = _ref.value,
    propInfo = _ref.propInfo;
  var textContent = function textContent(text) {
    return text;
  };
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.container
  }, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.tableColHeader
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.tableCellHeader
  }, "PROPERTY")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.tableCol
  }, propInfo.key ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: String(value).length > 20 ? styles.tableColKey2 : styles.tableColKey1
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.key
  }, value, ' ', /*#__PURE__*/_react["default"].createElement(_renderer.Image, {
    style: styles.keyIcon,
    src: _key_icon["default"],
    alt: "value icon"
  })))) : /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.headerCell
  }, textContent(value, '_'))));
};
var _default = exports["default"] = PdfTableHeader;