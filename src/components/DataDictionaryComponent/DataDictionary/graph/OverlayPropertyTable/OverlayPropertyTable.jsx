/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@gen3/ui-component/dist/components/Button';
// eslint-disable-next-line no-unused-vars
import { SearchResultItemShape } from '../../utils';
import { createFileName } from '../../../utils';
import DownloadButton from '../../NodePDF/DownloadButton';
import { getCategoryColor, getCategoryIconSVG } from '../../NodeCategories/helper';
import DataDictionaryPropertyTable from '../../table/DataDictionaryPropertyTable';
import styles from './OverlayPropertyTable.style';
import IconDownloadPDF from '../../table/icons/icon_download_PDF.svg';

const pdfDownloadConfig = {
  image: IconDownloadPDF,
  type: 'single',
  fileType: 'pdf',
  prefix: 'ICDC_Data_Model_',
};

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
                  <DownloadButton
                    config={pdfDownloadConfig}
                    documentData={node}
                    fileName={createFileName('', pdfDownloadConfig.prefix)}
                  />
                </div>
              </div>
            </div>
            <div className={classes.property}>
              {/* <DataDictionaryCategory
                nodes={[this.props.node]}
                category={this.props.node.category}
                expanded={expanded}
              /> */}
              {/* <DataDictionaryNode
                node={this.props.node}
                expanded={expanded}
              /> */}
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
