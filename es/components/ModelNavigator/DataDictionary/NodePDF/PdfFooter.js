"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _util = require("./util");
var _reactRedux = require("react-redux");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var styles = _renderer.StyleSheet.create({
  hr: {
    position: 'absolute',
    bottom: '55',
    left: 40,
    width: '100%',
    height: '2px',
    backgroundColor: '#0B3556'
  },
  date: {
    position: 'absolute',
    bottom: 40,
    fontSize: 7,
    left: 0,
    right: 52,
    textAlign: 'right',
    color: '#606060',
    textTransform: 'uppercase',
    fontFamily: (0, _util.FontRegistry)('NunitoNormal')
  },
  pageNumber: {
    position: 'absolute',
    bottom: 40,
    fontSize: 7,
    left: 0,
    right: 40,
    textAlign: 'right',
    color: '#606060',
    fontFamily: (0, _util.FontRegistry)('NunitoNormal')
  },
  link: {
    position: 'absolute',
    bottom: 40,
    fontSize: 7,
    left: 41,
    right: 0,
    textTransform: 'uppercase',
    color: '#606060',
    fontFamily: (0, _util.FontRegistry)('NunitoNormal')
  }
});
var date = new Date().toLocaleString('en-us', {
  month: 'long',
  year: 'numeric',
  day: 'numeric'
});
var PdfFooter = function PdfFooter() {
  var pdfConfig = (0, _reactRedux.useSelector)(function (state) {
    return state.ddgraph && state.ddgraph.pdfDownloadConfig;
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.hr,
    fixed: true
  }), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.link,
    fixed: true
  }, pdfConfig !== null && pdfConfig !== void 0 && pdfConfig.footnote ? pdfConfig === null || pdfConfig === void 0 ? void 0 : pdfConfig.footnote : "caninecommons.cancer.gov/#/icdc-data-model"), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.date,
    fixed: true
  }, "".concat(date, "    |  ")), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: styles.pageNumber,
    render: function render(_ref) {
      var pageNumber = _ref.pageNumber;
      return "".concat(pageNumber);
    },
    fixed: true
  }));
};
var _default = exports["default"] = PdfFooter;