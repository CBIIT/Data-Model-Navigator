import React, { useMemo, useState } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { controlVocabConfig as ctrlConfig } from '../../../bento/dataDictionaryData';
import TableHead from './component/tableHead';
import TableRow from './component/tableRow';

const DataDictionaryRelationshipTable = ({
  classes,
  node,
}) => {
  const [display, setDisplay] = useState(false);
  const parentLinks = useMemo(() => node?.links?.filter((link) => typeof link?.backref === "string"), [node?.links]);

  const openBoxHandler = () => {
    setDisplay(true);
  };

  const closeHandler = () => {
    setDisplay(false);
  };

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
  requiredProperties: [],
  needHighlightSearchResult: false,
  matchedResult: {},
  hideIsRequired: false,
  onlyShowMatchedProperties: false,
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
  },
});

export default withStyles(styles)(DataDictionaryRelationshipTable);
