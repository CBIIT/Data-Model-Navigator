import { combineReducers } from 'redux';
import {
  setSelectedFilterValues,
} from 'bento-components';
import * as actionTypes from '../actions/actionTypes';
import { facetSearchData, baseFilters } from '../../bento/dataDictionaryData';
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
  allFilters,
  newHandleExplorerFilter,
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
};

export const moduleReducers = (state = initialState, action) => {
  const { payload } = action;
  let filtered;
  switch (action.type) {
    case actionTypes.RECEIVE_DICTIONARY:
      const dictionary = getDictionaryWithExcludeSystemProperties(payload.data);
      filtered = generateSubjectCountsAndFilterData(dictionary);
      return ({
        ...state,
        dictionary: dictionary,
        nodeTypes: getNodeTypes(payload.data),
        file_nodes: getFileNodes(payload.data),
        allActiveFilters: getAllFilters(facetSearchData),
        unfilteredDictionary: dictionary,
        filteredDictionary: dictionary,
        filterHashMap: initializeFilterHashMap(dictionary),
        subjectCountObject: filtered,
        checkbox: {
          data: setSubjectCount(facetSearchData, filtered.subjectCounts),
        },
      });
    
    case actionTypes.FILTER_DATA_EXPLORER:
      const allActiveFilters = toggleCheckBoxAction(payload, state);
      const updatedCheckboxData = setSelectedFilterValues(facetSearchData, allActiveFilters);
      filtered = generateSubjectCountsAndFilterData(state, allActiveFilters);
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
        allActiveFilters: baseFilters,
        activeFilter: false,
        filtersCleared: true,
        checkbox: {
          data: setSubjectCount(facetSearchData, filtered.subjectCounts),
        },
      }

    default:
      return state;
  }
}
