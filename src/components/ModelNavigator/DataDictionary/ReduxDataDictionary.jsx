import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { setGraphView } from './Store/actions/graph';
// import DataDictionaryController from './DataDictionaryController';
import DataDictionary from './DataDictionary';
// eslint-disable-next-line no-unused-vars

const ReduxDataDictionary = (props) => {
  if (!props.dictionary) {
    return <CircularProgress />;
  }

  return <DataDictionary {...props} />;
};

const mapStateToProps = (state) => ({
  isGraphView: state.ddgraph.isGraphView,
  dictionary: state.submission.dictionary,
});

const mapDispatchToProps = (dispatch) => ({
  onSetGraphView: (isGraphView) => dispatch(setGraphView(isGraphView)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDataDictionary);
