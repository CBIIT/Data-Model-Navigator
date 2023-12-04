"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));
var _ListComponent = _interopRequireDefault(require("./ListComponent"));
var _ButtonComponent = _interopRequireDefault(require("./ButtonComponent"));
var _DownloadFileTypeBtn = _interopRequireDefault(require("./DownloadFileTypeBtn"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var theme = {
  overrides: {
    MuiDialog: {
      paper: {
        borderRadius: '5px',
        padding: '0px 0px 0px 20px',
        boxShadow: 'none',
        overflowX: 'hidden',
        overflowY: 'hidden'
      },
      paperScrollPaper: {
        maxHeight: '575px'
      }
    },
    MuiDialogContent: {
      root: {
        padding: '15px 25px 35px 15px'
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: '#4a4a4a52'
      }
    },
    MuiIconButton: {
      root: {
        textTransform: 'none',
        padding: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
          cursor: 'pointer'
        }
      }
    },
    MuiSvgIcon: {
      root: {
        color: '#0d71a3'
      }
    }
  }
};
var DialogComponent = function DialogComponent(_ref) {
  var classes = _ref.classes,
    display = _ref.display,
    closeHandler = _ref.closeHandler,
    items = _ref.items,
    maxNoOfItems = _ref.maxNoOfItems,
    maxNoOfItemDlgBox = _ref.maxNoOfItemDlgBox,
    isSearchMode = _ref.isSearchMode,
    typeMatchList = _ref.typeMatchList,
    node = _ref.node,
    property = _ref.property;
  var _useState = (0, _react.useState)(display),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    expand = _useState4[0],
    setExpand = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    values = _useState6[0],
    setValues = _useState6[1];
  var _useState7 = (0, _react.useState)('sm'),
    _useState8 = _slicedToArray(_useState7, 2),
    boxSize = _useState8[0],
    setBoxSize = _useState8[1];
  (0, _react.useEffect)(function () {
    setOpen(display);
    setValues(items);
    if (items && items.length > maxNoOfItemDlgBox) {
      // setValues(items.slice(0, maxNoOfItemDlgBox));
      setExpand(true);
    }
  }, [display, open]);
  var expandView = function expandView() {
    if (items.length > maxNoOfItemDlgBox + maxNoOfItems) {
      setBoxSize('md');
    }
    setValues(items);
    setExpand(true);
  };
  return /*#__PURE__*/_react["default"].createElement(_core.MuiThemeProvider, {
    theme: (0, _core.createTheme)(theme)
  }, /*#__PURE__*/_react["default"].createElement(_core.Dialog, {
    open: open,
    onClose: closeHandler,
    maxWidth: boxSize,
    BackdropProps: {
      timeout: 500
    },
    BackdropComponent: _core.Backdrop
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.titleContent
  }, /*#__PURE__*/_react["default"].createElement("div", {
    item: true,
    xs: 1,
    className: classes.closeBtn
  }, /*#__PURE__*/_react["default"].createElement(_DownloadFileTypeBtn["default"], {
    data: items,
    node: node,
    propertyKey: property
  }), /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
    onClick: closeHandler
  }, /*#__PURE__*/_react["default"].createElement(_Close["default"], {
    fontSize: "small"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
    className: classes.title
  }, "Acceptable Values"))), /*#__PURE__*/_react["default"].createElement(_core.DialogContent, null, /*#__PURE__*/_react["default"].createElement(_ListComponent["default"], {
    items: values,
    maxNoOfItems: maxNoOfItems,
    maxNoOfItemDlgBox: maxNoOfItemDlgBox,
    expand: expand,
    isSearchMode: isSearchMode,
    typeMatchList: typeMatchList
  }), /*#__PURE__*/_react["default"].createElement("br", null), items.length > maxNoOfItemDlgBox && !expand && /*#__PURE__*/_react["default"].createElement(_ButtonComponent["default"], {
    label: "...show more",
    openHandler: expandView
  }))));
};
var styles = function styles() {
  return {
    titleContent: {
      width: '100%'
    },
    title: {
      paddingLeft: '20px',
      fontSize: '18px',
      marginTop: '20px',
      display: 'inherit',
      fontWeight: '600',
      color: '#0d71a3'
    },
    closeBtn: {
      width: '225px',
      padding: '20px',
      textAlign: 'right',
      "float": 'right'
    }
  };
};
DialogComponent.defaultProps = {
  maxNoOfItems: 30
};
var _default = (0, _core.withStyles)(styles)(DialogComponent);
exports["default"] = _default;