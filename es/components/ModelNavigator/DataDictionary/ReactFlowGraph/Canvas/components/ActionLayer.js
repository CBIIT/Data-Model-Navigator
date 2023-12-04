"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _ActionLayer = _interopRequireDefault(require("./ActionLayer.style"));
var _clsx3 = _interopRequireDefault(require("clsx"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* A layer over the graph.
* Put action buttons here.
*/
var ActionLayer = function ActionLayer(_ref) {
  var classes = _ref.classes,
    _ref$isSearchMode = _ref.isSearchMode,
    isSearchMode = _ref$isSearchMode === void 0 ? false : _ref$isSearchMode,
    handleClearSearchResult = _ref.handleClearSearchResult,
    overlayPropertyHidden = _ref.overlayPropertyHidden;
  var handleClearSearch = function handleClearSearch() {
    handleClearSearchResult();
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx3["default"])(classes.actionLayer, _defineProperty({}, classes.zvalue, !overlayPropertyHidden))
  }, isSearchMode && /*#__PURE__*/_react["default"].createElement(_core.Button, {
    className: (0, _clsx3["default"])(classes.clearSearch, _defineProperty({}, classes.zvalue, !overlayPropertyHidden)),
    onClick: handleClearSearch,
    label: "Clear Search Result"
  }, " Clear Search Result"));
};
var _default = (0, _core.withStyles)(_ActionLayer["default"])(ActionLayer);
exports["default"] = _default;