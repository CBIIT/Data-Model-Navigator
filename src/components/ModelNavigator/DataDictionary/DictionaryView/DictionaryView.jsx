import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import Styles from "./DictionaryStyle";
import Tab from "./Tab/Tab";
import TabPanel from "./Tab/TabPanel";
import TabThemeProvider from "./Tab/TabThemeConfig";
import ReduxDataDictionaryTable from "../Table/DataDictionaryTable";
import CanvasView from "../ReactFlowGraph/Canvas/CanvasController";
import VersionHistory from "../VersionHistory/VersionHistory";
import { setCanvasWidth, setGraphView } from "../Store/actions/graph";

// Base tabs without version history
const baseTabs = [
  {
    index: 0,
    label: "Graph View",
    value: "graph_view",
  },
  {
    index: 1,
    label: "Table View",
    value: "table_view",
  },
];

const DictionaryView = ({
  classes,
  pdfDownloadConfig,
  handleClearSearchResult,
  dictionary,
  graphView,
  onSetGraphView,
  onWidthChange,
  versionHistoryUrl,
}) => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [tabItems, setTabItems] = useState(baseTabs);
  const [versionHistoryAvailable, setVersionHistoryAvailable] = useState(false);

  /**
   * get witdh of the tab to position nodes in the graph view
   */
  const ref = useRef(null);
  const [tabViewWidth, setTabViewWidth] = useState(0);
  const setCanvasWidth = () => {
    setTabViewWidth(ref.current.offsetWidth);
    onWidthChange(ref.current.offsetWidth);
  };

  // Check if version history URL is provided and file exists
  useEffect(() => {
    const checkVersionHistoryFile = async () => {
      if (!versionHistoryUrl) {
        setVersionHistoryAvailable(false);
        return;
      }

      try {
        const response = await axios.head(versionHistoryUrl);
        if (response.status === 200) {
          setVersionHistoryAvailable(true);
          setTabItems([
            ...baseTabs,
            {
              index: 2,
              label: "Version History",
              value: "version_history",
            }
          ]);
        }
      } catch (error) {
        console.log('Version history file not available:', error);
        setVersionHistoryAvailable(false);
      }
    };

    checkVersionHistoryFile();
  }, [versionHistoryUrl]);

  useEffect(() => {
    onWidthChange(ref.current.offsetWidth);
    window.addEventListener("resize", setCanvasWidth);
    return () => {
      window.removeEventListener("resize", setCanvasWidth);
    };
  }, []);

  useLayoutEffect(() => {
    setTabViewWidth(ref.current.offsetWidth);
  }, []);

  //set to graph view incase of search entry
  useEffect(() => {
    if (graphView) {
      // 0 set for graph view
      setCurrentTab(0);
    }
  }, [graphView]);

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
    onSetGraphView(value === 0);
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
          <div className={classes.viewTableOuterContainer}>
            <div className={classes.viewTableContainer}>
              <TabPanel value={currentTab} index={0}>
                <div className={classes.graphView}>
                  <CanvasView
                    dictionary={dictionary}
                    tabViewWidth={tabViewWidth}
                    onClearSearchResult={handleClearSearchResult}
                  />
                </div>
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                <div className={classes.tableView}>
                  <ReduxDataDictionaryTable
                    pdfDownloadConfig={pdfDownloadConfig}
                  />
                </div>
              </TabPanel>
              {versionHistoryAvailable && (
                <TabPanel value={currentTab} index={2}>
                  <div className={classes.tableView}>
                    <VersionHistory markdownUrl={versionHistoryUrl} />
                  </div>
                </TabPanel>
              )}
            </div>
          </div>
        </div>
      </TabThemeProvider>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    graphView: state.ddgraph.isGraphView,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSetGraphView: (isGraphView) => dispatch(setGraphView(isGraphView)),
  onWidthChange: (canvasWidth) => dispatch(setCanvasWidth(canvasWidth)),
});

// Set default props
DictionaryView.defaultProps = {
  versionHistoryUrl: null,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(DictionaryView);
