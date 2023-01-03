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
  onClickNode,
  expandNodeView,
  onCollapseNodeView,
  highlightingNode,
  onNodeFocus,
  focusedNodeId
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
    if (display) { 
      onCollapseNodeView();
    }
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
    if (!expandNodeView) {
      setDisplay(false);
    } else {
      if (`${label}`.toLowerCase() === highlightingNode?.id
      ) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    }
  }, [expandNodeView, highlightingNode]);

  useEffect(() => {
    if (`${label}`.toLowerCase() !== focusedNodeId?.id) {
      setDisplay(false);
    }
  }, [focusedNodeId]);

  /**
   * highlight nodes based on search query
   */
  const nodeClasses = setMatchingNodeClasses(ddgraph, label, classes, category);
  console.log(ddgraph);
  /**
   * button on focus
   */
  const nodeFocusEvent = () => {
    onNodeFocus(id);
  };

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
              onFocus={nodeFocusEvent}
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
                <div className={classes.content}>
                  <span className={classes.listItemLabel}>
                    {'Assignment: '}
                  </span>
                  <span className={classes.listItemValue}>
                    {nodeAssignment}
                  </span>
                </div>
              </li>
              <hr className={classes.divider}/>
              <li className={classes.listItem}>
                <div className={classes.content}>
                  <span className={classes.listItemLabel}>
                    {'Class: '}
                  </span>
                  <span className={classes.listItemValue}>
                    {nodeClass}
                  </span>
                </div>
              </li>
              <hr className={classes.divider}/>
              <li className={classes.listItem}>
                <div className={classes.content}>
                  <span className={classes.listItemLabel}>
                    {'Required Properties: '}
                  </span>
                  <span className={classes.listItemValue}>
                    {reqPropsCount}
                  </span>
                </div>
              </li>
              <hr className={classes.divider}/>
              <li className={classes.listItem}>
                <div className={classes.content}>
                  <span className={classes.listItemLabel}>
                    {'Preferred Properties: '}
                  </span>
                  <span className={classes.listItemValue}>
                    {prefPropsCount}
                  </span>
                </div>
              </li>
              <hr className={classes.divider}/>
              <li className={classes.listItem}>
                <div className={classes.content}>
                  <span className={classes.listItemLabel}>
                    {'Optional Properties: '}
                  </span>
                  <span className={classes.listItemValue}>
                    {optPropsCount}
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <Handle type="target" position="top" style={{ top: '12px' }} />
          <Handle
            type="source"
            position="bottom"
            id={handleId}
            style={{
              background: 'transparent',
              border: 'none',
              top: '37px',
            }}
          />
        </div>
        {display && 
          <button className={classes.viewPropBtn} onClick={displayOverviewTable}>View Properties</button>
        }
      </div>
    </>
  );
};

export default withStyles(Styles)(memo(NodeView));
