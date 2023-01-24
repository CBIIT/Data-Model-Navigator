import React from 'react';
import { connect } from 'react-redux';
import FacetFilters from './FacetFilters';
import {
  clickBlankSpace,
  setOverlayPropertyTableHidden,
  setNeedReset
} from '../../Store/actions/graph';
import { 
  clearAllFilters,
  toggleCheckBox,
  sortSection,
  clearGroupFilter,
} from '../../Store/actions/filter';

const ReduxFacetFilters = (props) => (<FacetFilters {...props} />);

const mapStateToProps = (state) => {
  return state;
};
  
const mapDispatchToProps = (dispatch) => {
  return {
    onClearAllFilter : () => dispatch(clearAllFilters()),
    onClickBlankSpace: () => dispatch(clickBlankSpace()),
    hidePropertyTable: () => dispatch(setOverlayPropertyTableHidden(true)),
    onToggleCheckBox : (toggleCheckBoxItem) => dispatch(toggleCheckBox(toggleCheckBoxItem)),
    onSortSection: (groupName, sortBy) => dispatch(sortSection(groupName, sortBy)),
    onClearGroupFilter: (groupName) => dispatch(clearGroupFilter(groupName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ReduxFacetFilters);