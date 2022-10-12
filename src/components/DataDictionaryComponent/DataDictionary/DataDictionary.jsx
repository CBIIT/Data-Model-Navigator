/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import ReduxDataDictionaryTable from './table/DataDictionaryTable';
import ReduxDataModelStructure from './DataModelStructure';
import DataDictionaryGraph from './graph/DataDictionaryGraph';
import ReduxDictionarySearcher from './search/DictionarySearcher';
import ReduxDictionarySearchHistory from './search/DictionarySearchHistory';
import backgroundImg from '../assets/Model_View.png';
// import store from '../../../store/index';
import ReduxFacetFilters from './search/Filter/ReduxFacetFilter';
// import { facetSearchData } from '../../../bento/dataDictionaryData';
import './DataDictionary.css';
import HeaderComponent from './Header/Header.component';

const DataDictionary = ({
  classes,
  onSetGraphView,
  isGraphView,
  pdfDownloadConfig,
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
    <div>
      <HeaderComponent/>
      <div className={classes.dataDictionary}>
        <div className={classes.sidebar}>
          <div className={classes.switch}>
            <span
              className={`${!isGraphView ? classes.switchButton : classes.activeButton}`}
              onClick={() => { setGraphView(true); }}
              onKeyPress={() => { setGraphView(true); }}
              role="button"
              tabIndex={0}
            >
              Graph View
            </span>
            <span
              className={`${isGraphView ? classes.switchButton : classes.activeButton}`}
              onClick={() => { setGraphView(false); }}
              onKeyPress={() => { setGraphView(true); }}
              role="button"
              tabIndex={0}
            >
              Table View
            </span>
          </div>
          <ReduxDictionarySearcher ref={dictionarySearcherRef} />
          {/* <ReduxDataModelStructure /> */}
          <ReduxDictionarySearchHistory
            onClickSearchHistoryItem={handleClickSearchHistoryItem}
          />
          <ReduxFacetFilters />
        </div>
        <div className={isGraphView ? classes.mainGraphView : classes.mainTableView}>
          <div className={`${classes.graph} ${!isGraphView ? classes.hidden : null}`}>
            <DataDictionaryGraph
              onClearSearchResult={handleClearSearchResult}
              pdfDownloadConfig={pdfDownloadConfig}
            />
          </div>
          <div className={`${classes.table} ${isGraphView ? classes.hidden : null}`}>
            <ReduxDataDictionaryTable pdfDownloadConfig={pdfDownloadConfig} />
          </div>
        </div>
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
  dataDictionary: {
    display: 'flex',
    height: 'calc(100vh)',
    overflowY: 'auto',
    backgroundImage: `url(${backgroundImg})`,
  },
  sidebar: {
    width: '320px',
    minWidth: '320px',
    height: '100%',
    overflowY: 'auto',
    backgroundColor: 'var(--g3-color__white)',
    borderRight: '1px solid var(--g3-color__smoke)',
  },
  switch: {
    display: 'flex',
    border: '1px solid var(--g3-color__black)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    letterSpacing: '.02rem',
    margin: '15px',
  },
  switchButton: {
    width: '50%',
    textAlign: 'center',
    padding: '10px',
  },
  activeButton: {
    width: '50%',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: 'var(--g3-color__base-blue)',
    color: 'var(--g3-color__white)',
  },
  mainGraphView: {
    width: 'calc(100vw - 320px)',
    minWidth: '900px',
  },
  mainTableView: {
    width: 'calc(100vw - 320px)',
    minWidth: '900px',
    overflowY: 'scroll',
  },
  graph: {
    overflow: 'hidden',
    height: '100%',
    position: 'relative',
  },
  table: {
    padding: '20px',
  },
  hidden: {
    display: 'none',
  },
});

export default withStyles(styles)(DataDictionary);
