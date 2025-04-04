import React from "react";
import { Button, withStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import styles from "./NodeViewComponent.style";
import { capitalizeFirstLetter, createFileName, isFileManifest } from "../../../utils";
import TemplateButton from "./TemplateButton";
import DictionaryButton from "./DictionaryButton";
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
    prefix: pdfDownloadConfig?.downloadPrefix || "ICDC_Data_Loading_Template-",
  };

  const isManifest = isFileManifest(node);
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
                    style={{ fontSize: "14px" }}
                  >{<span
                    style={{ fontWeight: "700", color: "#42779a" }}>
                    {propertyCount}</span>
                    } property</p>
                ) : (
                  <p style={{ fontSize: "14px" }}>
                    {<span
                      style={{ fontWeight: "700", color: "#42779a" }}>
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
            <div style={{ paddingRight: "10px", minWidth: "264px" }} onClick={(e) => e.stopPropagation()}>
              {pdfDownloadConfig.enabled && (
                <ButtonGroup className={classes.exportButtonGroup}>
                  {(isTemplate || (isManifest && isTemplate)) && (
                    <TemplateButton
                      documentData={node}
                      isFileManifest={isManifest}
                      fileName={
                        isManifest
                          ? createFileName(
                            node.id,
                            pdfDownloadConfig?.fileTransferManifestName || pdfDownloadConfig.downloadPrefix || fileManifestDownloadSettings.filename_prefix, modelVersion, true)
                          : createFileName(node.id, csvBtnDownloadConfig.prefix, modelVersion, true)
                      }
                    />
                  )}
                  <DictionaryButton config={{ pdfDownloadConfig }} documentData={node} />
                </ButtonGroup>
              )}
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
