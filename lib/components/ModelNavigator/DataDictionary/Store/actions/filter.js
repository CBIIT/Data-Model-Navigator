"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleCheckBox = exports.sortSection = exports.clearGroupFilter = exports.clearAllFilters = void 0;
var actionTypes = _interopRequireWildcard(require("./actionTypes"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var clearAllFilters = function clearAllFilters() {
  return {
    type: actionTypes.CLEAR_ALL_FILTERS
  };
};
exports.clearAllFilters = clearAllFilters;
var toggleCheckBox = function toggleCheckBox(toggleCheckBoxItem) {
  return {
    type: actionTypes.FILTER_DATA_EXPLORER,
    payload: toggleCheckBoxItem
  };
};
exports.toggleCheckBox = toggleCheckBox;
var sortSection = function sortSection(groupName, sortBy) {
  return {
    type: actionTypes.SORT_SINGLE_SECTION,
    payload: {
      groupName: groupName,
      sortBy: sortBy
    }
  };
};
exports.sortSection = sortSection;
var clearGroupFilter = function clearGroupFilter(facetSection) {
  return {
    type: actionTypes.CLEAR_SECTION,
    payload: {
      facetSection: facetSection
    }
  };
};
exports.clearGroupFilter = clearGroupFilter;