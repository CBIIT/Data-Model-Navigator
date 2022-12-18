import React, { memo, useState, useEffect } from 'react';
import { Button, withStyles } from '@material-ui/core';
import { Handle, useReactFlow, useStoreApi } from 'reactflow';
import clsx from 'clsx';
import Styles from './NodeStyle';
import { highlightMatchingTitle, setMatchingNodeClasses } from './util';

const NodeView = ({
  classes,
  id,
  handleId,
  data,
  onViewTable,
  isSearchMode,
  ddgraph,
  currentSearchKeyword
}) => {
  const [display, setDisplay] = useState(false);
  /**
   * expand node in normal mode (when search mode is false)
   * use view option to adjust the fontsize on property dialog 
   */
  const expandNode = () => {
    const view = localStorage.getItem('reactflowGraphView');
    setDisplay(!display);
  }
  const { label, icon, category, matchedNodeNameQuery } = data;

  //dispatch event - on table view
  const displayOverviewTable = () => {
    const nodeId = 1;
    onViewTable(nodeId);
  }

  // const [matchingClasses, setMatchingClasses] = useState(setMatchingNodeClasses(ddgraph, label, classes));

  /**
   * light node based on reasult of search query
   */
  useEffect(() => {
    // const nodeClasses = setMatchingNodeClasses(ddgraph, label, classes, category);
    // setMatchingClasses(nodeClasses);
  }, [isSearchMode, currentSearchKeyword]);

  /**
   * highlight nodes based on search query
   */
  const nodeClasses = setMatchingNodeClasses(ddgraph, label, classes, category);

  return (
    <>
      <div className={clsx({[classes.propDialog]: display})}>
        <div className={display ? classes.customNodeExpand : classes.customNodeCollapse}>
          <div className={classes.nodeTitle}>
            <button className={isSearchMode ? nodeClasses : clsx(classes.nodeTitleBtn, classes[category])}
              onClick={isSearchMode ? displayOverviewTable : expandNode}
            >
              <img className={classes.nodeIcon} src={icon} alt="category_icon" /> 
              <span className={classes.nodeName}>
                {(isSearchMode && matchedNodeNameQuery) ?
                  (<>
                    {highlightMatchingTitle(label, matchedNodeNameQuery, classes)}
                  </>) : label}
              </span>
            </button>
          </div>
          <div className={display ? classes.viewSection : classes.hideSection}>
            <ul className={classes.list}>
              <li className={classes.listItem}>Assignment: Core</li>
              <li className={classes.listItem}>Class: Primary</li>
              <li className={classes.listItem}>Required Properties: 0</li>
            </ul>
          </div>
          <Handle type="target" position="top" />
          <Handle type="source" position="bottom" id={handleId} />
        </div>
        {display && 
          <button className={classes.viewPropBtn} onClick={displayOverviewTable}>View Properties</button>
        }
      </div>
    </>
  );
};

export default withStyles(Styles)(memo(NodeView));
