/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// eslint-disable-next-line no-unused-vars
import {
  Grid,
  withStyles,
} from '@material-ui/core';
// import Button from '@gen3/ui-component/dist/components/Button';
import { downloadTemplate } from '../../utils';
import { getCategoryColor } from '../../NodeCategories/helper';
import DataDictionaryPropertyTable from '../DataDictionaryPropertyTable';
import './DataDictionaryNode.css';
import styles from './DataDictionaryNode.style';
// import PdfDocument from '../../NodePDF';
import NodeViewComponent from './components/NodeViewComponent';

class DataDictionaryNode extends React.Component {
  notHorizontal = true; // supports landscape orientation

  handleClickNode(nodeID) {
    if (!this.props.expanded) {
      this.props.onExpandNode(nodeID);
    } else {
      this.props.onExpandNode(null);
    }
  }

  handleCloseNode = () => {
    this.props.onExpandNode(null);
  }

  handleDownloadTemplate = (e, format) => {
    e.stopPropagation(); // no toggling
    downloadTemplate(format, this.props.node.id);
  }

  render() {
    const { classes, node, pdfDownloadConfig } = this.props;
    return (
      <>
        <div
          className={classes.node}
          style={{ borderLeftColor: getCategoryColor(node.category) }}
          onClick={() => this.handleClickNode(node.id)}
          onKeyPress={() => this.handleClickNode(node.id)}
          role="button"
          tabIndex={0}
        >
          <NodeViewComponent
            node={node}
            description={this.props.description}
            pdfDownloadConfig={pdfDownloadConfig}
          />
        </div>
        {
          this.props.expanded && (
            <div className={classes.property}>
              <span
                className={classes.propertyClose}
                onClick={this.handleCloseNode}
                onKeyPress={this.handleCloseNode}
                role="button"
                tabIndex={0}
              >
                <i className={`${classes.propertyCloseIcon} g3-icon g3-icon--sm g3-icon--cross`} />
              </span>
              {
                this.notHorizontal && (
                  <div className={classes.propertySummary}>
                    <i>
                      <span>{node.title}</span>
                      <span> has </span>
                      <span>{Object.keys(node.properties).length}</span>
                      <span> properties. </span>
                    </i>
                  </div>
                )
              }
              <DataDictionaryPropertyTable
                properties={node.properties}
                requiredProperties={node.required}
                preferredProperties={node.preferred}
                // horizontal // supports horizontal orientation
              />
            </div>
          )
        }
      </>
    );
  }
}

DataDictionaryNode.propTypes = {
  node: PropTypes.object.isRequired,
  description: PropTypes.string,
  expanded: PropTypes.bool,
  onExpandNode: PropTypes.func,
};

DataDictionaryNode.defaultProps = {
  description: '',
  expanded: false,
  onExpandNode: () => {},
};

export default withStyles(styles)(DataDictionaryNode);
