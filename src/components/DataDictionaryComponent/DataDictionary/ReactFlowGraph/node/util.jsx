import classNames from 'classnames';
import { nodeColor } from '../canvas/util';

/**
 * 
 * @param {*} param0 
 * set classes for matching nodes for search query
 */
 export const setMatchingNodeClasses = ({
    matchedNodeIDs = [],
    matchedNodeIDsInNameAndDescription = [],
    matchedNodeIDsInProperties = [],
  }, node, classes) => {
    const id = `${node}`.toLowerCase();
    // const nodeClass = classNames({
    //   nodeTitle: true,
    //   matchedNodeIDs: (matchedNodeIDs.indexOf(id) !== -1),
    //   matchedInNameAndDesc: (matchedNodeIDsInNameAndDescription
    //       .indexOf(id) !== -1),
    //   matchedInProperties: (matchedNodeIDsInProperties.indexOf(id) !== -1)
    // });
    let nodeClassses = `${classes.nodeTitle}`
    if (matchedNodeIDs.indexOf(id) !== -1) {
        nodeClassses += `${classes.matchedNodeIDs}`;
    }
    if (matchedNodeIDsInNameAndDescription.indexOf(id) !== -1) {
        nodeClassses += `${classes.matchedInNameAndDesc}`;
    }
    if (matchedNodeIDsInProperties.indexOf(id) !== -1) {
        nodeClassses+=  `${classes.matchedNodeIDsInProps}`;
    }
    return nodeClassses;
}
