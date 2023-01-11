/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { getCategoryStyle, tableIconUrl } from '../../NodeCategories/helper';
import { capitalizeFirstLetter } from '../../../utils';
import DataDictionaryNode from '../DataDictionaryNode';
import styles from './DataDictionaryCategory.style';

const DataDictionaryCategory = ({
  classes, category,
  highlightingNodeID,
  pdfDownloadConfig,
  onExpandNode,
  nodes,
}) => {
  const categoryStyles = getCategoryStyle(category);
  // const IconSVG = categoryStyles.icon;
  const categoryColor = categoryStyles.color;
  const background = categoryStyles.background ? categoryStyles.background : categoryStyles.color;

  return (
    <div className={classes.category}>
      <div
        className={classes.categoryHead}
        style={{
          borderLeftColor: categoryColor,
          background,
          color: '#ffffff',
        }}
      >
        <img src={`${tableIconUrl}${category}.svg`} alt="icon" className={classes.categoryIcon}/>
        <div className={classes.title}>
          <span>
            {capitalizeFirstLetter(category)}
          </span>
        </div>
      </div>
      <div
        className={classes.categoryDivider}
        style={{ borderLeftColor: categoryColor }}
      />
      {
        nodes.map(
          (node) => (
            <DataDictionaryNode
              node={node}
              key={node.id}
              description={node.description}
              pdfDownloadConfig={pdfDownloadConfig}
              expanded={highlightingNodeID
                && highlightingNodeID.includes(node.id)}
              onExpandNode={onExpandNode}
            />
          ),
        )
      }
    </div>
  );
};

DataDictionaryCategory.propTypes = {
  category: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
  highlightingNodeID: PropTypes.string,
  onExpandNode: PropTypes.func,
};

DataDictionaryCategory.defaultProps = {
  highlightingNodeID: null,
  onExpandNode: () => {},
};

export default withStyles(styles)(DataDictionaryCategory);
