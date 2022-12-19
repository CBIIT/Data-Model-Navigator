import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@gen3/ui-component/dist/components/Button';
import styles from './ActionLayer.style';
import clsx from 'clsx';

/**
* A layer over the graph.
* Put action buttons here.
*/
const ActionLayer = ({
  classes,
  isSearchMode = false,
  handleClearSearchResult,
  overlayPropertyHidden
}) => {
  const handleClearSearch = () => {
    handleClearSearchResult();
  }

  return (
    <div className={clsx(classes.actionLayer, {
      [classes.zvalue]: !overlayPropertyHidden,
    })}>
      {
        isSearchMode && (
          <Button
            className={clsx(classes.clearSearch, {
              [classes.zvalue]: !overlayPropertyHidden,
            })}
            onClick={handleClearSearch}
            label="Clear Search Result"
          />
        )
      }
    </div>
  );
}

export default withStyles(styles)(ActionLayer);
