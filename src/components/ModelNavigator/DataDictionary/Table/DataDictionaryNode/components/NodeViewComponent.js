import React, { useMemo } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button, withStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import styles from "./NodeViewComponent.style";
import { capitalizeFirstLetter, createFileName, isFileManifest } from "../../../utils";
import TemplateButton from "./TemplateButton";
import DictionaryButton from "./DictionaryButton";
import { fileManifestDownloadSettings as defaultConfig } from "../../../../../../config/file-manifest-config";
import {
  getNodeDescriptionFragment,
  getNodeTitleFragment,
} from "../../../Utils/highlightHelper";

const StyledButton = withStyles({
  root: {
    padding: "8px",
    fontFamily: "Raleway",
    fontSize: "13px",
    fontWeight: 500,
    borderRadius: "6px",
    borderWidth: "2px",
    borderStyle: "solid",
    color: (props) => (props.toggled ? "#ffffff" : "#000000"),
    background: (props) => (props.toggled ? "#237488 !important" : "#F3F8FB !important"),
    borderColor: (props) => (props.toggled ? "#fff" : "#237488"),
    boxShadow: (props) => (props.toggled ? "0px 3px 7px 0px #00000040 !important" : "none"),
    textTransform: "none",
    transition: "all 0.2s ease",
    height: "32px",
    position: "relative",
    zIndex: 1,
    "& .item-count": {
      fontWeight: "700",
      paddingRight: "12px",
      color: (props) => (props.toggled ? "#ffffff" : "#237488"),
    },
    "&::after": {
      top: "100%",
      left: "50%",
      border: "solid transparent",
      content: '""',
      height: 0,
      width: 0,
      position: "absolute",
      pointerEvents: "none",
      borderColor: "rgba(35, 116, 136, 0)",
      borderTopColor: (props) => (props.toggled ? "#237488" : "transparent"),
      filter: (props) => (props.toggled ? "drop-shadow(0px 3px 7px #00000040)" : "none"),
      borderWidth: "14px",
      marginLeft: "-14px",
    },
    "&::before": {
      top: "100%",
      left: "50%",
      border: "solid transparent",
      content: '""',
      height: 0,
      width: 0,
      position: "absolute",
      pointerEvents: "none",
      borderColor: "rgba(255, 255, 255, 0)",
      borderTopColor: (props) => (props.toggled ? "#fff" : "transparent"),
      borderWidth: "17px",
      marginLeft: "-17px",
    },
  },
})(Button);

/**
 * 
 * @param {Object} props
 * @param {Object} props.classes
 * @param {Object} props.node
 * @param {string} props.description
 * @param {boolean} props.isSearchMode
 * @param {Object} props.matchedResult
 * @param {Object} props.pdfDownloadConfig
 * @param {Object} props.fileManifestConfig
 * @param {"" | "properties" | "relationships"} props.expandState
 * @param {(expandState: "properties" | "relationships") => void} props.onExpandClick
 * @param {boolean} props.isOverlay
 * @param {string} props.modelVersion
 * @returns 
 */
const NodeViewComponent = ({
  classes,
  node,
  description,
  isSearchMode,
  matchedResult,
  pdfDownloadConfig,
  fileManifestConfig,
  expandState,
  onExpandClick,
  modelVersion
}) => {
  const csvBtnDownloadConfig = {
    prefix: pdfDownloadConfig?.downloadPrefix || "ICDC_Data_Loading_Template-",
  };

  const isManifest = isFileManifest(node);
  const isTemplate = node.template === "Yes";
  const fileManifestDownloadSettings = fileManifestConfig || defaultConfig;

  const propertyCount = useMemo(() => Object.keys(node?.properties || {}).length, [node?.properties]);
  const linkCount = useMemo(() => node?.links?.filter((link) => typeof link?.backref === "string")?.length, [node?.links]);

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
          </p>
          <div className={classes.exportButtonGroup}>
            <StyledButton
              startIcon={
                expandState !== "properties" ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon />
                )
              }
              variant="contained"
              disableElevation
              toggled={expandState === "properties"}
              onClick={() => onExpandClick("properties")}
            >
              <span className="item-count">{propertyCount}</span>
              {propertyCount === 1 ? "Property" : "Properties"}
            </StyledButton>
            <StyledButton
              startIcon={
                expandState !== "relationships" ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon />
                )
              }
              variant="contained"
              disableElevation
              toggled={expandState === "relationships"}
              onClick={() => onExpandClick("relationships")}
            >
              <span className="item-count">{linkCount}</span>
              {linkCount === 1 ? "Relationship" : "Relationships"}
            </StyledButton>
            {pdfDownloadConfig.enabled && (isTemplate || (isManifest && isTemplate)) && (
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
            {pdfDownloadConfig.enabled && (<DictionaryButton config={{ pdfDownloadConfig }} documentData={node} />)}
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
