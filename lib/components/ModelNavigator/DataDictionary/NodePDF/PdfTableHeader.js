"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _util = require("./util");
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
    width: '24%',
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
    fontWeight: 'heavy',
    color: '#606060',
    fontSize: 8,
    fontFamily: (0, _util.FontRegistry)('NunitoBold')
  }
});
var PdfTableHeader = function PdfTableHeader() {
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.container
  }, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.tableColHeader
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.tableCellHeader
  }, "Property")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.tableColType
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.tableCellHeader
  }, "Type")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.tableColRequired
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.tableCellHeader
  }, "Required")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.tableColDesc
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.tableCellHeader
  }, "Description")), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.tableColSource
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.tableCellHeader
  }, "Source")));
};
var _default = exports["default"] = PdfTableHeader;