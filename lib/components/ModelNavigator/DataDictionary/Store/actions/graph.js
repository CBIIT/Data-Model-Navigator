"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSecondHighlightingNodeCandidateIDs = exports.setSearchResult = exports.setRelatedNodeIDs = exports.setReactFlowGraphData = exports.setPathRelatedToSecondHighlightingNode = exports.setOverlayPropertyTableHidden = exports.setNeedReset = exports.setIsSearching = exports.setHighlightingMatchedNodeOpened = exports.setGraphView = exports.setGraphNodesSVGElements = exports.setGraphLegend = exports.setGraphLayout = exports.setExpandNodes = exports.setExpandNode = exports.setDataModelStructure = exports.setCanvasWidth = exports.setCanvasBoundingRect = exports.saveCurrentSearchKeyword = exports.resetGraphHighlight = exports.onViewChange = exports.onPanelViewClick = exports.onNodeDragStart = exports.hoverNode = exports.focusNode = exports.clickNode = exports.clickBlankSpace = exports.clearSearchResult = exports.clearSearchHistoryItems = exports.addSearchHistoryItem = void 0;
var actionTypes = _interopRequireWildcard(require("./actionTypes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var clickBlankSpace = exports.clickBlankSpace = function clickBlankSpace() {
  return {
    type: 'GRAPH_CLICK_BLANK_SPACE'
  };
};
var setCanvasBoundingRect = exports.setCanvasBoundingRect = function setCanvasBoundingRect(canvasBoundingRect) {
  return {
    type: 'GRAPH_UPDATE_CANVAS_BOUNDING_RECT',
    canvasBoundingRect: canvasBoundingRect
  };
};
var setSecondHighlightingNodeCandidateIDs = exports.setSecondHighlightingNodeCandidateIDs = function setSecondHighlightingNodeCandidateIDs(secondHighlightingNodeCandidateIDs) {
  return {
    type: 'GRAPH_UPDATE_SECOND_HIGHLIGHTING_NODE_CANDIDATES',
    secondHighlightingNodeCandidateIDs: secondHighlightingNodeCandidateIDs
  };
};
var setPathRelatedToSecondHighlightingNode = exports.setPathRelatedToSecondHighlightingNode = function setPathRelatedToSecondHighlightingNode(pathRelatedToSecondHighlightingNode) {
  return {
    type: 'GRAPH_UPDATE_PATH_RELATED_TO_SECOND_HIGHLIGHTING_NODE',
    pathRelatedToSecondHighlightingNode: pathRelatedToSecondHighlightingNode
  };
};
var setDataModelStructure = exports.setDataModelStructure = function setDataModelStructure(dataModelStructure, dataModelStructureRelatedNodeIDs, routesBetweenStartEndNodes) {
  return {
    type: 'GRAPH_UPDATE_DATA_MODEL_STRUCTURE',
    dataModelStructure: dataModelStructure,
    dataModelStructureRelatedNodeIDs: dataModelStructureRelatedNodeIDs,
    routesBetweenStartEndNodes: routesBetweenStartEndNodes
  };
};
var setRelatedNodeIDs = exports.setRelatedNodeIDs = function setRelatedNodeIDs(relatedNodeIDs) {
  return {
    type: 'GRAPH_UPDATE_RELATED_HIGHLIGHTING_NODE',
    relatedNodeIDs: relatedNodeIDs
  };
};
var setGraphLayout = exports.setGraphLayout = function setGraphLayout(layout) {
  return {
    type: 'GRAPH_LAYOUT_CALCULATED',
    nodes: layout.nodes,
    edges: layout.edges,
    graphBoundingBox: layout.graphBoundingBox
  };
};
var setGraphLegend = exports.setGraphLegend = function setGraphLegend(legendItems) {
  return {
    type: 'GRAPH_LEGEND_CALCULATED',
    legendItems: legendItems
  };
};
var hoverNode = exports.hoverNode = function hoverNode(nodeID) {
  return {
    type: 'GRAPH_UPDATE_HOVERING_NODE',
    nodeID: nodeID
  };
};
var setReactFlowGraphData = exports.setReactFlowGraphData = function setReactFlowGraphData(flowData) {
  return {
    type: 'REACT_FLOW_SET_GRAPH_DATA',
    nodes: flowData.nodes,
    edges: flowData.edges
  };
};
var clickNode = exports.clickNode = function clickNode(nodeID) {
  return {
    type: 'REACT_FLOW_GRAPH_CLICK_NODE',
    nodeID: nodeID
  };
};
var focusNode = exports.focusNode = function focusNode(nodeID) {
  return {
    type: actionTypes.ON_REACT_FLOW_NODE_FOCUS,
    nodeID: nodeID
  };
};
var resetGraphHighlight = exports.resetGraphHighlight = function resetGraphHighlight() {
  return {
    type: 'GRAPH_RESET_HIGHLIGHT'
  };
};
var setOverlayPropertyTableHidden = exports.setOverlayPropertyTableHidden = function setOverlayPropertyTableHidden(isHidden) {
  return {
    type: 'GRAPH_SET_OVERLAY_PROPERTY_TABLE_HIDDEN',
    isHidden: isHidden
  };
};
var setExpandNode = exports.setExpandNode = function setExpandNode(nodeID, action) {
  return {
    type: 'TABLE_EXPAND_NODE',
    nodeID: nodeID,
    action: action
  };
};
var setExpandNodes = exports.setExpandNodes = function setExpandNodes(nodeID, nodeState) {
  return {
    type: 'TABLE_EXPAND_NODES',
    nodeID: nodeID,
    nodeState: nodeState
  };
};
var setGraphView = exports.setGraphView = function setGraphView(isGraphView) {
  return {
    type: 'TOGGLE_GRAPH_TABLE_VIEW',
    isGraphView: isGraphView
  };
};
var setCanvasWidth = exports.setCanvasWidth = function setCanvasWidth(canvasWidth) {
  return {
    type: actionTypes.CNAVAS_WIDTH_CHANGE,
    canvasWidth: canvasWidth
  };
};
var setNeedReset = exports.setNeedReset = function setNeedReset(needReset) {
  return {
    type: 'GRAPH_CANVAS_RESET_REQUIRED',
    needReset: needReset
  };
};
var setIsSearching = exports.setIsSearching = function setIsSearching(isSearching) {
  return {
    type: 'SEARCH_SET_IS_SEARCHING_STATUS',
    isSearching: isSearching
  };
};
var setSearchResult = exports.setSearchResult = function setSearchResult(searchResult, searchResultSummary) {
  return {
    type: 'SEARCH_RESULT_UPDATED',
    searchResult: searchResult,
    searchResultSummary: searchResultSummary
  };
};
var clearSearchHistoryItems = exports.clearSearchHistoryItems = function clearSearchHistoryItems() {
  return {
    type: 'SEARCH_CLEAR_HISTORY'
  };
};
var addSearchHistoryItem = exports.addSearchHistoryItem = function addSearchHistoryItem(searchHistoryItem) {
  return {
    type: 'SEARCH_HISTORY_ITEM_CREATED',
    searchHistoryItem: searchHistoryItem
  };
};
var setGraphNodesSVGElements = exports.setGraphNodesSVGElements = function setGraphNodesSVGElements(graphNodesSVGElements) {
  return {
    type: 'GRAPH_NODES_SVG_ELEMENTS_UPDATED',
    graphNodesSVGElements: graphNodesSVGElements
  };
};
var clearSearchResult = exports.clearSearchResult = function clearSearchResult() {
  return {
    type: 'SEARCH_RESULT_CLEARED'
  };
};
var saveCurrentSearchKeyword = exports.saveCurrentSearchKeyword = function saveCurrentSearchKeyword(keyword) {
  return {
    type: 'SEARCH_SAVE_CURRENT_KEYWORD',
    keyword: keyword
  };
};
var setHighlightingMatchedNodeOpened = exports.setHighlightingMatchedNodeOpened = function setHighlightingMatchedNodeOpened(opened) {
  return {
    type: 'GRAPH_MATCHED_NODE_OPENED',
    opened: opened
  };
};
var onViewChange = exports.onViewChange = function onViewChange(view) {
  return {
    type: actionTypes.ON_GRAPH_VIEW_CHANGE,
    view: view
  };
};
var onPanelViewClick = exports.onPanelViewClick = function onPanelViewClick() {
  return {
    type: actionTypes.ON_REACT_FLOW_PANEL_CLICK
  };
};
var onNodeDragStart = exports.onNodeDragStart = function onNodeDragStart() {
  return {
    type: actionTypes.ON_REACT_FLOW_NODE_DRAG_START
  };
};