"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _axios = _interopRequireDefault(require("axios"));
var _core = require("@material-ui/core");
var _Header = _interopRequireDefault(require("./Header.style"));
var _HeaderTheme = _interopRequireDefault(require("./Header.theme.config"));
var _ReadMe = _interopRequireDefault(require("../ReadMe/ReadMe.controller"));
var _downloadDropdownMenu = _interopRequireDefault(require("./components/download-dropdown-menu"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var dogIconSrc = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/4a3fb8e201e6ba2a858d7ec1226d2fd6ea2b5298/icdc/images/svgs/Icon-DMNav.85x85.svg';
var HeaderComponent = function HeaderComponent(_ref) {
  var pdfDownloadConfig = _ref.pdfDownloadConfig,
    dictionary = _ref.dictionary,
    fullDictionary = _ref.fullDictionary,
    classes = _ref.classes;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    displayReadMe = _useState2[0],
    setDisplayReadMe = _useState2[1];
  var _useState3 = (0, _react.useState)(undefined),
    _useState4 = _slicedToArray(_useState3, 2),
    content = _useState4[0],
    setContent = _useState4[1];
  var config = (0, _reactRedux.useSelector)(function (state) {
    return state.submission && state.submission.readMeConfig ? state.submission.readMeConfig : undefined;
  });
  var pageConfig = (0, _reactRedux.useSelector)(function (state) {
    return state.submission && state.submission.pageConfig ? state.submission.pageConfig : undefined;
  });
  var loadingExampleConfig = (0, _reactRedux.useSelector)(function (state) {
    return state.submission && state.submission.loadingExampleConfig ? state.submission.loadingExampleConfig : undefined;
  });
  (0, _react.useEffect)(function () {
    if (config && config.readMeUrl) {
      _axios["default"].get(config.readMeUrl).then(function (response) {
        return response;
      }).then(function (resp) {
        if (resp.data) {
          setContent(resp.data);
        }
      });
    }
  }, []);
  var displayReadMeHandler = function displayReadMeHandler() {
    setDisplayReadMe(!displayReadMe);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_HeaderTheme["default"], null, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.titleContainer
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.logoAndTitle
  }, /*#__PURE__*/_react["default"].createElement("img", {
    className: classes.dogIcon,
    alt: "dog-icon",
    src: (pageConfig === null || pageConfig === void 0 ? void 0 : pageConfig.iconSrc) || dogIconSrc
  }), /*#__PURE__*/_react["default"].createElement("h2", {
    className: classes.title
  }, (pageConfig === null || pageConfig === void 0 ? void 0 : pageConfig.title) || "Data Model Navigator")), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.btnGroup
  }, typeof (config === null || config === void 0 ? void 0 : config.readMeUrl) === "string" && /*#__PURE__*/_react["default"].createElement(_core.Button, {
    classes: {
      root: classes.readMeBtnRoot,
      label: classes.readMeBtnLabel
    },
    variant: "contained",
    color: "primary",
    onClick: displayReadMeHandler,
    endIcon: /*#__PURE__*/_react["default"].createElement("img", {
      style: {
        height: '20px',
        width: '20px'
      },
      alt: "readme btn icon",
      src: "https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_readme_title-bar_icon.svg"
    })
  }, "README"), /*#__PURE__*/_react["default"].createElement(_downloadDropdownMenu["default"], {
    config: _objectSpread(_objectSpread({}, pdfDownloadConfig), {}, {
      type: 'document'
    }),
    filteredDictionary: dictionary,
    fullDictionary: fullDictionary,
    readMeContent: content,
    readMeConfig: config,
    loadingExampleConfig: loadingExampleConfig
  })), /*#__PURE__*/_react["default"].createElement(_ReadMe["default"], {
    content: content,
    config: config,
    display: displayReadMe,
    displayReadMeDialog: displayReadMeHandler
  })), /*#__PURE__*/_react["default"].createElement("hr", {
    className: classes.divider
  })));
};
var _default = (0, _core.withStyles)(_Header["default"])(HeaderComponent);
exports["default"] = _default;