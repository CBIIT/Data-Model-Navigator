import React from "react";
import { Button, Grid, withStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import styles from "./NodeViewComponent.style";
import { capitalizeFirstLetter, createFileName } from "../../../utils";
import IconDownloadPDF from "../../icons/icon_download_PDF.svg";
import IconDownloadPTSV from "../../icons/icon_download_TSV.svg";
import DownloadButton from "../../../NodePDF/DownloadButton";
import { fileManifestDownloadSettings as defaultConfig } from "../../../../../../config/file-manifest-config";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  getNodeDescriptionFragment,
  getNodeTitleFragment,
} from "../../../Utils/highlightHelper";

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
  modelVersion
}) => {
  const csvBtnDownloadConfig = {
    image: IconDownloadPTSV,
    fileType: "tsv",
    prefix: pdfDownloadConfig?.downloadPrefix || "ICDC_Data_Loading_Template-",
  };

  const isFileManifest = node.id === "file";
  const isTemplate = node.template === "Yes";
  const fileManifestDownloadSettings = fileManifestConfig || defaultConfig;

  const getTitle = () => {
    if (isSearchMode) {
      const nodeTitleFragment = getNodeTitleFragment(
        matchedResult.matches,
        capitalizeFirstLetter(node.title),
        "data-dictionary-property-table__span"
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
        "data-dictionary-property-table__span"
      );
      return nodeDescriptionFragment;
    }
    return description;
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleAndDescContainer}>
        <span className={classes.nodeTitle}>{getTitle()}</span>

        <div className={classes.tagsAndDescriptionContainer}>
          <p className={classes.nodeDescription}>
            {node.desc ? getDescription(node.desc) : description}
          </p>
          <div className={classes.tagsAndBtnContainer}>
            <div>
              <Button
                startIcon={
                  !isOverlay ? (
                    !isExpanded ? (
                      <ExpandMoreIcon />
                    ) : (
                      <ExpandLessIcon />
                    )
                  ) : null
                }
                variant="contained"
                classes={{
                  root: classes.propertyCountBtn,
                }}
              >
                {propertyCount === 1 ? (
                  <p
                    style={{ fontSize: "11px" }}
                  >{<span 
                    style={{ fontSize: "14px", fontWeight: "700", color: "#42779a", fontFamily: "Open Sans"}}>
                      {propertyCount}</span>
                    } property</p>
                ) : (
                  <p style={{ fontSize: "11px" }}>
                    {<span 
                    style={{ fontSize: "14px", fontWeight: "700", color: "#42779a", fontFamily: "Open Sans"}}>
                      {propertyCount}</span>
                    } properties
                  </p>
                )}
              </Button>
            </div>
            <div>
              <div className={classes.assignmentAndClassTags}>
                {node.assignment && (
                  <>
                    <span className={classes.nodeLabel}>
                      <span>Assignment:</span>
                      <span className={classes.nodeAssignment}>
                        {capitalizeFirstLetter(node.assignment)}
                      </span>
                    </span>
                  </>
                )}
                {node.class && (
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
            </div>
            <div style={{ paddingRight: "10px"}}>
              <ButtonGroup>
                {(isTemplate || (isFileManifest && isTemplate)) && (
                  <DownloadButton
                    config={csvBtnDownloadConfig}
                    documentData={node}
                    template={node.template}
                    isFileManifest={isFileManifest}
                    fileName={
                      isFileManifest
                        ? createFileName(
                            "",
                            pdfDownloadConfig?.fileTransferManifestName || pdfDownloadConfig.downloadPrefix || fileManifestDownloadSettings.filename_prefix)
                        : createFileName(node.id, csvBtnDownloadConfig.prefix, modelVersion, true)
                    }
                  />
                )}
                <DownloadButton
                  config={{
                    ...pdfDownloadConfig,
                    type: "single",
                    image: IconDownloadPDF,
                  }}
                  documentData={node}
                  fileName={createFileName(node.id, pdfDownloadConfig.prefix)}
                />
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    graphView: state.ddgraph.isGraphView,
    modelVersion: state.versionInfo.modelVersion
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(NodeViewComponent);
