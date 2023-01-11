import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@gen3/ui-component/dist/components/Button';
import styles from './ActionLayer.style';

/**
* A layer over the graph.
* Put action buttons here.
*/
class ActionLayer extends React.Component {
  handleClearSearch = () => {
    this.props.onClearSearchResult();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.actionLayer}>
        {
          this.props.isSearchMode && (
            <Button
              className={classes.clearSearch}
              onClick={this.handleClearSearch}
              label="Clear Search Result"
            />
          )
        }
      </div>
    );
  }
}

ActionLayer.propTypes = {
  isSearchMode: PropTypes.bool,
  onClearSearchResult: PropTypes.func,
};

ActionLayer.defaultProps = {
  isSearchMode: false,
  onClearSearchResult: () => {},
};

export default withStyles(styles)(ActionLayer);
