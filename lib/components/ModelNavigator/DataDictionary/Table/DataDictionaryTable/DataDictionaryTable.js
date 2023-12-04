"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.category2NodeList = category2NodeList;
exports["default"] = void 0;
exports.sortByCategory = sortByCategory;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _core = require("@material-ui/core");
require("./DataDictionaryTable.css");
var _utils = require("../../Utils/utils");
var _utils2 = require("../../utils");
var _DataDictionaryCategory = _interopRequireDefault(require("../DataDictionaryCategory"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable react/forbid-prop-types */

// const pdfDownloadConfig = {
//   type: 'document',
//   prefix: 'ICDC_Data_Model ',
//   landscape: true,
// };

/**
 * Just exported for testing
 * Little helper that extacts a mapping of category-name to
 * the list of nodes in that category given a dictionary definition object
 *
 * @param {Object} dictionary
 * @return {} mapping from category to node list
 */
/* eslint-disable no-param-reassign */
function category2NodeList(dictionary) {
  var res = Object.keys(dictionary).filter(function (id) {
    return id.charAt(0) !== '_' && id === dictionary[id].id;
  }).map(function (id) {
    return dictionary[id];
  }).filter(function (node) {
    return node.category && node.id;
  }).reduce(function (lookup, node) {
    if (!lookup[node.category]) {
      lookup[node.category] = [];
    }
    lookup[node.category].push(node);
    return lookup;
  }, {});
  return res;
}

/** cluster props according to the category for PDF download */
function sortByCategory(c2nl, dictionary) {
  var keys = Object.keys(c2nl);
  return Object.values(dictionary).sort(function (a, b) {
    return keys.indexOf("".concat(a.category)) - keys.indexOf("".concat(b.category));
  });
}

/* eslint-enable no-param-reassign */

var getNodePropertyCount = function getNodePropertyCount(dictionary) {
  var res = (0, _utils.parseDictionaryNodes)(dictionary).reduce(function (acc, node) {
    acc.nodesCount += 1;
    acc.propertiesCount += Object.keys(node.properties).length;
    return acc;
  }, {
    nodesCount: 0,
    propertiesCount: 0
  });
  return {
    nodesCount: res.nodesCount,
    propertiesCount: res.propertiesCount
  };
};

/**
 * Little components presents an overview of the types in a dictionary organized by category
 *
 * @param {dictionary} params
 */
var DataDictionaryTable = function DataDictionaryTable(_ref) {
  var classes = _ref.classes,
    dictionary = _ref.dictionary,
    highlightingNodeID = _ref.highlightingNodeID,
    onExpandNode = _ref.onExpandNode,
    dictionaryName = _ref.dictionaryName,
    pdfDownloadConfig = _ref.pdfDownloadConfig;
  var c2nl = category2NodeList(dictionary);
  var _getNodePropertyCount = getNodePropertyCount(dictionary),
    nodesCount = _getNodePropertyCount.nodesCount,
    propertiesCount = _getNodePropertyCount.propertiesCount;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("p", {
    className: classes.tableInfo
  }, /*#__PURE__*/_react["default"].createElement("span", null, dictionaryName), /*#__PURE__*/_react["default"].createElement("span", null, " dictionary has "), /*#__PURE__*/_react["default"].createElement("span", null, nodesCount), /*#__PURE__*/_react["default"].createElement("span", null, " nodes and "), /*#__PURE__*/_react["default"].createElement("span", null, propertiesCount), /*#__PURE__*/_react["default"].createElement("span", null, " properties ")), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.tableBody
  }, Object.keys(c2nl).map(function (category) {
    return /*#__PURE__*/_react["default"].createElement(_DataDictionaryCategory["default"], {
      key: category,
      nodes: c2nl[category],
      category: category,
      highlightingNodeID: highlightingNodeID,
      onExpandNode: onExpandNode,
      pdfDownloadConfig: pdfDownloadConfig
    });
  })));
};
DataDictionaryTable.propTypes = {
  dictionary: _propTypes["default"].object,
  highlightingNodeID: _propTypes["default"].string,
  onExpandNode: _propTypes["default"].func,
  dictionaryName: _propTypes["default"].string
};
DataDictionaryTable.defaultProps = {
  dictionary: {},
  highlightingNodeID: null,
  onExpandNode: function onExpandNode() {},
  dictionaryName: ''
};
var styles = function styles() {
  return {
    tableBody: {},
    tableInfo: {
      marginTop: '0',
      marginBottom: '0',
      marginLeft: '15px',
      color: '#32495A',
      fontFamily: 'Lato',
      fontSize: '14px',
      letterSpacing: '0',
      lineHeight: '26.06px'
    }
  };
};
var _default = exports["default"] = (0, _core.withStyles)(styles)(DataDictionaryTable);