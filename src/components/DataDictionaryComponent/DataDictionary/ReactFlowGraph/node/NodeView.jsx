import React, { memo, useState } from 'react';
import { Button, withStyles } from '@material-ui/core';
import { Handle, useReactFlow, useStoreApi } from 'reactflow';
import Styles from './NodeStyle';

const NodeView = ({ classes, id, handleId, data }) => {
  const [display, setDisplay] = useState(false);
  const expandHandler = () => setDisplay(!display);
  const { label, icon } = data;
  const displayOverviewTable = () => {
    console.log("display overview table");
  }
  return (
    <>
      <div className={display ? classes.propDialog : ''}>
        <div className={display ? classes.customNodeExpand : classes.customNodeCollapse}>
          <div className={classes.nodeTitle}>
            <button className={classes.nodeTitleBtn} onClick={expandHandler}>
              <img className={classes.nodeIcon} src={icon} alt="study_icon" /> 
              <span className={classes.nodeName}>{label}</span>
            </button>
          </div>
          <div className={display ? classes.viewSection : classes.hideSection}>
            <ul className={classes.list}>
              <li className={classes.listItem}>Assignment: Core</li>
              <li className={classes.listItem}>Class: Primary</li>
              <li className={classes.listItem}>Required Properties: 0</li>
            </ul>
          </div>
          <Handle type="target" position="top" />
          <Handle type="source" position="bottom" id={handleId} />
        </div>
        {display && 
          <button className={classes.viewPropBtn} onClick={displayOverviewTable}>View Properties</button>
        }
      </div>
    </>
  )

  // return (
  //   <div style={{ display: 'flex', flexDirection: 'column', background: '#2D4455', borderRadius: '2px', color: '#fff', width: 200 }}>
  //     <div style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '26px', marginRight: '26px' }}>
  //       <img src={icon} alt="study_icon" style={{height: '35px', width: '42px'}} />
  //       <p>{label}</p>
  //     </div>
  //     <Handle type='target'/>
  //     <Handle type='source'/>
  //   </div>
  // )
}

export default withStyles(Styles)(memo(NodeView));
