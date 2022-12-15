import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NodeView from './NodeView';

const ReduxNodeView = (props) => (<NodeView {...props} />);

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  onViewTable: (nodeId) => console.log("display Overview table"),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNodeView);
