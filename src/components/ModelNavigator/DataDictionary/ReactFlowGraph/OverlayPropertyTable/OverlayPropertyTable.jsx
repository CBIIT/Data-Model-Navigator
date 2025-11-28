import React, { useState } from "react";
import PropTypes from "prop-types";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core";
import {
  getNodeDescriptionFragment,
  getNodeTitleFragment,
} from "../../Utils/highlightHelper";
import { SearchResultItemShape } from "../../Utils/utils";
import { capitalizeFirstLetter } from "../../utils";
import DataDictionaryPropertyTable from "../../Table/DataDictionaryPropertyTable";
import styles from "./OverlayPropertyTable.style";
import NodeViewComponent from "../../Table/DataDictionaryNode/components/NodeViewComponent";
import { getIconDetails } from "../../../../../utils/iconUtils";
import { DefaultIcon } from "../../../../../config/IconMap";
import DataDictionaryRelationshipTable from "../../Table/DataDictionaryRelationshipTable";

const OverlayPropertyTable = (props) => {
  const { classes, isSearchMode, node, hidden, iconMapInfo } = props;

  const [expandState, setExpandState] = useState("properties");

  /**
   * Close the whole overlay property table
   */
  const handleClose = () => {
    props.onCloseOverlayPropertyTable();
  };

  /**
   * An onClick handler for expanding either properties or relationships
   * 
   * @param {"properties" | "relationships"} newExpandState 
   */
  const handleClickExpand = (newExpandState) => {
    setExpandState((prevExpandState) =>
      prevExpandState === newExpandState ? "" : newExpandState
    );
  }

  if (!node || hidden) {
    return <></>;
  }

  const needHighlightSearchResult = isSearchMode;
  const iconDetails = getIconDetails(node.category, iconMapInfo?.map);

  return (
    <div className={classes.table}>
      <div className={classes.background} />
      <div className={classes.fixedContainer}>
        <div className={classes.content}>
          <div className={classes.header}>
            <div
              className={classes.category}
              style={{
                borderLeftColor: iconDetails.color,
                backgroundColor: iconDetails.background,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingLeft: '4px'
                }}
              >
                <img
                  src={iconDetails.svg}
                  alt="icon"
                  className={classes.categoryIcon}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = DefaultIcon.svg;
                  }}
                />
                <h4
                  style={{ color: "#FFF" }}
                  className={classes.categoryText}
                >
                  {capitalizeFirstLetter(node.category)}
                </h4>
              </div>
              <div>
                <IconButton
                  className={classes.iconCloseRounded}
                  onClick={handleClose}
                  aria-label="close overlay button"
                >
                  <CloseRoundedIcon
                    style={{ color: "#FFF", fontSize: "20px" }}
                  />
                </IconButton>
              </div>
            </div>
          </div>
          <div
            className={classes.categoryDivider}
            style={{ borderLeftColor: iconDetails.color }}
          />
          <div
            className={classes.node}
            style={{
              borderLeftColor: iconDetails.color,
              marginBottom: "0px",
              borderRight: "1px solid #ADBEC4",
              backgroundColor: "white",
            }}
          >
            <NodeViewComponent
              node={node}
              description={props.description}
              isSearchMode={isSearchMode}
              matchedResult={props.matchedResult}
              pdfDownloadConfig={props.pdfDownloadConfig}
              expandState={expandState}
              onExpandClick={handleClickExpand}
            />
          </div>

          <div
            className={classes.propertyTable}
            style={{ borderLeftColor: iconDetails.color }}
          >
            <div className={classes.property}>
              {expandState === "properties" && (
                <DataDictionaryPropertyTable
                  title={node.title}
                  properties={node.properties}
                  requiredProperties={node.required}
                  preferredProperties={node.preferred}
                  onlyShowMatchedProperties={false}
                  needHighlightSearchResult={needHighlightSearchResult}
                  matchedResult={props.matchedResult}
                  isSearchMode={isSearchMode}
                />
              )}
              {expandState === "relationships" && (
                <DataDictionaryRelationshipTable node={node} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
  onCloseOverlayPropertyTable: () => { },
  isSearchMode: false,
  matchedResult: {},
  onOpenMatchedProperties: () => { },
  onCloseMatchedProperties: () => { },
  isSearchResultNodeOpened: false,
};

export default withStyles(styles)(OverlayPropertyTable);
