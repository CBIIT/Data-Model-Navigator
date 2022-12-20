import { connect } from 'react-redux';
import Legend from './LegendView';

const ReduxLegend = (() => {
  const mapStateToProps = state => ({
    categoryItems: state.ddgraph.legendItems,
    styles: state.submission.graphViewConfig?.legend?.styles,
  });

  return connect(mapStateToProps)(Legend);
})();

export default ReduxLegend;
