import _ from 'lodash';
import {
  facetSearchData,
  filterOptions,
} from '../bento/dataDictionaryData'
import { clearAllFilters } from '../store/actions/actions';
/**
 * Helper function to query and get an object from the redux store
 * @param {string} storeKey name of store property to access
 * @param {obj} store the application redux store
 * @return {obj}
 */
export const getState = (storeKey, store) => store.getState()[storeKey];
  
/**
 * Helper function to return an object of all selectable filters
 * @param {object} data custodian data containing filter value information
 * @return {obj}
 */
export const getAllFilters = (data) => {
  const emptyFilters = data.reduce((acc, facet) => (
    { ...acc, [facet.datafield]: [] }
  ), {});
  return emptyFilters;
};

export function allFilters() {
  const emptyFilters = facetSearchData.reduce((acc, facet) => (
    { ...acc, [facet.datafield]: [] }
  ), {});
  return emptyFilters;
}
  
/**
 * Returns filter variable for graphql query using the all filters.
 *
 * @param {object} data
 * @return {json}
 */
export const createFilterVariables = (data, currentAllActiveFilters) => {
  const filter = Object.entries(currentAllActiveFilters).reduce((acc, [key]) => {
    if (data.datafield === key) {
      return data.isChecked
        ? { ...acc, [key]: [...currentAllActiveFilters[key], ...[data.name]] }
        : { ...acc, [key]: currentAllActiveFilters[key].filter((item) => item !== data.name) };
    }
    return { ...acc, [key]: currentAllActiveFilters[key] };
  }, {});
  return filter;
};
  
export const hashMapHelper = (groupName, [key, value], hashMap) => {
  // const isValiddArray = Array.isArray(value[groupName]);
  switch (groupName) {
    case 'category':
      hashMap.set(value[groupName], [...hashMap.get(value[groupName]), ...[[key, value]]]);
      break;
    case 'assignment':
      hashMap.set(value[groupName], [...hashMap.get(value[groupName]), ...[[key, value]]]);
      break;
    case 'class':
      hashMap.set(value[groupName], [...hashMap.get(value[groupName]), ...[[key, value]]]);
      break;
    case 'inclusion': {
      const inclusionObj = value[groupName];
      if (inclusionObj) {
        Object.keys(inclusionObj)
          .forEach((element) => {
            if (inclusionObj[element].length > 0) {
              hashMap.set(
                element,
                [
                  ...hashMap.get(element),
                  ...[[key, value]],
                ],
              );
            }
          });
      }
      break;
    }
    default:
      break;
  }
};

export const newHandleExplorerFilter = (selectedFilters, filterHashMap) => {
  let filteredDict = [];
  let alternateFilteredDict = [];
  selectedFilters.forEach(([key, value], index) => {
    switch (index) {
      case 0: {
        value.forEach((filterValue) => {
          filteredDict = [
            ...filteredDict,
            ...filterHashMap.get(filterValue.toLowerCase()),
          ];
        });
        break;
      }
      case 1: {
        if (key === 'inclusion') {
          value.forEach((filterValue) => {
            alternateFilteredDict = [
              ...filteredDict.filter(([, thisValue]) => (thisValue[key]
                && thisValue[key][filterValue.toLowerCase()]
                ? thisValue[key][filterValue.toLowerCase()].length > 0
                : false)),
            ];
          });
          filteredDict = alternateFilteredDict;
          break;
        }
        value.forEach((filterValue) => {
          const valueFilteredDict = filteredDict.filter(([, thisValue]) => thisValue[key] === filterValue.toLowerCase());
          const updateValueFilteredDict = (valueFilteredDict.length > 0)
            ? valueFilteredDict : [ ...filteredDict, ...filterHashMap.get(filterValue.toLowerCase())];
          alternateFilteredDict = [
            ...alternateFilteredDict,
            ...updateValueFilteredDict,
          ];
        });
        filteredDict = alternateFilteredDict;
        break;
      }

      default: {
        if (key === 'inclusion') {
          value.forEach((filterValue) => {
            alternateFilteredDict = [
              ...filteredDict.filter(([, thisValue]) => (thisValue[key]
                && thisValue[key][filterValue.toLowerCase()]
                ? thisValue[key][filterValue.toLowerCase()].length > 0 : false)),
            ];
          });
          filteredDict = alternateFilteredDict;
          break;
        }
        value.forEach((filterValue, filterIndex) => {
          alternateFilteredDict = [
            ...filteredDict.filter(([, thisValue]) => thisValue[key] === filterValue.toLowerCase()),
          ];
          if (filterIndex > 0) {
            alternateFilteredDict = [
              ...filteredDict,
            ];
          }
        });
        filteredDict = alternateFilteredDict;
        break;
      }
    }
  });

  return Object.fromEntries(filteredDict);
};
  
export const initializeFilterHashMap = (dictionary, filterSections) => {
  const map = new Map();
  filterOptions.forEach((option) => map.set(option, []));
  Object.entries(dictionary)
    .forEach(([key, value]) => {
      let index = 0;
      while (index < filterSections.length) {
        hashMapHelper(filterSections[index], [key, value], map);
        index += 1;
      }
    });
  return map;
};
  
export const setCheckboxItems = (checkboxItems, subjectCountObj) => checkboxItems.map((elem) => ({
  ...elem,
  subjects: subjectCountObj[elem.name.toLowerCase()],
}));
  
export const setSubjectCount = (checkboxData, subjectCountObj) => checkboxData.map((elem) => ({
  ...elem,
  checkboxItems: setCheckboxItems(elem.checkboxItems, subjectCountObj),
}));
  
export const getFileNodes = (dictionary) => Object.keys(dictionary).filter((node) => dictionary[node].category === 'data_file');
export const getNodeTypes = (dictionary) => Object.keys(dictionary).filter((node) => node.charAt(0) !== '_');

export const getDictionaryWithExcludeSystemProperties = (dictionary) => {
  const ret = Object.keys(dictionary)
    .map((nodeID) => {
      const node = dictionary[nodeID];
      if (!node.properties) return node;
      return {
        ...node,
        properties: excludeSystemProperties(node),
      };
    })
    .reduce((acc, node) => {
      acc[node.id] = node;
      return acc;
    }, {});
  return ret;
};

export const getSubjectItemCount = (dictionary, filterBy = facetSearchData) => {
  const subjectCountItems = {};
  filterBy.forEach((section) => {
    section.checkboxItems.forEach((item) => {
      const key = String(item.name).toLowerCase();
      subjectCountItems[key] = 0;
      Object.keys(dictionary).forEach((elem) => {
        const property = dictionary[elem][item.group];
        if (Array.isArray(property)) {
          subjectCountItems[key] += property.length;
        } else {
          if (property === key) {
          subjectCountItems[key] += 1;
        }}
      });
    });
  });
  return subjectCountItems;
}

//** filter subject count */
export const generateSubjectCountsAndFilterData = (data, allActiveFilters = allFilters({}), facetFilterSearchData) => {
  const processedFilters = Object.entries(allActiveFilters)
    .filter(([, value]) => value.length > 0);
  //** no active filters */
  const { unfilteredDictionary } = data;
  if (processedFilters.length == 0) {
    const dictionary = (!unfilteredDictionary) ? data : unfilteredDictionary;
    return { subjectCounts: getSubjectItemCount(dictionary), dictionary: dictionary}
  }
  //** check active filters */
  const filterSections = processedFilters.map((item) => item[0]);
  const selectedSections = facetSearchData.filter(section => filterSections
      .indexOf(section.datafield) !== -1);
  
  const filteredDictionary = newHandleExplorerFilter(processedFilters, data.filterHashMap);
  const filteredDictCounts = getSubjectItemCount(filteredDictionary);
  
  //** filter by only one subject or one section */
  if (processedFilters.length == 1) {
    const selectedSectionCounts = getSubjectItemCount(unfilteredDictionary, selectedSections);
    const combinedSubjectCounts = Object.assign({}, filteredDictCounts, selectedSectionCounts);
    return { subjectCounts: combinedSubjectCounts, dictionary: filteredDictionary};
  }
  //** filter by multiple sections */
  return { subjectCounts: filteredDictCounts, dictionary: filteredDictionary};
}

export const excludeSystemProperties = (node) => {
  const properties = node.properties && Object.keys(node.properties)
    .filter((key) => (node.systemProperties ? !node.systemProperties.includes(key) : true))
    .reduce((acc, key) => {
      acc[key] = node.properties[key];
      return acc;
    }, {});
  return properties;
};

/*** toggle check box action */
export const toggleCheckBoxAction = (payload, state) => {
  const currentAllFilterVariables = payload === {} ? allFilters()
    : createFilterVariables(payload, state.allActiveFilters);
  if (_.isEqual(currentAllFilterVariables, allFilters())) {
    clearAllFilters();
  }
  return currentAllFilterVariables;
}
