import * as actionTypes from '../../store/actions/actionTypes';

export const clearAllFilters = () => ({ type: actionTypes.CLEAR_ALL_FILTERS });
export const toggleCheckBox = (toggleCheckBoxItem) => ({
  type: actionTypes.FILTER_DATA_EXPLORER,
  payload: toggleCheckBoxItem
});