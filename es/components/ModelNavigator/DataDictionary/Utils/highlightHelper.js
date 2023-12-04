"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertyTypeFragment = exports.getPropertyNameFragment = exports.getPropertyDescriptionFragment = exports.getNodeTitleSVGFragment = exports.getNodeTitleFragment = exports.getNodeDescriptionFragment = exports.getMatchesSummaryForProperties = exports.getMatchInsideProperty = exports.addHighlightingSpans = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var theme = {
  overrides: {
    MuiList: {
      padding: {
        paddingTop: '2px'
      }
    },
    MuiListItem: {
      root: {
        paddingLeft: '0px',
        paddingTop: '2px',
        marginTop: '-10px',
        paddingBottom: '0',
        alignItems: 'inherit',
        fontWeight: '300',
        wordBreak: 'break-all'
      },
      gutters: {
        paddingLeft: '0px !important',
        paddingRight: '0px',
        wordBreak: 'break-all'
      }
    },
    MuiListItemText: {
      root: {
        padding: '4px',
        marginTop: '0px',
        marginBottom: '0px'
      }
    }
  }
};
var escapeReturnChar = function escapeReturnChar(str, newlineClassName) {
  if (!str) return str;
  var pieces = str.split('\\n');
  if (pieces.length <= 1) return str;
  return pieces.map(function (piece, i) {
    return /*#__PURE__*/_react["default"].createElement("span", {
      key: "span-".concat(i),
      className: i === 0 || i === pieces.length ? '' : newlineClassName
    }, piece);
  });
};
var displayKeyPropsDescription = function displayKeyPropsDescription(description) {
  var lines = description.split('<br>');
  if (lines.length > 1) {
    return lines.map(function (line) {
      return /*#__PURE__*/_react["default"].createElement("span", null, line);
    });
  }
  return description;
};
var addHighlightingSpans = function addHighlightingSpans(str, indices, spanClassName) {
  var cursor = 0;
  var currentIndices = 0;
  var resultFragments = [];
  var highlightSpanClassName = "".concat(spanClassName, "--highlight");
  var newlineClassName = "".concat(spanClassName, "--new-line");
  while (currentIndices < indices.length) {
    if (cursor < indices[currentIndices][0]) {
      resultFragments.push( /*#__PURE__*/_react["default"].createElement("div", {
        key: cursor,
        className: spanClassName
      }, escapeReturnChar(str.substring(cursor, indices[currentIndices][0]), newlineClassName)));
    }
    resultFragments.push( /*#__PURE__*/_react["default"].createElement("div", {
      key: indices[currentIndices][0],
      className: "".concat(spanClassName, " ").concat(highlightSpanClassName)
    }, escapeReturnChar(str.substring(indices[currentIndices][0], indices[currentIndices][1] + 1), newlineClassName)));
    cursor = indices[currentIndices][1] + 1;
    currentIndices += 1;
  }
  if (cursor < str.length) {
    resultFragments.push( /*#__PURE__*/_react["default"].createElement("div", {
      key: cursor,
      className: spanClassName
    }, displayKeyPropsDescription(escapeReturnChar(str.substring(cursor), newlineClassName))));
  }
  return resultFragments;
};
exports.addHighlightingSpans = addHighlightingSpans;
var getPropertyNameFragment = function getPropertyNameFragment(propertyName, matchedItem, spanClassName) {
  var propertyNameFragment = addHighlightingSpans(propertyName, matchedItem ? matchedItem.indices : [], spanClassName);
  return propertyNameFragment;
};
exports.getPropertyNameFragment = getPropertyNameFragment;
var getPropertyTypeFragment = function getPropertyTypeFragment(property, typeMatchList, spanClassName) {
  var type = (0, _utils.getType)(property);
  var propertyTypeFragment;
  if (typeof type === 'string') {
    propertyTypeFragment = /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, addHighlightingSpans(type, typeMatchList && typeMatchList[0] ? typeMatchList[0].indices : [], spanClassName));
  }
  if (Array.isArray(type)) {
    propertyTypeFragment = type.map(function (t, i) {
      var matchedTypeItem = typeMatchList && typeMatchList.find(function (matchItem) {
        return matchItem.value === t;
      });
      if (matchedTypeItem) {
        return /*#__PURE__*/_react["default"].createElement(_core.MuiThemeProvider, {
          theme: (0, _core.createTheme)(theme)
        }, /*#__PURE__*/_react["default"].createElement(_core.List, null, /*#__PURE__*/_react["default"].createElement(_core.ListItem, {
          key: i
        }, addHighlightingSpans(t, matchedTypeItem.indices, spanClassName))));
      }
      return /*#__PURE__*/_react["default"].createElement(_core.MuiThemeProvider, {
        theme: (0, _core.createTheme)(theme)
      }, /*#__PURE__*/_react["default"].createElement(_core.List, null, /*#__PURE__*/_react["default"].createElement(_core.ListItem, {
        key: i
      }, addHighlightingSpans(t, [], spanClassName))));
    });
  }
  return propertyTypeFragment;
};
exports.getPropertyTypeFragment = getPropertyTypeFragment;
var getPropertyDescriptionFragment = function getPropertyDescriptionFragment(property, matchedItem, spanClassName) {
  var descriptionStr = (0, _utils.getPropertyDescription)(property);
  if (!descriptionStr) descriptionStr = 'No Description';
  var propertyDescriptionFragment = addHighlightingSpans(descriptionStr, matchedItem ? matchedItem.indices : [], spanClassName);
  return propertyDescriptionFragment;
};
exports.getPropertyDescriptionFragment = getPropertyDescriptionFragment;
var getNodeTitleFragment = function getNodeTitleFragment(allMatches, title, spanClassName) {
  var matchedItem = allMatches.find(function (item) {
    return item.key === 'title';
  });
  var nodeTitleFragment = addHighlightingSpans(title, matchedItem ? matchedItem.indices : [], spanClassName);
  return nodeTitleFragment;
};
exports.getNodeTitleFragment = getNodeTitleFragment;
var getNodeDescriptionFragment = function getNodeDescriptionFragment(allMatches, description, spanClassName) {
  var matchedItem = allMatches.find(function (item) {
    return item.key === 'description';
  });
  var nodeDescriptionFragment = addHighlightingSpans(description, matchedItem ? matchedItem.indices : [], spanClassName);
  return nodeDescriptionFragment;
};
exports.getNodeDescriptionFragment = getNodeDescriptionFragment;
var getMatchInsideProperty = function getMatchInsideProperty(propertyIndex, propertyKey, property, allMatches) {
  var nameMatch = null;
  var descriptionMatch = null;
  var typeMatchList = [];
  if (allMatches) {
    allMatches.forEach(function (item) {
      if (item.key === 'properties.name' && item.value === propertyKey) {
        nameMatch = item;
      } else if (item.key === 'properties.description') {
        var descriptionStr = "".concat((0, _utils.getPropertyDescription)(property)).toLowerCase();
        var splitText = descriptionStr ? descriptionStr.split('<br>')[0] : descriptionStr;
        if (item.value === splitText) {
          descriptionMatch = item;
        }
      } else if (item.key === 'properties.type') {
        var type = (0, _utils.getType)(property);
        if (typeof type === 'string') {
          if (type === item.value) {
            typeMatchList.push(item);
          }
        } else if (Array.isArray(type)) {
          for (var a = 0; a < type.length; a++) {
            if (type[a] === item.value) {
              // TODO: WAS ++
              typeMatchList.push(item);
            }
          }
        }
      }
    });
  }
  return {
    nameMatch: nameMatch,
    descriptionMatch: descriptionMatch,
    typeMatchList: typeMatchList
  };
};
exports.getMatchInsideProperty = getMatchInsideProperty;
var getMatchesSummaryForProperties = function getMatchesSummaryForProperties(allProperties, allMatches) {
  var matchedPropertiesSummary = [];
  Object.keys(allProperties).forEach(function (propertyKey, propertyIndex) {
    var property = allProperties[propertyKey];
    var _getMatchInsideProper = getMatchInsideProperty(propertyIndex, propertyKey, property, allMatches),
      nameMatch = _getMatchInsideProper.nameMatch,
      descriptionMatch = _getMatchInsideProper.descriptionMatch,
      typeMatchList = _getMatchInsideProper.typeMatchList;
    var summaryItem = {
      propertyKey: propertyKey,
      property: property,
      nameMatch: nameMatch,
      descriptionMatch: descriptionMatch,
      typeMatchList: typeMatchList
    };
    if (nameMatch || descriptionMatch || typeMatchList.length > 0) {
      matchedPropertiesSummary.push(summaryItem);
    }
  });
  return matchedPropertiesSummary;
};
exports.getMatchesSummaryForProperties = getMatchesSummaryForProperties;
var getNodeTitleSVGFragment = function getNodeTitleSVGFragment(nodeNames, matchedNodeNameIndices, fontSize, textPadding, textLineGap) {
  var nodeTitleFragment = [];
  var currentRowIndex = 0;
  var rowStartIndex = 0;
  var rowEndIndex;
  var nodeNameRows = nodeNames;
  var currentHighlightIndex = 0;
  var textAttrBase = {
    x: 0,
    textAnchor: 'middle',
    alignmentBaseline: 'baseline',
    fontSize: fontSize,
    className: 'graph-node__text'
  };
  var tspanAttrBase = {
    textAnchor: 'middle',
    alignmentBaseline: 'baseline',
    fontSize: fontSize
  };
  var tspanAttr = _objectSpread(_objectSpread({}, tspanAttrBase), {}, {
    className: 'graph-node__tspan'
  });
  var tspanHighlightAttr = _objectSpread(_objectSpread({}, tspanAttrBase), {}, {
    className: 'graph-node__tspan graph-node__tspan--highlight'
  });
  while (currentRowIndex < nodeNameRows.length) {
    // for each row
    var currentRowStr = nodeNameRows[currentRowIndex];
    rowEndIndex = rowStartIndex + currentRowStr.length;
    var textY = textPadding + currentRowIndex * (fontSize + textLineGap);
    var textAttr = _objectSpread(_objectSpread({}, textAttrBase), {}, {
      key: currentRowIndex,
      y: textY + 10
    });
    var cursorInRow = 0;
    var currentRowFragment = [];

    // Go over all highlighted text in current row
    var index = 0;
    while (currentHighlightIndex < matchedNodeNameIndices.length) {
      var highlightStartIndex = matchedNodeNameIndices[currentHighlightIndex][0];
      var highlightEndIndex = matchedNodeNameIndices[currentHighlightIndex][1] + 1;
      if (highlightStartIndex > rowEndIndex) {
        currentRowFragment.push( /*#__PURE__*/_react["default"].createElement("tspan", _extends({
          key: cursorInRow
        }, tspanAttr), currentRowStr.substring(cursorInRow)));
        cursorInRow = currentRowStr.length;
        break;
      }
      var highlightStartIndexInRow = highlightStartIndex - rowStartIndex;
      var highlightEndIndexInRow = highlightEndIndex;
      if (cursorInRow < highlightStartIndexInRow) {
        currentRowFragment.push( /*#__PURE__*/_react["default"].createElement("tspan", _extends({
          key: cursorInRow
        }, tspanAttr), currentRowStr.substring(cursorInRow, highlightStartIndexInRow)));
        cursorInRow = highlightStartIndexInRow;
      }
      if (highlightEndIndex <= rowEndIndex) {
        currentRowFragment.push( /*#__PURE__*/_react["default"].createElement("tspan", _extends({
          key: cursorInRow
        }, tspanHighlightAttr), currentRowStr.substring(cursorInRow, highlightEndIndexInRow)));
        cursorInRow = highlightEndIndexInRow;
        currentHighlightIndex += 1;
      } else {
        currentRowFragment.push( /*#__PURE__*/_react["default"].createElement("tspan", _extends({
          key: cursorInRow
        }, tspanHighlightAttr), currentRowStr.substring(cursorInRow)));
        cursorInRow = currentRowStr.lenght;
        break;
      }
    }

    // Check text in the current row are all added to the list
    if (cursorInRow < currentRowStr.length) {
      currentRowFragment.push( /*#__PURE__*/_react["default"].createElement("tspan", _extends({
        key: cursorInRow
      }, tspanAttr), currentRowStr.substring(cursorInRow)));
    }

    // Add all fragment of current line to the node title fragment list
    nodeTitleFragment.push( /*#__PURE__*/_react["default"].createElement("text", textAttr, currentRowFragment));
    currentRowIndex += 1;
    rowStartIndex += currentRowStr.length + 1;
  } // end of while, go to the next row
  return nodeTitleFragment;
};
exports.getNodeTitleSVGFragment = getNodeTitleSVGFragment;