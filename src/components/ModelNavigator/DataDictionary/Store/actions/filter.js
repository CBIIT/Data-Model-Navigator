import * as actionTypes from './actionTypes';

export const clearAllFilters = () => ({ type: actionTypes.CLEAR_ALL_FILTERS });
export const toggleCheckBox = (toggleCheckBoxItem) => ({
  type: actionTypes.FILTER_DATA_EXPLORER,
  payload: toggleCheckBoxItem
});
export const sortSection = (groupName, sortBy) => ({
    type: actionTypes.SORT_SINGLE_SECTION,
    payload: {
      groupName,
      sortBy,
    },
});
export const clearGroupFilter = (facetSection) => ({
  type: actionTypes.CLEAR_SECTION,
    payload: {
      facetSection
    },
});