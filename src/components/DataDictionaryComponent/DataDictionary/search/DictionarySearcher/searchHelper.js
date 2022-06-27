import _ from 'lodash';
import Fuse from 'fuse.js';
import {
  parseDictionaryNodes,
  getPropertyDescription,
  getType,
} from '../../utils';

export const ZERO_RESULT_FOUND_MSG = '0 results found. Please try another keyword.';

/**
 * Prepare search items for Fuse.io library
 * @params [Object] dictionary
 * @returns [Object] search data
 */
export const formatText = (text) => `${text}`.toLowerCase();

export const prepareSearchData = (dictionary) => {
  const searchData = parseDictionaryNodes(dictionary)
    .map((node) => {
      const properties = Object.keys(node.properties).map((propertyKey) => {
        let type = getType(node.properties[propertyKey]);
        if (type === 'UNDEFINED') type = undefined;
        const propertyDescription = getPropertyDescription(node.properties[propertyKey]);
        const splitText = propertyDescription ? propertyDescription.split('<br>')[0] : propertyDescription;
        return {
          name: formatText(propertyKey),
          description: formatText(splitText),
          type,
        };
      });
      return {
        id: node.id,
        title: formatText(node.title),
        description: formatText(node.description),
        properties,
      };
    });
  return searchData;
};

export const ERR_KEYWORD_TOO_SHORT = 'Keyword too short, try longer keyword.';
export const ERR_KEYWORD_TOO_LONG = 'Keyword too long (more than 32).';

export const filterMatches = (results, keyword) => {
  if (results && results.length > 0) {
    results.forEach(item => {
      const { matches } = item;
      if (matches.length > 0) {
        matches.forEach(match => {
          const highlightIndices = [];
          const { indices, value } = match;
          if (match.indices.length > 0) {
            indices.forEach((indice, index) => {
              if (match.key !== 'title') {
                const text = value.slice(indice[0], indice[1] + 1);
                if (`${text}`.toLowerCase().includes(keyword.toLowerCase())){
                  const initIndex = `${text}`.indexOf(keyword, 0);
                  const diff = indice[1] - indice[0];
                  if (diff >= keyword.length) {
                    indice[0] += initIndex;
                    indice[1] = indice[0] + keyword.length - 1;
                  }
                  highlightIndices.push(indice);
                }
              }
            });
            if (highlightIndices.length > 0) {
              match.indices = _.cloneDeep(highlightIndices);
            }
          }
        });
      }
    });
  }
}

/**
 * Call Fuse search and returns search result
 * @params [Object] searchData - see prepareSearchData returns
 * @params [string] keyword
 * @returns [SearchResultItemShape[]] (see ../../utils).
 */
export const searchKeyword = (searchData, keyword) => {
  if (!keyword || keyword.length < 2) {
    return {
      result: [],
      errorMsg: ERR_KEYWORD_TOO_SHORT,
    };
  }
  // 32 is length limitation of Fuse search library
  if (keyword.length > 32) {
    return {
      result: [],
      errorMsg: ERR_KEYWORD_TOO_LONG,
    };
  }
  const halfLength = Math.round(keyword.length / 2);
  const minMatchCharLength = Math.min(Math.max(halfLength, 10), keyword.length);
  const options = {
    keys: [
      'title',
      'description',
      'properties.name',
      'properties.description',
      'properties.type',
    ],
    includeMatches: true,
    threshold: 0,
    shouldSort: true,
    includeScore: true,
    minMatchCharLength,
    ignoreLocation: true,
  };
  const handler = new Fuse(searchData, options);
  const result = handler.search(keyword)
    .map((resItem) => {
      // A bug in Fuse sometimes returns wrong indices that end < start
      const matches = resItem.matches
        .filter(matchItem => matchItem.indices[0][1] >= matchItem.indices[0][0]);
      return {
        ...resItem,
        matches,
      };
    })
    .map((resItem) => {
      // filter out matches that is too shorter than keyword
      const matches = resItem.matches
        .filter((matchItem) => {
          const matchLen = (matchItem.indices[0][1] - matchItem.indices[0][0]) + 1;
          return matchLen >= halfLength;
        });
      return {
        ...resItem,
        matches,
      };
    })
    .filter(resItem => resItem.matches.length > 0);
  const errorMsg = (result && result.length > 0) ? '' : ZERO_RESULT_FOUND_MSG;
  filterMatches(result, keyword);
  return {
    result,
    errorMsg,
  };
};

/**
 * Prepare search items for Fuse.io library, call Fuse constructor
 * and return a search instance handler.
 * @params [SearchResultItemShape[]] search result (SearchResultItemShape from '../../utils')
 * @returns [Object] summary
 */
export const getSearchSummary = (result) => {
  const matchedNodeIDsInNameAndDescription = [];
  const matchedNodeIDsInProperties = [];
  const generalMatchedNodeIDs = [];
  let matchedPropertiesCount = 0;
  let matchedNodeNameAndDescriptionsCount = 0;
  result.forEach((resItem) => {
    const nodeID = resItem.item.id;
    resItem.matches.forEach((matchedItem) => {
      switch (matchedItem.key) {
      case 'properties.type':
      case 'properties.name':
      case 'properties.description':
        matchedPropertiesCount += 1;
        if (!matchedNodeIDsInProperties.includes(nodeID)) {
          matchedNodeIDsInProperties.push(nodeID);
        }
        if (!generalMatchedNodeIDs.includes(nodeID)) {
          generalMatchedNodeIDs.push(nodeID);
        }
        break;
      case 'title':
      case 'description':
        matchedNodeNameAndDescriptionsCount += 1;
        if (!matchedNodeIDsInNameAndDescription.includes(nodeID)) {
          matchedNodeIDsInNameAndDescription.push(nodeID);
        }
        if (!generalMatchedNodeIDs.includes(nodeID)) {
          generalMatchedNodeIDs.push(nodeID);
        }
        break;
      default:
        break;
      }
    });
  });
  return {
    matchedPropertiesCount,
    matchedNodeNameAndDescriptionsCount,
    matchedNodeIDsInNameAndDescription,
    matchedNodeIDsInProperties,
    generalMatchedNodeIDs,
  };
};
