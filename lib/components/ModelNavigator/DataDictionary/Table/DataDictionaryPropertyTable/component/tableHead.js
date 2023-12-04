"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var TableHeader = function TableHeader(_ref) {
  var classes = _ref.classes,
    hideIsRequired = _ref.hideIsRequired;
  return /*#__PURE__*/_react["default"].createElement("thead", {
    className: classes.tableHead
  }, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", {
    className: classes.item
  }, "Property"), /*#__PURE__*/_react["default"].createElement("th", {
    className: classes.item
  }, "Type"), !hideIsRequired && /*#__PURE__*/_react["default"].createElement("th", {
    className: classes.item
  }, "Required"), /*#__PURE__*/_react["default"].createElement("th", {
    className: classes.item
  }, "Description"), /*#__PURE__*/_react["default"].createElement("th", {
    className: classes.item
  }, "Source")));
};
var styles = function styles() {
  return {
    tableHead: {
      color: '#606060',
      fontSize: '13px',
      background: '#eef5f7',
      borderTop: '3px solid #adbec4',
      borderBottom: '3px solid #adbec4',
      '& th': {
        fontWeight: '900'
      }
    },
    item: {
      padding: '10px 10px 10px 19px',
      border: '0',
      textAlign: 'left',
      fontFamily: 'raleway',
      verticalAlign: 'top',
      '& p': {
        margin: 'auto'
      },
      '&:nth-child(2) > p': {
        maxWidth: '300px',
        minWidth: '100px',
        wordWrap: 'break-word'
      }
    }
  };
};
var _default = exports["default"] = (0, _core.withStyles)(styles)(TableHeader);