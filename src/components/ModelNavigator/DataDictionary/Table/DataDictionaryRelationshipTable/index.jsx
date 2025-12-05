import React, { useMemo } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import TableHead from './component/tableHead';
import TableRow from './component/tableRow';

const DataDictionaryRelationshipTable = ({ classes, node }) => {
  const parentLinks = useMemo(() => node?.links?.filter((link) => typeof link?.backref === "string"), [node?.links]);

  return (
    <div className={classes.propertyTableWrapper}>
      <table className={classes.propertyTable}>
        <TableHead />
        <tbody>
          <TableRow links={parentLinks} />
        </tbody>
      </table>
    </div>
  );
}

DataDictionaryRelationshipTable.propTypes = {
  node: PropTypes.object.isRequired,
};

DataDictionaryRelationshipTable.defaultProps = {
  node: {},
};

const styles = () => ({
  propertyTableWrapper: {
    borderRadius: '8px',
    width: 'calc(100% - 20px)',
    border: "2px solid #237488",
    marginLeft: "10px",
    marginRight: "10px",
  },
  propertyTable: {
    width: '100%',
    borderCollapse: 'collapse',
    "& tr:last-child td:first-child": {
      borderBottomLeftRadius: "8px",
    },
    "& tr:last-child td:last-child": {
      borderBottomRightRadius: "8px",
    },
  },
});

export default withStyles(styles)(DataDictionaryRelationshipTable);
