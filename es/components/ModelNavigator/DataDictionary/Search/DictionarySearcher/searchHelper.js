"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchKeyword = exports.prepareSearchData = exports.getSearchSummary = exports.formatText = exports.filterMatches = exports.ZERO_RESULT_FOUND_MSG = exports.ERR_KEYWORD_TOO_SHORT = exports.ERR_KEYWORD_TOO_LONG = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _fuse = _interopRequireDefault(require("fuse.js"));
var _utils = require("../../Utils/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ZERO_RESULT_FOUND_MSG = exports.ZERO_RESULT_FOUND_MSG = '0 results found. Please try another keyword.';

/**
 * Prepare search items for Fuse.io library
 * @params [Object] dictionary
 * @returns [Object] search data
 */
var formatText = exports.formatText = function formatText(text) {
  return "".concat(text).toLowerCase();
};
var prepareSearchData = exports.prepareSearchData = function prepareSearchData(dictionary) {
  var searchData = (0, _utils.parseDictionaryNodes)(dictionary).map(function (node) {
    var properties = Object.keys(node.properties).map(function (propertyKey) {
      var type = (0, _utils.getType)(node.properties[propertyKey]);
      if (type === 'UNDEFINED') type = undefined;
      var propertyDescription = (0, _utils.getPropertyDescription)(node.properties[propertyKey]);
      var splitText = propertyDescription ? propertyDescription.split('<br>')[0] : propertyDescription;
      return {
        name: formatText(propertyKey),
        description: formatText(splitText),
        type: type
      };
    });
    return {
      id: node.id,
      title: formatText(node.title),
      description: formatText(node.description),
      properties: properties
    };
  });
  return searchData;
};
var ERR_KEYWORD_TOO_SHORT = exports.ERR_KEYWORD_TOO_SHORT = 'Keyword too short, try longer keyword.';
var ERR_KEYWORD_TOO_LONG = exports.ERR_KEYWORD_TOO_LONG = 'Keyword too long (more than 32).';
var filterMatches = exports.filterMatches = function filterMatches(results, keyword) {
  if (results && results.length > 0) {
    results.forEach(function (item) {
      var matches = item.matches;
      if (matches.length > 0) {
        matches.forEach(function (match) {
          var highlightIndices = [];
          var indices = match.indices,
            value = match.value;
          if (match.indices.length > 0) {
            indices.forEach(function (indice, index) {
              if (match.key !== 'title') {
                var text = value.slice(indice[0], indice[1] + 1);
                if ("".concat(text).toLowerCase().includes(keyword.toLowerCase())) {
                  var initIndex = "".concat(text).indexOf(keyword, 0);
                  var diff = indice[1] - indice[0];
                  if (diff >= keyword.length) {
                    indice[0] += initIndex;
                    indice[1] = indice[0] + keyword.length - 1;
                  }
                  highlightIndices.push(indice);
                }
              }
            });
            if (highlightIndices.length > 0) {
              match.indices = _lodash["default"].cloneDeep(highlightIndices);
            }
          }
        });
      }
    });
  }
};

/**
 * Call Fuse search and returns search result
 * @params [Object] searchData - see prepareSearchData returns
 * @params [string] keyword
 * @returns [SearchResultItemShape[]] (see ../../utils).
 */
var searchKeyword = exports.searchKeyword = function searchKeyword(searchData, keyword) {
  if (!keyword || keyword.length < 2) {
    return {
      result: [],
      errorMsg: ERR_KEYWORD_TOO_SHORT
    };
  }
  // 32 is length limitation of Fuse search library
  if (keyword.length > 32) {
    return {
      result: [],
      errorMsg: ERR_KEYWORD_TOO_LONG
    };
  }
  var halfLength = Math.round(keyword.length / 2);
  var minMatchCharLength = Math.min(Math.max(halfLength, 10), keyword.length);
  var options = {
    keys: ['title', 'description', 'properties.name', 'properties.description', 'properties.type'],
    includeMatches: true,
    threshold: 0,
    shouldSort: true,
    includeScore: true,
    minMatchCharLength: minMatchCharLength,
    ignoreLocation: true
  };
  var handler = new _fuse["default"](searchData, options);
  var result = handler.search(keyword).map(function (resItem) {
    // A bug in Fuse sometimes returns wrong indices that end < start
    var matches = resItem.matches.filter(function (matchItem) {
      return matchItem.indices[0][1] >= matchItem.indices[0][0];
    });
    return _objectSpread(_objectSpread({}, resItem), {}, {
      matches: matches
    });
  }).map(function (resItem) {
    // filter out matches that is too shorter than keyword
    var matches = resItem.matches.filter(function (matchItem) {
      var matchLen = matchItem.indices[0][1] - matchItem.indices[0][0] + 1;
      return matchLen >= halfLength;
    });
    return _objectSpread(_objectSpread({}, resItem), {}, {
      matches: matches
    });
  }).filter(function (resItem) {
    return resItem.matches.length > 0;
  });
  var errorMsg = result && result.length > 0 ? '' : ZERO_RESULT_FOUND_MSG;
  filterMatches(result, keyword);
  return {
    result: result,
    errorMsg: errorMsg
  };
};

/**
 * Prepare search items for Fuse.io library, call Fuse constructor
 * and return a search instance handler.
 * @params [SearchResultItemShape[]] search result (SearchResultItemShape from '../../utils')
 * @returns [Object] summary
 */
var getSearchSummary = exports.getSearchSummary = function getSearchSummary(result) {
  var matchedNodeIDsInNameAndDescription = [];
  var matchedNodeIDsInProperties = [];
  var generalMatchedNodeIDs = [];
  var matchedPropertiesCount = 0;
  var matchedNodeNameAndDescriptionsCount = 0;
  result.forEach(function (resItem) {
    var nodeID = resItem.item.id;
    resItem.matches.forEach(function (matchedItem) {
      switch (matchedItem.key) {
        case 'properties.type':
        case 'properties.name':
        case 'properties.description':
          matchedPropertiesCount += matchedItem.indices && matchedItem.indices.length;
          if (!matchedNodeIDsInProperties.includes(nodeID)) {
            matchedNodeIDsInProperties.push(nodeID);
          }
          if (!generalMatchedNodeIDs.includes(nodeID)) {
            generalMatchedNodeIDs.push(nodeID);
          }
          break;
        case 'title':
        case 'description':
          matchedNodeNameAndDescriptionsCount += matchedItem.indices && matchedItem.indices.length;
          if (!matchedNodeIDsInNameAndDescription.includes(nodeID)) {
            matchedNodeIDsInNameAndDescription.push(nodeID);
          }
          if (!generalMatchedNodeIDs.includes(nodeID)) {
            generalMatchedNodeIDs.push(nodeID);
          }
          break;
        default:
          break;
      }
    });
  });
  return {
    matchedPropertiesCount: matchedPropertiesCount,
    matchedNodeNameAndDescriptionsCount: matchedNodeNameAndDescriptionsCount,
    matchedNodeIDsInNameAndDescription: matchedNodeIDsInNameAndDescription,
    matchedNodeIDsInProperties: matchedNodeIDsInProperties,
    generalMatchedNodeIDs: generalMatchedNodeIDs
  };
};