import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  setSelectedFilterValues,
  transformAPIDataIntoCheckBoxData, 
} from 'bento-components';
import * as actionTypes from '../actions/actionTypes';
import {
  getState,
  createFilterVariables,
  initializeFilterHashMap,
  setSubjectCount,
  getFileNodes,
  getNodeTypes,
  getDictionaryWithExcludeSystemProperties,
  generateSubjectCountsAndFilterData,
  excludeSystemProperties,
  getAllFilters,
  toggleCheckBoxAction,
} from '../../utils/modelExplorerUtil';
import { from } from 'zen-observable';

const initialState = {
  allActiveFilters: {},
  unfilteredDictionary: {},
  filteredDictionary: {},
  activeFilter: false,
  filtersCleared: false,
  filterGroup: '',
  filterHashMap: new Map(),
  filterConfig: {}
};

const defaultFilterConfig = {
  facetSearchData: [],
  facetSectionVariables: {},
  resetIcon: {},
  baseFilters: {},
  filterSections: [],
  filterOptions: []
}

/**
 * Sort checkboxes by Checked
 *
 * @param {object} checkboxData
 * @return {json}
 */
 const sortBySection = (checkboxData, sortType) => {
  if (sortType === "subjects") {
    checkboxData.sort((a, b) => b.subjects - a.subjects);
  } else {
    checkboxData.sort(((a, b) => (a.name > b.name || -(a.name < b.name))));
  }
  checkboxData = sortByCheckedItem(checkboxData);
  return checkboxData;
}
/**
 * Sort checkboxes by Checked
 *
 * @param {object} checkboxData
 * @return {json}
 */

 const sortByCheckedItem = (checkboxData) => {
  return checkboxData.sort((a, b) => b.isChecked - a.isChecked)
 };

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */

const sortBasedOnSortByList = (checkboxData, sortByList) => {
  const sortCheckBoxItem = _.cloneDeep(checkboxData);
  sortCheckBoxItem.forEach((item) => {
    const sortType = (sortByList && sortByList[item.datafield] === 'count')
      ? 'subjects' : 'name';
    item.checkboxItems = sortBySection(item.checkboxItems, sortType);
  });
  // for (const [key, value] of Object.entries(sortByList)) {
  //   const groupData = sortCheckBoxItem.filter((group) => key === group.datafield)[0];
  //   const sortType = value === 'count' ? 'subjects' : 'name';
  //   groupData.checkboxItems = sortBySection(groupData.checkboxItems, sortType);
  // }
  return sortCheckBoxItem;
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const toggleCheckBox = (payload, state) => {
  const allActiveFilters = toggleCheckBoxAction(payload, state);
  let updatedCheckboxData = setSelectedFilterValues(
    state.facetfilterConfig.facetSearchData,
    allActiveFilters);
  const filtered = generateSubjectCountsAndFilterData(state, allActiveFilters, payload);
  const sortCheckboxData = setSubjectCount(updatedCheckboxData, filtered.subjectCounts);
  updatedCheckboxData = sortBasedOnSortByList(sortCheckboxData, state.sortByList);
  const updateState = {
    ...state,
    dictionary: filtered.dictionary,
    allActiveFilters: allActiveFilters,
    checkbox: {
      data: setSubjectCount(updatedCheckboxData, filtered.subjectCounts),
    },
  }
  return updateState;
}


const moduleReducers = (state = initialState, action) => {
  const { payload } = action;
  let filtered;
  
  switch (action.type) {
    case actionTypes.RECEIVE_DICTIONARY:
      const filterConfig = (payload && payload.facetfilterConfig)
        ? payload.facetfilterConfig : defaultFilterConfig;
      const dictionary = getDictionaryWithExcludeSystemProperties(payload.data);
      filtered = generateSubjectCountsAndFilterData(dictionary);
      return ({
        ...state,
        dictionary: dictionary,
        nodeTypes: getNodeTypes(payload.data),
        file_nodes: getFileNodes(payload.data),
        allActiveFilters: getAllFilters(filterConfig.facetSearchData),
        unfilteredDictionary: dictionary,
        filteredDictionary: dictionary,
        filterHashMap: initializeFilterHashMap(dictionary, filterConfig.filterSections),
        subjectCountObject: filtered,
        facetfilterConfig: filterConfig,
        checkbox: {
          data: setSubjectCount(filterConfig.facetSearchData, filtered.subjectCounts),
        },
      });
    
    case actionTypes.FILTER_DATA_EXPLORER:
      return toggleCheckBox(payload, state);

    case actionTypes.CLEAR_ALL_FILTERS:
      filtered = generateSubjectCountsAndFilterData(state.unfilteredDictionary);
      return {
        ...state,
        dictionary: state.unfilteredDictionary,
        filteredDictionary: state.unfilteredDictionary,
        subjectCountObject: filtered,
        allActiveFilters: state.facetfilterConfig.baseFilters,
        activeFilter: false,
        filtersCleared: true,
        checkbox: {
          data: setSubjectCount(state.facetfilterConfig.facetSearchData,
          filtered.subjectCounts),
        },
        ortByList: {
          ...state.sortByList,
        },
      }
    case actionTypes.SORT_SINGLE_SECTION:
      const groupData = state.checkbox.data.filter((group) => payload.groupName === group.datafield)[0];
      let { sortByList } = state;
      sortByList = sortByList || {};
      const sortType = payload.sortBy === 'count' ? 'subjects' : 'name';
      const sortedCheckboxItems = sortBySection(groupData.checkboxItems, sortType);
      sortByList[groupData.datafield] = payload.sortBy;
      const data = state.checkbox.data.map((group) => {
        if (group.datafield === groupData.datafield) {
          const updatedGroupData = group;
          updatedGroupData.checkboxItems = sortedCheckboxItems;
          return updatedGroupData;
        }
        return group;
      });
      return { ...state, checkbox: { data }, sortByList };

    case actionTypes.CLEAR_SECTION:
      const { facetSection } = payload;
      if (state.sortByList && state.sortByList[facetSection.datafield]) {
        delete state.sortByList[facetSection.datafield];
      }
      const allFilters = state.allActiveFilters;
      allFilters[facetSection.datafield] = [];
      state = { ...state, allActiveFilters : allFilters};
      return toggleCheckBox(payload, state);
    default:
      return state;
  }
}

export { moduleReducers }
