import React, { useCallback } from 'react';
import { withStyles } from '@material-ui/core';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  useReactFlow
} from 'reactflow';
import NodeView from '../node/ReduxNodeView';
import EdgeView from '../edge/ReduxEdgeView';
import Styles from './CanvasStyle';
import ReduxViewPort from './ReduxViewPort';
import ReduxAutoFitView from './ReduxAutoFitView';
import { nodeColor } from './util';
import LegendView from '../../graph/Legend/ReduxLegendView';
import './Canvas.css';
import './assets/style.css';
import ActionLayer from './components/ReduxActionLayer';
import resetIcon from './assets/graph_icon/Reset.svg';
import ZoomInIcon from './assets/graph_icon/ZoomIn.svg';
import ZoomOutIcon from './assets/graph_icon/ZoomOut.svg';

const nodeTypes = {
  custom: NodeView,
};

const edgeTypes = {
  custom: EdgeView,
};

const minimapStyle = {
  height: 120,
};

/**
 * 
 * @param {*} param0 
 * @returns 
 * reactflow requirement to add customize control buttons
 */
const CustomFlowView = ({
  classes,
  nodes,
  edges,
  onConnect,
  onNodesChange,
  onEdgesChange,
}) => {
  const { setViewport, zoomIn, zoomOut } = useReactFlow();
  const handleTransform = useCallback(() => {
    setViewport({x: 0, y: 0, zoom: 1 }, { duration: 200 });
  }, [setViewport]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      minZoom={1}
      maxZoom={1.8}
      fitView
    >
      <MiniMap nodeColor={nodeColor} style={minimapStyle} pannable position='bottom-left' />
      {/* <Controls position='top-left' /> */}
      <div className={classes.controls}>
        <div onClick={handleTransform} className={classes.controlBtn}>
          <img src={resetIcon} alt="reset_icon" />
        </div>
        <div onClick={() => zoomIn({ duration: 200 })} className={classes.controlBtn}>
          <img src={ZoomInIcon} alt="ZoomInIcon" />
        </div>
        <div onClick={() => zoomOut({ duration: 200 })} className={classes.controlBtn}>
          <img src={ZoomOutIcon} alt="ZoomOutIcon" />
        </div>
      </div>
      <ReduxAutoFitView />
      <ReduxViewPort />
      <Background color="#aaa" gap={12} />
    </ReactFlow>
  );
}

const CanvasView = ({
  classes,
  nodes,
  edges,
  onConnect,
  onNodesChange,
  onEdgesChange,
  categories,
  onClearSearchResult
}) => {
    
    return (
      <div className={classes.mainWindow}>
        <LegendView
          categoryItems={categories}
        />
        <ActionLayer handleClearSearchResult={onClearSearchResult} />
        <ReactFlowProvider>
          {/* <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            minZoom={1}
            maxZoom={1.8}
            fitView
          >
            <MiniMap nodeColor={nodeColor} style={minimapStyle} pannable position='bottom-left' />
            <Controls position='top-left' />
            <ReduxAutoFitView />
            <ReduxViewPort />
            <Background color="#aaa" gap={12} />
          </ReactFlow> */}
          <CustomFlowView
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            classes={classes}
          />
        </ReactFlowProvider>
      </div>
    );
}

export default withStyles(Styles)(CanvasView);
