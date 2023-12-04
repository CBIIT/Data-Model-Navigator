"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMatchingNodeClasses = exports.highlightMatchingTitle = void 0;
var _react = _interopRequireDefault(require("react"));
var _underscore = _interopRequireDefault(require("underscore"));
var _clsx2 = _interopRequireDefault(require("clsx"));
var _util = require("../Canvas/util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * 
 * @param {*} param0 
 * set classes for matching nodes base on search query
 */
var setMatchingNodeClasses = function setMatchingNodeClasses(_ref, node, classes, category) {
  var _clsx;
  var _ref$matchedNodeIDs = _ref.matchedNodeIDs,
    matchedNodeIDs = _ref$matchedNodeIDs === void 0 ? [] : _ref$matchedNodeIDs,
    _ref$matchedNodeIDsIn = _ref.matchedNodeIDsInNameAndDescription,
    matchedNodeIDsInNameAndDescription = _ref$matchedNodeIDsIn === void 0 ? [] : _ref$matchedNodeIDsIn,
    _ref$matchedNodeIDsIn2 = _ref.matchedNodeIDsInProperties,
    matchedNodeIDsInProperties = _ref$matchedNodeIDsIn2 === void 0 ? [] : _ref$matchedNodeIDsIn2;
  var id = "".concat(node).trim().toLowerCase();
  return (0, _clsx2["default"])(classes.nodeTitleBtn, classes[category], (_clsx = {}, _defineProperty(_clsx, classes.matchedNodeIDs, matchedNodeIDs.indexOf(id) !== -1), _defineProperty(_clsx, classes.matchedInNameAndDesc, matchedNodeIDsInNameAndDescription.indexOf(id) !== -1), _defineProperty(_clsx, classes.matchedNodeIDsInProps, matchedNodeIDsInProperties.indexOf(id) !== -1 && matchedNodeIDsInNameAndDescription.indexOf(id) === -1), _defineProperty(_clsx, classes.excludeNode, matchedNodeIDs.indexOf(id) === -1), _clsx));
};

/**
 * highlight the matching string based on search query result
 */
exports.setMatchingNodeClasses = setMatchingNodeClasses;
var highlightMatchingTitle = function highlightMatchingTitle(node) {
  var matchedNodeNameQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var classes = arguments.length > 2 ? arguments[2] : undefined;
  var id = "".concat(node).trim().toLowerCase();
  /**check for exact match */
  if (matchedNodeNameQuery.toLowerCase() === id) {
    return /*#__PURE__*/_react["default"].createElement("b", {
      className: classes.highLightNode
    }, id);
  }

  //split text to highlight node title 
  var arr = id.replace(matchedNodeNameQuery, ",".concat(matchedNodeNameQuery, ",")).split(",");
  var highlightTitle = arr.map(function (text) {
    if (text.toLowerCase() === matchedNodeNameQuery.toLowerCase()) {
      return /*#__PURE__*/_react["default"].createElement("b", {
        className: classes.highLightNode
      }, matchedNodeNameQuery);
    }
    return /*#__PURE__*/_react["default"].createElement("span", null, text);
  });
  return highlightTitle;
};
exports.highlightMatchingTitle = highlightMatchingTitle;