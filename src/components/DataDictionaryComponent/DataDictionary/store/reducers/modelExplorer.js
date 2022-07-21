import _ from 'lodash';
import {
  setSelectedFilterValues,
} from 'bento-components';
import * as actionTypes from '../actions/actionTypes';
import {
  initializeFilterHashMap,
  setSubjectCount,
  getFileNodes,
  getNodeTypes,
  getDictionaryWithExcludeSystemProperties,
  generateSubjectCountsAndFilterData,
  getAllFilters,
  toggleCheckBoxAction,
} from '../../utils/modelExplorerUtil';

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

// sorting variables
const sortTypes = {
  SUBJECTS: 'subjects',
  NAME: 'name',
  COUNT: 'count',
}

/**
 * Sort checkboxes by single section
 *
 * @param {array} checkboxData
 * @return {array}
 */
 const sortBySection = (checkboxData, sortType) => {
  if (sortType === sortTypes.SUBJECTS) {
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
 * @param {array} checkboxData
 * @return {array} 
 */

 const sortByCheckedItem = (checkboxData) => {
  return checkboxData.sort((a, b) => b.isChecked - a.isChecked)
 };

/**
 * sort all the checkbox in facet search 
 * @param {array} checkboxData 
 * @param {object} sortByList 
 * @returns 
 */

const sortFacetSections = (checkboxData, sortByList) => {
  const sortCheckBoxItem = _.cloneDeep(checkboxData);
  sortCheckBoxItem.forEach((item) => {
    const sortType = (sortByList && sortByList[item.datafield] === sortTypes.COUNT)
      ? sortTypes.SUBJECTS : sortTypes.NAME;
    item.checkboxItems = sortBySection(item.checkboxItems, sortType);
  });
  return sortCheckBoxItem;
}

/**
 * toggle check box action
 * @param {object} state 
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
  updatedCheckboxData = sortFacetSections(sortCheckboxData, state.sortByList);
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
        properties: payload.properties,
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
      const checkboxItems = sortFacetSections(setSubjectCount(state.facetfilterConfig.facetSearchData,
        filtered.subjectCounts), state.sortByList);
      return {
        ...state,
        dictionary: state.unfilteredDictionary,
        filteredDictionary: state.unfilteredDictionary,
        subjectCountObject: filtered,
        allActiveFilters: state.facetfilterConfig.baseFilters,
        activeFilter: false,
        filtersCleared: true,
        checkbox: {
          data: checkboxItems,
        },
        ortByList: {
          ...state.sortByList,
        },
      }
    case actionTypes.SORT_SINGLE_SECTION:
      const groupData = state.checkbox.data.filter((group) => payload.groupName === group.datafield)[0];
      let { sortByList } = state;
      sortByList = sortByList || {};
      const sortType = payload.sortBy === sortTypes.COUNT ? sortTypes.SUBJECTS : sortTypes.NAME;
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
