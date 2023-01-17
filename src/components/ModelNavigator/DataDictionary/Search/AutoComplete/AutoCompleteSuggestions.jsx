import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './AutoCompleteSuggestnStyle';

/**
 * Wrap suggestion item into HTML, take following as an e.g.:
 *   suggestionsItem={
 *     fullString: 'abcdea',
 *     matchedPieceIndices: [
 *       [0, 1],
 *       [5, 6]
 *     ];
 *   };
 * Return HTML should be:
 *     <span className='auto-complete-suggestions__highlight'>
 *       a
 *     </span>
 *     <span>bcde</span>
 *     <span className='auto-complete-suggestions__highlight'>
 *       a
 *     </span>
 */
export const getSuggestionItemHTML = (suggestionItem, classes) => {
  const { fullString, matchedPieceIndices } = suggestionItem;
  let cursor = 0;
  let currentHighlighPieceIndex = 0;
  const resultHTMLSnippits = [];
  while (currentHighlighPieceIndex < matchedPieceIndices.length) {
    const highlightStartPos = matchedPieceIndices[currentHighlighPieceIndex][0];
    const highlightEndPos = matchedPieceIndices[currentHighlighPieceIndex][1];
    if (cursor < highlightStartPos) {
      resultHTMLSnippits.push(
        (
          <span key={cursor}>
            {fullString.substring(cursor, highlightStartPos)}
          </span>
        ),
      );
    }
    resultHTMLSnippits.push(
      (
        <span key={highlightStartPos} className={classes.highlight}>
          {fullString.substring(highlightStartPos, highlightEndPos)}
        </span>
      ),
    );
    cursor = highlightEndPos;
    currentHighlighPieceIndex += 1;
  }
  if (cursor < fullString.length) {
    resultHTMLSnippits.push(
      (
        <span key={cursor}>
          {fullString.substring(cursor)}
        </span>
      ),
    );
  }
  return resultHTMLSnippits;
};

class AutoCompleteSuggestions extends Component {
  handleClickItem(suggestionItem, i) {
    this.props.onSuggestionItemClick(suggestionItem, i);
  }

  render() {
    const {
      suggestionList,
      classes
    } = this.props;
    return (
      <div className={classes.suggestionList}>
        {
          suggestionList.map((suggestionItem, i) => (
            <div
              key={`${i}-${suggestionItem.fullString}`}
              className={classes.suggestionItem}
              onClick={() => { this.handleClickItem(suggestionItem, i); }}
              role='button'
              tabIndex={0}
            >
              {getSuggestionItemHTML(suggestionItem, classes)}
            </div>
          ))
        }
      </div>
    );
  }
}

export const SuggestionItem = {
  fullString: PropTypes.string.isRequired,
  matchedPieceIndices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

AutoCompleteSuggestions.propTypes = {
  suggestionList: PropTypes.arrayOf(PropTypes.shape(SuggestionItem)),
  onSuggestionItemClick: PropTypes.func,
};

AutoCompleteSuggestions.defaultProps = {
  suggestionList: [],
  onSuggestionItemClick: () => {},
};

export default withStyles(styles)(AutoCompleteSuggestions);
