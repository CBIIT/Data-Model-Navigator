"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typography = exports.overrides = exports["default"] = void 0;
var _light = _interopRequireDefault(require("./light"));
var _dark = _interopRequireDefault(require("./dark"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = exports["default"] = {
  light: _light["default"],
  dark: _dark["default"]
};
var typography = exports.typography = {
  fontFamily: "'Lato Regular','Open Sans', 'sans-serif'",
  useNextVariants: true
};
var overrides = exports.overrides = {
  typography: {
    h1: {
      fontSize: '3rem'
    },
    h2: {
      fontSize: '2rem'
    },
    h3: {
      fontSize: '1.64rem'
    },
    h4: {
      fontSize: '1.5rem'
    },
    h5: {
      fontSize: '1.285rem'
    },
    h6: {
      fontSize: '1.142rem'
    },
    fontSize: 14
  }
};