import React from 'react';
import { connect } from 'react-redux';
import FacetFilters from './FacetFilters';
import { clearAllFilters, toggleCheckBox } from '../../store/actions/actions';
import { clickBlankSpace, setOverlayPropertyTableHidden, setNeedReset } from '../../action';

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ReduxFacetFilters);