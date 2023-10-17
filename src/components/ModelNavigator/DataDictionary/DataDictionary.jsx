import React from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import ReduxDictionarySearcher from "./Search/DictionarySearcher";
import ReduxDictionarySearchHistory from "./Search/DictionarySearchHistory";
import ReduxFacetFilters from "./Search/Filter/ReduxFacetFilter";
import HeaderComponent from "./Header";
import DictionaryView from "./DictionaryView/DictionaryView";
import "./DataDictionary.css";

const DataDictionary = ({
  classes,
  onSetGraphView,
  isGraphView,
  pdfDownloadConfig,
  dictionary,
}) => {
  const dictionarySearcherRef = React.useRef();
  const setGraphView = (isGraphView) => {
    onSetGraphView(isGraphView);
  };

  React.useEffect(() => {
    setGraphView(true);
  }, []);

  const handleClickSearchHistoryItem = (keyword) => {
    dictionarySearcherRef.current.launchSearchFromOutside(keyword);
  };

  const handleClearSearchResult = () => {
    dictionarySearcherRef.current.launchClearSearchFromOutside();
  };

  return (
    <div className={classes.dictionaryContainer}>
      <HeaderComponent pdfDownloadConfig={pdfDownloadConfig} />
      <div className={classes.dataDictionary}>
        <div className={classes.sidebar}>
          <ReduxDictionarySearcher ref={dictionarySearcherRef} />
          <ReduxDictionarySearchHistory
            onClickSearchHistoryItem={handleClickSearchHistoryItem}
          />
          <ReduxFacetFilters />
        </div>
        <DictionaryView
          pdfDownloadConfig={pdfDownloadConfig}
          handleClearSearchResult={handleClearSearchResult}
          dictionary={dictionary}
          isGraphView={isGraphView}
        />
      </div>
    </div>
  );
};

DataDictionary.propTypes = {
  onSetGraphView: PropTypes.func,
  isGraphView: PropTypes.bool,
};

DataDictionary.defaultProps = {
  onSetGraphView: () => {},
  isGraphView: false,
};

const styles = () => ({
  dictionaryContainer: {
    marginTop: "-40px",
    overflowY: "hidden",
    background: '#fff',
  },
  dataDictionary: {
    display: "flex",
    height: "calc(100vh)",
  },
  container: {
    paddingTop: "60px",
    fontFamily: "Raleway, sans-serif",
    paddingLeft: "27px",
    paddingRight: "27px",
  },
  detailContainer: {
    margin: "auto",
    paddingTop: "30px",
    paddingLeft: "50px",
    paddingRight: "50px",
    letterSpacing: "0.014em",
    color: "#000000",
    size: "12px",
    lineHeight: "23px",
  },
  sidebar: {
    width: "320px",
    minWidth: "320px",
    height: "100%",
    marginTop: "-3px",
    overflowY: "auto",
    boxShadow: "inset -10px -1px 10px -7px rgb(50 50 50 / 25%)",
    borderTopRightRadius: "7px",
  },

  mainGraphView: {
    width: "calc(100vw - 320px)",
    minWidth: "900px",
  },
  mainTableView: {
    width: "calc(100vw - 320px)",
    minWidth: "900px",
    overflowY: "scroll",
  },
});

export default withStyles(styles)(DataDictionary);
