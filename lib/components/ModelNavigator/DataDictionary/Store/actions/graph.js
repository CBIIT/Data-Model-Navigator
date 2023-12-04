"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSecondHighlightingNodeCandidateIDs = exports.setSearchResult = exports.setRelatedNodeIDs = exports.setReactFlowGraphData = exports.setPathRelatedToSecondHighlightingNode = exports.setOverlayPropertyTableHidden = exports.setNeedReset = exports.setIsSearching = exports.setHighlightingMatchedNodeOpened = exports.setGraphView = exports.setGraphNodesSVGElements = exports.setGraphLegend = exports.setGraphLayout = exports.setExpandNodes = exports.setExpandNode = exports.setDataModelStructure = exports.setCanvasWidth = exports.setCanvasBoundingRect = exports.saveCurrentSearchKeyword = exports.resetGraphHighlight = exports.onViewChange = exports.onPanelViewClick = exports.onNodeDragStart = exports.hoverNode = exports.focusNode = exports.clickNode = exports.clickBlankSpace = exports.clearSearchResult = exports.clearSearchHistoryItems = exports.addSearchHistoryItem = void 0;
var actionTypes = _interopRequireWildcard(require("./actionTypes"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var clickBlankSpace = function clickBlankSpace() {
  return {
    type: 'GRAPH_CLICK_BLANK_SPACE'
  };
};
exports.clickBlankSpace = clickBlankSpace;
var setCanvasBoundingRect = function setCanvasBoundingRect(canvasBoundingRect) {
  return {
    type: 'GRAPH_UPDATE_CANVAS_BOUNDING_RECT',
    canvasBoundingRect: canvasBoundingRect
  };
};
exports.setCanvasBoundingRect = setCanvasBoundingRect;
var setSecondHighlightingNodeCandidateIDs = function setSecondHighlightingNodeCandidateIDs(secondHighlightingNodeCandidateIDs) {
  return {
    type: 'GRAPH_UPDATE_SECOND_HIGHLIGHTING_NODE_CANDIDATES',
    secondHighlightingNodeCandidateIDs: secondHighlightingNodeCandidateIDs
  };
};
exports.setSecondHighlightingNodeCandidateIDs = setSecondHighlightingNodeCandidateIDs;
var setPathRelatedToSecondHighlightingNode = function setPathRelatedToSecondHighlightingNode(pathRelatedToSecondHighlightingNode) {
  return {
    type: 'GRAPH_UPDATE_PATH_RELATED_TO_SECOND_HIGHLIGHTING_NODE',
    pathRelatedToSecondHighlightingNode: pathRelatedToSecondHighlightingNode
  };
};
exports.setPathRelatedToSecondHighlightingNode = setPathRelatedToSecondHighlightingNode;
var setDataModelStructure = function setDataModelStructure(dataModelStructure, dataModelStructureRelatedNodeIDs, routesBetweenStartEndNodes) {
  return {
    type: 'GRAPH_UPDATE_DATA_MODEL_STRUCTURE',
    dataModelStructure: dataModelStructure,
    dataModelStructureRelatedNodeIDs: dataModelStructureRelatedNodeIDs,
    routesBetweenStartEndNodes: routesBetweenStartEndNodes
  };
};
exports.setDataModelStructure = setDataModelStructure;
var setRelatedNodeIDs = function setRelatedNodeIDs(relatedNodeIDs) {
  return {
    type: 'GRAPH_UPDATE_RELATED_HIGHLIGHTING_NODE',
    relatedNodeIDs: relatedNodeIDs
  };
};
exports.setRelatedNodeIDs = setRelatedNodeIDs;
var setGraphLayout = function setGraphLayout(layout) {
  return {
    type: 'GRAPH_LAYOUT_CALCULATED',
    nodes: layout.nodes,
    edges: layout.edges,
    graphBoundingBox: layout.graphBoundingBox
  };
};
exports.setGraphLayout = setGraphLayout;
var setGraphLegend = function setGraphLegend(legendItems) {
  return {
    type: 'GRAPH_LEGEND_CALCULATED',
    legendItems: legendItems
  };
};
exports.setGraphLegend = setGraphLegend;
var hoverNode = function hoverNode(nodeID) {
  return {
    type: 'GRAPH_UPDATE_HOVERING_NODE',
    nodeID: nodeID
  };
};
exports.hoverNode = hoverNode;
var setReactFlowGraphData = function setReactFlowGraphData(flowData) {
  return {
    type: 'REACT_FLOW_SET_GRAPH_DATA',
    nodes: flowData.nodes,
    edges: flowData.edges
  };
};
exports.setReactFlowGraphData = setReactFlowGraphData;
var clickNode = function clickNode(nodeID) {
  return {
    type: 'REACT_FLOW_GRAPH_CLICK_NODE',
    nodeID: nodeID
  };
};
exports.clickNode = clickNode;
var focusNode = function focusNode(nodeID) {
  return {
    type: actionTypes.ON_REACT_FLOW_NODE_FOCUS,
    nodeID: nodeID
  };
};
exports.focusNode = focusNode;
var resetGraphHighlight = function resetGraphHighlight() {
  return {
    type: 'GRAPH_RESET_HIGHLIGHT'
  };
};
exports.resetGraphHighlight = resetGraphHighlight;
var setOverlayPropertyTableHidden = function setOverlayPropertyTableHidden(isHidden) {
  return {
    type: 'GRAPH_SET_OVERLAY_PROPERTY_TABLE_HIDDEN',
    isHidden: isHidden
  };
};
exports.setOverlayPropertyTableHidden = setOverlayPropertyTableHidden;
var setExpandNode = function setExpandNode(nodeID, action) {
  return {
    type: 'TABLE_EXPAND_NODE',
    nodeID: nodeID,
    action: action
  };
};
exports.setExpandNode = setExpandNode;
var setExpandNodes = function setExpandNodes(nodeID, nodeState) {
  return {
    type: 'TABLE_EXPAND_NODES',
    nodeID: nodeID,
    nodeState: nodeState
  };
};
exports.setExpandNodes = setExpandNodes;
var setGraphView = function setGraphView(isGraphView) {
  return {
    type: 'TOGGLE_GRAPH_TABLE_VIEW',
    isGraphView: isGraphView
  };
};
exports.setGraphView = setGraphView;
var setCanvasWidth = function setCanvasWidth(canvasWidth) {
  return {
    type: actionTypes.CNAVAS_WIDTH_CHANGE,
    canvasWidth: canvasWidth
  };
};
exports.setCanvasWidth = setCanvasWidth;
var setNeedReset = function setNeedReset(needReset) {
  return {
    type: 'GRAPH_CANVAS_RESET_REQUIRED',
    needReset: needReset
  };
};
exports.setNeedReset = setNeedReset;
var setIsSearching = function setIsSearching(isSearching) {
  return {
    type: 'SEARCH_SET_IS_SEARCHING_STATUS',
    isSearching: isSearching
  };
};
exports.setIsSearching = setIsSearching;
var setSearchResult = function setSearchResult(searchResult, searchResultSummary) {
  return {
    type: 'SEARCH_RESULT_UPDATED',
    searchResult: searchResult,
    searchResultSummary: searchResultSummary
  };
};
exports.setSearchResult = setSearchResult;
var clearSearchHistoryItems = function clearSearchHistoryItems() {
  return {
    type: 'SEARCH_CLEAR_HISTORY'
  };
};
exports.clearSearchHistoryItems = clearSearchHistoryItems;
var addSearchHistoryItem = function addSearchHistoryItem(searchHistoryItem) {
  return {
    type: 'SEARCH_HISTORY_ITEM_CREATED',
    searchHistoryItem: searchHistoryItem
  };
};
exports.addSearchHistoryItem = addSearchHistoryItem;
var setGraphNodesSVGElements = function setGraphNodesSVGElements(graphNodesSVGElements) {
  return {
    type: 'GRAPH_NODES_SVG_ELEMENTS_UPDATED',
    graphNodesSVGElements: graphNodesSVGElements
  };
};
exports.setGraphNodesSVGElements = setGraphNodesSVGElements;
var clearSearchResult = function clearSearchResult() {
  return {
    type: 'SEARCH_RESULT_CLEARED'
  };
};
exports.clearSearchResult = clearSearchResult;
var saveCurrentSearchKeyword = function saveCurrentSearchKeyword(keyword) {
  return {
    type: 'SEARCH_SAVE_CURRENT_KEYWORD',
    keyword: keyword
  };
};
exports.saveCurrentSearchKeyword = saveCurrentSearchKeyword;
var setHighlightingMatchedNodeOpened = function setHighlightingMatchedNodeOpened(opened) {
  return {
    type: 'GRAPH_MATCHED_NODE_OPENED',
    opened: opened
  };
};
exports.setHighlightingMatchedNodeOpened = setHighlightingMatchedNodeOpened;
var onViewChange = function onViewChange(view) {
  return {
    type: actionTypes.ON_GRAPH_VIEW_CHANGE,
    view: view
  };
};
exports.onViewChange = onViewChange;
var onPanelViewClick = function onPanelViewClick() {
  return {
    type: actionTypes.ON_REACT_FLOW_PANEL_CLICK
  };
};
exports.onPanelViewClick = onPanelViewClick;
var onNodeDragStart = function onNodeDragStart() {
  return {
    type: actionTypes.ON_REACT_FLOW_NODE_DRAG_START
  };
};
exports.onNodeDragStart = onNodeDragStart;