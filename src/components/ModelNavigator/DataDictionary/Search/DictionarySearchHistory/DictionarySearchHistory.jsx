import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './DictionarySearchHistory.style';

class DictionarySearchHistory extends React.Component {
  handleClick = (keyword) => {
    this.props.onClickSearchHistoryItem(keyword);
  }

  handleClearHistory = () => {
    this.props.onClearSearchHistoryItems();
  }

  render() {
    const { classes, searchHistoryItems } = this.props;
    if (searchHistoryItems && searchHistoryItems.length > 0) {
      return (
        <div className={classes.searchHistory}>
          <div>
            <h4 className={classes.titleText}>
              Last Search
            </h4>
            <span
              className={classes.clear}
              onClick={this.handleClearHistory}
              role="button"
              tabIndex={0}
            >
              Clear History
            </span>
          </div>
          <div className={classes.serachedItems}>
            {
              searchHistoryItems && searchHistoryItems.map((item) => {
                const zeroCountModifier = item.matchedCount === 0
                  ? classes.itemBadgeZero : '';
                return (
                  <div
                    className={classes.item}
                    key={item.keywordStr}
                    onClick={() => this.handleClick(item.keywordStr)}
                    role="button"
                    tabIndex={0}
                  >
                    <span className={classes.itemKeyword}>
                      {item.keywordStr}
                    </span>
                    <span className={`${classes.itemBadge} ${zeroCountModifier}`}>
                      {item.matchedCount}
                    </span>
                  </div>
                );
              })
            }
          </div>
        </div>
      );
    }
    return null;
  }
}

const SearchHistoryItemShape = PropTypes.shape({
  keywordStr: PropTypes.string,
  matchedCount: PropTypes.number,
});

DictionarySearchHistory.propTypes = {
  searchHistoryItems: PropTypes.arrayOf(SearchHistoryItemShape),
  onClickSearchHistoryItem: PropTypes.func,
  onClearSearchHistoryItems: PropTypes.func,
};

DictionarySearchHistory.defaultProps = {
  searchHistoryItems: [],
  onClickSearchHistoryItem: () => {},
  onClearSearchHistoryItems: () => {},
};

export default withStyles(styles)(DictionarySearchHistory);
