import React, { useCallback } from 'react';
import { Button, withStyles } from '@material-ui/core';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import './assets/style.css';
import NodeView from '../node/NodeView';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import Styles from './CanvasStyle';
import './Canvas.css';

const nodeTypes = {
    custom: NodeView,
};

const minimapStyle = {
    height: 120,
};

const CanvasView = ({classes}) => {
    const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const edgesWithUpdatedTypes = edges.map((edge) => {
      if (edge.sourceHandle) {
          const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
          edge.type = edgeType;
      }
      return edge;
    });

    return (
      <div className={classes.mainWindow}>
        <ReactFlow
                nodes={nodes}
                edges={edgesWithUpdatedTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                attributionPosition="bottom-left"
                nodeTypes={nodeTypes}
                minZoom={1.3}
                maxZoom={2}
            >
                <MiniMap style={minimapStyle} zoomable pannable />
                <Controls />
                <Background color="#aaa" gap={12} />
            </ReactFlow>
      </div>
    );
}

export default withStyles(Styles)(CanvasView);
