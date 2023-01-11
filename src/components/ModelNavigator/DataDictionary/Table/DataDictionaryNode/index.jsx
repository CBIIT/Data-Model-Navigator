/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// eslint-disable-next-line no-unused-vars
import {
  withStyles,
} from '@material-ui/core';
// import Button from '@gen3/ui-component/dist/components/Button';
import { downloadTemplate } from '../../Utils/utils';
import { getCategoryColor } from '../../NodeCategories/helper';
import DataDictionaryPropertyTable from '../DataDictionaryPropertyTable';
import './DataDictionaryNode.css';
import styles from './DataDictionaryNode.style';
// import PdfDocument from '../../NodePDF';
import NodeViewComponent from './components/NodeViewComponent';

const NODE_STATE = {
  OPEN: 'open',
  CLOSE: 'close',
};

class DataDictionaryNode extends React.Component {
  notHorizontal = true; // supports landscape orientation

  handleClickNode(nodeID) {
    const { expanded, onExpandNode } = this.props;
    if (!expanded) {
      onExpandNode(nodeID, NODE_STATE.OPEN);
    } else {
      onExpandNode(nodeID, NODE_STATE.CLOSE);
    }
  }

  handleCloseNode = () => {
    const { onExpandNode } = this.props;
    onExpandNode(null);
  }

  handleDownloadTemplate = (e, format) => {
    const { node } = this.props;
    e.stopPropagation(); // no toggling
    downloadTemplate(format, node.id);
  }

  render() {
    const {
      classes,
      node,
      pdfDownloadConfig,
      description,
      expanded,
    } = this.props;
    const propertyCount = Object.keys(node.properties).length;
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
            isExpanded={expanded}
            description={description}
            pdfDownloadConfig={pdfDownloadConfig}
            propertyCount={propertyCount}
          />
        </div>
        {
          expanded && (
            <div className={classes.property}>
              {
                this.notHorizontal && (
                  <div className={classes.propertySummary}>
                    <i>
                      <span>{node.title}</span>
                      <span> has </span>
                      <span>{propertyCount}</span>
                      <span> properties. </span>
                    </i>
                  </div>
                )
              }
              <DataDictionaryPropertyTable
                title={node.title}
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
