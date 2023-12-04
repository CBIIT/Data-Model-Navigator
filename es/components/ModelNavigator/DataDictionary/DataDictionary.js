"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _core = require("@material-ui/core");
var _DictionarySearcher = _interopRequireDefault(require("./Search/DictionarySearcher"));
var _DictionarySearchHistory = _interopRequireDefault(require("./Search/DictionarySearchHistory"));
var _ReduxFacetFilter = _interopRequireDefault(require("./Search/Filter/ReduxFacetFilter"));
var _Header = _interopRequireDefault(require("./Header"));
var _DictionaryView = _interopRequireDefault(require("./DictionaryView/DictionaryView"));
require("./DataDictionary.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var DataDictionary = function DataDictionary(_ref) {
  var classes = _ref.classes,
    onSetGraphView = _ref.onSetGraphView,
    isGraphView = _ref.isGraphView,
    pdfDownloadConfig = _ref.pdfDownloadConfig,
    dictionary = _ref.dictionary;
  var dictionarySearcherRef = _react["default"].useRef();
  var setGraphView = function setGraphView(isGraphView) {
    onSetGraphView(isGraphView);
  };
  _react["default"].useEffect(function () {
    setGraphView(true);
  }, []);
  var handleClickSearchHistoryItem = function handleClickSearchHistoryItem(keyword) {
    dictionarySearcherRef.current.launchSearchFromOutside(keyword);
  };
  var handleClearSearchResult = function handleClearSearchResult() {
    dictionarySearcherRef.current.launchClearSearchFromOutside();
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.dictionaryContainer
  }, /*#__PURE__*/_react["default"].createElement(_Header["default"], {
    pdfDownloadConfig: pdfDownloadConfig
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.dataDictionary
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.sidebar
  }, /*#__PURE__*/_react["default"].createElement(_DictionarySearcher["default"], {
    ref: dictionarySearcherRef
  }), /*#__PURE__*/_react["default"].createElement(_DictionarySearchHistory["default"], {
    onClickSearchHistoryItem: handleClickSearchHistoryItem
  }), /*#__PURE__*/_react["default"].createElement(_ReduxFacetFilter["default"], null)), /*#__PURE__*/_react["default"].createElement(_DictionaryView["default"], {
    pdfDownloadConfig: pdfDownloadConfig,
    handleClearSearchResult: handleClearSearchResult,
    dictionary: dictionary,
    isGraphView: isGraphView
  })));
};
DataDictionary.propTypes = {
  onSetGraphView: _propTypes["default"].func,
  isGraphView: _propTypes["default"].bool
};
DataDictionary.defaultProps = {
  onSetGraphView: function onSetGraphView() {},
  isGraphView: false
};
var styles = function styles() {
  return {
    dictionaryContainer: {
      marginTop: "-40px",
      overflowY: "hidden",
      background: '#fff'
    },
    dataDictionary: {
      display: "flex",
      height: "calc(100vh)"
    },
    container: {
      paddingTop: "60px",
      fontFamily: "Raleway, sans-serif",
      paddingLeft: "27px",
      paddingRight: "27px"
    },
    detailContainer: {
      margin: "auto",
      paddingTop: "30px",
      paddingLeft: "50px",
      paddingRight: "50px",
      letterSpacing: "0.014em",
      color: "#000000",
      size: "12px",
      lineHeight: "23px"
    },
    sidebar: {
      width: "320px",
      minWidth: "320px",
      height: "100%",
      marginTop: "-3px",
      overflowY: "auto",
      boxShadow: "inset -10px -1px 10px -7px rgb(50 50 50 / 25%)",
      borderTopRightRadius: "7px"
    },
    mainGraphView: {
      width: "calc(100vw - 320px)",
      minWidth: "900px"
    },
    mainTableView: {
      width: "calc(100vw - 320px)",
      minWidth: "900px",
      overflowY: "scroll"
    }
  };
};
var _default = exports["default"] = (0, _core.withStyles)(styles)(DataDictionary);