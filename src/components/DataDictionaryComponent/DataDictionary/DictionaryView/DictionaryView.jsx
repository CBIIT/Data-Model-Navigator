import React, {useState} from 'react';
import { Button, withStyles } from '@material-ui/core';
import Styles from './DictionaryStyle';
import Tab from '../Tab/Tab';
import TabPanel from '../Tab/TabPanel';
import TabThemeProvider from '../Tab/TabThemeConfig';
import DataDictionaryGraph from '../graph/DataDictionaryGraph';

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
];

const DictionaryView = ({
  classes,
  pdfDownloadConfig,
  handleClearSearchResult,
}) => {
  const dictionarySearcherRef = React.useRef();
//   const [isGraphView, setGraphView] = useState(false);
//   const toggoleView = () => setGraphView(!isGraphView);

  const [currentTab, setCurrentTab] = React.useState(0);
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
            <div className={classes.viewContainer}>
              <TabPanel value={currentTab} index={0}>
                <div className={classes.graph}>
                  <DataDictionaryGraph
                    onClearSearchResult={handleClearSearchResult}
                    pdfDownloadConfig={pdfDownloadConfig}
                  />
                </div>
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                Index 1
              </TabPanel>
            </div>
          </div>
        </TabThemeProvider>
    </>
  )
}

export default withStyles(Styles)(DictionaryView);
