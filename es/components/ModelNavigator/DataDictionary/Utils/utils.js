"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.truncateLines = exports.parseDictionaryNodes = exports.onViewChange = exports.onCnavasWidthChange = exports.graphStyleConfig = exports.getType = exports.getSearchHistoryItems = exports.getPropertyDescription = exports.downloadTemplate = exports.downloadMultiTemplate = exports.clearSearchHistoryItems = exports.addSearchHistoryItems = exports.SearchResultItemShape = exports.SearchItemShape = exports.SearchItemPropertyShape = exports.MatchedItemShape = exports.MatchedIndicesShape = void 0;
var _fileSaver = _interopRequireDefault(require("file-saver"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jszip = _interopRequireDefault(require("jszip"));
var _util = require("../ReactFlowGraph/Canvas/util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import { dataDictionaryTemplatePath, appname } from '../localconf';

var dataDictionaryTemplatePath = 'FIXME';
var appname = 'Data Dictionary Vizualizations';
var concatTwoWords = function concatTwoWords(w1, w2) {
  if (w1.length === 0) return w2;
  if (w2.length === 0) return w1;
  return "".concat(w1, " ").concat(w2);
};
var truncateLines = exports.truncateLines = function truncateLines(str) {
  var maxCharInRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var breakwordMinLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 12;
  var wordsList = str.split(' ');
  var res = [];
  var currentLine = '';
  for (var i = 0; i < wordsList.length; i += 1) {
    // if adding a new word will make the current line too long
    if (concatTwoWords(currentLine, wordsList[i]).length > maxCharInRow) {
      // if the new word itself is too long, break it
      if (wordsList[i].length > breakwordMinLength) {
        var breakPos = maxCharInRow - currentLine.length - 1;
        if (currentLine.length > 0) breakPos -= 1; // 1 more for space
        res.push("".concat(concatTwoWords(currentLine, wordsList[i].substring(0, breakPos)), "-"));

        // break the rest of the new word if it's still too long
        while (breakPos + maxCharInRow < wordsList[i].length) {
          var nextBreakPos = breakPos + maxCharInRow - 1;
          res.push("".concat(wordsList[i].substring(breakPos, nextBreakPos), "-"));
          breakPos = nextBreakPos;
        }
        currentLine = wordsList[i].substring(breakPos);
      } else {
        // else, end current line and create a new line
        if (currentLine.length > 0) {
          // avoid adding first empty line
          res.push(currentLine);
        }
        currentLine = wordsList[i];
      }
    } else {
      // else, just add the new word to current line
      currentLine = concatTwoWords(currentLine, wordsList[i]);
    }
  }
  res.push(currentLine);
  return res;
};

/**
 * Little helper to extract the type for some dictionary node property.
 * Export just for testing.
 * @param {Object} property one of the properties of a dictionary node
 * @return {String|Array<String>} string for scalar types, array for enums
 *                   and other listish types or 'UNDEFINED' if no
 *                   type information availabale
 */
var getType = exports.getType = function getType(property) {
  var type = 'UNDEFINED';
  if ('type' in property) {
    if (typeof property.type === 'string') {
      type = property.type;
    } else {
      type = property.type;
    }
  } else if ('enum' in property) {
    type = property["enum"];
  } else if ('oneOf' in property) {
    // oneOf has nested type list - we want to flatten nested enums out here ...
    type = property.oneOf.map(function (item) {
      return getType(item);
    }).reduce(function (flatList, it) {
      if (Array.isArray(it)) {
        return flatList.concat(it);
      }
      flatList.push(it);
      return flatList;
    }, []);
  } else if ('anyOf' in property) {
    // anyOf has nested type list
    type = property.anyOf.map(function (item) {
      return getType(item);
    }).reduce(function (flatList, it) {
      if (Array.isArray(it)) {
        return flatList.concat(it);
      }
      flatList.push(it);
      return flatList;
    }, []);
  } else {
    type = 'UNDEFINED';
  }
  return type;
};
var downloadTemplate = exports.downloadTemplate = function downloadTemplate(format, nodeId) {
  if (format === 'tsv' || format === 'json') {
    var templatePath = "".concat(dataDictionaryTemplatePath).concat(nodeId, "?format=").concat(format);
    window.open(templatePath);
  }
};
var downloadMultiTemplate = exports.downloadMultiTemplate = function downloadMultiTemplate(format, nodesToDownload, allRoutes, clickingNodeName, dictionaryVersion) {
  if (format !== 'tsv' && format !== 'json') {
    return;
  }
  var zip = new _jszip["default"]();
  Promise.all(Object.keys(nodesToDownload).map(function (nodeID) {
    var fileUrl = "".concat(dataDictionaryTemplatePath).concat(nodeID, "?format=").concat(format);
    var saveAsFileName = nodesToDownload[nodeID];
    return fetch(fileUrl).then(function (response) {
      if (response.ok) {
        return response.text();
      }
      throw new Error("cannot download template for node \"".concat(nodeID, "\""));
    }).then(function (responseText) {
      zip.file(saveAsFileName, responseText);
    })["catch"](function () {
      throw new Error("cannot download template for node \"".concat(nodeID, "\""));
    });
  })).then(function () {
    var time = new Date();
    var startingNodeName = 'Project';
    var readmeContent = "The following ".concat(format.toUpperCase(), " templates were downloaded from ").concat(appname, " on ").concat(time.toLocaleDateString(), " ").concat(time.toLocaleTimeString(), ". The following are all possible paths from \"").concat(startingNodeName, "\" node to \"").concat(clickingNodeName, "\" using data dictionary version ").concat(dictionaryVersion, ". The downloaded ").concat(format.toUpperCase(), " files need to be submitted in the order shown in the chosen path(s) below:\n");
    readmeContent = readmeContent.concat(allRoutes.map(function (nodeIDsInRoute, routeIndex) {
      return "".concat(routeIndex + 1, ". ").concat(nodeIDsInRoute.join(','));
    }).join('\n'));
    zip.file('README.txt', readmeContent);
    zip.generateAsync({
      type: 'blob'
    }).then(function (content) {
      _fileSaver["default"].saveAs(content, "templates-".concat(format, ".zip"));
    });
  });
};
var graphStyleConfig = exports.graphStyleConfig = {
  nodeTextFontSize: 10,
  nodeTextLineGap: 4,
  nodeContentPadding: 20,
  nodeIconRadius: 10
};
var parseDictionaryNodes = exports.parseDictionaryNodes = function parseDictionaryNodes(dictionary) {
  return Object.keys(dictionary).filter(function (id) {
    return id.charAt(0) !== '_' && id === dictionary[id].id;
  }).map(function (id) {
    var originNode = dictionary[id];
    return originNode;
  }).filter(function (node) {
    return node.id;
  });
};
var getPropertyDescription = exports.getPropertyDescription = function getPropertyDescription(property) {
  var description;
  if ('description' in property) {
    description = property.description;
  }
  if ('term' in property) {
    description = property.term.description;
  }
  return description;
};
var searchHistoryLocalStorageKey = 'datadictionary:searchHistory';
/**
 * @typedef {Object} SearchHistoryItem
 * @property {string} keywordStr - keywordStr of this item
 * @property {integer} matchedCount - matched count for this keyword
 */

/**
 * Get search history items from localStorage
 * @returns {SearchHistoryItem[]} array of search history items
 */
var getSearchHistoryItems = exports.getSearchHistoryItems = function getSearchHistoryItems() {
  var items = JSON.parse(localStorage.getItem(searchHistoryLocalStorageKey));
  return items;
};

/**
 * Add search history item to localStorage
 * @params {SearchHistoryItem} searchHistoryItem - item to add into localStorage
 * @returns {SearchHistoryItem[]} array of new search history items
 */
var addSearchHistoryItems = exports.addSearchHistoryItems = function addSearchHistoryItems(searchHistoryItem) {
  var keywordStr = searchHistoryItem.keywordStr;
  if (!keywordStr || keywordStr.length === 0) return getSearchHistoryItems();
  var prevHistory = JSON.parse(localStorage.getItem(searchHistoryLocalStorageKey));
  var newHistory = [];
  if (prevHistory) newHistory = prevHistory.slice(0); // clone array

  // if item already exists, need to remove item before adding to the beginning
  if (prevHistory && prevHistory.find(function (item) {
    return item.keywordStr === keywordStr;
  })) {
    var index = prevHistory.findIndex(function (item) {
      return item.keywordStr === keywordStr;
    });
    newHistory = prevHistory.slice(0);
    newHistory.splice(index, 1); // remove item
  }
  newHistory.unshift(searchHistoryItem); // add to the beginning
  localStorage.setItem(searchHistoryLocalStorageKey, JSON.stringify(newHistory));
  return newHistory;
};

/**
 * Clear search history item in localStorage
 * @returns {SearchHistoryItem[]} empty array as new search history items
 */
var clearSearchHistoryItems = exports.clearSearchHistoryItems = function clearSearchHistoryItems() {
  var newHistory = [];
  localStorage.setItem(searchHistoryLocalStorageKey, JSON.stringify(newHistory));
  return newHistory;
};
var MatchedIndicesShape = exports.MatchedIndicesShape = _propTypes["default"].arrayOf(_propTypes["default"].arrayOf(_propTypes["default"].number));
var MatchedItemShape = exports.MatchedItemShape = _propTypes["default"].shape({
  indices: MatchedIndicesShape,
  arrayIndex: _propTypes["default"].number,
  key: _propTypes["default"].string,
  value: _propTypes["default"].string
});
var SearchItemPropertyShape = exports.SearchItemPropertyShape = _propTypes["default"].shape({
  name: _propTypes["default"].string,
  description: _propTypes["default"].string,
  type: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].string])
});
var SearchItemShape = exports.SearchItemShape = _propTypes["default"].shape({
  id: _propTypes["default"].string,
  title: _propTypes["default"].string,
  description: _propTypes["default"].string,
  properties: _propTypes["default"].arrayOf(SearchItemPropertyShape)
});
var SearchResultItemShape = exports.SearchResultItemShape = _propTypes["default"].shape({
  item: SearchItemShape,
  matches: _propTypes["default"].arrayOf(MatchedItemShape)
});

// reactflow graph events
var onViewChange = exports.onViewChange = function onViewChange(payload) {
  localStorage.setItem('reactflowGraphView', JSON.stringify(payload));
  return payload;
};
var onCnavasWidthChange = exports.onCnavasWidthChange = function onCnavasWidthChange(_ref) {
  var canvasWidth = _ref.canvasWidth,
    graphViewConfig = _ref.graphViewConfig;
  var updateGraphViewConfig = _.cloneDeep(graphViewConfig);
  if (updateGraphViewConfig) {
    updateGraphViewConfig.canvas.width = canvasWidth;
  }
  return updateGraphViewConfig;
};