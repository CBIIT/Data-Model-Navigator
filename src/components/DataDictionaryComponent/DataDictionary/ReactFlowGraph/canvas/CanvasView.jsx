import React from 'react';
import { withStyles } from '@material-ui/core';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
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

const nodeTypes = {
  custom: NodeView,
};

const edgeTypes = {
  custom: EdgeView,
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
