import React, { memo, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { getStraightPath } from 'reactflow';
import Styles from './CustomEdgeStyle';

const CustomEdgeView = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
  isSearchMode
}) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        fill="none"
        stroke={isSearchMode ? '#b1b1b7' : "#222"}
        strokeWidth={1}
        className="animated"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  )
}

export default withStyles(Styles)(memo(CustomEdgeView));
