/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import DataDictionaryPropertyTable from "../DataDictionaryPropertyTable";
import "./DataDictionaryNode.css";
import styles from "./DataDictionaryNode.style";
import NodeViewComponent from "./components/NodeViewComponent";
import { getIconDetails } from "../../../../../utils/iconUtils";
import DataDictionaryRelationshipTable from "../DataDictionaryRelationshipTable";

const DataDictionaryNode = (props) => {
  const { classes, node, pdfDownloadConfig, description, iconMapInfo } = props;

  const [expandState, setExpandState] = useState("");

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

  return (
    <>
      <div
        className={classes.node}
        style={{ borderLeftColor: getIconDetails(node.category, iconMapInfo?.map).color }}
      >
        <NodeViewComponent
          node={node}
          expandState={expandState}
          description={description}
          onExpandClick={handleClickExpand}
          pdfDownloadConfig={pdfDownloadConfig}
        />
      </div>
      <div
        className={classes.property}
        style={{ borderLeft: `5px solid ${getIconDetails(node.category, iconMapInfo?.map).color}` }}
      >
        {expandState === "properties" && (
          <DataDictionaryPropertyTable
            title={node.title}
            properties={node.properties}
            requiredProperties={node.required}
            preferredProperties={node.preferred}
          />
        )}
        {expandState === "relationships" && (
          <DataDictionaryRelationshipTable node={node} />
        )}
      </div>
    </>
  );
};

DataDictionaryNode.propTypes = {
  node: PropTypes.object.isRequired,
  description: PropTypes.string,
  expanded: PropTypes.bool,
  onExpandNode: PropTypes.func,
};

DataDictionaryNode.defaultProps = {
  description: "",
  expanded: false,
  onExpandNode: () => { },
};

export default withStyles(styles)(DataDictionaryNode);
