import React, { memo, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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
  currentSearchKeyword,
  onClickNode
}) => {
  const [display, setDisplay] = useState(false);
  /**
   * expand node in normal mode (when search mode is false)
   * use view option to adjust the fontSize on property dialog 
   */
  const expandNode = () => {
    const view = localStorage.getItem('reactflowGraphView');
    onClickNode(id);
    setDisplay(!display);
  }
  const {
    label,
    icon,
    category,
    matchedNodeNameQuery,
    nodeAssignment,
    nodeClass,
    reqPropsCount,
    prefPropsCount,
    optPropsCount,
  } = data;

  //dispatch event - on table view
  const displayOverviewTable = () => {
    onClickNode(id);
    onViewTable(false);
  }

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
          {display && (
            <div className={classes.iconBar}>
              <CloseIcon className={classes.closeIcon} onClick={expandNode} />
            </div>
          )}
          <div className={clsx(classes.nodeTitle, {[classes.btnPadding]: display})}>
            <button className={isSearchMode ? nodeClasses
              : clsx(classes.nodeTitleBtn,
                  classes.categoryIcon,
                  classes[category],
                  {[classes.nodeTitleBtnWrapper]: display})}
              onClick={isSearchMode ? displayOverviewTable : expandNode}
            > <div className={classes.iconWrapper}>
                <img className={classes.nodeIcon} src={icon} alt="category_icon" /> 
              </div>
              <span className={classes.nodeName}>
                {(isSearchMode && matchedNodeNameQuery) ?
                  (<>
                    {highlightMatchingTitle(label, matchedNodeNameQuery, classes)}
                  </>) : `${label}`.toLowerCase()}
              </span>
            </button>
          </div>
          <div className={display ? classes.viewSection : classes.hideSection}>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <span className={classes.listItemLabel}>
                  {'Assignment: '}
                </span>
                <span className={classes.listItemValue}>
                  {nodeAssignment}
                </span>
              </li>
              <hr className={classes.divider}/>
              <li className={classes.listItem}>
                <span className={classes.listItemLabel}>
                  {'Class: '}
                </span>
                <span className={classes.listItemValue}>
                  {nodeClass}
                </span>
              </li>
              <hr className={classes.divider}/>
              <li className={classes.listItem}>
                <span className={classes.listItemLabel}>
                  {'Required Properties: '}
                </span>
                <span className={classes.listItemValue}>
                  {reqPropsCount}
                </span>
              </li>
              <hr className={classes.divider}/>
              <li className={classes.listItem}>
                <span className={classes.listItemLabel}>
                  {'Preferred Properties: '}
                </span>
                <span className={classes.listItemValue}>
                  {prefPropsCount}
                </span>
              </li>
              <hr className={classes.divider}/>
              <li className={classes.listItem}>
                <span className={classes.listItemLabel}>
                  {'Optional Properties: '}
                </span>
                <span className={classes.listItemValue}>
                  {optPropsCount}
                </span>
              </li>
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
