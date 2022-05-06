/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { SearchResultItemShape } from '../../utils';
import {
  getMatchesSummaryForProperties,
} from '../../highlightHelper';
import DialogBox from './component/DialogComponent';
import { controlVocabConfig as config } from '../../bento/dataDictionaryData';
import TableHead from './component/tableHead';
import TableRow from './component/tableRow';

const DataDictionaryPropertyTable = ({
  classes,
  onlyShowMatchedProperties,
  properties,
  hasBorder,
  needHighlightSearchResult,
  matchedResult,
  hideIsRequired,
  tideIsRequired,
  requiredProperties,
  preferredProperties,
}) => {
  const [display, setDisplay] = useState(false);
  const [items, setItems] = useState([]);

  const openBoxHandler = (values) => {
    setDisplay(true);
    setItems(values);
  };

  const closeHandler = () => {
    setDisplay(false);
    setItems([]);
  };

  const propertyKeysList = tideIsRequired ? Object.keys(properties)
    : Object.keys(properties);
  const needHighLgSearchResult = onlyShowMatchedProperties
    || needHighlightSearchResult;
  const matchedPropertiesSummary = needHighlightSearchResult
    ? getMatchesSummaryForProperties(
      properties,
      matchedResult.matches,
    ) : [];

  return (
    <div className={classes.propertyTable}>
      <table className={classes.propertyTable}>
        <TableHead hideIsRequired={hideIsRequired} />
        <tbody>
          <TableRow
            propertyKeysList={propertyKeysList}
            requiredProperties={requiredProperties}
            onlyShowMatchedProperties={onlyShowMatchedProperties}
            matchedPropertiesSummary={matchedPropertiesSummary}
            preferredProperties={preferredProperties}
            properties={properties}
            needHighlightSearchResult={needHighLgSearchResult}
            hideIsRequired={hideIsRequired}
            openBoxHandler={openBoxHandler}
          />
        </tbody>
      </table>
      {items.length > 0
      && (
      <DialogBox
        display={display}
        closeHandler={closeHandler}
        items={items}
        maxNoOfItems={config.maxNoOfItems}
        maxNoOfItemDlgBox={config.maxNoOfItemDlgBox}
      />
      )}
    </div>
  );
}

DataDictionaryPropertyTable.propTypes = {
  properties: PropTypes.object.isRequired,
  requiredProperties: PropTypes.array,
  hasBorder: PropTypes.bool,
  needHighlightSearchResult: PropTypes.bool,
  matchedResult: SearchResultItemShape,
  hideIsRequired: PropTypes.bool,
  onlyShowMatchedProperties: PropTypes.bool,
};

DataDictionaryPropertyTable.defaultProps = {
  requiredProperties: [],
  hasBorder: true,
  needHighlightSearchResult: false,
  matchedResult: {},
  hideIsRequired: false,
  onlyShowMatchedProperties: false,
};

const styles = () => ({
  propertyTable: {
    backgroundColor: `var(--g3-color__white)`,
    borderCollapse: 'collapse',
    width: '100%',
  }
});

export default withStyles(styles)(DataDictionaryPropertyTable);
