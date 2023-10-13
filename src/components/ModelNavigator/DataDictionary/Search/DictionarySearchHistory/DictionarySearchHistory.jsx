import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import styles from "./DictionarySearchHistory.style";

class DictionarySearchHistory extends React.Component {
  handleClick = (keyword) => {
    this.props.onClickSearchHistoryItem(keyword);
  };

  handleClearHistory = () => {
    this.props.onClearSearchHistoryItems();
  };

  render() {
    const { classes, searchHistoryItems } = this.props;
    if (searchHistoryItems && searchHistoryItems.length > 0) {
      return <div>here</div>;
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
