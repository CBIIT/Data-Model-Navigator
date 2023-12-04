"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _icdc_nih_logo = _interopRequireDefault(require("./assets/icdc_nih_logo.png"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var styles = _renderer.StyleSheet.create({
  logo: {
    "float": 'left',
    width: '50%'
  },
  hr: {
    height: '2px',
    marginTop: '5px',
    backgroundColor: '#0b3556'
  }
});
var PdfHeader = function PdfHeader(_ref) {
  var pdfDownloadConfig = _ref.pdfDownloadConfig;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_renderer.Image, {
    style: styles.logo,
    src: (pdfDownloadConfig === null || pdfDownloadConfig === void 0 ? void 0 : pdfDownloadConfig.iconSrc) || _icdc_nih_logo["default"]
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: styles.hr
  }));
};
var _default = exports["default"] = PdfHeader;