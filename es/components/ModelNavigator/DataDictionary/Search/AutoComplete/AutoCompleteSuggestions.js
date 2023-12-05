"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuggestionItemHTML = exports["default"] = exports.SuggestionItem = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _AutoCompleteSuggestnStyle = _interopRequireDefault(require("./AutoCompleteSuggestnStyle"));
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
/**
 * Wrap suggestion item into HTML, take following as an e.g.:
 *   suggestionsItem={
 *     fullString: 'abcdea',
 *     matchedPieceIndices: [
 *       [0, 1],
 *       [5, 6]
 *     ];
 *   };
 * Return HTML should be:
 *     <span className='auto-complete-suggestions__highlight'>
 *       a
 *     </span>
 *     <span>bcde</span>
 *     <span className='auto-complete-suggestions__highlight'>
 *       a
 *     </span>
 */
var getSuggestionItemHTML = exports.getSuggestionItemHTML = function getSuggestionItemHTML(suggestionItem, classes) {
  var fullString = suggestionItem.fullString,
    matchedPieceIndices = suggestionItem.matchedPieceIndices;
  var cursor = 0;
  var currentHighlighPieceIndex = 0;
  var resultHTMLSnippits = [];
  while (currentHighlighPieceIndex < matchedPieceIndices.length) {
    var highlightStartPos = matchedPieceIndices[currentHighlighPieceIndex][0];
    var highlightEndPos = matchedPieceIndices[currentHighlighPieceIndex][1];
    if (cursor < highlightStartPos) {
      resultHTMLSnippits.push( /*#__PURE__*/_react["default"].createElement("span", {
        key: cursor
      }, fullString.substring(cursor, highlightStartPos)));
    }
    resultHTMLSnippits.push( /*#__PURE__*/_react["default"].createElement("span", {
      key: highlightStartPos,
      className: classes.highlight
    }, fullString.substring(highlightStartPos, highlightEndPos)));
    cursor = highlightEndPos;
    currentHighlighPieceIndex += 1;
  }
  if (cursor < fullString.length) {
    resultHTMLSnippits.push( /*#__PURE__*/_react["default"].createElement("span", {
      key: cursor
    }, fullString.substring(cursor)));
  }
  return resultHTMLSnippits;
};
var AutoCompleteSuggestions = /*#__PURE__*/function (_Component) {
  _inherits(AutoCompleteSuggestions, _Component);
  var _super = _createSuper(AutoCompleteSuggestions);
  function AutoCompleteSuggestions() {
    _classCallCheck(this, AutoCompleteSuggestions);
    return _super.apply(this, arguments);
  }
  _createClass(AutoCompleteSuggestions, [{
    key: "handleClickItem",
    value: function handleClickItem(suggestionItem, i) {
      this.props.onSuggestionItemClick(suggestionItem, i);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        suggestionList = _this$props.suggestionList,
        classes = _this$props.classes;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.suggestionList
      }, suggestionList.map(function (suggestionItem, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: "".concat(i, "-").concat(suggestionItem.fullString),
          className: classes.suggestionItem,
          onClick: function onClick() {
            _this.handleClickItem(suggestionItem, i);
          },
          role: 'button',
          tabIndex: 0
        }, getSuggestionItemHTML(suggestionItem, classes));
      }));
    }
  }]);
  return AutoCompleteSuggestions;
}(_react.Component);
var SuggestionItem = exports.SuggestionItem = {
  fullString: _propTypes["default"].string.isRequired,
  matchedPieceIndices: _propTypes["default"].arrayOf(_propTypes["default"].arrayOf(_propTypes["default"].number)).isRequired
};
AutoCompleteSuggestions.propTypes = {
  suggestionList: _propTypes["default"].arrayOf(_propTypes["default"].shape(SuggestionItem)),
  onSuggestionItemClick: _propTypes["default"].func
};
AutoCompleteSuggestions.defaultProps = {
  suggestionList: [],
  onSuggestionItemClick: function onSuggestionItemClick() {}
};
var _default = exports["default"] = (0, _core.withStyles)(_AutoCompleteSuggestnStyle["default"])(AutoCompleteSuggestions);