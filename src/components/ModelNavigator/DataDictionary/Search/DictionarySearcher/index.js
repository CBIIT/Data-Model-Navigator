import { connect } from 'react-redux';
import {
  setIsSearching,
  setSearchResult,
  addSearchHistoryItem,
  clearSearchResult,
  saveCurrentSearchKeyword,
  resetGraphHighlight,
} from '../../Store/actions/graph';
import DictionarySearcher from './DictionarySearcher';
import {
  clickBlankSpace,
  setOverlayPropertyTableHidden,
  setNeedReset
} from '../../Store/actions/graph';
import { 
  clearAllFilters,
  toggleCheckBox,
  sortSection,
  clearGroupFilter,
} from '../../Store/actions/filter';

const ReduxDictionarySearcher = (() => {
  const mapStateToProps = state => ({
    dictionary: state.submission.dictionary,
    currentSearchKeyword: state.ddgraph.currentSearchKeyword,
    activeFiltersCount: Object.entries(state.submission.allActiveFilters).reduce(
      (acc, [key, val]) => acc + (val.length), 0, // eslint-disable-line no-unused-vars
    ),
  });

  const mapDispatchToProps = dispatch => ({
    onClearAllFilter : () => dispatch(clearAllFilters()),
    onClickBlankSpace: () => dispatch(clickBlankSpace()),
    hidePropertyTable: () => dispatch(setOverlayPropertyTableHidden(true)),
    setIsSearching: isSearching => dispatch(setIsSearching(isSearching)),
    onSearchResultUpdated: (result, summary) => dispatch(setSearchResult(result, summary)),
    onSearchHistoryItemCreated: searchHistoryItem =>
      dispatch(addSearchHistoryItem(searchHistoryItem)),
    onSearchResultCleared: () => dispatch(clearSearchResult()),
    onSaveCurrentSearchKeyword: keyword => dispatch(saveCurrentSearchKeyword(keyword)),
    onStartSearching: () => dispatch(resetGraphHighlight()),
  });

  return connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true },)(DictionarySearcher);
})();

export default ReduxDictionarySearcher;
