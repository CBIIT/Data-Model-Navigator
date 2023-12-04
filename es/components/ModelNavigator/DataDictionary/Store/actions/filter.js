"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleCheckBox = exports.sortSection = exports.clearGroupFilter = exports.clearAllFilters = void 0;
var actionTypes = _interopRequireWildcard(require("./actionTypes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var clearAllFilters = exports.clearAllFilters = function clearAllFilters() {
  return {
    type: actionTypes.CLEAR_ALL_FILTERS
  };
};
var toggleCheckBox = exports.toggleCheckBox = function toggleCheckBox(toggleCheckBoxItem) {
  return {
    type: actionTypes.FILTER_DATA_EXPLORER,
    payload: toggleCheckBoxItem
  };
};
var sortSection = exports.sortSection = function sortSection(groupName, sortBy) {
  return {
    type: actionTypes.SORT_SINGLE_SECTION,
    payload: {
      groupName: groupName,
      sortBy: sortBy
    }
  };
};
var clearGroupFilter = exports.clearGroupFilter = function clearGroupFilter(facetSection) {
  return {
    type: actionTypes.CLEAR_SECTION,
    payload: {
      facetSection: facetSection
    }
  };
};