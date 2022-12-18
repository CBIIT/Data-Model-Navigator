import classNames from 'classnames';
import clsx from 'clsx';
import { nodeColor } from '../canvas/util';

/**
 * 
 * @param {*} param0 
 * set classes for matching nodes base on search query
 */
 export const setMatchingNodeClasses = ({
    matchedNodeIDs = [],
    matchedNodeIDsInNameAndDescription = [],
    matchedNodeIDsInProperties = [],
  },
  node,
  classes,
  category) => {
    const id = `${node}`.toLowerCase();
    return clsx(classes.nodeTitleBtn, classes[category], {
      [classes.matchedNodeIDs]: (matchedNodeIDs.indexOf(id) !== -1),
      [classes.matchedInNameAndDesc]: (matchedNodeIDsInNameAndDescription.indexOf(id) !== -1),
      [classes.matchedNodeIDsInProps]: (matchedNodeIDsInProperties.indexOf(id) !== -1)
        && (matchedNodeIDsInNameAndDescription.indexOf(id) === -1),
      [classes.excludeNode]: (matchedNodeIDs.indexOf(id) === -1),
    });
}
