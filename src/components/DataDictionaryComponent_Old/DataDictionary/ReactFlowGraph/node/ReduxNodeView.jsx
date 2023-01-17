import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { clickNode, focusNode, onPanelViewClick, setOverlayPropertyTableHidden } from '../../action';
import NodeView from './NodeView';

const ReduxNodeView = (props) => (<NodeView {...props} />);

const mapStateToProps = (state) => ({
  isSearchMode: state.ddgraph.isSearchMode,
  ddgraph: state.ddgraph,
  currentSearchKeyword: state.ddgraph.currentSearchKeyword,
  expandNodeView: state.ddgraph.expandNodeView,
  highlightingNode : state.ddgraph.highlightingNode,
  focusedNodeId: state.ddgraph.focusedNodeId,
});

const mapDispatchToProps = (dispatch) => ({
  onClickNode: (nodeID) => dispatch(clickNode(nodeID)),
  onNodeFocus: (nodeID) => dispatch(focusNode(nodeID)),
  onViewTable: (hide) => dispatch(setOverlayPropertyTableHidden(hide)),
  onCollapseNodeView: () => {dispatch(onPanelViewClick())}
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNodeView);