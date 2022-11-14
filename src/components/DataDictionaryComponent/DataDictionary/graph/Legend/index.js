import { connect } from 'react-redux';
import Legend from './LegendView';

const ReduxLegend = (() => {
  const mapStateToProps = state => ({
    categoryItems: state.ddgraph.legendItems,
  });

  return connect(mapStateToProps)(Legend);
})();

export default ReduxLegend;
