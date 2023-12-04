"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = require("lodash");
var _renderer = require("@react-pdf/renderer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var numericAttrs = ['height', 'width', 'rx', 'y', 'cx', 'cy', 'ry'];
var getSvgAttributes = function getSvgAttributes(node) {
  var objects = {};
  Array.from(node.attributes).forEach(function (attr) {
    /** prevent svg transformation */
    if (attr.nodeName !== 'transform') {
      if (numericAttrs.includes(attr.nodeName)) {
        if (node.tagName === 'svg' && (attr.nodeName === 'height' || attr.nodeName === 'width')) {
          objects["".concat(attr.nodeName)] = (0, _lodash.parseInt)(30, 10);
        } else {
          objects["".concat(attr.nodeName)] = (0, _lodash.parseInt)(attr.nodeValue, 10);
        }
      } else {
        objects["".concat(attr.nodeName)] = attr.nodeValue;
      }
    }
  });
  return objects;
};
var renderSvgElement = function renderSvgElement(node) {
  var Component = null;
  var componentProps = getSvgAttributes(node);
  switch (node.tagName) {
    case 'svg':
      Component = _renderer.Svg;
      break;
    case 'g':
      Component = _renderer.G;
      break;
    case 'circle':
      Component = _renderer.Circle;
      break;
    case 'path':
      Component = _renderer.Path;
      break;
    case 'rect':
      Component = _renderer.Rect;
      break;
    case 'polygon':
      Component = _renderer.Polygon;
      break;
    case 'ellipse':
      Component = _renderer.Ellipse;
      break;
    default:
      Component = _renderer.G;
      break;
  }
  if (node.children) {
    return /*#__PURE__*/_react["default"].createElement(Component, componentProps, Array.from(node.children).map(renderSvgElement));
  }
  return /*#__PURE__*/_react["default"].createElement(Component, componentProps);
};
var _default = renderSvgElement;
exports["default"] = _default;