/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import './DataDictionaryTable.css';
import { parseDictionaryNodes } from '../../Utils/utils';
import { createFileName } from '../../utils';
import DataDictionaryCategory from '../DataDictionaryCategory';

// const pdfDownloadConfig = {
//   type: 'document',
//   prefix: 'ICDC_Data_Model ',
//   landscape: true,
// };

/**
 * Just exported for testing
 * Little helper that extacts a mapping of category-name to
 * the list of nodes in that category given a dictionary definition object
 *
 * @param {Object} dictionary
 * @return {} mapping from category to node list
 */
/* eslint-disable no-param-reassign */
export function category2NodeList(dictionary) {
  const res = Object.keys(dictionary).filter(
    (id) => id.charAt(0) !== '_' && id === dictionary[id].id,
  ).map(
    (id) => dictionary[id],
  ).filter(
    (node) => node.category && node.id,
  )
    .reduce(
      (lookup, node) => {
        if (!lookup[node.category]) {
          lookup[node.category] = [];
        }
        lookup[node.category].push(node);
        return lookup;
      }, {},
    );
  return res;
}

/** cluster props according to the category for PDF download */
export function sortByCategory(c2nl, dictionary) {
  const keys = Object.keys(c2nl);
  return Object.values(dictionary).sort((a, b) => keys.indexOf(`${a.category}`) - keys.indexOf(`${b.category}`));
}

/* eslint-enable no-param-reassign */

const getNodePropertyCount = (dictionary) => {
  const res = parseDictionaryNodes(dictionary)
    .reduce((acc, node) => {
      acc.nodesCount += 1;
      acc.propertiesCount += Object.keys(node.properties).length;
      return acc;
    }, {
      nodesCount: 0,
      propertiesCount: 0,
    });
  return {
    nodesCount: res.nodesCount,
    propertiesCount: res.propertiesCount,
  };
};

/**
 * Little components presents an overview of the types in a dictionary organized by category
 *
 * @param {dictionary} params
 */
const DataDictionaryTable = ({
  classes, dictionary, highlightingNodeID, onExpandNode, dictionaryName, pdfDownloadConfig,
}) => {
  const c2nl = category2NodeList(dictionary);
  const { nodesCount, propertiesCount } = getNodePropertyCount(dictionary);
  return (
    <>
      {/* <DownloadLinkWrapper> */}
      <p className={classes.tableInfo}>
        <span>{dictionaryName}</span>
        <span> dictionary has </span>
        <span>{nodesCount}</span>
        <span> nodes and </span>
        <span>{propertiesCount}</span>
        <span> properties </span>
      </p>
      {/* <DownloadButton
          config={{ ...pdfDownloadConfig, type: 'document' }}
          documentData={sortByCategory(c2nl, dictionary)}
          fileName={createFileName('', pdfDownloadConfig.prefix)}
        /> */}
      {/* </DownloadLinkWrapper> */}
      <div className={classes.tableBody}>
        {Object.keys(c2nl).map((category) => (
          <DataDictionaryCategory
            key={category}
            nodes={c2nl[category]}
            category={category}
            highlightingNodeID={highlightingNodeID}
            onExpandNode={onExpandNode}
            pdfDownloadConfig={pdfDownloadConfig}
          />
        ))}
      </div>
    </>
  );
};

DataDictionaryTable.propTypes = {
  dictionary: PropTypes.object,
  highlightingNodeID: PropTypes.string,
  onExpandNode: PropTypes.func,
  dictionaryName: PropTypes.string,
};

DataDictionaryTable.defaultProps = {
  dictionary: {},
  highlightingNodeID: null,
  onExpandNode: () => {},
  dictionaryName: '',
};

const styles = () => ({
  tableBody: {
  },
  tableInfo: {
    marginTop: '0',
    marginBottom: '0',
    marginLeft: '15px',
    color: '#32495A',
    fontFamily: 'Lato',
    fontSize: '14px',
    letterSpacing: '0',
    lineHeight: '26.06px',
  },
});

export default withStyles(styles)(DataDictionaryTable);
