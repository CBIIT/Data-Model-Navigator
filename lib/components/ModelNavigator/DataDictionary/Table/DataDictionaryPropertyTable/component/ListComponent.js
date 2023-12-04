"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _FiberManualRecord = _interopRequireDefault(require("@material-ui/icons/FiberManualRecord"));
var _highlightHelper = require("../../../Utils/highlightHelper");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var twoColumnsView = {
  overrides: {
    MuiList: {
      padding: {
        paddingTop: '0px'
      },
      root: {
        paddingBottom: '0',
        fontWeight: '500',
        listStyleType: 'disc',
        WebkitColumns: 2,
        MozColumns: 2,
        columns: 2
      }
    },
    MuiListItem: {
      root: {
        paddingLeft: '0px',
        paddingTop: '2px',
        marginTop: '-9px',
        paddingBottom: '0',
        alignItems: 'inherit',
        fontWeight: '300'
      },
      gutters: {
        paddingLeft: '2px',
        marginBottom: '1px'
      }
    }
  }
};
var threeColumnsView = {
  overrides: {
    MuiList: {
      root: {
        paddingBottom: '0',
        fontWeight: '500',
        listStyleType: 'disc',
        WebkitColumns: 3,
        MozColumns: 3,
        columns: 3
      },
      padding: {
        paddingTop: '0px',
        marginTop: '-10px'
      }
    },
    MuiListItemIcon: {
      root: {
        paddingLeft: '0',
        display: 'initial',
        paddingTop: '4px',
        minWidth: '10px',
        color: '#00002dd9'
      }
    },
    MuiListItem: {
      root: {
        paddingLeft: '0px',
        paddingTop: '2px',
        marginTop: '-10px',
        paddingBottom: '0',
        alignItems: 'inherit',
        fontWeight: '300'
      },
      MuiListItemText: {
        root: {
          padding: '4px',
          marginTop: '-2px',
          marginBottom: '3px'
        }
      },
      gutters: {
        margin: 'auto',
        marginBottom: '-10px',
        paddingLeft: '0px'
      }
    }
  }
};
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
        fontWeight: '300'
      },
      gutters: {
        paddingLeft: '0'
      }
    },
    MuiListItemIcon: {
      root: {
        paddingLeft: '0',
        paddingTop: '11px',
        minWidth: '10px',
        color: '#00002dd9'
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
var ListComponent = function ListComponent(_ref) {
  var classes = _ref.classes,
    items = _ref.items,
    maxNoOfItems = _ref.maxNoOfItems,
    maxNoOfItemDlgBox = _ref.maxNoOfItemDlgBox,
    expand = _ref.expand,
    typeMatchList = _ref.typeMatchList,
    isSearchMode = _ref.isSearchMode;
  // const meanIndex = (length) => ((length % 2) ? length / 2 - 0.5 : length / 2);
  var customTheme = expand && items.length > maxNoOfItemDlgBox + maxNoOfItems ? {
    overrides: _objectSpread(_objectSpread({}, theme.overrides), threeColumnsView.overrides)
  } : items.length > maxNoOfItems ? {
    overrides: _objectSpread(_objectSpread({}, theme.overrides), twoColumnsView.overrides)
  } : theme;
  var highlightMatchingProperties = function highlightMatchingProperties(item) {
    if (isSearchMode && typeMatchList && typeMatchList.length > 0) {
      var matchItem = typeMatchList.map(function (prop) {
        if (prop.value === item) {
          return prop;
        }
      }).filter(function (c) {
        return c;
      });
      if (matchItem.length == 1) {
        return /*#__PURE__*/_react["default"].createElement(_core.ListItemText, null, /*#__PURE__*/_react["default"].createElement("span", {
          className: classes.listItemText
        }, item.substring, (0, _highlightHelper.addHighlightingSpans)(item, matchItem[0].indices, 'data-dictionary-property-table__span')));
      }
    }
    return /*#__PURE__*/_react["default"].createElement(_core.ListItemText, {
      primary: /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        className: classes.listItemText
      }, item)
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_core.MuiThemeProvider, {
    theme: (0, _core.createTheme)(customTheme)
  }, /*#__PURE__*/_react["default"].createElement(_core.List, null, items.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.ListItem, {
      key: "".concat(index)
    }, /*#__PURE__*/_react["default"].createElement(_core.ListItemIcon, null, /*#__PURE__*/_react["default"].createElement(_FiberManualRecord["default"], {
      style: {
        fontSize: 8
      }
    })), highlightMatchingProperties(item)));
  })));
};
var styles = function styles() {
  return {
    listItemText: {
      fontWeight: '300',
      fontSize: '14px'
    },
    longText: {
      fontSize: '13px',
      fontWeight: '300',
      marginBottom: '4px',
      lineHeight: '1.3',
      '@media not all and (min-resolution:.001dpcm)': {
        lineHeight: '1'
      }
    },
    listIcon: {
      "float": 'left',
      paddingTop: '-5px',
      height: '20px',
      marginTop: '-35px'
    },
    label: {
      paddingLeft: '15px',
      display: 'block',
      fontSize: '14px',
      fontWeight: 300,
      '@media not all and (min-resolution:.001dpcm)': {
        marginBottom: '0px'
      }
    },
    highLightText: {
      color: 'var(--g3-color__highlight-orange)',
      fontWeight: '600'
    }
  };
};
var _default = (0, _core.withStyles)(styles)(ListComponent);
exports["default"] = _default;