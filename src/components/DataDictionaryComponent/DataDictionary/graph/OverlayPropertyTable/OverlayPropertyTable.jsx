/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import Button from '@gen3/ui-component/dist/components/Button';
// eslint-disable-next-line no-unused-vars
import { SearchResultItemShape } from '../../utils';
import { capitalizeFirstLetter, createFileName } from '../../../utils';
import DownloadButton from '../../NodePDF/DownloadButton';
import { getCategoryColor, getCategoryIconSVG } from '../../NodeCategories/helper';
import DataDictionaryPropertyTable from '../../table/DataDictionaryPropertyTable';
import styles from './OverlayPropertyTable.style';
import IconDownloadPDF from '../../table/icons/icon_download_PDF.svg';
import IconDownloadPTSV from '../../table/icons/icon_download_TSV.svg';

const pdfDownloadConfig = {
  image: IconDownloadPDF,
  type: 'single',
  fileType: 'pdf',
  prefix: 'ICDC_Data_Model_',
};

const csvBtnDownloadConfig = {
  image: IconDownloadPTSV,
  fileType: 'txt',
  prefix: 'ICDC-',
};

const expanded = true;

class OverlayPropertyTable extends React.Component {
  /**
   * Close the whole overlay property table
   */
  handleClose = () => {
    this.props.onCloseOverlayPropertyTable();
  };

  /**
   * Toggle the property tabl to display all properties
   */
  handleOpenAllProperties = () => {
    this.props.onOpenMatchedProperties();
  };

  /**
   * Toggle the property table to display matched properties only
   */
  handleDisplayOnlyMatchedProperties = () => {
    this.props.onCloseMatchedProperties();
  };

  render() {
    const {
      classes,
      isSearchMode,
      node,
      hidden,
    } = this.props;
    if (!node || hidden) return (<></>);
    const IconSVG = getCategoryIconSVG(node.category);
    // eslint-disable-next-line no-console
    const searchedNodeNotOpened = isSearchMode && !this.props.isSearchResultNodeOpened;
    const needHighlightSearchResult = isSearchMode;
    // const expanded = true;
    return (
      <div className={classes.table}>
        <div className={classes.background} />
        <div className={classes.fixedContainer}>
          <div className={classes.content}>
            <div className={classes.header}>
              <div className={classes.category}
                style={{ borderLeftColor: getCategoryColor(node.category) }}>
                <IconSVG className={`${classes.categoryIcon} ${node.category}`} />
                <h4 className={classes.categoryText}>{node.category}</h4>
                {
                  isSearchMode && (
                    <Button
                      className={classes.toggleNode}
                      onClick={searchedNodeNotOpened
                        ? this.handleOpenAllProperties : this.handleDisplayOnlyMatchedProperties}
                      label={searchedNodeNotOpened ? 'See All' : 'See Only Matched'}
                      buttonType="secondary"
                    />
                  )
                }
                <span
                  className={classes.close}
                  onClick={this.handleClose}
                  onKeyPress={this.handleClose}
                  role="button"
                  tabIndex={0}
                >
                  Close
                  <i className={`${classes.closeIcon} g3-icon g3-icon--cross g3-icon--sm`} />
                </span>
                <div className={classes.downloadButton}>
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
                  <DownloadButton
                    config={pdfDownloadConfig}
                    documentData={node}
                    fileName={createFileName('', pdfDownloadConfig.prefix)}
                  />
                  
                </div>
                <div className={classes.buttonWrap}>
                
              </div>
              </div>
            </div>
            <div
              className={classes.categoryDivider}
              style={{ borderLeftColor: getCategoryColor(node.category) }}
            />
            <div
              className={classes.node}
              style={{ borderLeftColor: getCategoryColor(node.category) }}
            >
              <Grid container>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <span className={classes.nodeTitle}>
                    {capitalizeFirstLetter(node.title)}
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

            </Grid>
            </div>

            <div className={classes.propertyTable}>
              <div className={classes.propertySummary}>
                <i>
                  <span>{node.title}</span>
                  <span> has </span>
                  <span>{Object.keys(node.properties).length}</span>
                  <span> properties. </span>
                </i>
              </div>
                  
              <div className={classes.property}>
                <DataDictionaryPropertyTable
                  properties={node.properties}
                  requiredProperties={node.required}
                  preferredProperties={node.preferred}
                  hasBorder={false}
                  onlyShowMatchedProperties={searchedNodeNotOpened}
                  needHighlightSearchResult={needHighlightSearchResult}
                  // hideIsRequired={searchedNodeNotOpened}
                  matchedResult={this.props.matchedResult}
                />
              </div>
            </div>        
          </div>
        </div>
      </div>
    );
  }
}

OverlayPropertyTable.propTypes = {
  hidden: PropTypes.bool,
  node: PropTypes.object,
  onCloseOverlayPropertyTable: PropTypes.func,
  isSearchMode: PropTypes.bool,
  matchedResult: SearchResultItemShape,
  onOpenMatchedProperties: PropTypes.func,
  onCloseMatchedProperties: PropTypes.func,
  isSearchResultNodeOpened: PropTypes.bool,
};

OverlayPropertyTable.defaultProps = {
  hidden: true,
  node: null,
  onCloseOverlayPropertyTable: () => {},
  isSearchMode: false,
  matchedResult: {},
  onOpenMatchedProperties: () => {},
  onCloseMatchedProperties: () => {},
  isSearchResultNodeOpened: false,
};

export default withStyles(styles)(OverlayPropertyTable);
