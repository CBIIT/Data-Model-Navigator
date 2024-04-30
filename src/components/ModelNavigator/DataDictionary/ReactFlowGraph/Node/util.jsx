import React from 'react';
import _ from 'underscore';
import clsx from 'clsx';
import { nodeColor } from '../Canvas/util';
/**
 * 
 * @param {*} param0 
 * set classes for matching nodes base on search query
 */
 export const setMatchingNodeClasses = ({
    highlightParentNodes = [],
    matchedNodeIDs = [],
    matchedNodeIDsInNameAndDescription = [],
    matchedNodeIDsInProperties = [],
  },
  node,
  classes,
  category,
  isSearchMode) => {
    const id = `${node}`.trim().toLowerCase();
    const matchingNodes = isSearchMode ? matchedNodeIDs : highlightParentNodes;
    return clsx(classes.nodeTitleBtn, classes[category], {
      [classes.matchedNodeIDs]: (matchingNodes.indexOf(id) !== -1),
      [classes.matchedInNameAndDesc]: (matchedNodeIDsInNameAndDescription.indexOf(id) !== -1),
      [classes.matchedNodeIDsInProps]: (matchedNodeIDsInProperties.indexOf(id) !== -1)
        && (matchedNodeIDsInNameAndDescription.indexOf(id) === -1),
      [classes.excludeNode]: (matchingNodes.indexOf(id) === -1),
    });
}

/**
 * highlight the matching string based on search query result
 */
export const highlightMatchingTitle = (node, matchedNodeNameQuery = '', classes) => {
    let id = `${node}`.trim().toLowerCase();
    /**check for exact match */
    if (matchedNodeNameQuery.toLowerCase() === id) {
      return (<b className={classes.highLightNode}>{id}</b>);
    }

    //split text to highlight node title 
    const arr = id.replace(matchedNodeNameQuery, `,${matchedNodeNameQuery},`).split(",");
    const highlightTitle = arr.map((text) => {
      if (text.toLowerCase() === matchedNodeNameQuery.toLowerCase()) {
        return (
        <b className={classes.highLightNode}>
          {matchedNodeNameQuery}
        </b>);
      }
      return (<span>{text}</span>);
    });
  return highlightTitle;
}