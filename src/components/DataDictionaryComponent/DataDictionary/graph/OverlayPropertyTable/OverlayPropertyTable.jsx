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
import {
  getNodeDescriptionFragment,
  getNodeTitleFragment,
} from '../../highlightHelper';

import { SearchResultItemShape } from '../../utils';
import { capitalizeFirstLetter, createFileName } from '../../../utils';
import { getCategoryColor, tableIconUrl } from '../../NodeCategories/helper';
import DataDictionaryPropertyTable from '../../table/DataDictionaryPropertyTable';
import styles from './OverlayPropertyTable.style';
import NodeViewComponent from '../../table/DataDictionaryNode/components/NodeViewComponent';

class OverlayPropertyTable extends React.Component {
  getTitle = () => {
    if (this.props.isSearchMode) {
      const nodeTitleFragment = getNodeTitleFragment(
        this.props.matchedResult.matches,
        this.props.node.title,
        'overlay-property-table__span',
      );
      return nodeTitleFragment;
    }

    return this.props.node.title;
  };

  getDescription = () => {
    if (this.props.isSearchMode) {
      const nodeDescriptionFragment = getNodeDescriptionFragment(
        this.props.matchedResult.matches,
        this.props.node.description,
        'overlay-property-table__span',
      );
      return nodeDescriptionFragment;
    }

    return this.props.node.description;
  };

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
    // const IconSVG = getCategoryIconSVG(node.category);
    // eslint-disable-next-line no-console
    // const searchedNodeNotOpened = isSearchMode && !this.props.isSearchResultNodeOpened;
    const needHighlightSearchResult = isSearchMode;
    // const expanded = true;
    const categoryColor = getCategoryColor(node.category);
    return (
      <div className={classes.table}>
        <div className={classes.background} />
        <div className={classes.fixedContainer}>
          <div className={classes.content}>
            <div className={classes.header}>
              <div
                className={classes.category}
                style={{ borderLeftColor: categoryColor }}
              >
                <img src={`${tableIconUrl}${node.category}.svg`} alt="icon" className={`${classes.categoryIcon} ${node.category}`} />
                <h4 style={{ color: categoryColor }} className={classes.categoryText}>{capitalizeFirstLetter(node.category)}</h4>
                {/* {
                  isSearchMode && (
                    <Button
                      className={classes.toggleNode}
                      onClick={searchedNodeNotOpened
                        ? this.handleOpenAllProperties : this.handleDisplayOnlyMatchedProperties}
                      label={searchedNodeNotOpened ? 'See All' : 'See Only Matched'}
                      buttonType="secondary"
                    />
                  )
                } */}
                {/* <span
                  className={classes.close}
                  onClick={this.handleClose}
                  onKeyPress={this.handleClose}
                  role="button"
                  tabIndex={0}
                >
                  <i className={`${classes.closeIcon} g3-icon g3-icon--cross g3-icon--sm`} />
                </span> */}
                <div className={classes.buttonWrap} />
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

              <NodeViewComponent
                node={node}
                description={this.props.description}
                isSearchMode={isSearchMode}
                matchedResult={this.props.matchedResult}
                pdfDownloadConfig={this.props.pdfDownloadConfig}
                propertyCount={Object.keys(node.properties).length}
                isOverlay={true}
              />
            </div>

            <div className={classes.propertyTable}>
              <div className={classes.propertySummary}>
                <span
                  className={classes.close}
                  onClick={this.handleClose}
                  onKeyPress={this.handleClose}
                  role="button"
                  tabIndex={0}
                >
                  <i className={`${classes.closeIcon} g3-icon g3-icon--cross g3-icon--sm`} />
                </span>
                <i>
                  <span>{node.title}</span>
                  <span> has </span>
                  <span>{Object.keys(node.properties).length}</span>
                  <span> properties. </span>
                </i>
              </div>

              <div className={classes.property}>
                <DataDictionaryPropertyTable
                  title={node.title}
                  properties={node.properties}
                  requiredProperties={node.required}
                  preferredProperties={node.preferred}
                  hasBorder={false}
                  onlyShowMatchedProperties={false}
                  needHighlightSearchResult={needHighlightSearchResult}
                  // hideIsRequired={searchedNodeNotOpened}
                  matchedResult={this.props.matchedResult}
                  isSearchMode={isSearchMode}
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
