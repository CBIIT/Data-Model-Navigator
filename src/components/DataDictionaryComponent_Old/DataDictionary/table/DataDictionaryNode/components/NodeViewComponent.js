import React from 'react';
import {
  Button,
  Grid,
  withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styles from './NodeViewComponent.style';
import { capitalizeFirstLetter, createFileName } from '../../../../utils';
import IconDownloadPDF from '../../icons/icon_download_PDF.svg';
import IconDownloadPTSV from '../../icons/icon_download_TSV.svg';
import DownloadButton from '../../../NodePDF/DownloadButton';
import { fileManifestDownloadSettings as defaultConfig } from '../../../../../../config/file-manifest-config';
import {
  getNodeDescriptionFragment,
  getNodeTitleFragment,
} from '../../../highlightHelper';

const NodeViewComponent = ({
  classes,
  node,
  description,
  isSearchMode,
  matchedResult,
  pdfDownloadConfig,
  fileManifestConfig,
  propertyCount,
  isExpanded,
  isOverlay,
}) => {
  const csvBtnDownloadConfig = {
    image: IconDownloadPTSV,
    fileType: 'tsv',
    prefix: 'ICDC_Data_Loading_Template-',
  };

  const isFileManifest = node.id === 'file';
  const isTemplate = node.template === 'Yes';
  const fileManifestDownloadSettings = fileManifestConfig || defaultConfig;

  const getTitle = () => {
    if (isSearchMode) {
      const nodeTitleFragment = getNodeTitleFragment(
        matchedResult.matches,
        capitalizeFirstLetter(node.title),
        'data-dictionary-property-table__span',
      );
      return nodeTitleFragment;
    }
    return capitalizeFirstLetter(node.title);
  };

  const getDescription = (description) => {
    if (isSearchMode) {
      const nodeDescriptionFragment = getNodeDescriptionFragment(
        matchedResult.matches,
        description,
        'data-dictionary-property-table__span',
      );
      return nodeDescriptionFragment;
    }
    return description;
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleAndDescContainer}>
        <span className={classes.nodeTitle}>
          {getTitle()}
        </span>

        <p className={classes.nodeDescription}>
          {(node.desc) ? getDescription(node.desc) : description}
        </p>
      </div>

      <div className={classes.tagsAndBtnContainer}>
        <div className={isOverlay ? classes.overlaySpacer : classes.spacer} />

        <div
          className={classes.tagsAndBtn}
        >
          <Button
            startIcon={!isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            variant="contained"
            disabled={isOverlay}
            classes={{
              root: classes.propertyCountBtn
            }}
          >
            {propertyCount === 1 ? (
              <p style={{ fontSize: '11px' }}>
                {`${propertyCount} property`}
              </p>
            ) : (
              <p style={{ fontSize: '11px' }}>
                {`${propertyCount} properties`}
              </p>
            )}
          </Button>
          {/* </div> */}

          <div className={classes.assignmentAndClassTags}>
            { (node.assignment) && (
            <>
              <span className={classes.nodeLabel}>
                <span>
                  Assignment:
                </span>
                <span className={classes.nodeAssignment}>
                  {capitalizeFirstLetter(node.assignment)}
                </span>
              </span>
            </>
            )}
            {(node.class) && (
            <>
              <span className={classes.nodeLabel}>
                Class:
                <span className={classes.nodeClass}>
                  {capitalizeFirstLetter(node.class)}
                </span>
              </span>
            </>
            )}
          </div>

          <ButtonGroup>
            {
               (isTemplate || isFileManifest)
               && (
               <DownloadButton
                 config={csvBtnDownloadConfig}
                 documentData={node}
                 template={node.template}
                 isFileManifest={isFileManifest}
                 fileName={isFileManifest
                   ? createFileName('', fileManifestDownloadSettings.filename_prefix)
                   : createFileName(node.id, csvBtnDownloadConfig.prefix)}
               />
               )
             }
             <DownloadButton
              config={{ ...pdfDownloadConfig, type: 'single', image: IconDownloadPDF }}
              documentData={node}
              fileName={createFileName(node.id, pdfDownloadConfig.prefix)}
            />
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(NodeViewComponent);