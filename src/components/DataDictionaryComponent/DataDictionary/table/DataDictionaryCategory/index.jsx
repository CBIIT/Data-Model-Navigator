/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { getCategoryStyle } from '../../NodeCategories/helper';
import { capitalizeFirstLetter } from '../../../utils';
import DataDictionaryNode from '../DataDictionaryNode';
import styles from './DataDictionaryCategory.style';

class DataDictionaryCategory extends React.Component {
  render() {
    const { classes, category, highlightingNodeID } = this.props;
    const styles = getCategoryStyle(category);
    const IconSVG = styles.icon;
    const categoryColor = styles.color;
    const background = styles.background ? styles.background : styles.color;
    return (
      <div className={classes.category}>
        <div
          className={classes.categoryHead}
          style={{
            borderLeftColor: categoryColor,
            background: background,
            color: '#ffffff',
          }}
        >
          <IconSVG className={`${classes.categoryIcon} ${category}`} />
          <span className={classes.title}>
            {capitalizeFirstLetter(category)}
          </span>
        </div>
        <div
          className={classes.categoryDivider}
          style={{ borderLeftColor: categoryColor }}
        />
        {
        this.props.nodes.map(
          (node) => (
            <DataDictionaryNode
              node={node}
              key={node.id}
              description={node.description}
              pdfDownloadConfig={this.props.pdfDownloadConfig}
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
