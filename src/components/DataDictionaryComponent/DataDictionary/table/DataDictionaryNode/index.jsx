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
import { capitalizeFirstLetter, createFileName } from '../../../utils';
import { getCategoryColor } from '../../NodeCategories/helper';
import DataDictionaryPropertyTable from '../DataDictionaryPropertyTable';
import './DataDictionaryNode.css';
import styles from './DataDictionaryNode.style';
// import PdfDocument from '../../NodePDF';
import DownloadButton from '../../NodePDF/DownloadButton';
import IconDownloadPDF from '../icons/icon_download_PDF.svg';
import IconDownloadPTSV from '../icons/icon_download_TSV.svg';

const csvBtnDownloadConfig = {
  image: IconDownloadPTSV,
  fileType: 'txt',
  prefix: 'ICDC-',
};

const pdfDownloadConfig = {
  image: IconDownloadPDF,
  type: 'single',
  fileType: 'pdf',
  prefix: 'ICDC_Data_Model_',
};

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
    const { classes, node } = this.props;
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
          <Grid container>
            <Grid item lg={3} md={3} sm={3} xs={12}>
              <span className={classes.nodeTitle}>
                {capitalizeFirstLetter(node.title)}
                {/* <i className={`g3-icon g3-icon--chevron-${this.props.expanded
                  ? 'down' : 'right'} ${styles.nodeToggleIcon}`} /> */}
              </span>
            </Grid>
            <Grid item lg={9} md={9} sm={9} xs={9} className={classes.nodeDescription}>
              <span>
                {(node.desc) ? node.desc : this.props.description}
              </span>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12} />
            <Grid item lg={4} md={4} sm={4} xs={12}
              className={classes.nodeAssignmentGroup}>
              <span className={classes.nodeLabel}>
                <span>
                  Assignment:
                </span>
                <span className={classes.nodeAssignment}>
                  {capitalizeFirstLetter(node.assignment)}
                </span>
              </span>
              <span className={classes.nodeLabel}>
                Class:
                <span className={classes.nodeClass}>
                  {capitalizeFirstLetter(node.class)}
                </span>
              </span>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={12}
              className={classes.nodeDownloadButtonGroup}>
              <div className={classes.buttonWrap}>
                <DownloadButton
                  config={pdfDownloadConfig}
                  documentData={node}
                  fileName={createFileName(node.id, pdfDownloadConfig.prefix)}
                />
              </div>
              <div className={classes.buttonWrap}>
                {
                  (node.template === 'Yes')
                  && (
                  <DownloadButton
                    config={csvBtnDownloadConfig}
                    documentData={node}
                    template={node.template}
                    fileName={createFileName(node.id, csvBtnDownloadConfig.prefix)}
                  />
                  )
                }
              </div>
            </Grid>
          </Grid>
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
