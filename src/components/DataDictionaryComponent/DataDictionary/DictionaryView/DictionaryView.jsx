import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, withStyles } from '@material-ui/core';
import Styles from './DictionaryStyle';
import Tab from '../Tab/Tab';
import TabPanel from '../Tab/TabPanel';
import TabThemeProvider from '../Tab/TabThemeConfig';
import DataDictionaryGraph from '../graph/DataDictionaryGraph';
import ReduxDataDictionaryTable from '../table/DataDictionaryTable';
import CanvasView from '../ReactFlowGraph/canvas/CanvasController';
import { newCreateNodesAndEdges } from '../../GraphUtils/utils';
import { useEffect } from 'react';
import { setGraphView } from '../action';

const tabItems = [
  {
    index: 0,
    label: 'React Flow',
    value: 'table_view',
  },
  {
    index: 1,
    label: 'Table View',
    value: 'table_view',
  },
  {
    index: 2,
    label: 'Graph View',
    value: 'graph_view',
  },
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
  const graphData = newCreateNodesAndEdges({dictionary}, true, []);
  const [flowData, setFlowData] = React.useState(graphData);
  
  useEffect(() => {
    const graphData = newCreateNodesAndEdges({dictionary}, true, []);
    setFlowData(graphData);
  }, [dictionary]);

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
        <div className={classes.container}>
          <div className={classes.tabItems}>
            <Tab
              styleClasses={classes}
              tabItems={tabItems}
              currentTab={currentTab}
              handleTabChange={handleTabChange}
            />
          </div>
          <div className={currentTab == 0 ? classes.viewGraphContainer : currentTab === 0 ? classes.reactFlowContainer : classes.viewTableContainer}>
            <TabPanel value={currentTab} index={0}>
              <div className={classes.graphView}>
                <CanvasView flowData={flowData} dictionary={dictionary} />
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
