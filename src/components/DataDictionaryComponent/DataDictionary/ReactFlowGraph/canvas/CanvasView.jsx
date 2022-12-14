import React, { useCallback } from 'react';
import { Button, withStyles } from '@material-ui/core';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
    useStore,
    useReactFlow,
    useStoreApi,
} from 'reactflow';
import './assets/style.css';
import NodeView from '../node/NodeView';
import dagre from 'dagre';

import Styles from './CanvasStyle';
import './Canvas.css';
import { useEffect } from 'react';
import { useMemo } from 'react';
import ReduxViewPort from './ReduxViewPort';

const nodeTypes = {
    custom: NodeView,
};

const minimapStyle = {
    height: 120,
};

const nodeColor = (node) => {
    switch (node.category) {
        case 'administrative':
            return '#9B2D20';
        case 'study':
            return '#9875FF';
        case 'case':
            return '#FF7F15';
        case 'clinical_trial':
            return '#00A1BB';
        case 'biospecimen':
            return '#00785A';
        case 'analysis':
            return '#B533A9';
        case 'data_file':
            return '#00AD0E';
        case 'clinical':
            return '#1C75BC';
        default:
            return '#ff0072';
    }
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 100;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, nodeInternals, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        if (nodeInternals && nodeInternals.size > 0) {
            const nodeObj = nodeInternals.get(`${node.id}`);
            // dagreGraph.setNode(node.id, { width: node, height });
        } else {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        }
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? 'left' : 'top';
        node.sourcePosition = isHorizontal ? 'right' : 'bottom';

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });
    return { nodes, edges };
};

const AutoFitView = (nodes) => {
    const { fitView } = useReactFlow();
    // const store = useStoreApi();
    // const state = store.getState();
    // const nodeInternals = useMemo(() => state.nodeInternals);

    useEffect(() => {
        fitView()
    }, []);
    return null;
    // useEffect(() => {
    //     if (nodeInternals && nodeInternals.size > 0) {
    //         console.log('fig', nodeInternals)
    //         const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    //             flowData.nodes,
    //             flowData.edges,
    //             nodeInternals
    //         );
    //         setNodes(layoutedNodes);
    //         setEdges(layoutedEdges);
    //     }
    // }, [flowData])
};

const CanvasView = ({ classes, dictionary, flowData }) => {
    const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        flowData.nodes,
        flowData.edges,
    );
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            flowData.nodes,
            flowData.edges,
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [flowData]);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
            ),
        []
    );
    const onLayout = useCallback(
        (direction) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                nodes,
                edges,
                direction
            );
            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges]
    );

    return (
        <div className={classes.mainWindow}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={onInit}
                    // attributionPosition="bottom-left"
                    nodeTypes={nodeTypes}
                    minZoom={0.7}
                    maxZoom={2}
                    fitView
                >
                    <MiniMap nodeColor={nodeColor} style={minimapStyle} pannable position='bottom-left' />
                    <Controls position='top-left' />
                    <AutoFitView  />
                    <ReduxViewPort />
                    <Background color="#aaa" gap={12} />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}

export default withStyles(Styles)(CanvasView);
