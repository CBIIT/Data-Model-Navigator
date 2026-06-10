import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
    addEdge,
  applyNodeChanges,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import CircularProgress from '@material-ui/core/CircularProgress';
import CanvasView from './CanvasView';
import { createNodesAndEdges } from '../GraphUtils/utils';
import { getDistinctCategoryItems, setMatchingNodeTitle } from './util';
import { onNodeDragStart, onPanelViewClick, onViewChange, setReactFlowGraphData } from '../../Store/actions/graph';
import { getNodePosition } from './CanvasHelper';
import { DefaultIcon } from '../../../../../config/IconMap';

/**
 * Handles all canvas state
 * 1. nodes
 * 2. edges
 * 3. positioning of nodes with BFS 
 * 4. tracks search mode
 * @param {*} param0 
 * @returns canvas component
 */

const CanvasController = ({
//   flowData,
  ddgraph,
  currentSearchKeyword,
  tabViewWidth,
  dictionary,
  searchResults,
  isSearchMode,
  onClearSearchResult,
  setGraphData,
  nodeTree,
  unfilteredDictionary,
  highlightedNodes,
  graphViewConfig,
  onGraphPanelClick,
  assetConfig,
  ancestorFilterNodeIds
}) => {
    if (tabViewWidth === 0 || !graphViewConfig) {
      return <CircularProgress />;
    }

    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [categories, setCategories] = useState([]);
    const nodePositionsRef = useRef({});

    const cacheNodePositions = useCallback((nodeList) => {
      nodeList.forEach((node) => {
        if (node?.id && node?.position) {
          nodePositionsRef.current[node.id] = node.position;
        }
      });
    }, []);

    const onNodesChange = useCallback((changes) => {
      setNodes((currentNodes) => {
        const updatedNodes = applyNodeChanges(changes, currentNodes);
        cacheNodePositions(updatedNodes);
        return updatedNodes;
      });
    }, [setNodes, cacheNodePositions]);

    /**
     * initalize category item for Legend
     */
    useEffect(() => {
        const categories = getDistinctCategoryItems(Object.values(unfilteredDictionary));
        setCategories(categories);
    }, []);

    /** node
    * 1. position (x, y)
    * 2. title
    * 3. highlight node based on matching search query to desc, properties and title
    */
    const getLayoutedElements = (nodes, edges, nodeInternals, direction = 'TB') => {
        /**
         * highlight node based on matching search query to desc, properties and title
         * setMatchingNodeTitle return indexes to highlight node title (string)
         */
        if (isSearchMode) {
          const matchingNodeTitle = setMatchingNodeTitle(searchResults);
          nodes.forEach((node) => {
            if(matchingNodeTitle[node.id]) {
              node.data.matchedNodeNameQuery = currentSearchKeyword;
            }
          });
        }
        /**
         * assign node position
         * canvas configuration
         * 1. custom node tree
         * 2. xIntervel & yIntervel
         */
        const { canvas } = graphViewConfig;
        if (dictionary && nodeTree) {
          const nodePosition = getNodePosition({
            dictionary,
            nodeTree: canvas?.nodeTree || nodeTree,
            tabViewWidth,
            ...canvas?.fit,
          });
          nodes.forEach((node) => {
            if(!node.data.icon) {
              node.data.icon = DefaultIcon.svg;
            }
            const persistedPosition = nodePositionsRef.current[node.id];
            if (persistedPosition) {
              node.position = persistedPosition;
              return;
            }
            const position = nodePosition[node.id];
            node.position = {
              x: position[0],
              y: position[1]
            }
          });
        }
        return { nodes, edges };
    };

    /**
     * update states
     * 1. nodes and edges
     * 2. toggle between on/off for search mode
     * 3. filter nodes/edges based on ancestor filter
     */
    useEffect(() => {
        const flowData = createNodesAndEdges({dictionary}, true, []);
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            flowData.nodes,
            flowData.edges,
        );
        
        if (ancestorFilterNodeIds) {
            const filteredNodes = layoutedNodes.filter(node => 
                ancestorFilterNodeIds.has(node.id)
            );
            const filteredEdges = layoutedEdges.filter(edge => 
                ancestorFilterNodeIds.has(edge.source) && ancestorFilterNodeIds.has(edge.target)
            );
            setNodes(filteredNodes);
            setEdges(filteredEdges);
            cacheNodePositions(filteredNodes);
        } else {
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
            cacheNodePositions(layoutedNodes);
        }
      }, [dictionary, currentSearchKeyword, ancestorFilterNodeIds, setNodes, setEdges, cacheNodePositions]);

    const onConnect = useCallback(
      (params) =>
        setEdges((eds) =>
          addEdge({ ...params, type: ConnectionLineType?.SmoothStep, animated: true }, eds)
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
        categories={categories}
        onClearSearchResult={onClearSearchResult}
        highlightedNodes={highlightedNodes}
        graphViewConfig={graphViewConfig}
        canvasWidth={tabViewWidth}
        onGraphPanelClick={onGraphPanelClick}
      />
    )
}

const mapStateToProps = (state) => ({
    ddgraph: state.ddgraph,
    isSearchMode: state.ddgraph.isSearchMode,
    currentSearchKeyword: state.ddgraph.currentSearchKeyword,
    searchResults: state.ddgraph.searchResult,
    nodeTree : state.submission.node2Level,
    highlightedNodes: state.ddgraph.highlightedNodes,
    unfilteredDictionary: state.submission.unfilteredDictionary,
    graphViewConfig: state.ddgraph.graphViewConfig,
    assetConfig: state.ddgraph.assetConfig,
    ancestorFilterNodeIds: state.ddgraph.ancestorFilterNodeIds,
});

const mapDispatchToProps = (dispatch) => ({
  setGraphData: (graphData) => {dispatch(setReactFlowGraphData(graphData))},
  onGraphPanelClick: () => {
    dispatch(onPanelViewClick());
    dispatch({ type: 'CLEAR_ANCESTOR_FILTER' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasController);
