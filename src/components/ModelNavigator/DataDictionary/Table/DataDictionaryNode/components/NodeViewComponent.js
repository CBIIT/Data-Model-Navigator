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
}) => {
  console.log("log node", node);
  const csvBtnDownloadConfig = {
    image: IconDownloadPTSV,
    fileType: "tsv",
    prefix: "ICDC_Data_Loading_Template-",
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

  function addWhiteSpace(str, length) {
    return (
      <div style={{ color: "transparent" }}>{`${" spacer ".repeat(
        length
      )}`}</div>
    );
  }

  const stringChecker = (desc) => {
    if (!node.dec) {
      return desc.length < 147;
    }
    return node.desc.length < 147;
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleAndDescContainer}>
        <span className={classes.nodeTitle}>{getTitle()}</span>

        <div className={classes.tagsAndDescriptionContainer}>
          <p className={classes.nodeDescription}>
            {node.desc ? (
              node.desc.length < 147 ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>{node.desc}</div>
                  <div style={{}}>
                    {addWhiteSpace(getDescription(node.desc), 20)}
                  </div>
                </div>
              ) : (
                getDescription(node.desc)
              )
            ) : description.length < 147 ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>{node.desc}</div>
                <div style={{}}>{addWhiteSpace(description, 20)}</div>
              </div>
            ) : (
              description
            )}
          </p>
          <div
            className={classes.tagsAndBtnContainer}
            style={{
              paddingRight: stringChecker(description) ? "33px" : "45px",
            }}
          >
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
                  >{`${propertyCount} property`}</p>
                ) : (
                  <p style={{ fontSize: "11px" }}>
                    {`${propertyCount} properties`}
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
            <div>
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
                            fileManifestDownloadSettings.filename_prefix
                          )
                        : createFileName(node.id, csvBtnDownloadConfig.prefix)
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

export default withStyles(styles)(NodeViewComponent);
