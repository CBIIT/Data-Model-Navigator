import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LegendView from './LegendView';

const ReduxLegendView = (props) => (<LegendView {...props} />);

const mapStateToProps = (state) => ({
    styles: state.submission.graphViewConfig?.legend?.styles,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxLegendView);
