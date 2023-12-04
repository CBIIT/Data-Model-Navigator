"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _PdfHeader = _interopRequireDefault(require("../DataDictionary/NodePDF/PdfHeader"));
var _PdfFooter = _interopRequireDefault(require("../DataDictionary/NodePDF/PdfFooter"));
var _util = require("../DataDictionary/NodePDF/util");
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
  },
  title: {
    marginTop: '20px',
    marginBottm: '25px',
    color: '#0d71a3',
    fontSize: '12px',
    fontWeight: 'heavy',
    fontFamily: (0, _util.FontRegistry)('NunitoBold')
  },
  space: {
    marginTop: '20px'
  },
  h1: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    marginLeft: '12px',
    fontFamily: (0, _util.FontRegistry)('NunitoBold')
  },
  h2: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    marginLeft: '12px',
    fontFamily: (0, _util.FontRegistry)('NunitoBold')
  },
  h3: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    marginLeft: '12px',
    fontFamily: (0, _util.FontRegistry)('NunitoBold')
  },
  h4: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    marginLeft: '12px',
    fontFamily: (0, _util.FontRegistry)('NunitoBold')
  },
  content: {
    color: '#000000',
    fontSize: '9px',
    paddingTop: '-2px',
    lineHeight: 1.4,
    marginLeft: '12px',
    marginRight: '5px',
    overflowWrap: 'break-word',
    width: '500px',
    textAlign: 'justify',
    fontFamily: (0, _util.FontRegistry)('NunitoLight')
  }
});
var PdfTemplate = function PdfTemplate(_ref) {
  var title = _ref.title,
    content = _ref.content;
  var renderSubHeader = function renderSubHeader(text, count) {
    var titleStyle = styles["h".concat(count)];
    return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: titleStyle
    }, text);
  };
  var renderContent = function renderContent(text) {
    // split text with newline and generate pdf elements
    var lines = text.split(/\r?\n/);
    var pdfContent = lines.map(function (item) {
      var count = (item.match(/#/g) || []).length;
      if (count > 0) {
        return renderSubHeader(item.replaceAll('#', ''), count);
      }
      return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
        style: styles.content
      }, " ", item, " ");
    });
    return pdfContent;
  };
  return /*#__PURE__*/_react["default"].createElement(_renderer.Document, null, /*#__PURE__*/_react["default"].createElement(_renderer.Page, {
    style: styles.page,
    size: "A4"
  }, /*#__PURE__*/_react["default"].createElement(_PdfHeader["default"], null), /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.title
  }, title), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.space
  }), renderContent(content)), /*#__PURE__*/_react["default"].createElement(_PdfFooter["default"], null)));
};
var _default = exports["default"] = PdfTemplate;