import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { clickNode, setOverlayPropertyTableHidden } from '../../action';
import NodeView from './NodeView';

const ReduxNodeView = (props) => (<NodeView {...props} />);

const mapStateToProps = (state) => ({
  isSearchMode: state.ddgraph.isSearchMode,
  ddgraph: state.ddgraph,
  currentSearchKeyword: state.ddgraph.currentSearchKeyword,
  
});

const mapDispatchToProps = (dispatch) => ({
  onClickNode: (nodeID) => dispatch(clickNode(nodeID)),
  onViewTable: (hide) => dispatch(setOverlayPropertyTableHidden(hide)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNodeView);
