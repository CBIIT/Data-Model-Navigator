import React from 'react';
import { withStyles } from '@material-ui/core';

const TableHeader = ({ classes, hideIsRequired }) => (
  <thead className={classes.tableHead}>
    <tr>
      <th className={classes.item}>
        Property
      </th>
      <th className={classes.item}>
        Type
      </th>
      <th className={classes.item}>
        CDE Info
      </th>
      {
        !hideIsRequired && (
          <th className={classes.item}>
            Required
          </th>
        )
      }
      <th className={classes.item}>
        Description
      </th>
      <th className={classes.item}>
        Source
      </th>
    </tr>
  </thead>
);

const styles = () => ({
  tableHead: {
    color: '#323232',
    fontSize: '15px',
    "& th:first-child": {
      borderTopLeftRadius: "8px",
    },
    "& th:last-child": {
      borderTopRightRadius: "8px",
    },
    '& th': {
      fontWeight: '600',
      borderBottom: "2px solid #237488",
    },
  },
  item: {
    padding: '10px 10px 10px 15px',
    border: '0',
    textAlign: 'left',
    fontFamily: 'Nunito',
    '& p': {
      margin: 'auto',
    },
    '&:nth-child(2) > p': {
      maxWidth: '300px',
      minWidth: '100px',
      wordWrap: 'break-word',
    },
  },
});

export default withStyles(styles)(TableHeader);
