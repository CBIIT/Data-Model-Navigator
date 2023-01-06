import { connect } from 'react-redux';
import { clearSearchHistoryItems } from '../../Store/actions/graph';
import DictionarySearchHistory from './DictionarySearchHistory';

const ReduxDictionarySearchHistory = (() => {
  const mapStateToProps = (state) => ({
    searchHistoryItems: state.ddgraph.searchHistoryItems,
  });

  const mapDispatchToProps = (dispatch) => ({
    onClearSearchHistoryItems: () => dispatch(clearSearchHistoryItems()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(DictionarySearchHistory);
})();

export default ReduxDictionarySearchHistory;
