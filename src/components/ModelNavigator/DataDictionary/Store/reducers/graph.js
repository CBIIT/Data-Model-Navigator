import {
  getSearchHistoryItems,
  clearSearchHistoryItems,
  addSearchHistoryItems,
  onViewChange,
  onCnavasWidthChange,
} from '../../Utils/utils';
import * as actionTypes from '../actions/actionTypes';

const ddgraphInitialState = {
  isGraphView: true,
  layoutInitialized: false,
  nodes: [],
  edges: [],
  graphBoundingBox: [],
  legendItems: [],
  hoveringNode: null,
  highlightingNode: null,
  relatedNodeIDs: [],
  secondHighlightingNodeID: null,
  dataModelStructure: null,
  overlayPropertyHidden: true,
  canvasBoundingRect: { top: 0, left: 0 },
  needReset: false,
  tableExpandNodeID: null,
  searchHistoryItems: getSearchHistoryItems(),
  graphNodesSVGElements: null,
  currentSearchKeyword: '',
  searchResult: [],
  matchedNodeIDs: [],
  matchedNodeIDsInProperties: [],
  matchedNodeIDsInNameAndDescription: [],
  isSearchMode: false,
  isSearching: false,
  highlightingMatchedNodeID: null,
  highlightingMatchedNodeOpened: false,
  dictionary: {},
  pdfDownloadConfig: {},
};

const ddgraph = (state = ddgraphInitialState, action) => {
  switch (action.type) {
    case 'TOGGLE_GRAPH_TABLE_VIEW': {
      return {
        ...state,
        isGraphView: action.isGraphView,
        overlayPropertyHidden: true,
      };
    }
    case 'GRAPH_LAYOUT_CALCULATED': {
      return {
        ...state,
        nodes: action.nodes,
        edges: action.edges,
        graphBoundingBox: action.graphBoundingBox,
        layoutInitialized: true,
      };
    }
    case 'GRAPH_LEGEND_CALCULATED': {
      return {
        ...state,
        legendItems: action.legendItems,
      };
    }
    case 'GRAPH_UPDATE_HOVERING_NODE': {
      const newHoveringNode = state.nodes.find((n) => n.id === action.nodeID);
      return {
        ...state,
        hoveringNode: newHoveringNode,
      };
    }
    case 'GRAPH_UPDATE_CANVAS_BOUNDING_RECT': {
      return {
        ...state,
        canvasBoundingRect: action.canvasBoundingRect,
      };
    }
    case 'GRAPH_UPDATE_RELATED_HIGHLIGHTING_NODE': {
      return {
        ...state,
        relatedNodeIDs: action.relatedNodeIDs,
      };
    }
    case 'GRAPH_UPDATE_SECOND_HIGHLIGHTING_NODE_CANDIDATES': {
      return {
        ...state,
        secondHighlightingNodeCandidateIDs: action.secondHighlightingNodeCandidateIDs,
      };
    }
    case 'GRAPH_UPDATE_PATH_RELATED_TO_SECOND_HIGHLIGHTING_NODE': {
      return {
        ...state,
        pathRelatedToSecondHighlightingNode: action.pathRelatedToSecondHighlightingNode,
      };
    }
    case 'GRAPH_UPDATE_DATA_MODEL_STRUCTURE': {
      return {
        ...state,
        dataModelStructure: action.dataModelStructure,
        dataModelStructureRelatedNodeIDs: action.dataModelStructureRelatedNodeIDs,
        dataModelStructureAllRoutesBetween: action.routesBetweenStartEndNodes,
      };
    }
    case 'GRAPH_SET_OVERLAY_PROPERTY_TABLE_HIDDEN': {
      return {
        ...state,
        overlayPropertyHidden: action.isHidden,
      };
    }
    case 'GRAPH_CANVAS_RESET_REQUIRED': {
      return {
        ...state,
        needReset: action.needReset,
      };
    }
    case 'GRAPH_RESET_HIGHLIGHT': {
      return {
        ...state,
        highlightingNode: null,
        secondHighlightingNodeID: null,
        tableExpandNodeID: null,
      };
    }
    case 'REACT_FLOW_GRAPH_DICTIONARY': {
      return {
        ...state,
        dictionary: action.dictionary,
        pdfDownloadConfig: action.pdfDownloadConfig,
        graphConfig: action.graphConfig,
        assetConfig: action.assetConfig,
        graphViewConfig: {...action.graphViewConfig, ...state.graphViewConfig},
      }
    }
    case 'REACT_FLOW_SET_GRAPH_DATA': {
      return {
        ...state,
        nodes: action.nodes,
        edges: action.edges,
      }
    }
    case 'REACT_FLOW_GRAPH_CLICK_NODE': {
      let newArray;
      if (state.highlightedNodes) {
        if (state.highlightedNodes.includes(action.nodeID)) {
          newArray = state.highlightedNodes.filter((el) => el !== action.nodeID)
        } else {
          newArray = [...state.highlightedNodes, action.nodeID]
        }
      } else {
        newArray = [action.nodeID]
      }
      if (state.isSearchMode) {
        // clicking node in search mode opens property table
        return {
          ...state,
          highlightingMatchedNodeID: action.nodeID,
          highlightingNode: state.dictionary[action.nodeID],
          highlightingMatchedNodeOpened: false,
          overlayPropertyHidden: false,
          expandNodeView: false,
          highlightedNodes: newArray,
        };
      }
      // if serach mode is false
      return {
        ...state,
          highlightingMatchedNodeID: action.nodeID,
          highlightingNode: state.dictionary[action.nodeID],
          highlightingMatchedNodeOpened: false,
          overlayPropertyHidden: true,
          expandNodeView: true,
          highlightedNodes: newArray,
      }
    }
    case 'GRAPH_CLICK_NODE': {
      if (state.isSearchMode) {
      // clicking node in search mode opens property table
        return {
          ...state,
          highlightingMatchedNodeID: action.nodeID,
          highlightingMatchedNodeOpened: false,
          overlayPropertyHidden: false,
        };
      }
      let newHighlightingNode = null;
      let newSecondHighlightingNodeID = null;
      if (action.nodeID) {
      // if no node is selected, select this node as highlight node
        if (!state.highlightingNode) {
          newHighlightingNode = state.nodes.find((n) => n.id === action.nodeID);
        } else if (state.highlightingNode) {
          newHighlightingNode = state.highlightingNode;

          // if is clicking the same node
          if (state.highlightingNode.id === action.nodeID) {
          // if no second node is selected, regard this as cancel selecting
            if (!state.secondHighlightingNodeID) {
              newHighlightingNode = null;
            }
          } else if (state.secondHighlightingNodeCandidateIDs.length > 1
          && state.secondHighlightingNodeCandidateIDs.includes(action.nodeID)) {
          // regard as canceling selecting second highlight node
            if (state.secondHighlightingNodeID === action.nodeID) {
              newSecondHighlightingNodeID = null;
            } else { // select this as second highlight node
              newSecondHighlightingNodeID = action.nodeID;
            }
          }
        }
      }
      const newTableExpandNodeID = newHighlightingNode ? newHighlightingNode.id : null;
      return {
        ...state,
        highlightingNode: newHighlightingNode,
        secondHighlightingNodeID: newSecondHighlightingNodeID,
        tableExpandNodeID: newTableExpandNodeID,
      };
    }
    case 'GRAPH_CLICK_BLANK_SPACE': {
      let newHighlightingNode = state.highlightingNode;
      let newSecondHighlightingNodeID = state.secondHighlightingNodeID;
      let newTableExpandNodeID = state.tableExpandNodeID;
      if (state.highlightingNode) {
        if (state.secondHighlightingNodeID) {
          newSecondHighlightingNodeID = null;
        } else {
          newHighlightingNode = null;
          newTableExpandNodeID = null;
        }
      }
      return {
        ...state,
        highlightingNode: newHighlightingNode,
        secondHighlightingNodeID: newSecondHighlightingNodeID,
        tableExpandNodeID: newTableExpandNodeID,
      };
    }
    case 'TABLE_EXPAND_NODE': {
      let newHighlightingNode = null;
      if (action.nodeID) {
        newHighlightingNode = state.nodes.find((n) => n.id === action.nodeID);
      }
      return {
        ...state,
        tableExpandNodeID: action.nodeID,
        highlightingNode: newHighlightingNode,
        secondHighlightingNodeID: null,
      };
    }
    case 'TABLE_EXPAND_NODES': {
      const { nodeState, nodeID } = action;
      let newHighlightingNode = null;
      let expandedNodeIDs = [];
      if (nodeID) {
        newHighlightingNode = state.nodes.find((n) => n.id === nodeID);
        switch (nodeState) {
          case 'open':
            if (state.tableExpandNodeID) {
              if (state.tableExpandNodeID.length) {
                expandedNodeIDs = [nodeID, ...state.tableExpandNodeID];
              } else {
                expandedNodeIDs.push(nodeID);
              }
            } else {
              expandedNodeIDs.push(nodeID);
            }
            break;
          case 'close':
            if (state.tableExpandNodeID) {
              if (state.tableExpandNodeID.length) {
                expandedNodeIDs = [...state.tableExpandNodeID];
                expandedNodeIDs.splice(
                  expandedNodeIDs.findIndex((n) => n === nodeID), 1,
                );
              }
            }
            break;
          default:
            break;
        }
      }

      return {
        ...state,
        tableExpandNodeID: expandedNodeIDs,
        highlightingNode: newHighlightingNode,
        secondHighlightingNodeID: null,
      };
    }
    case 'SEARCH_SET_IS_SEARCHING_STATUS': {
      return {
        ...state,
        isSearching: action.isSearching,
      };
    }
    case 'SEARCH_RESULT_UPDATED': {
      return {
        ...state,
        searchResult: action.searchResult,
        matchedNodeIDs: action.searchResultSummary.generalMatchedNodeIDs,
        matchedNodeIDsInNameAndDescription:
        action.searchResultSummary.matchedNodeIDsInNameAndDescription,
        matchedNodeIDsInProperties: action.searchResultSummary.matchedNodeIDsInProperties,
        isGraphView: true,
        isSearchMode: true,
        highlightingMatchedNodeID: null,
        highlightingMatchedNodeOpened: false,
        highlightingNode: null,
        secondHighlightingNodeID: null,
        tableExpandNodeID: null,
      };
    }
    case 'SEARCH_CLEAR_HISTORY': {
      return {
        ...state,
        searchHistoryItems: clearSearchHistoryItems(),
      };
    }
    case 'SEARCH_HISTORY_ITEM_CREATED': {
      return {
        ...state,
        searchHistoryItems: addSearchHistoryItems(action.searchHistoryItem),
      };
    }
    case 'GRAPH_NODES_SVG_ELEMENTS_UPDATED': {
      return {
        ...state,
        graphNodesSVGElements: action.graphNodesSVGElements,
      };
    }
    case 'SEARCH_RESULT_CLEARED': {
      return {
        ...state,
        searchResult: [],
        matchedNodeIDs: [],
        currentSearchKeyword: '',
        isSearchMode: false,
        highlightingMatchedNodeID: null,
        highlightingMatchedNodeOpened: false,
      };
    }
    case 'SEARCH_SAVE_CURRENT_KEYWORD': {
      return {
        ...state,
        currentSearchKeyword: action.keyword,
      };
    }
    case 'GRAPH_MATCHED_NODE_OPENED': {
      return {
        ...state,
        highlightingMatchedNodeOpened: action.opened,
      };
    }
    case actionTypes.ON_REACT_FLOW_PANEL_CLICK:
      return {
        ...state,
        expandNodeView: false,
      }
    case actionTypes.ON_REACT_FLOW_NODE_DRAG_START:
      return {
        ...state,
        expandNodeView: false,
      }
    case actionTypes.ON_REACT_FLOW_GRAPH_VIEW_CHANGE:
      const { view } = action;
      return {
        ...state,
        reactFlowView: onViewChange(view),
      }
    case actionTypes.ON_REACT_FLOW_NODE_FOCUS:
      return {
        ...state,
        focusedNodeId: action?.nodeID
      }
    case actionTypes.CNAVAS_WIDTH_CHANGE:
      return {
        ...state,
        graphViewConfig: onCnavasWidthChange({...action, ...state}),
      }
    default:
      return state;
  }
};

const versionInfo = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_VERSION_INFO':
      return {
        ...state,
        dictionaryVersion: action.data.dictionary.version || 'unknown',
        apiVersion: action.data.version || 'unknown',
      };
    default:
      return state;
  }
};

export { ddgraph, versionInfo };
