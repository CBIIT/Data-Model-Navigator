/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createTheme,
  MuiThemeProvider,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab";
import AutoComplete from "../AutoComplete/AutoCompleteView";
import { compareTwoStrings } from "string-similarity";
import {
  prepareSearchData,
  searchKeyword,
  getSearchSummary,
  ZERO_RESULT_FOUND_MSG,
  formatText,
} from "./searchHelper";
import styles from "./DictionarySearcher.style";
import SearchThemConfig from "./SearchThemConfig";

class DictionarySearcher extends React.Component {
  constructor(props) {
    super(props);
    this.searchData = prepareSearchData(props.dictionary);
    this.autoCompleteRef = React.createRef();
    this.state = {
      suggestionList: [],
      isSearchFinished: false,
      searchResult: {
        matchedNodes: [],
        summary: {},
      },
      hasError: false,
      errorMsg: "",
    };
  }

  componentDidMount() {
    // resume search status after switching back from other pages
    if (this.props.currentSearchKeyword) {
      this.autoCompleteRef.current.setInputText(
        this.props.currentSearchKeyword
      );
      this.search(this.props.currentSearchKeyword);
    }
  }

  onClearResult = () => {
    this.resetSearchResult();
    this.autoCompleteRef.current.clearInput();
  };

  launchClearSearchFromOutside = () => {
    this.onClearResult();
  };

  launchSearchFromOutside = (keyword) => {
    this.autoCompleteRef.current.setInputText(keyword);
    this.search(keyword);
  };

  search = (str) => {
    this.props.setIsSearching(true);
    const { result, errorMsg } = searchKeyword(
      this.searchData,
      formatText(str)
    );
    console.log('check-search', {
        result,
        str
    });
    if (!result || result.length === 0) {
      this.props.setIsSearching(false);
      this.props.onSearchResultUpdated([], []);
      this.setState({
        isSearchFinished: true,
        hasError: true,
        errorMsg,
        suggestionList: [],
      });
      return;
    }
    const summary = getSearchSummary(result);
    this.setState({
      isSearchFinished: true,
      hasError: false,
      searchResult: {
        matchedNodes: result,
        summary,
      },
      suggestionList: [],
    });
    this.props.setIsSearching(false);
    this.props.onSearchResultUpdated(result, summary);
    this.props.onSearchHistoryItemCreated({
      keywordStr: str,
      matchedCount: summary.generalMatchedNodeIDs.length,
    });
    this.props.onSaveCurrentSearchKeyword(str);
  };

  resetSearchResult = () => {
    this.setState({
      isSearchFinished: false,
      searchResult: {
        matchedNodes: [],
        summary: {},
      },
    });
    this.props.onSearchResultCleared();
  };

  inputChangeFunc = (query) => {
    this.props.onStartSearching();
    this.resetSearchResult();
    const inputText = formatText(query);
    console.log('dheck inputText', {inputText});
    const { result } = searchKeyword(this.searchData, inputText);
    console.log('dheck result', {result})
    const matchedStrings = {};
    result.forEach((resItem) => {
      resItem.matches.forEach((matchItem) => {
        if (!matchedStrings[matchItem.value]) {
          matchedStrings[matchItem.value] = {
            matchedPieceIndices: matchItem.indices.map((arr) => [
              arr[0],
              arr[1] + 1,
            ]),
          };
        }
      });
    });
    const suggestionList = Object.keys(matchedStrings)
      .sort(
        (str1, str2) =>
          compareTwoStrings(str2, inputText) -
          compareTwoStrings(str1, inputText)
      )
      .map((str) => ({
        fullString: str,
        matchedPieceIndices: matchedStrings[str].matchedPieceIndices,
      }));
    const text = query;
    this.setState({
      suggestionList,
      text,
    });
  };

  suggestionItemClickFunc = (suggestionItem) => {
    this.autoCompleteRef.current.setInputText(suggestionItem.fullString);
    this.search(suggestionItem.fullString);
  };

  submitInputFunc = (inputText) => {
    console.log('running')
    this.search(formatText(inputText));
  };

  render() {
    const {
      classes,
      activeFiltersCount,
      onClearAllFilter,
      onClickBlankSpace,
      hidePropertyTable,
    } = this.props;

    const {
      isSearchFinished,
      searchResult,
      hasError,
      errorMsg,
      suggestionList,
    } = this.state;

    const clearFilterHandler = () => {
      onClickBlankSpace();
      onClearAllFilter();
      hidePropertyTable();
    };

    return (
      <div className={classes.searcher}>
        <SearchThemConfig>
          <div className={classes.searchBarTitle}>
            <span className={classes.searchBarTitleText}>Filter & Search</span>
          </div>
          <div className={classes.searchInput}>
            <AutoComplete
              className="hermo"
              ref={this.autoCompleteRef}
              suggestionList={suggestionList}
              inputPlaceHolderText="Search in Dictionary"
              onSuggestionItemClick={this.suggestionItemClickFunc}
              onInputChange={this.inputChangeFunc}
              onSubmitInput={this.submitInputFunc}
            />

            <br />

            <Button
              id="button_sidebar_clear_all_filters"
              variant="outlined"
              disabled={activeFiltersCount === 0}
              className={classes.customButton}
              classes={{ root: classes.clearAllButtonRoot }}
              onClick={clearFilterHandler}
              disableRipple
              title="CLEAR ALL"
            >
              CLEAR ALL
            </Button>
          </div>
        </SearchThemConfig>
        <div className={classes.results}>
          {isSearchFinished && (
            <div>
              {!hasError &&
                (searchResult.matchedNodes.length > 0 ? (
                  <>
                    <div className={classes.searchResultText}>
                      <span>Search Results</span>
                    </div>
                    <List className={classes.resultList} dense>
                      <ListItem className={classes.resultItem}>
                        <span className={classes.resultCountTitleDesc}>
                          {
                            searchResult.summary
                              .matchedNodeNameAndDescriptionsCount
                          }
                        </span>
                        &nbsp;
                        <span>
                          Match(es) in nodes <br /> (title and description)
                        </span>
                      </ListItem>
                      <ListItem className={classes.resultItem}>
                        <span className={classes.resultCountProps}>
                          {searchResult.summary.matchedPropertiesCount}
                        </span>
                        &nbsp;
                        <span>Match(es) in node properties</span>
                      </ListItem>
                    </List>
                  </>
                ) : (
                  <p>{ZERO_RESULT_FOUND_MSG}</p>
                ))}
              {hasError && <p>{errorMsg}</p>}
            </div>
          )}
        </div>
      </div>
    );
  }
}

DictionarySearcher.propTypes = {
  dictionary: PropTypes.object.isRequired,
  setIsSearching: PropTypes.func,
  onSearchResultUpdated: PropTypes.func,
  onSearchHistoryItemCreated: PropTypes.func,
  onSearchResultCleared: PropTypes.func,
  onSaveCurrentSearchKeyword: PropTypes.func,
  currentSearchKeyword: PropTypes.string,
  onStartSearching: PropTypes.func,
};

DictionarySearcher.defaultProps = {
  setIsSearching: () => {},
  onSearchResultUpdated: () => {},
  onSearchHistoryItemCreated: () => {},
  onSearchResultCleared: () => {},
  onSaveCurrentSearchKeyword: () => {},
  currentSearchKeyword: "",
  onStartSearching: () => {},
};

export default withStyles(styles)(DictionarySearcher);
