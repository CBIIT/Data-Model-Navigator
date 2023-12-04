"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _reactRedux = require("react-redux");
var _highlightHelper = require("../../../Utils/highlightHelper");
var _ListComponent = _interopRequireDefault(require("./ListComponent"));
var _ButtonComponent = _interopRequireDefault(require("./ButtonComponent"));
var _key_icon = _interopRequireDefault(require("../../../../assets/key_icon.svg"));
var _dataDictionaryData = require("../../../../bento/dataDictionaryData");
require("../DataDictionaryPropertyTable.css");
var _DownloadFileTypeBtn = _interopRequireDefault(require("./DownloadFileTypeBtn"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var TableRow = function TableRow(_ref) {
  var classes = _ref.classes,
    propertyKeysList = _ref.propertyKeysList,
    requiredProperties = _ref.requiredProperties,
    onlyShowMatchedProperties = _ref.onlyShowMatchedProperties,
    matchedPropertiesSummary = _ref.matchedPropertiesSummary,
    preferredProperties = _ref.preferredProperties,
    properties = _ref.properties,
    needHighlightSearchResult = _ref.needHighlightSearchResult,
    hideIsRequired = _ref.hideIsRequired,
    openBoxHandler = _ref.openBoxHandler,
    isSearchMode = _ref.isSearchMode,
    title = _ref.title;
  var config = (0, _reactRedux.useSelector)(function (state) {
    return state.submission && state.submission.ctrlVocabConfig ? state.submission.ctrlVocabConfig : _dataDictionaryData.controlVocabConfig;
  });
  var required = function required(requiredFlag, preferredFlag) {
    return /*#__PURE__*/_react["default"].createElement("span", {
      className: requiredFlag ? classes.required : ""
    }, requiredFlag ? "Required" : preferredFlag ? "Preferred" : "Optional");
  };
  var displayKeyProperty = function displayKeyProperty(propertyFragment) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: classes.keyProperty
    }, propertyFragment, /*#__PURE__*/_react["default"].createElement("img", {
      src: _key_icon["default"],
      className: classes.keyPropertyIcon,
      alt: "key-icon"
    }));
  };
  var displayKeyPropsDescription = function displayKeyPropsDescription(description) {
    var lines = description.split("<br>");
    return /*#__PURE__*/_react["default"].createElement("div", null, lines.map(function (line) {
      return /*#__PURE__*/_react["default"].createElement("span", null, line);
    }));
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, propertyKeysList.map(function (propertyKey) {
    var property = properties[propertyKey];
    var nameMatch = null;
    var descriptionMatch = null;
    var typeMatchList = null;
    if (needHighlightSearchResult && matchedPropertiesSummary.length > 0) {
      var matchedSummaryItem = matchedPropertiesSummary.find(function (item) {
        return item.propertyKey === propertyKey;
      });
      if (matchedSummaryItem) {
        nameMatch = matchedSummaryItem.nameMatch;
        descriptionMatch = matchedSummaryItem.descriptionMatch;
        typeMatchList = matchedSummaryItem.typeMatchList;
      } else if (onlyShowMatchedProperties) {
        return null;
      }
    }
    var termID = "";
    var termLink = "";
    var type = "";
    var enums = "";
    var key = false;
    if ("src" in property) {
      try {
        termID = property.src;
        termLink = property.term.termDef && property.term.termDef.term_url;
      } catch (err) {}
    }
    var propertyNameFragment = (0, _highlightHelper.getPropertyNameFragment)(propertyKey, nameMatch, "data-dictionary-property-table__span");
    if ("type" in property) {
      try {
        type = property.type;
      } catch (err) {}
    }
    if ("enum" in property) {
      enums = property["enum"];
    }
    if ("key" in property) {
      key = property.key;
    }
    var propertyDescriptionFragment = (0, _highlightHelper.getPropertyDescriptionFragment)(property, descriptionMatch, "data-dictionary-property-table__span");
    var propertyTypeFragment = (0, _highlightHelper.getPropertyTypeFragment)(property, typeMatchList, "data-dictionary-property-table__span");
    var isRequired = requiredProperties.includes(propertyKey);
    var isPreferred = preferredProperties.includes(propertyKey);
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: propertyKey,
      className: classes.row
    }, /*#__PURE__*/_react["default"].createElement("td", {
      className: classes.rowItem
    }, key ? displayKeyProperty(propertyNameFragment) : propertyNameFragment), /*#__PURE__*/_react["default"].createElement("td", {
      className: classes.rowItem
    }, enums ? /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("p", {
      className: classes.acceptValue
    }, "Acceptable Values:"), " ", enums.length > config.maxNoOfItems ? /*#__PURE__*/_react["default"].createElement(_ListComponent["default"], {
      items: enums.slice(0, config.maxNoOfItems),
      isSearchMode: isSearchMode,
      typeMatchList: typeMatchList,
      property: property
    }) : /*#__PURE__*/_react["default"].createElement(_ListComponent["default"], {
      items: enums,
      isSearchMode: isSearchMode,
      typeMatchList: typeMatchList,
      property: property
    })), enums.length > config.maxNoOfItems && /*#__PURE__*/_react["default"].createElement(_ButtonComponent["default"], {
      label: "...show more",
      openHandler: function openHandler() {
        return openBoxHandler(enums, typeMatchList, propertyKey);
      }
    }), /*#__PURE__*/_react["default"].createElement(_DownloadFileTypeBtn["default"], {
      data: enums,
      node: title,
      propertyKey: propertyKey
    })) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, isSearchMode ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, propertyTypeFragment) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, JSON.stringify(type)))), !hideIsRequired && /*#__PURE__*/_react["default"].createElement("td", {
      className: classes.rowItem
    }, required(isRequired, isPreferred)), /*#__PURE__*/_react["default"].createElement("td", {
      className: classes.rowItem
    }, key && !isSearchMode ? /*#__PURE__*/_react["default"].createElement("div", {
      className: classes.description
    }, displayKeyPropsDescription(property.description), property.labeled && /*#__PURE__*/_react["default"].createElement("div", {
      className: classes.labeled
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: classes.labeledSpan
    }, "DISPLAYED AS:"), " ", property.labeled)) : /*#__PURE__*/_react["default"].createElement("div", null, propertyDescriptionFragment, property.labeled && /*#__PURE__*/_react["default"].createElement("div", {
      className: classes.labeled
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: classes.labeledSpan
    }, "DISPLAYED AS:"), " ", property.labeled))), /*#__PURE__*/_react["default"].createElement("td", {
      className: classes.rowItem
    }, /*#__PURE__*/_react["default"].createElement("p", null, JSON.stringify(termID))));
  }));
};
var styles = function styles() {
  return {
    rowItem: {
      padding: "10px 10px 10px 19px",
      "& p": {
        margin: "auto"
      },
      "&:nth-child(2)": {
        maxWidth: "300px",
        minWidth: "100px",
        wordWrap: "break-word"
      },
      "& span": {
        "&:last-child:not(:first-child)": {
          display: "block",
          marginTop: "13px"
        }
      }
    },
    labeledSpan: {
      fontWeight: "600"
    },
    labeled: {
      marginTop: "2em"
    },
    row: {
      padding: "10px 10px 10px 19px",
      border: "0",
      textAlign: "left",
      fontFamily: "raleway",
      verticalAlign: "top",
      "& p": {
        margin: "auto"
      },
      "&:nth-child(2) > p": {
        maxWidth: "300px",
        minWidth: "100px",
        wordWrap: "break-word"
      },
      "&:nth-child(odd)": {
        background: "#fff"
      },
      "&:nth-child(even)": {
        background: "#f4f5f5"
      }
    },
    required: {
      color: "#ff5a20",
      fontSize: "13px",
      fontWeight: "900"
    },
    keyProperty: {
      display: "inline-block",
      minWidth: "220px",
      fontWeight: "700",
      color: "#0d71a3",
      "& p": {
        "float": "left",
        margin: "auto"
      }
    },
    acceptValue: {
      margin: "0",
      minWidth: "130px"
    },
    keyPropertyIcon: {
      width: "25px",
      marginLeft: "8px",
      paddingTop: "5px"
    },
    description: {
      "& span": {
        "&:last-child:not(:first-child)": {
          display: "block",
          marginTop: "13px"
        }
      }
    }
  };
};
var _default = (0, _core.withStyles)(styles)(TableRow);
exports["default"] = _default;