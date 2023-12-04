"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _FacetFilters = _interopRequireDefault(require("./FacetFilters"));
var _graph = require("../../Store/actions/graph");
var _filter = require("../../Store/actions/filter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ReduxFacetFilters = function ReduxFacetFilters(props) {
  return /*#__PURE__*/_react["default"].createElement(_FacetFilters["default"], props);
};
var mapStateToProps = function mapStateToProps(state) {
  return state;
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
    onToggleCheckBox: function onToggleCheckBox(toggleCheckBoxItem) {
      return dispatch((0, _filter.toggleCheckBox)(toggleCheckBoxItem));
    },
    onSortSection: function onSortSection(groupName, sortBy) {
      return dispatch((0, _filter.sortSection)(groupName, sortBy));
    },
    onClearGroupFilter: function onClearGroupFilter(groupName) {
      return dispatch((0, _filter.clearGroupFilter)(groupName));
    }
  };
};
var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReduxFacetFilters);
exports["default"] = _default;