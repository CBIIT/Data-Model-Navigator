import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import styles from './NodeViewComponent.style';
import { capitalizeFirstLetter, createFileName } from '../../../../utils';
import IconDownloadPDF from '../../icons/icon_download_PDF.svg';
import IconDownloadPTSV from '../../icons/icon_download_TSV.svg';
import DownloadButton from '../../../NodePDF/DownloadButton';

const NodeViewComponent = ({
  classes,
  node,
  description,
}) => {
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

  return (
    <>
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
            {(node.desc) ? node.desc : description}
          </span>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={12} />
        <Grid item lg={4} md={4} sm={4} xs={12}
          className={classes.nodeAssignmentGroup}>
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
          </>)}
          {(node.class) && (
          <>
          <span className={classes.nodeLabel}>
            Class:
            <span className={classes.nodeClass}>
              {capitalizeFirstLetter(node.class)}
            </span>
          </span>
          </>)
          }
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
    </>
  );
}

export default withStyles(styles) (NodeViewComponent);
