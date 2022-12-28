import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Styles from './DictionaryStyle';
import Tab from '../Tab/Tab';
import TabPanel from '../Tab/TabPanel';
import TabThemeProvider from '../Tab/TabThemeConfig';
import DataDictionaryGraph from '../graph/DataDictionaryGraph';
import ReduxDataDictionaryTable from '../table/DataDictionaryTable';
import CanvasView from '../ReactFlowGraph/canvas/CanvasController';
import { setGraphView } from '../action';

const tabItems = [
  {
    index: 0,
    label: 'Graph View',
    value: 'graph_view',
  },
  {
    index: 1,
    label: 'Table View',
    value: 'table_view',
  }
];

const DictionaryView = ({
  classes,
  pdfDownloadConfig,
  handleClearSearchResult,
  dictionary,
  graphView,
  onSetGraphView,
}) => {
  const [currentTab, setCurrentTab] = React.useState(0);
  /**
   * get witdh of the tab to position nodes in the graph view
   */
   const ref = useRef(null);
   const [tabViewWidth, setTabViewWidth] = useState(0);
   useLayoutEffect(() => {
     setTabViewWidth(ref.current.offsetWidth);
   }, []);

  //set to graph view incase of search entry
  useEffect(() => {
    if(graphView) {
      // 0 set for graph view
      setCurrentTab(0);
    }
  }, [graphView]);

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
    onSetGraphView(value === 0)
  };

  return (
    <>
      <TabThemeProvider>
        <div className={classes.container} ref={ref}>
          <div className={classes.tabItems}>
            <Tab
              styleClasses={classes}
              tabItems={tabItems}
              currentTab={currentTab}
              handleTabChange={handleTabChange}
            />
          </div>
          <div className={classes.viewTableContainer}
          >
            <TabPanel value={currentTab} index={0}>
              <div className={classes.tableView}>
                <CanvasView
                  dictionary={dictionary}
                  tabViewWidth={tabViewWidth}
                  onClearSearchResult={handleClearSearchResult}
                />
              </div>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
              <div className={classes.tableView}>
                <ReduxDataDictionaryTable pdfDownloadConfig={pdfDownloadConfig} />
              </div>
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
              <div className={classes.graphView}>
                {currentTab == 2 && (
                <DataDictionaryGraph
                  onClearSearchResult={handleClearSearchResult}
                  pdfDownloadConfig={pdfDownloadConfig}
                />
                )}
              </div>
            </TabPanel>
          </div>
        </div>
      </TabThemeProvider>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    graphView: state.ddgraph.isGraphView,
}};

const mapDispatchToProps = (dispatch) => ({
  onSetGraphView: (isGraphView) => dispatch(setGraphView(isGraphView)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)) (DictionaryView);
