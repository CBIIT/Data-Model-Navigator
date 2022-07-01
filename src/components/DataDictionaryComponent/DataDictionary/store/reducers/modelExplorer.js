import { combineReducers } from 'redux';
import {
  setSelectedFilterValues,
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
      const allActiveFilters = toggleCheckBoxAction(payload, state);
      const updatedCheckboxData = setSelectedFilterValues(
        state.facetfilterConfig.facetSearchData,
        allActiveFilters);
      filtered = generateSubjectCountsAndFilterData(state, allActiveFilters, payload);
      const resultState = {
        ...state,
        dictionary: filtered.dictionary,
        allActiveFilters: allActiveFilters,
        checkbox: {
          data: setSubjectCount(updatedCheckboxData, filtered.subjectCounts),
        },
      }
      return resultState

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
      }

    default:
      return state;
  }
}

export { moduleReducers }
