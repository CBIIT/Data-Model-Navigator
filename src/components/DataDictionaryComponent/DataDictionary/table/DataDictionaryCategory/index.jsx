/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { getCategoryColor, getCategoryIconSVG } from '../../NodeCategories/helper';
import { capitalizeFirstLetter } from '../../../utils';
import DataDictionaryNode from '../DataDictionaryNode';
import styles from './DataDictionaryCategory.style';

class DataDictionaryCategory extends React.Component {
  render() {
    const { classes, category, highlightingNodeID } = this.props;
    const IconSVG = getCategoryIconSVG(category);
    return (
      <div className={classes.category}>
        <div
          className={classes.categoryHead}
          style={{ borderLeftColor: getCategoryColor(category) }}
        >
          <IconSVG className={`${classes.categoryIcon} ${category}`} />
          <span style={{ color: getCategoryColor(category) }}>
            {capitalizeFirstLetter(category)}
          </span>
        </div>
        <div
          className={classes.categoryDivider}
          style={{ borderLeftColor: getCategoryColor(category) }}
        />
        {
        this.props.nodes.map(
          (node) => (
            <DataDictionaryNode
              node={node}
              key={node.id}
              description={node.description}
              expanded={highlightingNodeID
                && highlightingNodeID === node.id}
              onExpandNode={this.props.onExpandNode}
            />
          ),
        )
      }
      </div>
    );
  }
}

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
