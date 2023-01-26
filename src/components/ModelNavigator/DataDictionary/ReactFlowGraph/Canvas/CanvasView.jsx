import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { CircularProgress, withStyles } from '@material-ui/core';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  useReactFlow
} from 'reactflow';
import NodeView from '../Node/ReduxNodeView';
import EdgeView from '../Edge/ReduxEdgeView';
import Styles from './CanvasStyle';
import ReduxViewPort from './ReduxViewPort';
import ReduxAutoFitView from './ReduxAutoFitView';
import { getMinZoom, nodeColor } from './util';
import LegendView from '../Legend/ReduxLegendView';
import './Canvas.css';
import './assets/style.css';
import ActionLayer from './components/ReduxActionLayer';
import resetIcon from './assets/graph_icon/Reset.svg';
import ZoomInIcon from './assets/graph_icon/ZoomIn.svg';
import ZoomOutIcon from './assets/graph_icon/ZoomOut.svg';
import ReduxOverlayPropertyTable from '../OverlayPropertyTable';

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
  graphViewConfig,
  onGraphPanelClick,
  onGraphNodeDrageStart
}) => {
  const { setViewport, zoomIn, zoomOut } = useReactFlow();

  const { fit, width } = graphViewConfig.canvas;

  const [minZoom,  setMinZoom] = useState(fit?.minZoom);
  
  useEffect(() => {
    const zoom = getMinZoom({width, ...fit});
    setMinZoom(zoom);
  }, [width]);

  const handleTransform = useCallback(() => {
    setViewport({ x: fit?.x, y: fit?.y, zoom: getMinZoom({width, ...fit}) }, { duration: 200 });
  }, [setViewport, width]);

  /**
   * pdf configuration
   */
  const pdfDownloadConfig = useSelector(state => state.ddgraph.pdfDownloadConfig);
  if (!pdfDownloadConfig) {
    return <CircularProgress />
  }

  const overlayPropertyHidden = useSelector(state => state.ddgraph.overlayPropertyHidden);

  /**
   * collapse all property dialog box
   * @param {*} event 
   */
  const onPanelClick = (event) => {
    onGraphPanelClick();
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      minZoom={minZoom}
      maxZoom={fit?.maxZoom ? fit.maxZoom : 3}
      // elementsSelectable={false}
      onPaneClick={onPanelClick}
      onNodeDragStart={onGraphNodeDrageStart}
      fitView
      className={classes.reactFlowView}
    >
      <ReduxOverlayPropertyTable pdfDownloadConfig={pdfDownloadConfig} />
      {/* <MiniMap nodeColor={nodeColor} style={minimapStyle} pannable position='bottom-left' /> */}
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
      <ReduxAutoFitView canvasWidth={width} />
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
  graphViewConfig,
  onGraphPanelClick,
  onGraphNodeDrageStart,
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
          graphViewConfig={graphViewConfig}
          onGraphPanelClick={onGraphPanelClick}
          onGraphNodeDrageStart={onGraphNodeDrageStart}
        />
      </ReactFlowProvider>
    </div>
  );
}

export default withStyles(Styles)(CanvasView);
