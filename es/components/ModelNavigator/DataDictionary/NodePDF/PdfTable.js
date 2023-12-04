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
    fontFamily: (0, _util.FontRegistry)('NunitoExtraLightItalic')
  }
});
var PdfTable = function PdfTable(_ref) {
  var node = _ref.node;
  var properties = node.properties;
  var count = Object.keys(properties).length;
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.tableContainer
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.properties
  }, "This node has ".concat(count, " properties")), /*#__PURE__*/_react["default"].createElement(_PdfTableHeader["default"], null), /*#__PURE__*/_react["default"].createElement(_PdfTableRow["default"], {
    node: node
  }));
};
var _default = exports["default"] = PdfTable;