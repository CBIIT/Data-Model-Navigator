"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRedux = require("react-redux");
var _graph = require("../../Store/actions/graph");
var _DictionarySearcher = _interopRequireDefault(require("./DictionarySearcher"));
var _filter = require("../../Store/actions/filter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var ReduxDictionarySearcher = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      dictionary: state.submission.dictionary,
      currentSearchKeyword: state.ddgraph.currentSearchKeyword,
      activeFiltersCount: Object.entries(state.submission.allActiveFilters).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          val = _ref2[1];
        return acc + val.length;
      }, 0 // eslint-disable-line no-unused-vars
      )
    };
  };
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onClearAllFilter: function onClearAllFilter() {
        return dispatch((0, _filter.clearAllFilters)());
      },
      onClickBlankSpace: function onClickBlankSpace() {
        return dispatch((0, _graph.clickBlankSpace)());
      },
      hidePropertyTable: function hidePropertyTable() {
        return dispatch((0, _graph.setOverlayPropertyTableHidden)(true));
      },
      setIsSearching: function setIsSearching(isSearching) {
        return dispatch((0, _graph.setIsSearching)(isSearching));
      },
      onSearchResultUpdated: function onSearchResultUpdated(result, summary) {
        return dispatch((0, _graph.setSearchResult)(result, summary));
      },
      onSearchHistoryItemCreated: function onSearchHistoryItemCreated(searchHistoryItem) {
        return dispatch((0, _graph.addSearchHistoryItem)(searchHistoryItem));
      },
      onSearchResultCleared: function onSearchResultCleared() {
        return dispatch((0, _graph.clearSearchResult)());
      },
      onSaveCurrentSearchKeyword: function onSaveCurrentSearchKeyword(keyword) {
        return dispatch((0, _graph.saveCurrentSearchKeyword)(keyword));
      },
      onStartSearching: function onStartSearching() {
        return dispatch((0, _graph.resetGraphHighlight)());
      }
    };
  };
  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
  })(_DictionarySearcher["default"]);
}();
var _default = exports["default"] = ReduxDictionarySearcher;