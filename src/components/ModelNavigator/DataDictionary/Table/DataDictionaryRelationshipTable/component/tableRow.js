import React from "react";
import { withStyles } from "@material-ui/core";
import "../DataDictionaryPropertyTable.css";

const TableRow = ({
  classes,
  links,
}) => {
  if (!links || links?.length === 0) {
    return (
      <tr className={classes.row}>
        <td colSpan={5} className={classes.noRelationships}>No relationships found.</td>
      </tr>
    );
  }

  console.log(links);

  return links.map((link) => (
    <tr key={`${link.targetId}_${link.target_type}`} className={classes.row}>
      <td className={classes.rowItem}>
        {link.target_type}.{link.targetId}
      </td>
      <td className={classes.rowItem}>
        "string"
      </td>
      <td className={classes.rowItem}>
        {link.target_type}
      </td>
      <td className={classes.rowItem}>
        {link.multiplicity}
      </td>
      <td className={classes.rowItem}>
        At least one relationship must be specified.
      </td>
    </tr>
  ));
};

const styles = () => ({
  rowItem: {
    padding: "10px 10px 10px 15px",
    "& p": {
      margin: "auto",
    },
    "&:nth-child(2)": {
      maxWidth: "300px",
      minWidth: "100px",
      wordWrap: "break-word",
    },
    "& span": {
      "&:last-child:not(:first-child)": {
        display: "block",
        marginTop: "13px",
      },
    },
  },
  labeledSpan: {
    fontWeight: "600",
  },
  labeled: {
    marginTop: "2em",
  },
  row: {
    padding: "10px 10px 10px 15px",
    border: "0",
    textAlign: "left",
    fontFamily: "raleway",
    verticalAlign: "top",
    "& p": {
      margin: "auto",
    },
    "&:nth-child(2) > p": {
      maxWidth: "300px",
      minWidth: "100px",
      wordWrap: "break-word",
    },
    "&:nth-child(odd)": {
      background: "#fff",
    },
    "&:nth-child(even)": {
      background: "#f4f5f5",
    },
  },
  noRelationships: {
    textAlign: "center",
    padding: "15px",
    color: "#666666",
  },
  required: {
    color: "#8D432A",
    fontSize: "13px",
    fontWeight: "900",
  },
  keyProperty: {
    display: "inline-block",
    minWidth: "220px",
    fontWeight: "700",
    color: "#0d71a3",
    "& p": {
      float: "left",
      margin: "auto",
    },
  },
  acceptValue: {
    margin: "0",
    minWidth: "130px",
  },
  keyPropertyIcon: {
    width: "25px",
    marginLeft: "8px",
    paddingTop: "5px",
  },
  description: {
    "& span": {
      "&:last-child:not(:first-child)": {
        display: "block",
        marginTop: "13px",
      },
    },
  },
});

export default withStyles(styles)(TableRow);
