/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { capitalizeFirstLetter } from "../../utils";
import DataDictionaryNode from "../DataDictionaryNode";
import styles from "./DataDictionaryCategory.style";
import { getIconDetails } from "../../../../../utils/iconUtils";
import { DefaultIcon } from "../../../../../config/IconMap";

const DataDictionaryCategory = ({
  classes,
  category,
  highlightingNodeID,
  pdfDownloadConfig,
  onExpandNode,
  nodes,
  iconMapInfo,
}) => {
  const iconDetails = getIconDetails(category, iconMapInfo?.map);
  return (
    <div>
      <div
        style={{
          borderLeftColor: iconDetails.color,
          background: iconDetails.background,
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          color: "#ffffff",
          paddingLeft: '20px',
          gap: '8px'
        }}
      >
        <img
          src={iconDetails.svg}
          alt="icon"
          style={{ width: '32px' }}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = DefaultIcon.svg;
          }}
        />
        <div className={classes.title}>
          <span>{capitalizeFirstLetter(category)} </span>
        </div>
      </div>
      {nodes.map((node, idx) => (
        <DataDictionaryNode
          node={node}
          key={node.id}
          description={node.description}
          pdfDownloadConfig={pdfDownloadConfig}
          expanded={highlightingNodeID && highlightingNodeID.includes(node.id)}
          onExpandNode={onExpandNode}
          iconMapInfo={iconMapInfo}
          isLastNode={idx === nodes.length - 1}
        />
      ))}
    </div>
  );
};

DataDictionaryCategory.propTypes = {
  category: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  highlightingNodeID: PropTypes.string,
  onExpandNode: PropTypes.func,
};

DataDictionaryCategory.defaultProps = {
  highlightingNodeID: null,
  onExpandNode: () => { },
};

const mapStateToProps = (state) => ({
  iconMapInfo: state.iconMapInfo,
});

export default withStyles(styles)(
  connect(mapStateToProps, {})(DataDictionaryCategory)
);
