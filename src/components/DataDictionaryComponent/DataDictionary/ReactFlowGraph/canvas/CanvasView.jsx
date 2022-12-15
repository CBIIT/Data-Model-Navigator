import React from 'react';
import { withStyles } from '@material-ui/core';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
} from 'reactflow';
import './assets/style.css';
import NodeView from '../node/ReduxNodeView';
import Styles from './CanvasStyle';
import ReduxViewPort from './ReduxViewPort';
import AutoFitView from './AutoFitView';
import { nodeColor } from './util';
import './Canvas.css';

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
}) => {
    
    return (
        <div className={classes.mainWindow}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    minZoom={0.7}
                    maxZoom={2}
                    fitView
                >
                    <MiniMap nodeColor={nodeColor} style={minimapStyle} pannable position='bottom-left' />
                    <Controls position='top-left' />
                    <AutoFitView />
                    <ReduxViewPort />
                    <Background color="#aaa" gap={12} />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}

export default withStyles(Styles)(CanvasView);
