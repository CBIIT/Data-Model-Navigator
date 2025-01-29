import React from "react";
import { withStyles } from "@material-ui/core";
import Markdown from "react-markdown";
import styles from "./Changelog.style";
import { useSelector } from "react-redux";

const ChangelogComponent = ({ classes }) => {
  const changelogMD = useSelector(
    (state) => state.changelogInfo && state.changelogInfo.mdData
  );

  return (
    <div className={classes.markdownBox}>
      {changelogMD ? (
        <Markdown>{changelogMD}</Markdown>
      ) : (
        <div className={classes.error}>
          An error occurred while loading the Release Notes
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(ChangelogComponent);

