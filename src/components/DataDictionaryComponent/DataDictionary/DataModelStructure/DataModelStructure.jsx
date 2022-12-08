import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@gen3/ui-component/dist/components/Button';
import Dropdown from '@gen3/ui-component/dist/components/Dropdown';
// import { getGraphCategoryIconSVG } from '../NodeCategories/helper';
import { downloadMultiTemplate } from '../utils';
import { intersection } from '../../utils';
import styles from './DataModelStructure.style';

class DataModelStructure extends React.Component {
  handleClickGraphButton = () => {
    this.props.onSetGraphView(true);
    this.props.onResetGraphCanvas();
  };

  handleClickOverlayPropertyButton = () => {
    this.props.onSetGraphView(true);
    this.props.onSetOverlayPropertyTableHidden(!this.props.overlayPropertyHidden);
  };

  downloadTemplatesEnabled = () => {
    if (this.props.relatedNodeIDs.length > this.props.excludedNodesForTemplates) {
      return true;
    }
    const intersectionNodeIDs = intersection(
      this.props.relatedNodeIDs,
      this.props.excludedNodesForTemplates,
    );
    return intersectionNodeIDs.length !== this.props.relatedNodeIDs.length;
  }

  handleDownloadAllTemplates = (format) => {
    const nodesToDownload = {};
    this.props.relatedNodeIDs
      .filter((nid) => !this.props.excludedNodesForTemplates.includes(nid))
      .forEach((nid) => {
        nodesToDownload[nid] = `${nid}-template.${format}`;
      }, []);
    const allRoutes = this.props.allRoutes.map(
      (nodeIDsInRoute) => nodeIDsInRoute.filter(
        (nid) => !this.props.excludedNodesForTemplates.includes(nid),
      ),
    );
    this.props.downloadMultiTemplate(
      format,
      nodesToDownload,
      allRoutes,
      this.props.clickingNodeName,
      this.props.dictionaryVersion,
    );
  };

  render() {
    const {
      classes,
      dataModelStructure,
    } = this.props;
    if (!dataModelStructure) return (<React.Fragment />);
    return (
      <div className={classes.dataModelStructure}>
        <h4 className={classes.header}>Data Model Structure</h4>
        <div className={classes.containter}>
          <div className={classes.pathLine} />
          {
            dataModelStructure.map((entry, i) => {
              const {
                nodeID, nodeIDsBefore, linksBefore, category,
              } = entry;
              const lastNodeModifier = (i === dataModelStructure.length - 1)
                ? classes.node_name__last : '';
              return (
                <React.Fragment key={nodeID}>
                  {
                    nodeIDsBefore.length > 0 && (
                      <>
                        <div className={classes.summaryBetween}>
                          {nodeIDsBefore.length}
                          {' '}
                          nodes with
                          {' '}
                          {linksBefore.length}
                          {' '}
                          links
                        </div>
                        {
                          !this.props.isGraphView && (
                            <Button
                              onClick={this.handleClickGraphButton}
                              label="See it on graph"
                              className={classes.graphButton}
                              buttonType="secondary"
                            />
                          )
                        }
                      </>
                    )
                  }
                  <div className={classes.node}>
                  <img src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/data_model_pdf_icons/icdc/DMN/table/default.svg" alt="icon" className={classes.icon} />
                    <span className={`${classes.nodeName} ${lastNodeModifier}`}>
                      {nodeID}
                    </span>
                  </div>
                </React.Fragment>
              );
            })
          }
        </div>
        {
          this.props.isGraphView && (
            <>
              <Button
                onClick={this.handleClickOverlayPropertyButton}
                label={this.props.overlayPropertyHidden ? 'Open properties' : 'Close properties'}
                className={classes.tableButton}
                rightIcon="list"
                buttonType="primary"
              />
              {
                this.downloadTemplatesEnabled() && (
                  <Dropdown className={classes.templateDownloadDropdown}>
                    <Dropdown.Button>Download templates</Dropdown.Button>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        rightIcon="download"
                        onClick={() => this.handleDownloadAllTemplates('tsv')}
                      >
                        TSV
                      </Dropdown.Item>
                      <Dropdown.Item
                        rightIcon="download"
                        onClick={() => this.handleDownloadAllTemplates('json')}
                      >
                        JSON
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )
              }
            </>
          )
        }
      </div>
    );
  }
}

DataModelStructure.propTypes = {
  dataModelStructure: PropTypes.arrayOf(PropTypes.object),
  isGraphView: PropTypes.bool,
  onSetGraphView: PropTypes.func,
  onSetOverlayPropertyTableHidden: PropTypes.func,
  onResetGraphCanvas: PropTypes.func,
  overlayPropertyHidden: PropTypes.bool,
  downloadMultiTemplate: PropTypes.func,
  excludedNodesForTemplates: PropTypes.arrayOf(PropTypes.string),
  relatedNodeIDs: PropTypes.arrayOf(PropTypes.string),
  allRoutes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  clickingNodeName: PropTypes.string,
  dictionaryVersion: PropTypes.string,
};

DataModelStructure.defaultProps = {
  dataModelStructure: null,
  isGraphView: true,
  onSetGraphView: () => {},
  onSetOverlayPropertyTableHidden: () => {},
  onResetGraphCanvas: () => {},
  overlayPropertyHidden: true,
  downloadMultiTemplate,
  excludedNodesForTemplates: ['program', 'project'],
  relatedNodeIDs: [],
  allRoutes: [],
  clickingNodeName: '',
  dictionaryVersion: 'Unknown',
};

export default withStyles(styles)(DataModelStructure);
