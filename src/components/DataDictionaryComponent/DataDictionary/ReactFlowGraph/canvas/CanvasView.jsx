import React, { useCallback } from 'react';
import { useSelector } from "react-redux";
import { CircularProgress, withStyles } from '@material-ui/core';
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
import ReduxOverlayPropertyTable from '../../graph/OverlayPropertyTable';

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
 * reactflow requires to create child component
 *  to add customize control buttons
 */
const CustomFlowView = ({
  classes,
  nodes,
  edges,
  onConnect,
  onNodesChange,
  onEdgesChange,
  highlightedNodes,
}) => {
  const { setViewport, zoomIn, zoomOut } = useReactFlow();
  const handleTransform = useCallback(() => {
    setViewport({ x: -200, y: 0, zoom: 1 }, { duration: 200 });
  }, [setViewport]);

  /**
   * pdf configuration
   */
  const pdfDownloadConfig = useSelector(state => state.ddgraph.pdfDownloadConfig);
  if (!pdfDownloadConfig) {
    return <CircularProgress />
  }

  const overlayPropertyHidden = useSelector(state => state.ddgraph.overlayPropertyHidden);

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
      <ReduxOverlayPropertyTable pdfDownloadConfig={pdfDownloadConfig} />
      <MiniMap nodeColor={nodeColor} style={minimapStyle} pannable position='bottom-left' />
      {/* <Controls position='top-left' /> */}
      <div className={classes.controls}>
        <div onClick={handleTransform} title="reset" className={classes.controlBtn}>
          <img src={resetIcon} alt="reset_icon" />
        </div>
        <div title="zoom in" onClick={() => zoomIn({ duration: 200 })} className={classes.controlBtn}>
          <img src={ZoomInIcon} alt="ZoomInIcon" />
        </div>
        <div title="zoom out" onClick={() => zoomOut({ duration: 200 })} className={classes.controlBtn}>
          <img src={ZoomOutIcon} alt="ZoomOutIcon" />
        </div>
      </div>
      <ReduxAutoFitView />
      <ReduxViewPort />
      <Background
        style={{
          backgroundColor: highlightedNodes
            && !!highlightedNodes.length
            ? '#C5DEEA'
            : '#E7F3F7'
        }}
        color="#aaa"
        gap={12}
      />
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
  onClearSearchResult,
  highlightedNodes,
}) => {

  return (
    <div className={classes.mainWindow}>
      <LegendView
        categoryItems={categories}
      />
      <ActionLayer handleClearSearchResult={onClearSearchResult} />
      <ReactFlowProvider>
        <CustomFlowView
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          classes={classes}
          highlightedNodes={highlightedNodes}
        />
      </ReactFlowProvider>
    </div>
  );
}

export default withStyles(Styles)(CanvasView);
