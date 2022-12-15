import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import EdgeView from './CustomEdgeView';

const ReduxEdgeView = (props) => (<EdgeView {...props} />);

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxEdgeView);