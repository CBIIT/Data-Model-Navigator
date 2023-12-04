"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));
var _ButtonGroup = _interopRequireDefault(require("@material-ui/core/ButtonGroup"));
var _KeyboardArrowDown = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowDown"));
var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));
var _Forward = _interopRequireDefault(require("@material-ui/icons/Forward"));
var _fileSaver = require("file-saver");
var _utils = require("../../../utils");
var _ArrowDownward = _interopRequireDefault(require("@material-ui/icons/ArrowDownward"));
var _reactRedux = require("react-redux");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DOWNLOADS = "DOWNLOADS";
var filePerfix = "ICDC_Controlled_Vocabulary-";
var FILE_TYPE_JSON = "JSON";
var CONTENT_TYPE_JSON = "application/json";
var CONTENT_TYPE_TSV = "data:text/tab-separated-values";
var FILE_TYPE_TSV = "TSV";
var fileTypes = [FILE_TYPE_JSON, FILE_TYPE_TSV];
var StyledMenu = (0, _core.withStyles)({
  paper: {
    border: "2px solid #0D71A3",
    width: "110px",
    borderBottomRightRadius: "5px !important",
    borderBottomLeftRadius: "5px !important",
    borderRadius: "0px"
  },
  list: {
    padding: 0
  }
})(function (props) {
  return /*#__PURE__*/_react["default"].createElement(_Menu["default"], _extends({
    elevation: 0,
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left"
    }
  }, props));
});
var StyledMenuItem = (0, _core.withStyles)(function (theme) {
  return {
    root: {
      "&:focus": {
        backgroundColor: "none",
        "& .MuiListItemIcon-root": {
          backgroundColor: "none"
        }
      },
      "&:hover": {
        backgroundColor: "#e1f0f7"
      }
    }
  };
})(_MenuItem["default"]);
var DownloadFileTypeBtn = function DownloadFileTypeBtn(_ref) {
  var classes = _ref.classes,
    data = _ref.data,
    node = _ref.node,
    propertyKey = _ref.propertyKey;
  var _React$useState = _react["default"].useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    anchorElement = _React$useState2[0],
    setAnchorElement = _React$useState2[1];
  var _useState = (0, _react.useState)("DOWNLOADS"),
    _useState2 = _slicedToArray(_useState, 2),
    label = _useState2[0],
    setLabel = _useState2[1];
  var pdfConfig = (0, _reactRedux.useSelector)(function (state) {
    var _state$ddgraph, _state$ddgraph2;
    return state !== null && state !== void 0 && state.ddgraph && state !== null && state !== void 0 && (_state$ddgraph = state.ddgraph) !== null && _state$ddgraph !== void 0 && _state$ddgraph.pdfDownloadConfig ? state === null || state === void 0 || (_state$ddgraph2 = state.ddgraph) === null || _state$ddgraph2 === void 0 ? void 0 : _state$ddgraph2.pdfDownloadConfig : {};
  });
  var clickHandler = function clickHandler(event) {
    setLabel("DOWNLOADS");
    setAnchorElement(event.currentTarget);
  };
  var closeHandler = function closeHandler() {
    setAnchorElement(null);
  };
  var setFileType = function setFileType(value) {
    setLabel(value);
    setAnchorElement(null);
  };
  var download = function download(thisData, fileType, contentType) {
    var exportData = new Blob([thisData], {
      type: contentType
    });
    var nodeTitle = (0, _utils.capitalizeFirstLetter)(node);
    var fileName = (0, _utils.createFileName)("".concat(nodeTitle, "-").concat(propertyKey), (pdfConfig === null || pdfConfig === void 0 ? void 0 : pdfConfig.downloadPrefix) || filePerfix);
    (0, _fileSaver.saveAs)(exportData, "".concat(fileName, ".").concat(fileType.toLowerCase()));
  };
  var downladFile = function downladFile() {
    if (label === FILE_TYPE_JSON) {
      var jsonData = JSON.stringify(data);
      download(jsonData, FILE_TYPE_JSON, CONTENT_TYPE_JSON);
    }
    if (label === FILE_TYPE_TSV) {
      var content = "";
      if (data && data.length) {
        data.forEach(function (item, index) {
          content += index === 0 ? item : "\n".concat(item);
        });
      }
      download(content, FILE_TYPE_TSV, CONTENT_TYPE_TSV);
    }
  };
  var menuItem = function menuItem(type) {
    return /*#__PURE__*/_react["default"].createElement(StyledMenuItem, {
      className: classes.menuItem,
      onClick: function onClick() {
        return setFileType(type);
      }
    }, type);
  };
  var options = fileTypes.map(function (item) {
    return menuItem(item);
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_ButtonGroup["default"], {
    variant: "contained",
    classes: {
      root: classes.btnGrpRoot
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    classes: {
      root: classes.downloadDropdownBtn,
      label: classes.downloadDropdownBtnLabel
    },
    onClick: clickHandler
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.downloadDropdownIconLabelContainer
  }, /*#__PURE__*/_react["default"].createElement(_KeyboardArrowDown["default"], null), label)), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    disabled: DOWNLOADS === label,
    onClick: downladFile,
    classes: {
      root: classes.downloadBtn
    }
  }, /*#__PURE__*/_react["default"].createElement(_ArrowDownward["default"], {
    classes: {
      root: classes.downloadBtnIcon
    }
  }))), /*#__PURE__*/_react["default"].createElement(StyledMenu, {
    id: "customized-menu",
    anchorEl: anchorElement,
    keepMounted: true,
    open: Boolean(anchorElement),
    onClose: closeHandler
  }, options));
};
var styles = function styles() {
  return {
    btnGrpRoot: {
      border: "1px solid #0D71A3",
      backgroundColor: "#0D71A3",
      boxShadow: "none",
      height: "27px",
      maxWidth: "fit-content"
    },
    downloadDropdownIconLabelContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around"
    },
    downloadDropdownBtnContained: {},
    downloadDropdownBtn: {
      backgroundColor: "#F2F1F1",
      width: "110px"
    },
    downloadDropdownBtnLabel: {
      color: "#0D71A3",
      fontSize: "11px",
      fontFamily: "Lato",
      fontWeight: "bold"
    },
    downloadBtn: {
      backgroundColor: "#376FA0",
      width: "27px",
      minWidth: "27px",
      color: "white",
      "&:disabled": {
        backgroundColor: "#376FA0"
      },
      "&:hover": {
        backgroundColor: "#376FA0"
      }
    },
    downloadBtnIcon: {
      color: "#FFF"
    },
    menu: {
      border: "1px solid #0D71A3",
      boxSizing: "border-box",
      backgroundColor: "#0D71A3",
      borderRadius: "5px",
      "float": "left"
    },
    displayBtn: {
      width: "102px",
      height: "2em",
      boxSizing: "border-box",
      color: "#0d71a3",
      backgroundColor: "#F2F1F1",
      textTransform: "none",
      padding: "7px",
      marginRight: "0",
      "float": "left",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#F2F1F1"
      }
    },
    dropDownText: {
      lineHeight: "1.05",
      fontSize: "10px",
      fontFamily: "Open Sans",
      fontWeight: "600",
      color: "#0d71a3",
      textAlign: "left",
      position: "relative"
    },
    arrowDownward: {
      fontSize: "30px",
      color: "#DC762F"
    },
    menuItem: {
      fontSize: "10px",
      fontWeight: "bold",
      paddingLeft: "22px",
      fontFamily: "Lato",
      color: "#0d71a3",
      "&:last-child": {
        backgroundColor: "#CBE2EE",
        "&:hover": {
          backgroundColor: "#e1f0f7"
        }
      }
    },
    // downloadBtn: {
    //   float: 'right',
    //   marginBottom: '-20px',
    //   height: '27px',
    //   width: '27px',
    //   backgroundColor: '#0D71A3',
    //   borderRadius: '0px',
    //   paddingLeft: '8px',
    //   '&:hover': {
    //     backgroundColor: '#0D71A3',
    //   },
    // },
    downloadIcon: {
      color: "#fff",
      fontSize: "18px"
    }
  };
};
var _default = exports["default"] = (0, _core.withStyles)(styles, {
  withTheme: true
})(DownloadFileTypeBtn);