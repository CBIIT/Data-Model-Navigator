"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inclusionFilterHelper = void 0;
var _filterUtil = require("./filterUtil");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// export const inclusionFilterHelper = (selectedFilters, filterHashMap) => {
//   let filteredDict = [];
//   selectedFilters.forEach(([key, value], index) => {
//     value.forEach((filterValue) => {
//       filteredDict.push(...filterHashMap.get(filterValue.toLowerCase()));
//     });
//   });
//   return Object.fromEntries(filteredDict);
// }

var filterNodesByProperty = function filterNodesByProperty() {
  var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var inclusionFilter = arguments.length > 1 ? arguments[1] : undefined;
  var dictionary = arguments.length > 2 ? arguments[2] : undefined;
  var filterProps = [];
  if (property.length == 0) {
    Object.keys(dictionary).forEach(function (elem) {
      var items = dictionary[elem].properties;
      Object.keys(items).forEach(function (key) {
        property.push(items[key]);
      });
    });
  }
  inclusionFilter.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      items = _ref2[1];
    var toLowerCase = items.map(function (e) {
      return e.toLowerCase();
    });
    if (key === 'inclusion') {
      filterProps = filterProps.filter(function (item) {
        return toLowerCase.indexOf(item.propertyType) !== -1;
      });
    } else {
      filterProps = filterProps.filter(function (item) {
        return toLowerCase.indexOf(item.display) !== -1;
      });
    }
  });
  var filterDictionary = {};
  property.forEach(function (item) {
    if (!filterDictionary[item.category]) {
      filterDictionary[item.category] = dictionary[item.category];
    }
  });
  return filterDictionary;
};
var getPropertySubjectCountAndFilterDictionary = function getPropertySubjectCountAndFilterDictionary(dictionary, inclusionFilter) {
  var nodeProperies = [];
  var subjectCount = {};
  // get properties from node present on dictionary
  if (dictionary) {
    Object.keys(dictionary).forEach(function (elem) {
      var items = dictionary[elem].properties;
      Object.keys(items).forEach(function (key) {
        nodeProperies.push(items[key]);
      });
    });
  }
  var filterProps = nodeProperies;
  if (inclusionFilter.length > 1) {
    inclusionFilter.forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        items = _ref4[1];
      var toLowerCase = items.map(function (e) {
        return e.toLowerCase();
      });
      if (key === 'inclusion') {
        filterProps = filterProps.filter(function (item) {
          return toLowerCase.indexOf(item.propertyType) !== -1;
        });
      } else {
        filterProps = filterProps.filter(function (item) {
          return toLowerCase.indexOf(item.display) !== -1;
        });
      }
    });
    filterProps.forEach(function (item) {
      if (!subjectCount[item.display]) {
        subjectCount[item.display] = 0;
      }
      ;
      subjectCount[item.display] += 1;
      if (!subjectCount[item.propertyType]) {
        subjectCount[item.propertyType] = 0;
      }
      ;
      subjectCount[item.propertyType] += 1;
    });
    var _filterDictionary = filterNodesByProperty(filterProps, inclusionFilter, dictionary);
    return {
      count: subjectCount,
      dictionary: _filterDictionary
    };
  }
  inclusionFilter.forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      items = _ref6[1];
    var toLowerCase = items.map(function (e) {
      return e.toLowerCase();
    });
    filterProps.forEach(function (prop) {
      toLowerCase.forEach(function (item) {
        if ("".concat(prop.display).toLowerCase() == item || "".concat(prop.propertyType).toLowerCase() == item) {
          if (!subjectCount[prop.display]) {
            subjectCount[prop.display] = 0;
          }
          subjectCount[prop.display] += 1;
          if (!subjectCount[prop.propertyType]) {
            subjectCount[prop.propertyType] = 0;
          }
          subjectCount[prop.propertyType] += 1;
        }
      });
    });
  });
  var filterDictionary = filterNodesByProperty(filterProps, inclusionFilter, dictionary);
  return {
    count: subjectCount,
    dictionary: filterDictionary
  };
};
var inclusionFilterHelper = exports.inclusionFilterHelper = function inclusionFilterHelper(data, allActiveFilters, currentFilter) {
  var processedFilters = Object.entries(allActiveFilters).filter(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      value = _ref8[1];
    return value.length > 0;
  });
  //** initial state when there is no active filters */
  var unfilteredDictionary = data.unfilteredDictionary,
    filterHashMap = data.filterHashMap,
    facetfilterConfig = data.facetfilterConfig,
    properties = data.properties;
  if (processedFilters.length == 0) {
    var dictionary = !unfilteredDictionary ? data : unfilteredDictionary;
    return {
      subjectCounts: (0, _filterUtil.getSubjectItemCount)(dictionary),
      dictionary: dictionary
    };
  }

  //** check active filters */
  var filterSections = processedFilters.map(function (item) {
    return item[0];
  });
  var selectedSections = facetfilterConfig.facetSearchData.filter(function (section) {
    return filterSections.indexOf(section.datafield) !== -1;
  });
  var filteredDictionary = (0, _filterUtil.newHandleExplorerFilter)(processedFilters, filterHashMap);
  var filteredDictCounts = (0, _filterUtil.getSubjectItemCount)(filteredDictionary);

  //** if any inclusion filter is active - inclusion behavior for both filter by inclusion and nodes */
  var inclusion = allActiveFilters.inclusion,
    uiDisplay = allActiveFilters.uiDisplay;
  // create new dictionary to track properties count only
  var currectSelectedSection = facetfilterConfig.facetSearchData.filter(function (section) {
    return section.datafield === currentFilter.datafield;
  });
  var inclusionItem = 'inclusion';
  var uiDisplayItem = 'uiDisplay';
  var activeInclusionFilter = currentFilter.datafield === inclusionItem || currentFilter.datafield === uiDisplayItem;
  var inclusionSections = facetfilterConfig.facetSearchData.filter(function (section) {
    return section.datafield === inclusionItem || section.datafield === uiDisplayItem;
  });
  var filterByUiDisplay = processedFilters.filter(function (item) {
    return item[0] === uiDisplayItem;
  });
  var filterByInclusion = processedFilters.filter(function (item) {
    return item[0] === inclusionItem || item[0] === uiDisplayItem;
  });
  var filterWithoutInclusion = processedFilters.filter(function (item) {
    return item[0] !== inclusionItem && item[0] !== uiDisplayItem;
  });

  //** generate inclusion filtered dictionary */
  var inclusionDictionary = (0, _filterUtil.newHandleExplorerFilter)(filterByInclusion, filterHashMap);
  var noneInclusionDictionary = (0, _filterUtil.newHandleExplorerFilter)(filterWithoutInclusion, filterHashMap);
  //** select exclusion filter dictionary filteredDictionary if filter item is more than 2 */
  var selectDictionary = processedFilters.length < 4 ? inclusionDictionary : filteredDictionary;
  var selectedSectionCounts = (0, _filterUtil.getSubjectItemCount)(selectDictionary, selectedSections, currentFilter);
  var inclusionFilterItems = facetfilterConfig.facetSearchData.filter(function (item) {
    return item.datafield === inclusionItem;
  })[0];
  var uiDisplayFilterItems = facetfilterConfig.facetSearchData.filter(function (item) {
    return item.datafield === uiDisplayItem;
  })[0];
  var facetSectionCount = filteredDictCounts;
  var propsFilter = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, filterByInclusion);
  var inclusionSubjectCount = propsFilter.count;

  //** When all inclusion facet search filter are active*/
  if (filterByInclusion.length === 2 && filterWithoutInclusion.length == 0) {
    var filter = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, filterByInclusion);
    inclusionSubjectCount = filter.count;
    filteredDictionary = filter.dictionary;
    var otherFilterItem = currentFilter.datafield !== inclusionItem ? inclusionFilterItems : uiDisplayFilterItems;
    otherFilterItem.checkboxItems.forEach(function (item) {
      filteredDictCounts[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
    });
    var currentrFilter = filterByInclusion.filter(function (item) {
      return item[0] !== currentFilter.datafield;
    });
    var allInclusionFilterItem = [["inclusion", ["Preferred", "Required", "Optional"]]].concat(_toConsumableArray(filterByUiDisplay));
    var inclusionFilters = !activeInclusionFilter ? allInclusionFilterItem : currentrFilter;
    var currentPropsFilter = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, inclusionFilters);
    var currentPropsFilterCount = currentPropsFilter.count;
    facetSectionCount = (0, _filterUtil.getSubjectItemCount)(filter.dictionary);
    inclusionFilterItems.checkboxItems.forEach(function (item) {
      facetSectionCount[item.group] = currentPropsFilterCount[item.group] ? currentPropsFilterCount[item.group] : 0;
    });
    uiDisplayFilterItems.checkboxItems.forEach(function (item) {
      facetSectionCount[item.group] = currentPropsFilterCount[item.group] ? currentPropsFilterCount[item.group] : 0;
    });
    var _combinedSubjectCounts = Object.assign({}, facetSectionCount, inclusionSubjectCount);
    return {
      subjectCounts: _combinedSubjectCounts,
      dictionary: filteredDictionary
    };
  }
  if (filterByInclusion.length === 1 && filterWithoutInclusion.length === 0) {
    //filter dictionary by inclusion
    var nonInclusionSectionCounts = (0, _filterUtil.getSubjectItemCount)(unfilteredDictionary, selectedSections);
    var _filter = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, filterByInclusion);
    inclusionSubjectCount = _filter.count;
    if (inclusion.length > 0 && uiDisplay.length === 0) {
      uiDisplayFilterItems.checkboxItems.forEach(function (item) {
        filteredDictCounts[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
      });
    }
    if (uiDisplay.length > 0 && inclusion.length === 0) {
      inclusionFilterItems.checkboxItems.forEach(function (item) {
        filteredDictCounts[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
      });
    }
    var _combinedSubjectCounts2 = Object.assign({}, filteredDictCounts, nonInclusionSectionCounts);
    return {
      subjectCounts: _combinedSubjectCounts2,
      dictionary: filteredDictionary
    };
  }

  //** when inclusion by filter is two and node facet section is one */
  if (filterByInclusion.length === 2 && filterWithoutInclusion.length === 1) {
    //** chcek if the current filter inclusion filter */
    if (activeInclusionFilter) {
      /** get current filter  */
      var currentInculsionSection = filterByInclusion.filter(function (item) {
        return item[0] !== currentFilter.datafield;
      });
      var currentInculsionFilter = getPropertySubjectCountAndFilterDictionary(filteredDictionary, currentInculsionSection);
      var inclusionFilterOnFilteredDictionary = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
      // const selectedFilterCount = currentInculsionFilter.count;
      var _inclusionSubjectCount = inclusionFilterOnFilteredDictionary.count;
      // ** adjust inclusion subject count with node filter */
      var _allInclusionFilterItem = [["inclusion", ["Preferred", "Required", "Optional"]]].concat(_toConsumableArray(filterByUiDisplay));

      //** get count for all the inclusion subject */
      var allInclusionFilters = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, _allInclusionFilterItem);
      var allInclusionSubjectCount = allInclusionFilters.count;

      //**  get count for only active inclusion fiters*/
      var activeInclusionFilters = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
      var activeInclusionSubjectCount = activeInclusionFilters.count;
      var inclusionFilterOnUnFilteredDictionary = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, filterByInclusion);
      var subjectCount1 = (0, _filterUtil.getSubjectItemCount)(inclusionFilterOnFilteredDictionary.dictionary);
      var subjectCount2 = (0, _filterUtil.getSubjectItemCount)(inclusionFilterOnUnFilteredDictionary.dictionary);

      // update the subject
      var overideSubjectCount = {};
      //** update the inclusion subject count base on active or all inclusion filter */
      inclusionFilterItems.checkboxItems.forEach(function (item) {
        _inclusionSubjectCount[item.group] = activeInclusionSubjectCount[item.group] ? activeInclusionSubjectCount[item.group] : allInclusionSubjectCount[item.group];
      });
      uiDisplayFilterItems.checkboxItems.forEach(function (item) {
        _inclusionSubjectCount[item.group] = activeInclusionSubjectCount[item.group] ? activeInclusionSubjectCount[item.group] : allInclusionSubjectCount[item.group];
      });
      Object.keys(subjectCount1).forEach(function (key) {
        overideSubjectCount[key] = subjectCount1[key] > 0 ? subjectCount1[key] : subjectCount2[key];
      });
      var _combinedSubjectCounts3 = Object.assign({}, overideSubjectCount, _inclusionSubjectCount);
      return {
        subjectCounts: _combinedSubjectCounts3,
        dictionary: inclusionFilterOnFilteredDictionary.dictionary
      };
    }
    //** when node filter facet is current selection */
    if (!activeInclusionFilter) {
      //** if the filter section facet is not inclusion */
      var inclusionFilter = getPropertySubjectCountAndFilterDictionary(inclusionDictionary, filterByInclusion);
      facetSectionCount = (0, _filterUtil.getSubjectItemCount)(inclusionFilter.dictionary);
      var filterByNodeInclusion = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByInclusion);
      var subjectCount = (0, _filterUtil.getSubjectItemCount)(filterByNodeInclusion.dictionary);
      // ** adjust inclusion subject count with node filter */
      var _allInclusionFilterItem2 = [["inclusion", ["Preferred", "Required", "Optional"]]].concat(_toConsumableArray(filterByUiDisplay));

      //** get count for all the inclusion subject */
      var _allInclusionFilters = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, _allInclusionFilterItem2);
      var _allInclusionSubjectCount = _allInclusionFilters.count;

      //**  get count for only active inclusion fiters*/
      var _activeInclusionFilters = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
      var _activeInclusionSubjectCount = _activeInclusionFilters.count;
      var _overideSubjectCount = {};
      //** update the inclusion subject count base on active or all inclusion filter */
      inclusionFilterItems.checkboxItems.forEach(function (item) {
        _overideSubjectCount[item.group] = _activeInclusionSubjectCount[item.group] ? _activeInclusionSubjectCount[item.group] : _allInclusionSubjectCount[item.group];
      });
      uiDisplayFilterItems.checkboxItems.forEach(function (item) {
        _overideSubjectCount[item.group] = _activeInclusionSubjectCount[item.group] ? _activeInclusionSubjectCount[item.group] : _allInclusionSubjectCount[item.group];
      });

      //** update the subject count for the current section */
      var currentSelection = selectedSections.filter(function (item) {
        return item.datafield === currentFilter.datafield;
      })[0];
      if (currentSelection) {
        currentSelection.checkboxItems.forEach(function (item) {
          var key = item.name.toLowerCase();
          _overideSubjectCount[key] = facetSectionCount[key];
        });
      } else {
        // update the last checked section of filter by node
        subjectCount = (0, _filterUtil.getSubjectItemCount)(filteredDictionary);
        var activeSection = facetfilterConfig.facetSearchData.filter(function (section) {
          return filterWithoutInclusion[0][0].includes(section.datafield);
        });
        activeSection[0].checkboxItems.forEach(function (item) {
          var key = item.name.toLowerCase();
          _overideSubjectCount[key] = facetSectionCount[key];
        });
      }
      var _combinedSubjectCounts4 = Object.assign({}, subjectCount, _overideSubjectCount);
      //set filtered dcitionary based on node and inclusion filter
      filteredDictionary = _activeInclusionFilters.dictionary;
      //return filtered dictionary and subject count
      return {
        subjectCounts: _combinedSubjectCounts4,
        dictionary: filteredDictionary
      };
    }
  }
  if (filterByInclusion.length === 1 && filterWithoutInclusion.length === 1) {
    var _allInclusionFilterItem3 = [["inclusion", ["Preferred", "Required", "Optional"]], ["uiDisplay", ["Yes", "No"]]];
    var allInclusionFilter = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, _allInclusionFilterItem3);
    var _currentPropsFilterCount = allInclusionFilter.count;
    var selectedInclusionFilter = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByInclusion);
    var selectedInclusionFilterCount = selectedInclusionFilter.count;
    var _overideSubjectCount2 = {};
    if (uiDisplay.length > 0) {
      inclusionFilterItems.checkboxItems.forEach(function (item) {
        _overideSubjectCount2[item.group] = selectedInclusionFilterCount[item.group] ? selectedInclusionFilterCount[item.group] : 0;
      });
      uiDisplayFilterItems.checkboxItems.forEach(function (item) {
        _overideSubjectCount2[item.group] = _currentPropsFilterCount[item.group] ? _currentPropsFilterCount[item.group] : 0;
      });
    } else {
      uiDisplayFilterItems.checkboxItems.forEach(function (item) {
        _overideSubjectCount2[item.group] = selectedInclusionFilterCount[item.group] ? selectedInclusionFilterCount[item.group] : 0;
      });
      inclusionFilterItems.checkboxItems.forEach(function (item) {
        _overideSubjectCount2[item.group] = _currentPropsFilterCount[item.group] ? _currentPropsFilterCount[item.group] : 0;
      });
    }
    //** set current section with filter by inclusion */
    var _nonInclusionSectionCounts = (0, _filterUtil.getSubjectItemCount)(inclusionDictionary, selectedSections);
    var _combinedSubjectCounts5 = Object.assign({}, filteredDictCounts, _nonInclusionSectionCounts, _overideSubjectCount2);
    return {
      subjectCounts: _combinedSubjectCounts5,
      dictionary: filteredDictionary
    };
  }
  if (filterByInclusion.length === 2 && filterWithoutInclusion.length === 2) {
    if (activeInclusionFilter) {
      /** get current filter  */
      var _currentInculsionSection = filterByInclusion.filter(function (item) {
        return item[0] !== currentFilter.datafield;
      });
      var _currentInculsionFilter = getPropertySubjectCountAndFilterDictionary(filteredDictionary, _currentInculsionSection);
      var _inclusionFilterOnFilteredDictionary = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
      // const selectedFilterCount = currentInculsionFilter.count;
      var _inclusionSubjectCount2 = _inclusionFilterOnFilteredDictionary.count;
      // ** adjust inclusion subject count with node filter */
      var _allInclusionFilterItem4 = [["inclusion", ["Preferred", "Required", "Optional"]]].concat(_toConsumableArray(filterByUiDisplay));

      //** get count for all the inclusion subject */
      var _allInclusionFilters2 = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, _allInclusionFilterItem4);
      var _allInclusionSubjectCount2 = _allInclusionFilters2.count;

      //**  get count for only active inclusion fiters*/
      var _activeInclusionFilters2 = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
      var _activeInclusionSubjectCount2 = _activeInclusionFilters2.count;
      var _inclusionFilterOnUnFilteredDictionary = getPropertySubjectCountAndFilterDictionary(unfilteredDictionary, filterByInclusion);
      // const subjectCount1 = getSubjectItemCount(inclusionFilterOnFilteredDictionary.dictionary);
      // const subjectCount2 = getSubjectItemCount(inclusionFilterOnUnFilteredDictionary.dictionary);

      // update the subject
      var _overideSubjectCount3 = {};
      //** update the inclusion subject count base on active or all inclusion filter */
      inclusionFilterItems.checkboxItems.forEach(function (item) {
        _inclusionSubjectCount2[item.group] = _activeInclusionSubjectCount2[item.group] ? _activeInclusionSubjectCount2[item.group] : _allInclusionSubjectCount2[item.group];
      });
      uiDisplayFilterItems.checkboxItems.forEach(function (item) {
        _inclusionSubjectCount2[item.group] = _activeInclusionSubjectCount2[item.group] ? _activeInclusionSubjectCount2[item.group] : _allInclusionSubjectCount2[item.group];
      });
      var otherFilters = filterWithoutInclusion.filter(function (item) {
        return item[0] !== currentFilter.datafield;
      });
      var otherInclusionDictionary = (0, _filterUtil.newHandleExplorerFilter)(otherFilters, filterHashMap);
      var otherFilterByInclusion = getPropertySubjectCountAndFilterDictionary(otherInclusionDictionary, filterByInclusion);
      var otherSelectionCounts = (0, _filterUtil.getSubjectItemCount)(otherFilterByInclusion.dictionary, selectedSections);
      selectedSections.forEach(function (section) {
        section.checkboxItems.forEach(function (item) {
          var key = item.name.toLowerCase();
          _overideSubjectCount3[key] = otherSelectionCounts[key];
        });
      });
      // Object.keys(subjectCount1).forEach(key => {
      //   overideSubjectCount[key] = (subjectCount1[key] > 0) ? subjectCount1[key] : subjectCount2[key];
      // });
      var _combinedSubjectCounts6 = Object.assign({}, _overideSubjectCount3, _inclusionSubjectCount2);
      return {
        subjectCounts: _combinedSubjectCounts6,
        dictionary: _inclusionFilterOnFilteredDictionary.dictionary
      };
    } else {
      var _inclusionFilter = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByInclusion);
      facetSectionCount = (0, _filterUtil.getSubjectItemCount)(_inclusionFilter.dictionary);
      var _filterByNodeInclusion = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByInclusion);
      var _subjectCount = (0, _filterUtil.getSubjectItemCount)(_filterByNodeInclusion.dictionary);
      // ** adjust inclusion subject count with node filter */
      var _allInclusionFilterItem5 = [["inclusion", ["Preferred", "Required", "Optional"]]].concat(_toConsumableArray(filterByUiDisplay));

      //** get count for all the inclusion subject */
      var _allInclusionFilters3 = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, _allInclusionFilterItem5);
      var _allInclusionSubjectCount3 = _allInclusionFilters3.count;

      //**  get count for only active inclusion fiters*/
      var _activeInclusionFilters3 = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
      var _activeInclusionSubjectCount3 = _activeInclusionFilters3.count;

      //** update the inclusion subject count base on active or all inclusion filter */
      inclusionFilterItems.checkboxItems.forEach(function (item) {
        _subjectCount[item.group] = _activeInclusionSubjectCount3[item.group] ? _activeInclusionSubjectCount3[item.group] : _allInclusionSubjectCount3[item.group];
      });
      uiDisplayFilterItems.checkboxItems.forEach(function (item) {
        _subjectCount[item.group] = _activeInclusionSubjectCount3[item.group] ? _activeInclusionSubjectCount3[item.group] : _allInclusionSubjectCount3[item.group];
      });

      //** update the subject count for the current section */
      var _currentSelection = selectedSections.filter(function (item) {
        return item.datafield === currentFilter.datafield;
      })[0];
      if (_currentSelection) {
        var _otherFilters = filterWithoutInclusion.filter(function (item) {
          return item[0] !== currentFilter.datafield;
        });
        var _otherInclusionDictionary = (0, _filterUtil.newHandleExplorerFilter)(_otherFilters, filterHashMap);
        var _otherFilterByInclusion = getPropertySubjectCountAndFilterDictionary(_otherInclusionDictionary, filterByInclusion);
        var _otherSelectionCounts = (0, _filterUtil.getSubjectItemCount)(_otherFilterByInclusion.dictionary, selectedSections);
        _currentSelection.checkboxItems.forEach(function (item) {
          var key = item.name.toLowerCase();
          _subjectCount[key] = _otherSelectionCounts[key];
        });
      }
      //set filtered dcitionary based on node and inclusion filter
      filteredDictionary = _activeInclusionFilters3.dictionary;
      //return filtered dictionary and subject count
      return {
        subjectCounts: _subjectCount,
        dictionary: filteredDictionary
      };
    }
  }
  if (filterByInclusion.length === 1 && filterWithoutInclusion.length === 2) {
    var _nonInclusionSectionCounts2 = (0, _filterUtil.getSubjectItemCount)(noneInclusionDictionary, selectedSections, currentFilter);
    propsFilter = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
    inclusionSubjectCount = propsFilter.count;
    var _currentSelection2 = selectedSections.filter(function (item) {
      return item.datafield === currentFilter.datafield;
    })[0];
    var _otherFilters2 = processedFilters.filter(function (item) {
      return item[0] !== currentFilter.datafield;
    });
    var _otherInclusionDictionary2 = (0, _filterUtil.newHandleExplorerFilter)(_otherFilters2, filterHashMap);
    var _otherSelectionCounts2 = (0, _filterUtil.getSubjectItemCount)(_otherInclusionDictionary2, selectedSections, currentFilter);
    if (_currentSelection2) {
      var _overideSubjectCount4 = {};
      _currentSelection2.checkboxItems.forEach(function (item) {
        var key = item.name.toLowerCase();
        _overideSubjectCount4[key] = _otherSelectionCounts2[key];
      });
      var filterByPropType = processedFilters.filter(function (item) {
        return item[0] === inclusionItem;
      });
      var _filter2 = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByPropType);
      var filterCount = _filter2.count;
      uiDisplayFilterItems.checkboxItems.forEach(function (item) {
        _overideSubjectCount4[item.group] = filterCount[item.group] ? filterCount[item.group] : 0;
      });
      if (inclusion.length > 0) {
        inclusionFilterItems.checkboxItems.forEach(function (item) {
          _overideSubjectCount4[item.group] = _nonInclusionSectionCounts2[item.group] ? _nonInclusionSectionCounts2[item.group] : 0;
        });
        uiDisplayFilterItems.checkboxItems.forEach(function (item) {
          _overideSubjectCount4[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
        });
      }
      if (uiDisplay.length > 0) {
        uiDisplayFilterItems.checkboxItems.forEach(function (item) {
          _overideSubjectCount4[item.group] = _nonInclusionSectionCounts2[item.group] ? _nonInclusionSectionCounts2[item.group] : 0;
        });
        inclusionFilterItems.checkboxItems.forEach(function (item) {
          _overideSubjectCount4[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
        });
      }
      var _combinedSubjectCounts7 = Object.assign({}, filteredDictCounts, _overideSubjectCount4);
      return {
        subjectCounts: _combinedSubjectCounts7,
        dictionary: filteredDictionary
      };
    } else {
      var _overideSubjectCount5 = {};
      var uncheckedSection = facetfilterConfig.facetSearchData.filter(function (item) {
        return item.datafield === currentFilter.datafield;
      })[0];
      inclusionFilterItems.checkboxItems.forEach(function (item) {
        _overideSubjectCount5[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
      });
      uiDisplayFilterItems.checkboxItems.forEach(function (item) {
        _overideSubjectCount5[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
      });
      if (currentFilter.datafield === inclusionItem) {
        var inclusionCount = (0, _filterUtil.getSubjectItemCount)(noneInclusionDictionary);
        uiDisplayFilterItems.checkboxItems.forEach(function (item) {
          _overideSubjectCount5[item.group] = inclusionCount[item.group] ? inclusionCount[item.group] : 0;
        });
      }
      if (currentFilter.datafield === uiDisplayItem) {
        var _inclusionCount = (0, _filterUtil.getSubjectItemCount)(noneInclusionDictionary);
        inclusionFilterItems.checkboxItems.forEach(function (item) {
          _overideSubjectCount5[item.group] = _inclusionCount[item.group] ? _inclusionCount[item.group] : 0;
        });
      }
      var inclusionFilterCounts = (0, _filterUtil.getSubjectItemCount)(inclusionDictionary);
      var categorySection = facetfilterConfig.facetSearchData.filter(function (item) {
        return item.datafield === "category";
      })[0];
      categorySection.checkboxItems.forEach(function (item) {
        var key = item.name.toLowerCase();
        _overideSubjectCount5[key] = inclusionFilterCounts[key];
      });
      if (!activeInclusionFilter) {
        if (uncheckedSection) {
          uncheckedSection.checkboxItems.forEach(function (item) {
            var key = item.name.toLowerCase();
            _overideSubjectCount5[key] = filteredDictCounts[key];
          });
        }
      }
      var _combinedSubjectCounts8 = Object.assign({}, filteredDictCounts, _overideSubjectCount5);
      return {
        subjectCounts: _combinedSubjectCounts8,
        dictionary: filteredDictionary
      };
    }
  }
  if (filterWithoutInclusion.length > 2) {
    var _nonInclusionSectionCounts3 = (0, _filterUtil.getSubjectItemCount)(noneInclusionDictionary, selectedSections, currentFilter);
    propsFilter = getPropertySubjectCountAndFilterDictionary(filteredDictionary, filterByInclusion);
    inclusionSubjectCount = propsFilter.count;
    var _currentSelection3 = selectedSections.filter(function (item) {
      return item.datafield === currentFilter.datafield;
    })[0];
    var _otherFilters3 = processedFilters.filter(function (item) {
      return item[0] !== currentFilter.datafield;
    });
    var _otherInclusionDictionary3 = (0, _filterUtil.newHandleExplorerFilter)(_otherFilters3, filterHashMap);
    var _otherSelectionCounts3 = (0, _filterUtil.getSubjectItemCount)(_otherInclusionDictionary3, selectedSections, currentFilter);
    if (_currentSelection3) {
      var _overideSubjectCount6 = {};
      uiDisplayFilterItems.checkboxItems.forEach(function (item) {
        _overideSubjectCount6[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
      });
      inclusionFilterItems.checkboxItems.forEach(function (item) {
        _overideSubjectCount6[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
      });
      _currentSelection3.checkboxItems.forEach(function (item) {
        var key = item.name.toLowerCase();
        _overideSubjectCount6[key] = _otherSelectionCounts3[key];
      });
      if (_currentSelection3 && filterByInclusion.length === 2) {
        if (currentFilter.datafield === inclusionItem) {
          var filterByDisplay = processedFilters.filter(function (item) {
            return item[0] === uiDisplayItem;
          });
          var _filter3 = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, filterByDisplay);
          var _filterCount = _filter3.count;
          inclusionFilterItems.checkboxItems.forEach(function (item) {
            _overideSubjectCount6[item.group] = _filterCount[item.group] ? _filterCount[item.group] : 0;
          });
        } else {
          var _filterByPropType = processedFilters.filter(function (item) {
            return item[0] === inclusionItem;
          });
          var _filter4 = getPropertySubjectCountAndFilterDictionary(noneInclusionDictionary, _filterByPropType);
          var _filterCount2 = _filter4.count;
          uiDisplayFilterItems.checkboxItems.forEach(function (item) {
            _overideSubjectCount6[item.group] = _filterCount2[item.group] ? _filterCount2[item.group] : 0;
          });
        }
      }
      if (_currentSelection3 && filterByInclusion.length === 1) {
        if (currentFilter.datafield === inclusionItem) {
          inclusionFilterItems.checkboxItems.forEach(function (item) {
            _overideSubjectCount6[item.group] = _nonInclusionSectionCounts3[item.group] ? _nonInclusionSectionCounts3[item.group] : 0;
          });
        } else {
          uiDisplayFilterItems.checkboxItems.forEach(function (item) {
            _overideSubjectCount6[item.group] = _nonInclusionSectionCounts3[item.group] ? _nonInclusionSectionCounts3[item.group] : 0;
          });
        }
      }
      if (currentFilter.datafield === 'category') {
        _currentSelection3.checkboxItems.forEach(function (item) {
          var key = item.name.toLowerCase();
          _overideSubjectCount6[key] = _otherSelectionCounts3[key];
        });
      }
      var _combinedSubjectCounts9 = Object.assign({}, filteredDictCounts, _overideSubjectCount6);
      return {
        subjectCounts: _combinedSubjectCounts9,
        dictionary: filteredDictionary
      };
    } else {
      var _overideSubjectCount7 = {};
      if (activeInclusionFilter) {
        if (currentFilter.datafield === inclusionItem) {
          inclusionFilterItems.checkboxItems.forEach(function (item) {
            _overideSubjectCount7[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
          });
        } else {
          uiDisplayFilterItems.checkboxItems.forEach(function (item) {
            _overideSubjectCount7[item.group] = inclusionSubjectCount[item.group] ? inclusionSubjectCount[item.group] : 0;
          });
        }
      }
      if (currentFilter.datafield === 'category') {
        var _categorySection = facetfilterConfig.facetSearchData.filter(function (item) {
          return item.datafield === "category";
        })[0];
        _categorySection.checkboxItems.forEach(function (item) {
          var key = item.name.toLowerCase();
          _overideSubjectCount7[key] = filteredDictCounts[key];
        });
      }
      var _combinedSubjectCounts10 = Object.assign({}, _nonInclusionSectionCounts3, _overideSubjectCount7);
      return {
        subjectCounts: _combinedSubjectCounts10,
        dictionary: filteredDictionary
      };
    }
  }
  var combinedSubjectCounts = Object.assign({}, filteredDictCounts, selectedSectionCounts);
  return {
    subjectCounts: combinedSubjectCounts,
    dictionary: filteredDictionary
  };
};