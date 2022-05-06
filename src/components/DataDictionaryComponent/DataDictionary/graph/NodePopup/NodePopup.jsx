/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@gen3/ui-component/dist/components/Button';
import styles from './NodePopup.style';

class NodePopup extends React.Component {
  handleClickPropertyButton = () => {
    this.props.onOpenOverlayPropertyTable();
  }

  render() {
    const {
      classes,
      highlightingNode,
      canvasBoundingRect,
      graphNodesSVGElements,
      onClosePopup,
    } = this.props;

    if (!highlightingNode) {
      return (
        <></>
      );
    }
    const highlightingNodeSVGElement = graphNodesSVGElements &&
        graphNodesSVGElements[highlightingNode.id];
    const svgBoundingBox = highlightingNodeSVGElement
      && highlightingNodeSVGElement.getBoundingClientRect
      ? highlightingNodeSVGElement.getBoundingClientRect()
      : {
        top: 0, left: 0, width: 0, bottom: 0,
      };
    const popupLeft = (svgBoundingBox.left - canvasBoundingRect.left)
      + (svgBoundingBox.width / 2);
    const popupTop = svgBoundingBox.bottom - canvasBoundingRect.top;
    return (
      <div
        className={classes.popup}
        style={{
          top: popupTop,
          left: popupLeft,
        }}
      >
        {
          highlightingNode && (
            <div className={classes.wrapper}>
              <div className={classes.content}>
                <ul className={classes.list}>
                  <li className={classes.listItem}>
                    <span className={classes.listItemLabel}>
                      {'Assignment: '}
                    </span>
                    {highlightingNode.assignment}
                  </li>
                  <li className={classes.listItem}>
                    <span className={classes.listItemLabel}>
                      {'Class: '}
                    </span>
                    {highlightingNode.class}
                  </li>
                  <li className={classes.listItem}>
                    <span className={classes.listItemLabel}>
                      {'Required Properties: '}
                    </span>
                    {highlightingNode.requiredPropertiesCount}
                  </li>
                  <li className={classes.listItem}>
                    <span className={classes.listItemLabel}>
                      {'Preferred Properties: '}
                    </span>
                    {highlightingNode.preferredPropertiesCount}
                  </li>
                  <li className={classes.listItem}>
                    <span className={classes.listItemLabel}>
                      {'Optional Properties: '}
                    </span>
                    {highlightingNode.optionalPropertiesCount}
                  </li>
                </ul>
                <Button
                  className={classes.button}
                  onClick={this.handleClickPropertyButton}
                  label="OPEN PROPERTIES"
                  buttonType="secondary"
                />
              </div>
              <span className={`${classes.arrow} ${classes.arrowOutter}`} />
              <span className={`${classes.arrow} ${classes.arrowInner}`} />
              <i
                className={`${classes.close} g3-icon g3-icon--cross`}
                onClick={onClosePopup}
                onKeyPress={onClosePopup}
                role="button"
                tabIndex={0}
                aria-label="Close-popup"
              />
            </div>
          )
        }
      </div>
    );
  }
}

NodePopup.propTypes = {
  highlightingNode: PropTypes.object,
  graphNodesSVGElements: PropTypes.object,
  onClosePopup: PropTypes.func,
  canvasBoundingRect: PropTypes.object,
  onOpenOverlayPropertyTable: PropTypes.func,
};

NodePopup.defaultProps = {
  highlightingNode: null,
  graphNodesSVGElements: null,
  onClosePopup: () => {},
  canvasBoundingRect: { top: 0, left: 0 },
  onOpenOverlayPropertyTable: () => {},
};

export default withStyles(styles)(NodePopup);
