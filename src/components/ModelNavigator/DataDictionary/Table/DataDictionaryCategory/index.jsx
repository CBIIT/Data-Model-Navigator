/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { getCategoryStyle, tableNodeCategoryList } from '../../NodeCategories/helper';
import { capitalizeFirstLetter } from '../../utils';
import DataDictionaryNode from '../DataDictionaryNode';
import styles from './DataDictionaryCategory.style';

const DataDictionaryCategory = ({
  classes, category,
  highlightingNodeID,
  pdfDownloadConfig,
  onExpandNode,
  nodes,
  assetConfig,
}) => {
  const categoryStyles = getCategoryStyle(category);
  const categoryColor = categoryStyles.color;
  const background = categoryStyles.background ? categoryStyles.background : categoryStyles.color;
  const iconURL = tableNodeCategoryList[category].icon;
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
        <img src={iconURL} alt="icon" className={classes.categoryIcon}/>
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

const mapStateToProps = (state) => ({
  assetConfig: state.ddgraph.assetConfig,
});

export default withStyles(styles)(connect(mapStateToProps, {})(DataDictionaryCategory));
