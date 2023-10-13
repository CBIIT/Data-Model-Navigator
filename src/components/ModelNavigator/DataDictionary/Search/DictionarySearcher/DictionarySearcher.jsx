/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef, useEffect } from "react";
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

const DictionarySearcher = (props) => {
  const searchData = prepareSearchData(props.dictionary);
  const autoCompleteRef = useRef(null);

  const [suggestionList, setSuggestionList] = useState([]);
  const [isSearchFinished, setIsSearchFinished] = useState(false);
  const [searchResult, setSearchResult] = useState({
    matchedNodes: [],
    summary: {},
  });
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (props.currentSearchKeyword) {
      autoCompleteRef.current.setInputText(props.currentSearchKeyword);
      search(props.currentSearchKeyword);
    }
  }, [props.currentSearchKeyword]);

  const onClearResult = () => {
    resetSearchResult();
    autoCompleteRef.current.clearInput();
  };

  const launchClearSearchFromOutside = () => {
    onClearResult();
  };

  const clearFilterHandler = () => {
    onClickBlankSpace();
    onClearAllFilter();
    hidePropertyTable();
  };

  const launchSearchFromOutside = (keyword) => {
    autoCompleteRef.current.setInputText(keyword);
    search(keyword);
  };

  const search = (str) => {
    props.setIsSearching(true);
    const { result, errorMsg } = searchKeyword(searchData, formatText(str));
    if (!result || result.length === 0) {
      props.setIsSearching(false);
      props.onSearchResultUpdated([], []);
      setIsSearchFinished(true);
      setHasError(true);
      setErrorMsg(errorMsg);
      setSuggestionList([]);
      return;
    }
    const summary = getSearchSummary(result);
    setIsSearchFinished(true);
    setHasError(false);
    setSearchResult({
      matchedNodes: result,
      summary,
    });
    setSuggestionList([]);
    props.setIsSearching(false);
    props.onSearchResultUpdated(result, summary);
    props.onSearchHistoryItemCreated({
      keywordStr: str,
      matchedCount: summary.generalMatchedNodeIDs.length,
    });
    props.onSaveCurrentSearchKeyword(str);
  };

  const resetSearchResult = () => {
    setIsSearchFinished(false);
    setSearchResult({
      matchedNodes: [],
      summary: {},
    });
    props.onSearchResultCleared();
  };

  const inputChangeFunc = (query) => {
    props.onStartSearching();
    resetSearchResult();
    const inputText = formatText(query);
    const { result } = searchKeyword(searchData, inputText);
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
    setSuggestionList(suggestionList);
  };

  const suggestionItemClickFunc = (suggestionItem) => {
    autoCompleteRef.current.setInputText(suggestionItem.fullString);
    search(suggestionItem.fullString);
  };

  const submitInputFunc = (inputText) => {
    search(formatText(inputText));
  };

  return (
    <div className={props.classes.searcher}>
      <SearchThemConfig>
        <div className={props.classes.searchBarTitle}>
          <span className={props.classes.searchBarTitleText}>
            Filter & Search
          </span>
        </div>
        <div className={props.classes.searchInput}>
          <AutoComplete
            className="hermo"
            ref={autoCompleteRef}
            suggestionList={suggestionList}
            inputPlaceHolderText="Search in Dictionary"
            onSuggestionItemClick={suggestionItemClickFunc}
            onInputChange={inputChangeFunc}
            onSubmitInput={submitInputFunc}
          />
          <br />
          <Button
            id="button_sidebar_clear_all_filters"
            variant="outlined"
            disabled={props.activeFiltersCount === 0}
            className={props.classes.customButton}
            classes={{ root: props.classes.clearAllButtonRoot }}
            onClick={clearFilterHandler}
            disableRipple
            title="CLEAR ALL"
          >
            CLEAR ALL
          </Button>
        </div>
      </SearchThemConfig>
      <div className={props.classes.results}>
        {isSearchFinished && (
          <div>
            {!hasError &&
              (searchResult.matchedNodes.length > 0 ? (
                <>
                  <div className={props.classes.searchResultText}>
                    <span>Search Results</span>
                  </div>
                  <List
                    className={props.classes.resultList}
                    component="div"
                    dense
                  >
                    <ListItem className={props.classes.resultItem}>
                      <span className={props.classes.resultCountTitleDesc}>
                        {
                          searchResult.summary
                            .matchedNodeNameAndDescriptionsCount
                        }
                      </span>
                      &nbsp;
                      <span>Match(es) in nodes (title and description)</span>
                    </ListItem>
                    <ListItem className={props.classes.resultItem}>
                      <span className={props.classes.resultCountProps}>
                        {searchResult.summary.matchedPropertiesCount}
                      </span>
                      &nbsp;
                      <span>Match(es) in properties</span>
                    </ListItem>
                    <ListItem className={props.classes.resultItem}>
                      <span className={props.classes.resultCountPapers}>
                        {searchResult.summary.matchedPapersCount}
                      </span>
                      &nbsp;
                      <span>Match(es) in papers</span>
                    </ListItem>
                  </List>
                </>
              ) : (
                <div className={props.classes.noResults}>
                  No results found for "
                  <span>{props.currentSearchKeyword}</span>"
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

DictionarySearcher.propTypes = {
  dictionary: PropTypes.object.isRequired,
  currentSearchKeyword: PropTypes.string,
  setIsSearching: PropTypes.func.isRequired,
  onSearchResultUpdated: PropTypes.func.isRequired,
  onSearchResultCleared: PropTypes.func.isRequired,
  onSearchHistoryItemCreated: PropTypes.func.isRequired,
  onSaveCurrentSearchKeyword: PropTypes.func.isRequired,
  onStartSearching: PropTypes.func.isRequired,
  activeFiltersCount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

DictionarySearcher.defaultProps = {
  currentSearchKeyword: "",
};

export default withStyles(styles)(DictionarySearcher);
