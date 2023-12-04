"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTheme = exports.CustomThemeProvider = void 0;
var _react = _interopRequireDefault(require("react"));
var _styles = require("@material-ui/core/styles");
var _themes = _interopRequireWildcard(require("./themes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var lightTheme = (0, _styles.createMuiTheme)(_objectSpread(_objectSpread(_objectSpread({}, _themes["default"].light), _themes.overrides), _themes.typography));
var darkTheme = (0, _styles.createMuiTheme)(_objectSpread(_objectSpread(_objectSpread({}, _themes["default"].dark), _themes.overrides), _themes.typography));
var defaultContextData = {
  dark: false,
  toggleTheme: function toggleTheme() {}
};
var ThemeContext = /*#__PURE__*/_react["default"].createContext(defaultContextData);
var useTheme = exports.useTheme = function useTheme() {
  return _react["default"].useContext(ThemeContext);
};
var useEffectDarkMode = function useEffectDarkMode() {
  var _React$useState = _react["default"].useState({
      dark: false,
      hasThemeMounted: false
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    themeState = _React$useState2[0],
    setThemeState = _React$useState2[1];
  _react["default"].useEffect(function () {
    var lsDark = localStorage.getItem('dark') === 'true';
    setThemeState(_objectSpread(_objectSpread({}, themeState), {}, {
      dark: lsDark,
      hasThemeMounted: true
    }));
  }, []);
  return [themeState, setThemeState];
};
var CustomThemeProvider = exports.CustomThemeProvider = function CustomThemeProvider(_ref) {
  var children = _ref.children;
  var _useEffectDarkMode = useEffectDarkMode(),
    _useEffectDarkMode2 = _slicedToArray(_useEffectDarkMode, 2),
    themeState = _useEffectDarkMode2[0],
    setThemeState = _useEffectDarkMode2[1];
  var toggleTheme = function toggleTheme() {
    var dark = !themeState.dark;
    localStorage.setItem('dark', JSON.stringify(dark));
    setThemeState(_objectSpread(_objectSpread({}, themeState), {}, {
      dark: dark
    }));
  };
  var computedTheme = themeState.dark ? darkTheme : lightTheme;
  return /*#__PURE__*/_react["default"].createElement(_styles.MuiThemeProvider, {
    theme: computedTheme
  }, /*#__PURE__*/_react["default"].createElement(ThemeContext.Provider, {
    value: {
      dark: themeState.dark,
      toggleTheme: toggleTheme
    }
  }, children));
};