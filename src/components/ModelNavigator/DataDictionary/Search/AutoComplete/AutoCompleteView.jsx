import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoCompleteInput from './AutoCompleteInput';
import AutoCompleteSuggestions, { SuggestionItem } from './AutoCompleteSuggestions';
import './AutoComplete.css';
import { withStyles } from '@material-ui/core';
import styles from './AutoCompleteStyle';
import clsx from 'clsx';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  setInputText(text) {
    this.inputRef.current.setInputText(text);
  }

  clearInput() {
    this.inputRef.current.clearInput();
  }

  render() {
    const {
      classes,
      suggestionList,
      onSuggestionItemClick,
      onInputChange,
      onSubmitInput,
      inputTitle,
      inputIcon,
      inputPlaceHolderText
    } = this.props;

    const emptySuggestionsClassModifier = suggestionList.length === 0
      ? 'auto-complete--empty-suggestion-list' : '';
    return (
      <div 
        className={
          clsx(classes.autoComplete,
            {[classes.emptySuggestionList]: suggestionList.length})
          }
      >
        <div className={classes.inputWrapper}>
          <AutoCompleteInput
            ref={this.inputRef}
            placeHolderText={'placeholder'}
            icon={inputIcon}
            inputTitle={inputTitle}
            onInputChange={onInputChange}
            onSubmitInput={onSubmitInput}
          />
        </div>
        <AutoCompleteSuggestions
          className={classes.suggestions}
          suggestionList={suggestionList}
          onSuggestionItemClick={onSuggestionItemClick}
        />
      </div>
    );
  }
}

AutoComplete.propTypes = {
  onInputChange: PropTypes.func,
  suggestionList: PropTypes.arrayOf(PropTypes.shape(SuggestionItem)),
  inputPlaceHolderText: PropTypes.string,
  inputTitle: PropTypes.string,
  inputIcon: PropTypes.string,
  onSuggestionItemClick: PropTypes.func,
  onSubmitInput: PropTypes.func,
};

AutoComplete.defaultProps = {
  onInputChange: () => {},
  suggestionList: [],
  inputPlaceHolderText: 'Search',
  inputTitle: 'Search Input',
  inputIcon: 'search',
  onSuggestionItemClick: () => {},
  onSubmitInput: () => {},
};

export default withStyles(styles)(AutoComplete);