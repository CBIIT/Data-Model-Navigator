"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _PdfTitle = _interopRequireDefault(require("./PdfTitle"));
var _PdfTable = _interopRequireDefault(require("./PdfTable"));
var _PdfHeader = _interopRequireDefault(require("./PdfHeader"));
var _PdfFooter = _interopRequireDefault(require("./PdfFooter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var styles = _renderer.StyleSheet.create({
  page: {
    padding: '40px 40px 69px 40px',
    fontFamily: 'Helvetica',
    lineHeight: 1.5
  },
  logo: {
    "float": 'left',
    width: '46%'
  },
  tableContainer: {
    border: '1px solid #C1C1C1',
    marginTop: '60px'
  }
});
var PdfDocument = function PdfDocument(_ref) {
  var nodes = _ref.nodes;
  return /*#__PURE__*/_react["default"].createElement(_renderer.Document, null, /*#__PURE__*/_react["default"].createElement(_renderer.Page, {
    style: styles.page,
    size: "A4"
  }, /*#__PURE__*/_react["default"].createElement(_PdfHeader["default"], null), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: styles.body
  }, nodes.map(function (node) {
    return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: styles.tableContainer
    }, /*#__PURE__*/_react["default"].createElement(_PdfTitle["default"], {
      title: node.id,
      nodeClass: node["class"],
      assignment: node.assignment,
      desc: node.desc,
      category: node.category
    }), /*#__PURE__*/_react["default"].createElement("div", {
      style: styles.spacer
    }), /*#__PURE__*/_react["default"].createElement(_PdfTable["default"], {
      node: node
    }));
  })), /*#__PURE__*/_react["default"].createElement(_PdfFooter["default"], null)));
};
var _default = exports["default"] = PdfDocument;