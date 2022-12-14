import React, { useState } from 'react';
import { Button, withStyles } from '@material-ui/core';
import Styles from './DictionaryStyle';
import Tab from '../Tab/Tab';
import TabPanel from '../Tab/TabPanel';
import TabThemeProvider from '../Tab/TabThemeConfig';
import DataDictionaryGraph from '../graph/DataDictionaryGraph';
import ReduxDataDictionaryTable from '../table/DataDictionaryTable';
import CanvasView from '../ReactFlowGraph/canvas/CanvasView';
import { newCreateNodesAndEdges } from '../../GraphUtils/utils';
import { useEffect } from 'react';

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
  },
  {
    index: 2,
    label: 'React Flow',
    value: 'table_view',
  },
];

const DictionaryView = ({
  classes,
  pdfDownloadConfig,
  handleClearSearchResult,
  dictionary,
}) => {
  const dictionarySearcherRef = React.useRef();
  const [currentTab, setCurrentTab] = React.useState(0);
  const graphData = newCreateNodesAndEdges({dictionary}, true, []);
  const [flowData, setFlowData] =React.useState(graphData)
  
  useEffect(() => {
    const graphData = newCreateNodesAndEdges({dictionary}, true, []);
    setFlowData(graphData);
  }, [dictionary])

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
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
          <div className={currentTab == 0 ? classes.viewGraphContainer : currentTab === 2 ? classes.reactFlowContainer : classes.viewTableContainer}>
            <TabPanel value={currentTab} index={0}>
              <div className={classes.graphView}>
                {currentTab == 0 && (
                <DataDictionaryGraph
                  onClearSearchResult={handleClearSearchResult}
                  pdfDownloadConfig={pdfDownloadConfig}
                />
                )}
              </div>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
              <div className={classes.tableView}>
                <ReduxDataDictionaryTable pdfDownloadConfig={pdfDownloadConfig} />
              </div>
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
              <div className={classes.graphView}>
                <CanvasView flowData={flowData} dictionary={dictionary} />
              </div>
            </TabPanel>
          </div>
        </div>
      </TabThemeProvider>
    </>
  );
};

export default withStyles(Styles)(DictionaryView);
