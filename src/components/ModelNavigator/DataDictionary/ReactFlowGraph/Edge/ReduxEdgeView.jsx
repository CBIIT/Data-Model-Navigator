import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CustomEdgeView from './CustomEdgeView';

const ReduxEdgeView = (props) => (<CustomEdgeView {...props} />);

const mapStateToProps = (state) => ({
  isSearchMode: state.ddgraph.isSearchMode,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxEdgeView);