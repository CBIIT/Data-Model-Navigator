"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _styles = require("@material-ui/core/styles");
var _core = require("@material-ui/core");
var _icons = require("@material-ui/icons");
var _bentoComponents = require("bento-components");
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var styles = {
  listItemGutters: {
    padding: "10px 20px 10px 0px",
    // paddingRight: '5px',
    boxShadow: "inset -10px -1px 10px -7px rgb(50 50 50 / 25%)",
    display: "flex",
    alignItems: "center"
  },
  checkboxRoot: {
    marginLeft: "5px",
    height: 12
  },
  panelDetailText: {
    color: "#323232",
    fontFamily: "Nunito",
    fontSize: "14px",
    fontWeight: "200"
  },
  panelSubjectText: {
    color: "#323232",
    fontFamily: "Nunito",
    fontSize: "14px",
    marginRight: "0px"
  }
};
var alignment = "flex-start";
function CheckBoxView(props) {
  var classes = props.classes,
    checkboxItem = props.checkboxItem,
    handleToggle = props.handleToggle,
    sideBarItem = props.sideBarItem,
    facetSectionVariables = props.facetSectionVariables,
    defaultFacetSectionVariables = props.defaultFacetSectionVariables,
    backgroundColor = props.backgroundColor,
    dataDictionary = props.dataDictionary;
  var getStyles = function getStyles() {
    if (checkboxItem.isChecked) {
      return {
        backgroundColor: backgroundColor,
        boxShadow: "none"
      };
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.ListItem, {
    width: 1,
    button: true,
    alignItems: alignment,
    selected: checkboxItem.isChecked,
    onClick: handleToggle(_objectSpread(_objectSpread({}, checkboxItem), sideBarItem)),
    className: classes.nested,
    style: getStyles(),
    classes: {
      selected: classes.selected,
      gutters: classes.listItemGutters
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
    id: "checkbox_".concat(sideBarItem.groupName, "_").concat(checkboxItem.name),
    icon: /*#__PURE__*/_react["default"].createElement(_icons.CheckBoxOutlineBlank, {
      style: {
        fontSize: 18
      }
    }),
    checkedIcon: /*#__PURE__*/_react["default"].createElement(_icons.CheckBox, {
      style: {
        fontSize: 18
      }
    }),
    style: {
      color: facetSectionVariables[sideBarItem.section].checkBoxBorderColor ? facetSectionVariables[sideBarItem.section].checkBoxBorderColor : "#137fbe"
    },
    checked: checkboxItem.isChecked,
    tabIndex: -1,
    disableRipple: true,
    color: "secondary",
    classes: {
      root: classes.checkboxRoot
    }
  }), dataDictionary ? checkboxItem.name ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_bentoComponents.ToolTip, {
    title: _lodash["default"].startCase(checkboxItem.name)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.panelDetailText
  }, /*#__PURE__*/_react["default"].createElement("span", null, "".concat(_lodash["default"].startCase(checkboxItem.name)))))) : /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.panelDetailText
  }, /*#__PURE__*/_react["default"].createElement("span", null, checkboxItem.name)) : checkboxItem.title ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_bentoComponents.ToolTip, {
    title: checkboxItem.title.name
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.panelDetailText
  }, /*#__PURE__*/_react["default"].createElement("span", null, "".concat(checkboxItem.title.acronym))))) : /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.panelDetailText
  }, /*#__PURE__*/_react["default"].createElement("span", null, checkboxItem.name)), /*#__PURE__*/_react["default"].createElement(_core.ListItemText, null), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.panelSubjectText
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      color: facetSectionVariables[sideBarItem.section] ? facetSectionVariables[sideBarItem.section].color ? facetSectionVariables[sideBarItem.section].color : "" : defaultFacetSectionVariables.color
    }
  }, "\xA0", checkboxItem.subjects))), /*#__PURE__*/_react["default"].createElement(_core.Divider, {
    variant: "middle",
    style: {
      backgroundColor: checkboxItem.isChecked ? "#FFFFFF" : "#B1B1B1",
      margin: "0px",
      height: checkboxItem.isChecked ? "2px" : "1px"
    }
  }));
}
var _default = (0, _styles.withStyles)(styles)(CheckBoxView);
exports["default"] = _default;