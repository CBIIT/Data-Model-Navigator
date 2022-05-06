import React from 'react';
import { withStyles } from '@material-ui/core';

const TableHeader = ({classes, hideIsRequired}) => (
  <thead className={classes.tableHead}>
    <tr>
      <th className={classes.item}>
          Property
      </th>
      <th className={classes.item}>
          Type
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
    color: '#606060',
    fontSize: '13px',
    background: '#fff',
    borderTop: '2px solid #606060',
    borderBottom: '2px solid #606060',
    '& th': {
      fontWeight: '900',
    },
  },
  item: {
    padding: '10px 10px 10px 19px',
    border: '0',
    textAlign: 'left',
    fontFamily: 'raleway',
    verticalAlign: 'top',
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
