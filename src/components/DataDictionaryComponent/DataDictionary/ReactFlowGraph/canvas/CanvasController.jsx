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
import { newCreateNodesAndEdges } from '../../../GraphUtils/utils';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 100;
const nodeHeight = 36;

const CanvasController = ({
//   flowData,
  ddgraph,
  currentSearchKeyword,
  isSearchMode,
  tabViewWidth,
  dictionary
}) => {

    if (tabViewWidth === 0) {
      return <CircularProgress />;
    }

    /** node
    * 1. position (x, y)
    * 2. title
    * 3. highlight node based on matching search query to desc, properties and title
    */
    const getLayoutedElements = (nodes, edges, nodeInternals, direction = 'TB') => {
        // console.log("update node details");
        // const isHorizontal = direction === 'LR';
        // dagreGraph.setGraph({ rankdir: direction });
        // nodes.forEach((node) => {
        //     if (nodeInternals && nodeInternals.size > 0) {
        //         const nodeObj = nodeInternals.get(`${node.id}`);
        //         // dagreGraph.setNode(node.id, { width: node, height });
        //     } else {
        //         dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        //     }
        // });
        // edges.forEach((edge) => {
        //     dagreGraph.setEdge(edge.source, edge.target);
        // });
        // dagre.layout(dagreGraph);
        // nodes.forEach((node) => {
        //     // const nodeWithPosition = dagreGraph.node(node.id);
        //     node.targetPosition = isHorizontal ? 'left' : 'top';
        //     node.sourcePosition = isHorizontal ? 'right' : 'bottom';
        //     // We are shifting the dagre node position (anchor=center center) to the top left
        //     // so it matches the React Flow node anchor point (top left).
        //     // node.position = {
        //         // x: nodeWithPosition.x - nodeWidth / 2,
        //         // y: nodeWithPosition.y - nodeHeight / 2,
        //     // };

        //     /**
        //      * set class for matching search query to desc, properties and title
        //      */
        //     return node;
        // });
        return { nodes, edges };
    };

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    /**
     * reactflow graph view 
     */
    // const graphData = newCreateNodesAndEdges({dictionary}, true, [], tabViewWidth);
    const [flowData, setFlowData] = React.useState(null);

    useEffect(() => {
        const graphData = newCreateNodesAndEdges({dictionary}, true, [], tabViewWidth);
        setFlowData(graphData);
      }, [dictionary]);

    useEffect(() => {
        console.log("use effect canvas controller");
        const flowData = newCreateNodesAndEdges({dictionary}, true, [], tabViewWidth);
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            flowData.nodes,
            flowData.edges,
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        console.log(flowData);
    }, [flowData, currentSearchKeyword]);

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
    ddgraph: state.ddgraph,
    isSearchMode: state.ddgraph.isSearchMode,
    currentSearchKeyword: state.ddgraph.currentSearchKeyword
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasController);
