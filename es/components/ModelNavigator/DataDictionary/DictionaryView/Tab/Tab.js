"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _TabLable = _interopRequireDefault(require("./TabLable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var TabItems = function TabItems(_ref) {
  var tabItems = _ref.tabItems,
    styleClasses = _ref.styleClasses,
    handleTabChange = _ref.handleTabChange,
    currentTab = _ref.currentTab,
    orientation = _ref.orientation;
  function getTabLalbel(title, image, index) {
    return /*#__PURE__*/_react["default"].createElement(_TabLable["default"], {
      title: title,
      icon: image,
      primaryColorClass: currentTab === index ? styleClasses.tabHighlightColor : styleClasses.tabPrimaryColor
    });
  }
  var TABs = tabItems.map(function (tab, index) {
    return /*#__PURE__*/_react["default"].createElement(_core.Tab, {
      index: tab.index,
      label: getTabLalbel(tab.label, tab.icon, tab.index),
      key: index,
      disableRipple: true
    });
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Tabs, {
    onChange: function onChange(event, value) {
      return handleTabChange(event, value);
    },
    value: currentTab,
    TabIndicatorProps: {
      style: {
        background: 'none'
      }
    },
    orientation: orientation,
    className: styleClasses.tabs
  }, TABs));
};
var styles = function styles() {
  return {
    defaultStyle: {
      fontFamily: 'Open Sans',
      textTransform: 'none',
      fontSize: '17px'
    },
    flexContainer: {
      flexDirection: 'column'
    },
    indicator: {
      display: 'none'
    },
    tabHighlightColor: {
      color: '#6d9eba'
    },
    tabs: {
      paddingLeft: '10px'
    }
  };
};
var _default = exports["default"] = (0, _core.withStyles)(styles)(TabItems);