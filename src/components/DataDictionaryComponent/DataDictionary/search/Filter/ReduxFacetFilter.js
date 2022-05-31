import React from 'react';
import { connect } from 'react-redux';
import FacetFilters from './FacetFilters';
import { clearAllFilters, toggleCheckBox } from '../../store/actions/actions';

const ReduxFacetFilters = (props) => (<FacetFilters {...props} />);

const mapStateToProps = (state) => {
  return state;
};
  
const mapDispatchToProps = (dispatch) => {
  return {
    onClearAllFilter : () => dispatch(clearAllFilters()),
    onToggleCheckBox : (toggleCheckBoxItem) => dispatch(toggleCheckBox(toggleCheckBoxItem)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ReduxFacetFilters);