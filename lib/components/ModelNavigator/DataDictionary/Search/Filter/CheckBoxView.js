"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _styles = require("@material-ui/core/styles");
var _core = require("@material-ui/core");
var _icons = require("@material-ui/icons");
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint-disable no-unused-vars */
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
  }), dataDictionary ? checkboxItem.name ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
    title: _lodash["default"].startCase(checkboxItem.name)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.panelDetailText
  }, /*#__PURE__*/_react["default"].createElement("span", null, "".concat(_lodash["default"].startCase(checkboxItem.name)))))) : /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.panelDetailText
  }, /*#__PURE__*/_react["default"].createElement("span", null, checkboxItem.name)) : checkboxItem.title ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
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
var _default = exports["default"] = (0, _styles.withStyles)(styles)(CheckBoxView);