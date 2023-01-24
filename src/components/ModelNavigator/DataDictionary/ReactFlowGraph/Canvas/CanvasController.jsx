import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    addEdge,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import CircularProgress from '@material-ui/core/CircularProgress';
import CanvasView from './CanvasView';
import { createNodesAndEdges } from '../GraphUtils/utils';
import { getDistinctCategoryItems, setMatchingNodeTitle, getCategoryIconUrl } from './util';
import { onPanelViewClick, onViewChange, setReactFlowGraphData } from '../../Store/actions/graph';
import { getNodePosition } from './CanvasHelper';

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
  assetConfig
}) => {

    if (tabViewWidth === 0 || !graphViewConfig) {
      return <CircularProgress />;
    }

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [categories, setCategories] = useState([]);
    const [iconsURL, setIconsURL] = useState({});

    /**
     * initalize category item for Legend
     */
    useEffect(() => {
        const categories = getDistinctCategoryItems(Object.values(unfilteredDictionary));
        setCategories(categories);
        const urls = getCategoryIconUrl(categories, `${assetConfig?.iconUrl}`);
        setIconsURL(urls);
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
         */
        if (dictionary && nodeTree) {
          const nodePosition = getNodePosition(dictionary, nodeTree, tabViewWidth);
          nodes.forEach((node) => {
            // node.data.icon = iconsURL[node.category];
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
     * 2. toggle between on/off for serach mode
     */
    useEffect(() => {
        const flowData = createNodesAndEdges({dictionary}, true, []);
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            flowData.nodes,
            flowData.edges,
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [dictionary, currentSearchKeyword]);

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
});

const mapDispatchToProps = (dispatch) => ({
  setGraphData: (graphData) => {dispatch(setReactFlowGraphData(graphData))},
  onGraphPanelClick: () => {dispatch(onPanelViewClick())}
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasController);
