import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    addEdge,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import CircularProgress from '@material-ui/core/CircularProgress';
import dagre from 'dagre';
import CanvasView from './CanvasView';
import { setMatchingNodeClass } from './util';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 100;
const nodeHeight = 36;

const CanvasController = ({
  flowData,
  ddgraph
}) => {
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

        /** node
        * 1. position (x, y)
        * 2. title
        * 3. highlight node based on matching search query to desc, properties and title
        */
        const { matchedNodeIDs, matchedNodeIDsInNameAndDescription, matchedNodeIDsInProperties } = ddgraph;
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

            /**
             * set class for matching search query to desc, properties and title
             */
            setMatchingNodeClass(matchedNodeIDs, matchedNodeIDsInNameAndDescription, matchedNodeIDsInProperties);
            return node;
        });
        return { nodes, edges };
    };

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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

    if (nodes.length === 0 && edges.length === 0) {
        return <CircularProgress />;
    }

    return (
        <CanvasView
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
        />
    )
}

const mapStateToProps = (state) => ({
    ddgraph: state.ddgraph
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasController);
