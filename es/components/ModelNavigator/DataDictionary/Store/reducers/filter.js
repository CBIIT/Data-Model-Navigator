"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moduleReducers = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var actionTypes = _interopRequireWildcard(require("../actions/actionTypes"));
var _filterUtil = require("../../Utils/filterUtil");
var _CanvasHelper = require("../../ReactFlowGraph/Canvas/CanvasHelper");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var initialState = {
  allActiveFilters: {},
  unfilteredDictionary: {},
  filteredDictionary: {},
  activeFilter: false,
  filtersCleared: false,
  filterGroup: '',
  filterHashMap: new Map(),
  filterConfig: {}
};
var defaultFilterConfig = {
  facetSearchData: [],
  facetSectionVariables: {},
  resetIcon: {},
  baseFilters: {},
  filterSections: [],
  filterOptions: []
};

// sorting variables
var sortTypes = {
  SUBJECTS: 'subjects',
  NAME: 'name',
  COUNT: 'count'
};

/**
 * Sort checkboxes by single section
 *
 * @param {array} checkboxData
 * @return {array}
 */
var sortBySection = function sortBySection(checkboxData, sortType) {
  if (sortType === sortTypes.SUBJECTS) {
    checkboxData.sort(function (a, b) {
      return b.subjects - a.subjects;
    });
  } else {
    checkboxData.sort(function (a, b) {
      return a.name > b.name || -(a.name < b.name);
    });
  }
  checkboxData = sortByCheckedItem(checkboxData);
  return checkboxData;
};
/**
 * Sort checkboxes by Checked
 *
 * @param {array} checkboxData
 * @return {array}
 */

var sortByCheckedItem = function sortByCheckedItem(checkboxData) {
  return checkboxData.sort(function (a, b) {
    return b.isChecked - a.isChecked;
  });
};

/**
 * sort all the checkbox in facet search
 * @param {array} checkboxData
 * @param {object} sortByList
 * @returns
 */

var sortFacetSections = function sortFacetSections(checkboxData, sortByList) {
  var sortCheckBoxItem = _lodash["default"].cloneDeep(checkboxData);
  sortCheckBoxItem.forEach(function (item) {
    var sortType = sortByList && sortByList[item.datafield] === sortTypes.COUNT ? sortTypes.SUBJECTS : sortTypes.NAME;
    item.checkboxItems = sortBySection(item.checkboxItems, sortType);
  });
  return sortCheckBoxItem;
};

/**
 * toggle check box action
 * @param {object} state
 * @param {*} action
 * @returns
 */
var toggleCheckBox = function toggleCheckBox(payload, state) {
  var allActiveFilters = (0, _filterUtil.toggleCheckBoxAction)(payload, state);
  var updatedCheckboxData = (0, _filterUtil.setSelectedFilterValues)(state.facetfilterConfig.facetSearchData, allActiveFilters);
  var filtered = (0, _filterUtil.generateSubjectCountsAndFilterData)(state, allActiveFilters, payload);
  var sortCheckboxData = (0, _filterUtil.setSubjectCount)(updatedCheckboxData, filtered.subjectCounts);
  updatedCheckboxData = sortFacetSections(sortCheckboxData, state.sortByList);
  var updateState = _objectSpread(_objectSpread({}, state), {}, {
    dictionary: (0, _filterUtil.setNodeHierarchy)(filtered.dictionary, state.nodeHierarchy),
    allActiveFilters: allActiveFilters,
    checkbox: {
      data: (0, _filterUtil.setSubjectCount)(updatedCheckboxData, filtered.subjectCounts)
    }
  });
  return updateState;
};
var moduleReducers = exports.moduleReducers = function moduleReducers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var payload = action.payload;
  var filtered;
  switch (action.type) {
    case actionTypes.RECEIVE_DICTIONARY:
      var filterConfig = payload && payload.facetfilterConfig ? payload.facetfilterConfig : defaultFilterConfig;
      var dictionary = (0, _filterUtil.getDictionaryWithExcludeSystemProperties)(payload.data);
      filtered = (0, _filterUtil.generateSubjectCountsAndFilterData)(dictionary);
      return _objectSpread(_objectSpread({}, state), {}, {
        dictionary: dictionary,
        nodeHierarchy: Object.keys(dictionary),
        properties: payload.properties,
        nodeTypes: (0, _filterUtil.getNodeTypes)(payload.data),
        file_nodes: (0, _filterUtil.getFileNodes)(payload.data),
        allActiveFilters: (0, _filterUtil.getAllFilters)(filterConfig.facetSearchData),
        unfilteredDictionary: dictionary,
        node2Level: (0, _CanvasHelper.generateNodeTree)(dictionary),
        filteredDictionary: dictionary,
        filterHashMap: (0, _filterUtil.initializeFilterHashMap)(dictionary, filterConfig.filterSections),
        subjectCountObject: filtered,
        facetfilterConfig: filterConfig,
        readMeConfig: payload.readMeConfig,
        graphViewConfig: payload.graphViewConfig,
        assetConfig: payload.assetConfig,
        ctrlVocabConfig: payload.ctrlVocabConfig,
        checkbox: {
          data: (0, _filterUtil.setSubjectCount)(filterConfig.facetSearchData, filtered.subjectCounts)
        },
        pageConfig: payload.pageConfig,
        loadingExampleConfig: payload.loadingExampleConfig
      });
    case actionTypes.FILTER_DATA_EXPLORER:
      return toggleCheckBox(payload, state);
    case actionTypes.CLEAR_ALL_FILTERS:
      filtered = (0, _filterUtil.generateSubjectCountsAndFilterData)(state.unfilteredDictionary);
      var checkboxItems = sortFacetSections((0, _filterUtil.setSubjectCount)(state.facetfilterConfig.facetSearchData, filtered.subjectCounts), state.sortByList);
      return _objectSpread(_objectSpread({}, state), {}, {
        dictionary: state.unfilteredDictionary,
        filteredDictionary: state.unfilteredDictionary,
        subjectCountObject: filtered,
        allActiveFilters: state.facetfilterConfig.baseFilters,
        activeFilter: false,
        filtersCleared: true,
        checkbox: {
          data: checkboxItems
        },
        ortByList: _objectSpread({}, state.sortByList)
      });
    case actionTypes.SORT_SINGLE_SECTION:
      var groupData = state.checkbox.data.filter(function (group) {
        return payload.groupName === group.datafield;
      })[0];
      var _state = state,
        sortByList = _state.sortByList;
      sortByList = sortByList || {};
      var sortType = payload.sortBy === sortTypes.COUNT ? sortTypes.SUBJECTS : sortTypes.NAME;
      var sortedCheckboxItems = sortBySection(groupData.checkboxItems, sortType);
      sortByList[groupData.datafield] = payload.sortBy;
      var data = state.checkbox.data.map(function (group) {
        if (group.datafield === groupData.datafield) {
          var updatedGroupData = group;
          updatedGroupData.checkboxItems = sortedCheckboxItems;
          return updatedGroupData;
        }
        return group;
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        checkbox: {
          data: data
        },
        sortByList: sortByList
      });
    case actionTypes.CLEAR_SECTION:
      var facetSection = payload.facetSection;
      if (state.sortByList && state.sortByList[facetSection.datafield]) {
        delete state.sortByList[facetSection.datafield];
      }
      var allFilters = state.allActiveFilters;
      allFilters[facetSection.datafield] = [];
      state = _objectSpread(_objectSpread({}, state), {}, {
        allActiveFilters: allFilters
      });
      return toggleCheckBox(payload, state);
    default:
      return state;
  }
};