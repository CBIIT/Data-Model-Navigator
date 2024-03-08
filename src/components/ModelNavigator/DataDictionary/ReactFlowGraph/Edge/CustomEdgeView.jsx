import React, { memo, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { getStraightPath } from 'reactflow';
import Styles from './CustomEdgeStyle';

const CustomEdgeView = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
  isSearchMode,
  expandNodeView,
  highlightParentNodes,
}) => {

  const [highlightEdge, setHighlightEdge] = useState(false);
  useEffect(() => {
    if (expandNodeView) {
      const highlightEdge = highlightParentNodes.includes(source)
        && highlightParentNodes.includes(target);
      if (highlightEdge) {
        setHighlightEdge(true);
      }
    }
  }, [expandNodeView])

  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const stroke = isSearchMode ? '#b1b1b7' : (!expandNodeView)
    ? "#222" : (expandNodeView && highlightEdge) ? "#222" : '#b1b1b7';

  return (
    <>
      <path
        id={id}
        fill="none"
        stroke={stroke}
        strokeWidth={1}
        className="animated"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  )
}

export default withStyles(Styles)(memo(CustomEdgeView));
