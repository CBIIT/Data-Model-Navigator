"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
var _propTypes = _interopRequireDefault(require("prop-types"));
require("./AutoCompleteInput.css");
var _AutoCompleteInputStyle = _interopRequireDefault(require("./AutoCompleteInputStyle"));
var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));
var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var AutoCompleteInput = /*#__PURE__*/function (_Component) {
  _inherits(AutoCompleteInput, _Component);
  var _super = _createSuper(AutoCompleteInput);
  function AutoCompleteInput(props) {
    var _this;
    _classCallCheck(this, AutoCompleteInput);
    _this = _super.call(this, props);
    _this.state = {
      closeIconHidden: true
    };
    _this.inputElem = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  _createClass(AutoCompleteInput, [{
    key: "handleChange",
    value: function handleChange() {
      var currentInput = this.inputElem.current.value;
      this.props.onInputChange(currentInput);
      this.updateCloseIcon();
    }
  }, {
    key: "handleClear",
    value: function handleClear() {
      this.inputElem.current.value = '';
      this.updateCloseIcon();
      this.props.onInputChange('');
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      if (e && e.preventDefault) e.preventDefault();
      this.props.onSubmitInput(this.inputElem.current.value);
    }
  }, {
    key: "setInputText",
    value: function setInputText(text) {
      this.inputElem.current.value = text;
      this.updateCloseIcon();
    }
  }, {
    key: "updateCloseIcon",
    value: function updateCloseIcon() {
      var currentInput = this.inputElem.current.value;
      this.setState({
        closeIconHidden: !currentInput || currentInput.length === 0
      });
    }
  }, {
    key: "clearInput",
    value: function clearInput() {
      this.inputElem.current.value = '';
      this.updateCloseIcon();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        placeHolderText = _this$props.placeHolderText,
        icon = _this$props.icon;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.autoCompleteInput
      }, /*#__PURE__*/_react["default"].createElement("form", {
        className: classes.autoCompleteInputForm,
        onSubmit: function onSubmit(e) {
          return _this2.handleSubmit(e);
        }
      }, /*#__PURE__*/_react["default"].createElement("input", {
        title: this.props.inputTitle,
        className: classes.autoCompleteInputBox,
        onChange: function onChange() {
          _this2.handleChange();
        },
        placeholder: placeHolderText,
        ref: this.inputElem
      })), !this.state.closeIconHidden && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
        onClick: function onClick() {
          return _this2.handleClear();
        },
        disableRipple: true,
        className: classes.closeBtn
      }, /*#__PURE__*/_react["default"].createElement(_Close["default"], {
        className: classes.closeIcon
      })), /*#__PURE__*/_react["default"].createElement("i", {
        className: classes.verticalLine
      })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        onClick: function onClick() {
          return _this2.handleSubmit();
        },
        disableRipple: true,
        className: classes.searchBtn
      }, /*#__PURE__*/_react["default"].createElement(_Search["default"], {
        className: classes.searchIcon
      })));
    }
  }]);
  return AutoCompleteInput;
}(_react.Component);
AutoCompleteInput.propTypes = {
  onInputChange: _propTypes["default"].func,
  placeHolderText: _propTypes["default"].string,
  icon: _propTypes["default"].string,
  onSubmitInput: _propTypes["default"].func,
  inputTitle: _propTypes["default"].string
};
AutoCompleteInput.defaultProps = {
  onInputChange: function onInputChange() {},
  placeHolderText: 'Search',
  icon: 'search',
  onSubmitInput: function onSubmitInput() {},
  inputTitle: 'Search Input'
};
var _default = exports["default"] = (0, _core.withStyles)(_AutoCompleteInputStyle["default"])(AutoCompleteInput);