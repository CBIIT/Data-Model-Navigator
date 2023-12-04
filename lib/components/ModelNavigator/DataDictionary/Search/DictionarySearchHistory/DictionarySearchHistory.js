"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _core = require("@material-ui/core");
var _DictionarySearchHistory = _interopRequireDefault(require("./DictionarySearchHistory.style"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DictionarySearchHistory = /*#__PURE__*/function (_React$Component) {
  _inherits(DictionarySearchHistory, _React$Component);
  var _super = _createSuper(DictionarySearchHistory);
  function DictionarySearchHistory() {
    var _this;
    _classCallCheck(this, DictionarySearchHistory);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "handleClick", function (keyword) {
      _this.props.onClickSearchHistoryItem(keyword);
    });
    _defineProperty(_assertThisInitialized(_this), "handleClearHistory", function () {
      _this.props.onClearSearchHistoryItems();
    });
    return _this;
  }
  _createClass(DictionarySearchHistory, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        searchHistoryItems = _this$props.searchHistoryItems;
      if (searchHistoryItems && searchHistoryItems.length > 0) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: classes.searchHistory
        }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", {
          className: classes.titleText
        }, "Last Search"), /*#__PURE__*/_react["default"].createElement("span", {
          className: classes.clear,
          onClick: this.handleClearHistory,
          role: "button",
          tabIndex: 0
        }, "Clear History")), /*#__PURE__*/_react["default"].createElement("div", {
          className: classes.serachedItems
        }, searchHistoryItems && searchHistoryItems.map(function (item) {
          var zeroCountModifier = item.matchedCount === 0 ? classes.itemBadgeZero : '';
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: classes.item,
            key: item.keywordStr,
            onClick: function onClick() {
              return _this2.handleClick(item.keywordStr);
            },
            role: "button",
            tabIndex: 0
          }, /*#__PURE__*/_react["default"].createElement("span", {
            className: classes.itemKeyword
          }, item.keywordStr), /*#__PURE__*/_react["default"].createElement("span", {
            className: "".concat(classes.itemBadge, " ").concat(zeroCountModifier)
          }, item.matchedCount));
        })));
      }
      return null;
    }
  }]);
  return DictionarySearchHistory;
}(_react["default"].Component);
var SearchHistoryItemShape = _propTypes["default"].shape({
  keywordStr: _propTypes["default"].string,
  matchedCount: _propTypes["default"].number
});
DictionarySearchHistory.propTypes = {
  searchHistoryItems: _propTypes["default"].arrayOf(SearchHistoryItemShape),
  onClickSearchHistoryItem: _propTypes["default"].func,
  onClearSearchHistoryItems: _propTypes["default"].func
};
DictionarySearchHistory.defaultProps = {
  searchHistoryItems: [],
  onClickSearchHistoryItem: function onClickSearchHistoryItem() {},
  onClearSearchHistoryItems: function onClearSearchHistoryItems() {}
};
var _default = (0, _core.withStyles)(_DictionarySearchHistory["default"])(DictionarySearchHistory);
exports["default"] = _default;