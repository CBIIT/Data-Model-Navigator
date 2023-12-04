"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRedux = require("react-redux");
var _graph = require("../../Store/actions/graph");
var _OverlayPropertyTable = _interopRequireDefault(require("./OverlayPropertyTable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var getNode = function getNode(state) {
  if (state.ddgraph.isSearchMode) {
    if (state.ddgraph.highlightingMatchedNodeID) {
      return state.submission.dictionary[state.ddgraph.highlightingMatchedNodeID];
    }
    return null;
  }
  if (state.ddgraph.highlightingNode) {
    return state.submission.dictionary[state.ddgraph.highlightingNode.id];
  }
  return null;
};
var getSearchResultItem = function getSearchResultItem(state) {
  if (state.ddgraph.isSearchMode) {
    return state.ddgraph.searchResult.find(function (resItem) {
      return resItem.item.id === state.ddgraph.highlightingMatchedNodeID;
    });
  }
  return null;
};
var ReduxOverlayPropertyTable = function () {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      hidden: state.ddgraph.overlayPropertyHidden,
      node: getNode(state),
      isSearchMode: state.ddgraph.isSearchMode,
      matchedResult: getSearchResultItem(state),
      isSearchResultNodeOpened: state.ddgraph.highlightingMatchedNodeOpened
    };
  };
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onCloseOverlayPropertyTable: function onCloseOverlayPropertyTable() {
        return dispatch((0, _graph.setOverlayPropertyTableHidden)(true));
      },
      onOpenMatchedProperties: function onOpenMatchedProperties() {
        return dispatch((0, _graph.setHighlightingMatchedNodeOpened)(true));
      },
      onCloseMatchedProperties: function onCloseMatchedProperties() {
        return dispatch((0, _graph.setHighlightingMatchedNodeOpened)(false));
      }
    };
  };
  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_OverlayPropertyTable["default"]);
}();
var _default = exports["default"] = ReduxOverlayPropertyTable;