"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _core = require("@material-ui/core");
var _lab = require("@material-ui/lab");
var _AutoCompleteView = _interopRequireDefault(require("../AutoComplete/AutoCompleteView"));
var _stringSimilarity = require("string-similarity");
var _searchHelper = require("./searchHelper");
var _DictionarySearcher = _interopRequireDefault(require("./DictionarySearcher.style"));
var _SearchThemConfig = _interopRequireDefault(require("./SearchThemConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var DictionarySearcher = /*#__PURE__*/function (_React$Component) {
  _inherits(DictionarySearcher, _React$Component);
  var _super = _createSuper(DictionarySearcher);
  function DictionarySearcher(props) {
    var _this;
    _classCallCheck(this, DictionarySearcher);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "onClearResult", function () {
      _this.resetSearchResult();
      _this.autoCompleteRef.current.clearInput();
    });
    _defineProperty(_assertThisInitialized(_this), "launchClearSearchFromOutside", function () {
      _this.onClearResult();
    });
    _defineProperty(_assertThisInitialized(_this), "launchSearchFromOutside", function (keyword) {
      _this.autoCompleteRef.current.setInputText(keyword);
      _this.search(keyword);
    });
    _defineProperty(_assertThisInitialized(_this), "search", function (str) {
      _this.props.setIsSearching(true);
      var _searchKeyword = (0, _searchHelper.searchKeyword)(_this.searchData, (0, _searchHelper.formatText)(str)),
        result = _searchKeyword.result,
        errorMsg = _searchKeyword.errorMsg;
      if (!result || result.length === 0) {
        _this.props.setIsSearching(false);
        _this.props.onSearchResultUpdated([], []);
        _this.setState({
          isSearchFinished: true,
          hasError: true,
          errorMsg: errorMsg,
          suggestionList: []
        });
        return;
      }
      var summary = (0, _searchHelper.getSearchSummary)(result);
      _this.setState({
        isSearchFinished: true,
        hasError: false,
        searchResult: {
          matchedNodes: result,
          summary: summary
        },
        suggestionList: []
      });
      _this.props.setIsSearching(false);
      _this.props.onSearchResultUpdated(result, summary);
      _this.props.onSearchHistoryItemCreated({
        keywordStr: str,
        matchedCount: summary.generalMatchedNodeIDs.length
      });
      _this.props.onSaveCurrentSearchKeyword(str);
    });
    _defineProperty(_assertThisInitialized(_this), "resetSearchResult", function () {
      _this.setState({
        isSearchFinished: false,
        searchResult: {
          matchedNodes: [],
          summary: {}
        }
      });
      _this.props.onSearchResultCleared();
    });
    _defineProperty(_assertThisInitialized(_this), "inputChangeFunc", function (query) {
      _this.props.onStartSearching();
      _this.resetSearchResult();
      var inputText = (0, _searchHelper.formatText)(query);
      var _searchKeyword2 = (0, _searchHelper.searchKeyword)(_this.searchData, inputText),
        result = _searchKeyword2.result;
      var matchedStrings = {};
      result.forEach(function (resItem) {
        resItem.matches.forEach(function (matchItem) {
          if (!matchedStrings[matchItem.value]) {
            matchedStrings[matchItem.value] = {
              matchedPieceIndices: matchItem.indices.map(function (arr) {
                return [arr[0], arr[1] + 1];
              })
            };
          }
        });
      });
      var suggestionList = Object.keys(matchedStrings).sort(function (str1, str2) {
        return (0, _stringSimilarity.compareTwoStrings)(str2, inputText) - (0, _stringSimilarity.compareTwoStrings)(str1, inputText);
      }).map(function (str) {
        return {
          fullString: str,
          matchedPieceIndices: matchedStrings[str].matchedPieceIndices
        };
      });
      var text = query;
      _this.setState({
        suggestionList: suggestionList,
        text: text
      });
    });
    _defineProperty(_assertThisInitialized(_this), "suggestionItemClickFunc", function (suggestionItem) {
      _this.autoCompleteRef.current.setInputText(suggestionItem.fullString);
      _this.search(suggestionItem.fullString);
    });
    _defineProperty(_assertThisInitialized(_this), "submitInputFunc", function (inputText) {
      _this.search((0, _searchHelper.formatText)(inputText));
    });
    _this.searchData = (0, _searchHelper.prepareSearchData)(props.dictionary);
    _this.autoCompleteRef = /*#__PURE__*/_react["default"].createRef();
    _this.state = {
      suggestionList: [],
      isSearchFinished: false,
      searchResult: {
        matchedNodes: [],
        summary: {}
      },
      hasError: false,
      errorMsg: ""
    };
    return _this;
  }
  _createClass(DictionarySearcher, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // resume search status after switching back from other pages
      if (this.props.currentSearchKeyword) {
        this.autoCompleteRef.current.setInputText(this.props.currentSearchKeyword);
        this.search(this.props.currentSearchKeyword);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        activeFiltersCount = _this$props.activeFiltersCount,
        onClearAllFilter = _this$props.onClearAllFilter,
        onClickBlankSpace = _this$props.onClickBlankSpace,
        hidePropertyTable = _this$props.hidePropertyTable;
      var _this$state = this.state,
        isSearchFinished = _this$state.isSearchFinished,
        searchResult = _this$state.searchResult,
        hasError = _this$state.hasError,
        errorMsg = _this$state.errorMsg,
        suggestionList = _this$state.suggestionList;
      var clearFilterHandler = function clearFilterHandler() {
        onClickBlankSpace();
        onClearAllFilter();
        hidePropertyTable();
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.searcher
      }, /*#__PURE__*/_react["default"].createElement(_SearchThemConfig["default"], null, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.searchBarTitle
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: classes.searchBarTitleText
      }, "Filter & Search")), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.searchInput
      }, /*#__PURE__*/_react["default"].createElement(_AutoCompleteView["default"], {
        className: "hermo",
        ref: this.autoCompleteRef,
        suggestionList: suggestionList,
        inputPlaceHolderText: "Search in Dictionary",
        onSuggestionItemClick: this.suggestionItemClickFunc,
        onInputChange: this.inputChangeFunc,
        onSubmitInput: this.submitInputFunc
      }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        id: "button_sidebar_clear_all_filters",
        variant: "outlined",
        disabled: activeFiltersCount === 0,
        className: classes.customButton,
        classes: {
          root: classes.clearAllButtonRoot
        },
        onClick: clearFilterHandler,
        disableRipple: true,
        title: "CLEAR ALL"
      }, "CLEAR ALL"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.results
      }, isSearchFinished && /*#__PURE__*/_react["default"].createElement("div", null, !hasError && (searchResult.matchedNodes.length > 0 ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.searchResultText
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Search Results")), /*#__PURE__*/_react["default"].createElement(_core.List, {
        className: classes.resultList,
        component: "div",
        dense: true
      }, /*#__PURE__*/_react["default"].createElement(_core.ListItem, {
        className: classes.resultItem
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: classes.resultCountTitleDesc
      }, searchResult.summary.matchedNodeNameAndDescriptionsCount), "\xA0", /*#__PURE__*/_react["default"].createElement("span", null, "Match(es) in nodes ", /*#__PURE__*/_react["default"].createElement("br", null), " (title and description)")), /*#__PURE__*/_react["default"].createElement(_core.ListItem, {
        className: classes.resultItem
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: classes.resultCountProps
      }, searchResult.summary.matchedPropertiesCount), "\xA0", /*#__PURE__*/_react["default"].createElement("span", null, "Match(es) in node properties")))) : /*#__PURE__*/_react["default"].createElement("p", null, _searchHelper.ZERO_RESULT_FOUND_MSG)), hasError && /*#__PURE__*/_react["default"].createElement("p", null, errorMsg))));
    }
  }]);
  return DictionarySearcher;
}(_react["default"].Component);
DictionarySearcher.propTypes = {
  dictionary: _propTypes["default"].object.isRequired,
  setIsSearching: _propTypes["default"].func,
  onSearchResultUpdated: _propTypes["default"].func,
  onSearchHistoryItemCreated: _propTypes["default"].func,
  onSearchResultCleared: _propTypes["default"].func,
  onSaveCurrentSearchKeyword: _propTypes["default"].func,
  currentSearchKeyword: _propTypes["default"].string,
  onStartSearching: _propTypes["default"].func
};
DictionarySearcher.defaultProps = {
  setIsSearching: function setIsSearching() {},
  onSearchResultUpdated: function onSearchResultUpdated() {},
  onSearchHistoryItemCreated: function onSearchHistoryItemCreated() {},
  onSearchResultCleared: function onSearchResultCleared() {},
  onSaveCurrentSearchKeyword: function onSaveCurrentSearchKeyword() {},
  currentSearchKeyword: "",
  onStartSearching: function onStartSearching() {}
};
var _default = (0, _core.withStyles)(_DictionarySearcher["default"])(DictionarySearcher);
exports["default"] = _default;