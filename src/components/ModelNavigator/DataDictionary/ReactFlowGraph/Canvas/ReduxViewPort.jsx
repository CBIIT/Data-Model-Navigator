import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useViewport } from 'reactflow';
import { onViewChange } from '../../Store/actions/graph';

const ReduxViewPort = ({ onGraphViewChange }) => {
  const { x, y, zoom } = useViewport();
  // onGraphViewChange(useViewport());
  // useEffect(() => {
  //   console.log(x, y, zoom);
  // }, [x, y, zoom]);
  return null;
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  onGraphViewChange: (view) => dispatch(onViewChange(view)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxViewPort);

