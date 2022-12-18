import React from 'react';
import { withStyles } from '@material-ui/core';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
} from 'reactflow';
import NodeView from '../node/ReduxNodeView';
import Styles from './CanvasStyle';
import ReduxViewPort from './ReduxViewPort';
import ReduxAutoFitView from './ReduxAutoFitView';
import { nodeColor } from './util';
import LegendView from '../../graph/Legend/LegendView';
import './Canvas.css';
import './assets/style.css';

const nodeTypes = {
  custom: NodeView,
};

const minimapStyle = {
  height: 120,
};

const CanvasView = ({
  classes,
  nodes,
  edges,
  onConnect,
  onNodesChange,
  onEdgesChange,
  categories
}) => {

    return (
      <div className={classes.mainWindow}>
        <LegendView
          categoryItems={categories}
        />
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            minZoom={0.9}
            maxZoom={2}
            fitView
          >
            <MiniMap nodeColor={nodeColor} style={minimapStyle} pannable position='bottom-left' />
            <Controls position='top-left' />
            <ReduxAutoFitView />
            <ReduxViewPort />
            <Background color="#aaa" gap={12} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    );
}

export default withStyles(Styles)(CanvasView);
