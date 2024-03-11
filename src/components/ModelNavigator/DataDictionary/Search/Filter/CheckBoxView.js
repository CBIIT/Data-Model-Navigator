/* eslint-disable no-unused-vars */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox, ListItem, ListItemText, Divider, Tooltip } from "@material-ui/core";
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
} from "@material-ui/icons";
import _ from "lodash";

const styles = {
  listItemGutters: {
    padding: "10px 20px 10px 0px",
    // paddingRight: '5px',
    boxShadow: "inset -10px -1px 10px -7px rgb(50 50 50 / 25%)",
    display: "flex",
    alignItems: "center",
  },
  checkboxRoot: {
    marginLeft: "5px",
    height: 12,
  },
  panelDetailText: {
    color: "#323232",
    fontFamily: "Nunito",
    fontSize: "14px",
    fontWeight: "200",
  },
  panelSubjectText: {
    color: "#323232",
    fontFamily: "Nunito",
    fontSize: "14px",
    marginRight: "0px",
  },
};
const alignment = "flex-start";

function CheckBoxView(props) {
  const {
    classes,
    checkboxItem,
    handleToggle,
    sideBarItem,
    facetSectionVariables,
    defaultFacetSectionVariables,
    backgroundColor,
    dataDictionary,
  } = props;

  const getStyles = () => {
    if (checkboxItem.isChecked) {
      return {
        backgroundColor: backgroundColor,
        boxShadow: "none",
      };
    }
  };

  return (
    <>
      <ListItem
        width={1}
        button
        alignItems={alignment}
        selected={checkboxItem.isChecked}
        onClick={handleToggle({ ...checkboxItem, ...sideBarItem })}
        className={classes.nested}
        style={getStyles()}
        classes={{
          selected: classes.selected,
          gutters: classes.listItemGutters,
        }}
        role="presentation"
      >
        <Checkbox
          id={`checkbox_${sideBarItem.groupName}_${checkboxItem.name}`}
          icon={<CheckBoxBlankIcon style={{ fontSize: 18 }} />}
          checkedIcon={
            <CheckBoxIcon
              style={{
                fontSize: 18,
              }}
            />
          }
          style={{
            color: facetSectionVariables[sideBarItem.section]
              .checkBoxBorderColor
              ? facetSectionVariables[sideBarItem.section].checkBoxBorderColor
              : "#137fbe",
          }}
          checked={checkboxItem.isChecked}
          tabIndex={-1}
          disableRipple
          color="secondary"
          classes={{ root: classes.checkboxRoot }}
          inputProps={{ "aria-label": checkboxItem.name }}
        />
        {dataDictionary ? (
          checkboxItem.name ? (
            <>
              <Tooltip title={_.startCase(checkboxItem.name)}>
                <div className={classes.panelDetailText}>
                  <span>{`${_.startCase(checkboxItem.name)}`}</span>
                </div>
              </Tooltip>
            </>
          ) : (
            <div className={classes.panelDetailText}>
              <span>{checkboxItem.name}</span>
            </div>
          )
        ) : checkboxItem.title ? (
          <>
            <Tooltip title={checkboxItem.title.name}>
              <div className={classes.panelDetailText}>
                <span>{`${checkboxItem.title.acronym}`}</span>
              </div>
            </Tooltip>
          </>
        ) : (
          <div className={classes.panelDetailText}>
            <span>{checkboxItem.name}</span>
          </div>
        )}
        {/* {label(checkboxItem)} */}
        <ListItemText />
        <div className={classes.panelSubjectText}>
          <span
            style={{
              color: facetSectionVariables[sideBarItem.section]
                ? facetSectionVariables[sideBarItem.section].color
                  ? facetSectionVariables[sideBarItem.section].color
                  : ""
                : defaultFacetSectionVariables.color,
            }}
          >
            &nbsp;
            {checkboxItem.subjects}
          </span>
        </div>
      </ListItem>
      <Divider
        variant="middle"
        style={{
          backgroundColor: checkboxItem.isChecked ? "#FFFFFF" : "#B1B1B1",
          margin: "0px",
          height: checkboxItem.isChecked ? "2px" : "1px",
        }}
      />
    </>
  );
}

export default withStyles(styles)(CheckBoxView);
