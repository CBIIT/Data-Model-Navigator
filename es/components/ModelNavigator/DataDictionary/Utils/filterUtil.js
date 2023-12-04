"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allFilters = allFilters;
exports.setNodeHierarchy = exports.setCheckboxItems = exports.newHandleExplorerFilter = exports.initializeFilterHashMap = exports.inclusionFilterHandler = exports.hashMapHelper = exports.getSubjectItemCount = exports.getState = exports.getNodeTypes = exports.getFileNodes = exports.getDictionaryWithExcludeSystemProperties = exports.getAllFilters = exports.generateSubjectCountsAndFilterData = exports.excludeSystemProperties = exports.createFilterVariables = void 0;
exports.setSelectedFilterValues = setSelectedFilterValues;
exports.setSelectedVlauesToTrue = setSelectedVlauesToTrue;
exports.toggleCheckBoxAction = exports.setSubjectCount = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _dataDictionaryData = require("../../bento/dataDictionaryData");
var _filter = require("../Store/actions/filter");
var _inclusionFilterHelper = require("./inclusionFilterHelper");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Helper function to query and get an object from the redux store
 * @param {string} storeKey name of store property to access
 * @param {obj} store the application redux store
 * @return {obj}
 */
var getState = exports.getState = function getState(storeKey, store) {
  return store.getState()[storeKey];
};

/**
 * Helper function to return an object of all selectable filters
 * @param {object} data custodian data containing filter value information
 * @return {obj}
 */
var getAllFilters = exports.getAllFilters = function getAllFilters(data) {
  var emptyFilters = data.reduce(function (acc, facet) {
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, facet.datafield, []));
  }, {});
  return emptyFilters;
};
function allFilters() {
  var emptyFilters = _dataDictionaryData.facetSearchData.reduce(function (acc, facet) {
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, facet.datafield, []));
  }, {});
  return emptyFilters;
}

/**
 * Returns filter variable for graphql query using the all filters.
 *
 * @param {object} data
 * @return {json}
 */
var createFilterVariables = exports.createFilterVariables = function createFilterVariables(data, currentAllActiveFilters) {
  var filter = Object.entries(currentAllActiveFilters).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      key = _ref2[0];
    if (data.datafield === key) {
      return data.isChecked ? _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, [].concat(_toConsumableArray(currentAllActiveFilters[key]), [data.name]))) : _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, currentAllActiveFilters[key].filter(function (item) {
        return item !== data.name;
      })));
    }
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, currentAllActiveFilters[key]));
  }, {});
  return filter;
};
var hashMapHelper = exports.hashMapHelper = function hashMapHelper(groupName, _ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
    key = _ref4[0],
    value = _ref4[1];
  var hashMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Set();
  switch (groupName) {
    case 'category':
    case 'assignment':
    case 'class':
      if (hashMap && hashMap.get(value[groupName])) {
        hashMap.set(value[groupName], [].concat(_toConsumableArray(hashMap.get(value[groupName])), [[key, value]]));
      }
      break;
    case 'uiDisplay':
    case 'inclusion':
      {
        var inclusionObj = value[groupName];
        if (inclusionObj) {
          Object.keys(inclusionObj).forEach(function (element) {
            if (inclusionObj[element].length > 0) {
              hashMap.set(element, [].concat(_toConsumableArray(hashMap.get(element)), [[key, value]]));
            }
          });
        }
        break;
      }
    default:
      break;
  }
};
var includeMultiFilterValue = function includeMultiFilterValue(filteredDict, filters) {
  var filterValue = filteredDict.filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      thisValue = _ref6[1];
    var returnItem = false;
    filters.forEach(function (filterValue) {
      if (thisValue[filterValue.toLowerCase()] && thisValue[filterValue.toLowerCase()].length > 0) {
        returnItem = true;
      }
    });
    return returnItem;
  });
  return filterValue;
};
var inclusionFilterHandler = exports.inclusionFilterHandler = function inclusionFilterHandler(selectedFilters, filterHashMap) {
  var filteredDict = [];
  selectedFilters.forEach(function (_ref7, index) {
    var _ref8 = _slicedToArray(_ref7, 2),
      key = _ref8[0],
      value = _ref8[1];
    value.forEach(function (filterValue) {
      filteredDict.push.apply(filteredDict, _toConsumableArray(filterHashMap.get(filterValue.toLowerCase())));
    });
  });
  return Object.fromEntries(filteredDict);
};
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
  inclusionFilter.forEach(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
      key = _ref10[0],
      items = _ref10[1];
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
    inclusionFilter.forEach(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
        key = _ref12[0],
        items = _ref12[1];
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
      subjectCount[item.display] += 1;
      if (!subjectCount[item.propertyType]) {
        subjectCount[item.propertyType] = 0;
      }
      subjectCount[item.propertyType] += 1;
    });
    var _filterDictionary = filterNodesByProperty(filterProps, inclusionFilter, dictionary);
    return {
      count: subjectCount,
      dictionary: _filterDictionary
    };
  }
  inclusionFilter.forEach(function (_ref13) {
    var _ref14 = _slicedToArray(_ref13, 2),
      items = _ref14[1];
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
var newHandleExplorerFilter = exports.newHandleExplorerFilter = function newHandleExplorerFilter(selectedFilters, filterHashMap) {
  var filteredDict = [];
  var alternateFilteredDict = [];
  selectedFilters.forEach(function (_ref15, index) {
    var _ref16 = _slicedToArray(_ref15, 2),
      key = _ref16[0],
      value = _ref16[1];
    switch (index) {
      case 0:
        {
          value.forEach(function (filterValue) {
            filteredDict = [].concat(_toConsumableArray(filteredDict), _toConsumableArray(filterHashMap.get(filterValue.toLowerCase())));
          });
          break;
        }
      case 1:
        {
          if (key === 'inclusion' || key === 'uiDisplay') {
            if (value.length > 1) {
              filteredDict = includeMultiFilterValue(filteredDict, value);
            } else {
              value.forEach(function (filterValue) {
                alternateFilteredDict = _toConsumableArray(filteredDict.filter(function (_ref17) {
                  var _ref18 = _slicedToArray(_ref17, 2),
                    thisValue = _ref18[1];
                  return thisValue[key] && thisValue[key][filterValue.toLowerCase()] ? thisValue[key][filterValue.toLowerCase()].length > 0 : false;
                }));
              });
              filteredDict = alternateFilteredDict;
            }
            break;
          }
          value.forEach(function (filterValue) {
            var valueFilteredDict = filteredDict.filter(function (_ref19) {
              var _ref20 = _slicedToArray(_ref19, 2),
                thisValue = _ref20[1];
              return thisValue[key] === filterValue.toLowerCase();
            });
            var updateValueFilteredDict = valueFilteredDict.length > 0 ? valueFilteredDict : [].concat(_toConsumableArray(filteredDict), _toConsumableArray(filterHashMap.get(filterValue.toLowerCase())));
            alternateFilteredDict = [].concat(_toConsumableArray(alternateFilteredDict), _toConsumableArray(updateValueFilteredDict));
          });
          filteredDict = alternateFilteredDict;
          break;
        }
      default:
        {
          if (key === 'inclusion' || key === 'uiDisplay') {
            if (value.length > 1) {
              filteredDict = includeMultiFilterValue(filteredDict, value);
            } else {
              value.forEach(function (filterValue) {
                alternateFilteredDict = _toConsumableArray(filteredDict.filter(function (_ref21) {
                  var _ref22 = _slicedToArray(_ref21, 2),
                    thisValue = _ref22[1];
                  return thisValue[key] && thisValue[key][filterValue.toLowerCase()] ? thisValue[key][filterValue.toLowerCase()].length > 0 : false;
                }));
              });
              filteredDict = alternateFilteredDict;
            }
            break;
          }
          var inclusoinFilter = [];
          value.forEach(function (filterValue) {
            var valueFilteredDict = filteredDict.filter(function (_ref23) {
              var _ref24 = _slicedToArray(_ref23, 2),
                thisValue = _ref24[1];
              return thisValue[key] === filterValue.toLowerCase();
            });
            inclusoinFilter.push.apply(inclusoinFilter, _toConsumableArray(valueFilteredDict));
          });
          filteredDict = inclusoinFilter;
          break;
        }
    }
  });
  return Object.fromEntries(filteredDict);
};
var initializeFilterHashMap = exports.initializeFilterHashMap = function initializeFilterHashMap(dictionary, filterSections) {
  var map = new Map();
  _dataDictionaryData.filterOptions.forEach(function (option) {
    return map.set(option, []);
  });
  Object.entries(dictionary).forEach(function (_ref25) {
    var _ref26 = _slicedToArray(_ref25, 2),
      key = _ref26[0],
      value = _ref26[1];
    var index = 0;
    while (index < filterSections.length) {
      hashMapHelper(filterSections[index], [key, value], map);
      index += 1;
    }
  });
  return map;
};
var setCheckboxItems = exports.setCheckboxItems = function setCheckboxItems(checkboxItems, subjectCountObj) {
  return checkboxItems.map(function (elem) {
    return _objectSpread(_objectSpread({}, elem), {}, {
      subjects: subjectCountObj[elem.name.toLowerCase()]
    });
  });
};
var setSubjectCount = exports.setSubjectCount = function setSubjectCount(checkboxData, subjectCountObj) {
  return checkboxData.map(function (elem) {
    return _objectSpread(_objectSpread({}, elem), {}, {
      checkboxItems: setCheckboxItems(elem.checkboxItems, subjectCountObj)
    });
  });
};
var getFileNodes = exports.getFileNodes = function getFileNodes(dictionary) {
  return Object.keys(dictionary).filter(function (node) {
    return dictionary[node].category === 'data_file';
  });
};
var getNodeTypes = exports.getNodeTypes = function getNodeTypes(dictionary) {
  return Object.keys(dictionary).filter(function (node) {
    return node.charAt(0) !== '_';
  });
};
var getDictionaryWithExcludeSystemProperties = exports.getDictionaryWithExcludeSystemProperties = function getDictionaryWithExcludeSystemProperties(dictionary) {
  var ret = Object.keys(dictionary).map(function (nodeID) {
    var node = dictionary[nodeID];
    if (!node.properties) return node;
    return _objectSpread(_objectSpread({}, node), {}, {
      properties: excludeSystemProperties(node)
    });
  }).reduce(function (acc, node) {
    acc[node.id] = node;
    return acc;
  }, {});
  return ret;
};
var getSubjectItemCount = exports.getSubjectItemCount = function getSubjectItemCount(dictionary) {
  var filterBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _dataDictionaryData.facetSearchData;
  var activeFilters = arguments.length > 2 ? arguments[2] : undefined;
  var subjectCountItems = {};
  filterBy.forEach(function (section) {
    section.checkboxItems.forEach(function (item) {
      var key = String(item.name).toLowerCase();
      subjectCountItems[key] = 0;
      Object.keys(dictionary).forEach(function (elem) {
        var property = dictionary[elem][item.group];
        if (Array.isArray(property)) {
          subjectCountItems[key] += property.length;
        } else if (property === key) {
          subjectCountItems[key] += 1;
        }
      });
    });
  });
  return subjectCountItems;
};

//* * filter subject count and filter dictionary*/
//* * uses case base appraoch for subject count and dictionary filter */
var generateSubjectCountsAndFilterData = exports.generateSubjectCountsAndFilterData = function generateSubjectCountsAndFilterData(data) {
  var allActiveFilters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : allFilters({});
  var currentFilter = arguments.length > 2 ? arguments[2] : undefined;
  var processedFilters = Object.entries(allActiveFilters).filter(function (_ref27) {
    var _ref28 = _slicedToArray(_ref27, 2),
      value = _ref28[1];
    return value.length > 0;
  });
  //* * initial state when there is no active filters */
  var unfilteredDictionary = data.unfilteredDictionary,
    filterHashMap = data.filterHashMap,
    facetfilterConfig = data.facetfilterConfig,
    properties = data.properties;
  if (processedFilters.length == 0) {
    var dictionary = !unfilteredDictionary ? data : unfilteredDictionary;
    return {
      subjectCounts: getSubjectItemCount(dictionary),
      dictionary: dictionary
    };
  }

  //* * check active filters */
  var filterSections = processedFilters.map(function (item) {
    return item[0];
  });
  var selectedSections = facetfilterConfig.facetSearchData.filter(function (section) {
    return filterSections.indexOf(section.datafield) !== -1;
  });
  var filteredDictionary = newHandleExplorerFilter(processedFilters, filterHashMap);
  var filteredDictCounts = getSubjectItemCount(filteredDictionary);
  var inclusion = allActiveFilters.inclusion,
    uiDisplay = allActiveFilters.uiDisplay;
  //* * if any inclusion filter is active - inclusion behavior for both filter by inclusion and nodes */
  if ((inclusion === null || inclusion === void 0 ? void 0 : inclusion.length) > 0 || (uiDisplay === null || uiDisplay === void 0 ? void 0 : uiDisplay.length) > 0) {
    return (0, _inclusionFilterHelper.inclusionFilterHelper)(data, allActiveFilters, currentFilter);
  }
  //* * filter by only nodes - any search filter item that filters the node (this excludes inclusion) */
  //* * filter by only one subject or one section */
  if (processedFilters.length == 1) {
    var _selectedSectionCounts = getSubjectItemCount(unfilteredDictionary, selectedSections);
    var _combinedSubjectCounts = _objectSpread(_objectSpread({}, filteredDictCounts), _selectedSectionCounts);
    return {
      subjectCounts: _combinedSubjectCounts,
      dictionary: filteredDictionary
    };
  }
  //* * multiple filter - apply case based inclusion and exclusion filter mehtod for subject count */
  var subjectCount = subjectCountBaseOnExclusionAndIncusionFilter(processedFilters, filterHashMap, selectedSections, filteredDictionary, allActiveFilters, currentFilter);
  if (subjectCount) return subjectCount;
  var selectedSectionCounts = getSubjectItemCount(filteredDictionary, selectedSections);
  var combinedSubjectCounts = _objectSpread(_objectSpread({}, filteredDictCounts), selectedSectionCounts);
  //* * filter by multiple sections */
  return {
    subjectCounts: combinedSubjectCounts,
    dictionary: filteredDictionary
  };
};
var subjectCountBaseOnExclusionAndIncusionFilter = function subjectCountBaseOnExclusionAndIncusionFilter(processedFilters, filterHashMap, selectedSections, filteredDictionary, allActiveFilters, currentFilter) {
  var inclusionDictionary = inclusionFilterHandler(processedFilters, filterHashMap);
  var inclusionSectionCounts = getSubjectItemCount(inclusionDictionary, selectedSections);
  var selectedSectionCounts = getSubjectItemCount(filteredDictionary, selectedSections);
  var filteredDictCounts = getSubjectItemCount(filteredDictionary);

  // display all unselected filter items for category inclusive of the class or assignment filter.
  if (processedFilters.length === 2) {
    var _loop = function _loop() {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      var categoryItem = allActiveFilters.category.filter(function (item) {
        return item.toLowerCase() === key;
      });
      if (value === 0 && categoryItem.length === 0) {
        selectedSectionCounts[key] = inclusionSectionCounts[key];
      }
    };
    for (var _i = 0, _Object$entries = Object.entries(selectedSectionCounts); _i < _Object$entries.length; _i++) {
      _loop();
    }
    var combinedSubjectCounts = _objectSpread(_objectSpread({}, filteredDictCounts), selectedSectionCounts);
    return {
      subjectCounts: combinedSubjectCounts,
      dictionary: filteredDictionary
    };
  }
  if (processedFilters.length > 2) {
    var currentSelection = selectedSections.filter(function (item) {
      return item.datafield === currentFilter.datafield;
    })[0];
    var otherFilters = processedFilters.filter(function (item) {
      return item[0] !== currentFilter.datafield;
    });
    var otherInclusionDictionary = newHandleExplorerFilter(otherFilters, filterHashMap);
    var otherSelectionCounts = getSubjectItemCount(otherInclusionDictionary, selectedSections);
    if (currentSelection) {
      currentSelection.checkboxItems.forEach(function (item) {
        var key = item.name.toLowerCase();
        if (selectedSectionCounts[key] == 0) {
          selectedSectionCounts[key] = otherSelectionCounts[key];
        }
      });
    }
    var _combinedSubjectCounts2 = _objectSpread(_objectSpread({}, filteredDictCounts), selectedSectionCounts);
    return {
      subjectCounts: _combinedSubjectCounts2,
      dictionary: filteredDictionary
    };
  }
  return null;
};
var excludeSystemProperties = exports.excludeSystemProperties = function excludeSystemProperties(node) {
  var properties = node.properties && Object.keys(node.properties).filter(function (key) {
    return node.systemProperties ? !node.systemProperties.includes(key) : true;
  }).reduce(function (acc, key) {
    acc[key] = node.properties[key];
    return acc;
  }, {});
  return properties;
};

/** * toggle check box action */
var toggleCheckBoxAction = exports.toggleCheckBoxAction = function toggleCheckBoxAction(payload, state) {
  var currentAllFilterVariables = payload === {} ? allFilters() : createFilterVariables(payload, state.allActiveFilters);
  if (_lodash["default"].isEqual(currentAllFilterVariables, allFilters())) {
    (0, _filter.clearAllFilters)();
  }
  return currentAllFilterVariables;
};

/**
 * sort hierarchy order of filter nodes
 */
var setNodeHierarchy = exports.setNodeHierarchy = function setNodeHierarchy(dictionary, nodeHierarchy) {
  var nodes = nodeHierarchy.reduce(function (result, key) {
    if (dictionary[key]) {
      result[key] = _lodash["default"].cloneDeep(dictionary[key]);
    }
    return result;
  }, {});
  return nodes;
};

/**
 * Sets the active filters  group checkboxes  isChecked to true.
 */
function setSelectedVlauesToTrue(checkboxItems, filters) {
  var result = checkboxItems.map(function (checkboxItem) {
    if (filters.includes(checkboxItem.name)) return _objectSpread(_objectSpread({}, checkboxItem), {}, {
      isChecked: true
    });
    return checkboxItem;
  });
  return result;
}

/**
 * Sets the active filters checkboxes isChecked to true.
 */
function setSelectedFilterValues(checkboxData, Filters) {
  var result = checkboxData.map(function (filterGroup) {
    if (Array.isArray(Filters[filterGroup.datafield]) && Filters[filterGroup.datafield].length !== 0) {
      return {
        groupName: filterGroup.groupName,
        checkboxItems: setSelectedVlauesToTrue(filterGroup.checkboxItems, Filters[filterGroup.datafield]),
        datafield: filterGroup.datafield,
        show: filterGroup.show,
        section: filterGroup.section,
        tooltip: filterGroup.tooltip
      };
    }
    return filterGroup;
  });
  return result;
}