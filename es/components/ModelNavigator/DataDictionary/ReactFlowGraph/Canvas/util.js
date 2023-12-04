"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMatchingNodeTitle = exports.nodeColor = exports.getMinZoom = exports.getDistinctCategoryItems = exports.getCategoryIconUrl = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _underscore = _interopRequireDefault(require("underscore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var nodeColor = exports.nodeColor = function nodeColor(node) {
  switch (node.category) {
    case 'administrative':
      return '#9B2D20';
    case 'study':
      return '#9875FF';
    case 'case':
      return '#FF7F15';
    case 'clinical_trial':
      return '#00A1BB';
    case 'biospecimen':
      return '#00785A';
    case 'analysis':
      return '#B533A9';
    case 'data_file':
      return '#00AD0E';
    case 'clinical':
      return '#1C75BC';
    default:
      return '#ff0072';
  }
};

/**
 * Get a set of types from an array of nodes
 * @param {Node[]} nodes
 * @returns {string[]} array of type names(duplicating names removed) of given nodes
 */
var getDistinctCategoryItems = exports.getDistinctCategoryItems = function getDistinctCategoryItems(nodes) {
  return _underscore["default"].uniq(nodes.map(function (node) {
    return node.category;
  }));
};

/**
* Get a set of types from an array of nodes
* @param {categories[]} categories
* @returns {string[]} array of type names(duplicating names removed) of given nodes
*/
var getCategoryIconUrl = exports.getCategoryIconUrl = function getCategoryIconUrl(categories, url) {
  var urls = {};
  categories.forEach(function (category) {
    urls[category] = "".concat(url, "graph/").concat(category, ".svg");
  });
  return urls;
};

/**
 * Active Search Mode 
 * set node title for matching query 
 */
var setMatchingNodeTitle = exports.setMatchingNodeTitle = function setMatchingNodeTitle() {
  var searchResult = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var matchedNodeNameIndices = {};
  searchResult.forEach(function (item) {
    item.matches.forEach(function (matchItem) {
      var value = matchItem.value,
        key = matchItem.key;
      if (key === 'title') {
        matchedNodeNameIndices[value] = matchItem.indices;
      }
    });
  });
  return matchedNodeNameIndices;
};

/**
 * set zoom based on width
 */
var getMinZoom = exports.getMinZoom = function getMinZoom(_ref) {
  var width = _ref.width,
    minZoom = _ref.minZoom;
  return width > 1450 ? 0.75 : minZoom;
};