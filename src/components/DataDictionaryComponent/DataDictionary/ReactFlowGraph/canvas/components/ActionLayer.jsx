import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@gen3/ui-component/dist/components/Button';
import styles from './ActionLayer.style';

/**
* A layer over the graph.
* Put action buttons here.
*/
const ActionLayer = ({
  classes,
  isSearchMode = false,
  handleClearSearchResult
}) => {
  const handleClearSearch = () => {
    handleClearSearchResult();
  }

  return (
    <div className={classes.actionLayer}>
      {
        isSearchMode && (
          <Button
            className={classes.clearSearch}
            onClick={handleClearSearch}
            label="Clear Search Result"
          />
        )
      }
    </div>
  );
}

export default withStyles(styles)(ActionLayer);
