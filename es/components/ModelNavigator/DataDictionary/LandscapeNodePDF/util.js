"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFont = exports.formatEnumValues = exports.FontRegistry = void 0;
var _renderer = require("@react-pdf/renderer");
var _NunitoExtraBold = _interopRequireDefault(require("./assets/fonts/Nunito-ExtraBold.ttf"));
var _NunitoBold = _interopRequireDefault(require("./assets/fonts/Nunito-Bold.ttf"));
var _NunitoSemiBold = _interopRequireDefault(require("./assets/fonts/Nunito-SemiBold.ttf"));
var _NunitoExtraLightItalic = _interopRequireDefault(require("./assets/fonts/Nunito-ExtraLightItalic.ttf"));
var _NunitoMedium = _interopRequireDefault(require("./assets/fonts/Nunito-Medium.ttf"));
var _NunitoLight = _interopRequireDefault(require("./assets/fonts/Nunito-Light.ttf"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var getFont = function getFont(path) {
  switch (path) {
    case 'NunitoExtraBold':
      return _NunitoExtraBold["default"];
    case 'NunitoSemiBold':
      return _NunitoSemiBold["default"];
    case 'NunitoBold':
      return _NunitoBold["default"];
    case 'NunitoExtraLightItalic':
      return _NunitoExtraLightItalic["default"];
    case 'NunitoNormal':
      return _NunitoMedium["default"];
    case 'NunitoLight':
      return _NunitoLight["default"];
    default:
      return _NunitoMedium["default"];
  }
};
exports.getFont = getFont;
var FontRegistry = function FontRegistry(font) {
  var fontConfig = {
    src: getFont(font),
    family: font
  };
  _renderer.Font.register(fontConfig);
  return font;
};
exports.FontRegistry = FontRegistry;
var formatEnumValues = function formatEnumValues(enums) {
  if (Array.isArray(enums)) {
    var concatEnums = '';
    enums.forEach(function (value) {
      concatEnums += "'".concat(value, "'; ");
    });
    return concatEnums;
  }
  return JSON.stringify(enums);
};
exports.formatEnumValues = formatEnumValues;