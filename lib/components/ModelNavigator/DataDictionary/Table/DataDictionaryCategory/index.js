"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _core = require("@material-ui/core");
var _helper = require("../../NodeCategories/helper");
var _utils = require("../../utils");
var _DataDictionaryNode = _interopRequireDefault(require("../DataDictionaryNode"));
var _DataDictionaryCategory = _interopRequireDefault(require("./DataDictionaryCategory.style"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable react/prefer-stateless-function */

var DataDictionaryCategory = function DataDictionaryCategory(_ref) {
  var classes = _ref.classes,
    category = _ref.category,
    highlightingNodeID = _ref.highlightingNodeID,
    pdfDownloadConfig = _ref.pdfDownloadConfig,
    onExpandNode = _ref.onExpandNode,
    nodes = _ref.nodes,
    assetConfig = _ref.assetConfig;
  var categoryStyles = (0, _helper.getCategoryStyle)(category);
  var categoryColor = categoryStyles.color;
  var background = categoryStyles.background ? categoryStyles.background : categoryStyles.color;
  var iconURL = _helper.tableNodeCategoryList[category] ? _helper.tableNodeCategoryList[category].icon : _helper.defaultCategory.icon;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      borderLeftColor: categoryColor,
      minHeight: '44px',
      background: background,
      display: 'flex',
      alignItems: 'center',
      color: "#ffffff",
      paddingLeft: '20px',
      gap: '8px'
    }
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: iconURL,
    alt: "icon",
    style: {
      width: '32px'
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.title
  }, /*#__PURE__*/_react["default"].createElement("span", null, (0, _utils.capitalizeFirstLetter)(category), " "))), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      borderLeftColor: categoryColor
    }
  }), nodes.map(function (node) {
    return /*#__PURE__*/_react["default"].createElement(_DataDictionaryNode["default"], {
      node: node,
      key: node.id,
      description: node.description,
      pdfDownloadConfig: pdfDownloadConfig,
      expanded: highlightingNodeID && highlightingNodeID.includes(node.id),
      onExpandNode: onExpandNode
    });
  }));
};
DataDictionaryCategory.propTypes = {
  category: _propTypes["default"].string.isRequired,
  nodes: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    id: _propTypes["default"].string.isRequired,
    description: _propTypes["default"].string
  })).isRequired,
  highlightingNodeID: _propTypes["default"].string,
  onExpandNode: _propTypes["default"].func
};
DataDictionaryCategory.defaultProps = {
  highlightingNodeID: null,
  onExpandNode: function onExpandNode() {}
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    assetConfig: state.ddgraph.assetConfig
  };
};
var _default = exports["default"] = (0, _core.withStyles)(_DataDictionaryCategory["default"])((0, _reactRedux.connect)(mapStateToProps, {})(DataDictionaryCategory));