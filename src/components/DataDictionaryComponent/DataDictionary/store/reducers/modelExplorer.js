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
  generateSubjectCounts,
  excludeSystemProperties,
  getAllFilters,
  allFilters,
  newHandleExplorerFilter,
  toggleCheckBoxAction,
} from '../../utils/modelExplorerUtil';
import { filterReducers } from './facetFilter';

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
  let subjectCountObj;
  switch (action.type) {
    case actionTypes.RECEIVE_DICTIONARY:
      const dict = getDictionaryWithExcludeSystemProperties(payload.data);
      subjectCountObj = generateSubjectCounts(dict);
      return ({
        ...state,
        dictionary: dict,
        nodeTypes: getNodeTypes(payload.data),
        file_nodes: getFileNodes(payload.data),
        allActiveFilters: getAllFilters(facetSearchData),
        unfilteredDictionary: dict,
        filteredDictionary: dict,
        filterHashMap: initializeFilterHashMap(dict),
        subjectCountObject: subjectCountObj,
        checkbox: {
          data: setSubjectCount(facetSearchData, subjectCountObj),
        },
      });
    
    case actionTypes.FILTER_DATA_EXPLORER:
      console.log('FILTER_DATA_EXPLORER');
      const allActiveFilters = toggleCheckBoxAction(payload, state);
      const updatedCheckboxData = setSelectedFilterValues(facetSearchData, allActiveFilters);
      subjectCountObj = generateSubjectCounts(state, allActiveFilters);
      const resultState = {
        ...state,
        allActiveFilters: allActiveFilters,
        checkbox: {
          data: setSubjectCount(updatedCheckboxData, subjectCountObj),
        },
      }
      return resultState

    case actionTypes.CLEAR_ALL_FILTERS:
      console.log('CLEAR_ALL_FILTERS');
      subjectCountObj = generateSubjectCounts(state.unfilteredDictionary);

      return {
        ...state,
        dictionary: state.unfilteredDictionary,
        filteredDictionary: state.unfilteredDictionary,
        subjectCountObject: subjectCountObj,
        allActiveFilters: baseFilters,
        activeFilter: false,
        filtersCleared: true,
        checkbox: {
          data: setSubjectCount(facetSearchData, subjectCountObj),
        },
      }

    default:
      return state;
  }
}
