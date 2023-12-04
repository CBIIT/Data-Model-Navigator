"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = exports["default"] = function _default() {
  return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    table: {
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      zIndex: "15"
    },
    background: {
      position: "absolute",
      top: "0",
      height: "100%",
      left: "0",
      right: "0",
      backgroundColor: "#4a4a4a",
      opacity: ".5",
      zIndex: "-1"
    },
    fixedContainer: {
      height: "100%",
      overflowY: "scroll",
      padding: "15px 40px"
    },
    content: {
      backgroundColor: "#fff",
      borderRadius: "5px",
      padding: "19px 17px",
      boxShadow: "-5px 4px 21px 18px rgba(27,28,28,0.32)"
    },
    header: {
      // position: '-webkit-sticky',
      // position: 'sticky',
      top: "0",
      zIndex: "3"
    },
    close: {
      "float": "right",
      color: "#fff",
      cursor: "pointer",
      marginLeft: "15px"
    },
    closeIcon: _defineProperty({
      backgroundColor: "#000000",
      marginLeft: "8px",
      position: "relative",
      top: "1px",
      marginRight: "20px"
    }, "backgroundColor", "#606060"),
    category: {
      // backgroundColor: 'var(--dictionary-header-color)',
      padding: "0px 0px 0px 15px",
      //lineHeight: "40px",
      //verticalAlign: "middle",
      height: '44px',
      borderLeft: "5px solid",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    iconCloseRounded: {
      //padding: "9px 17px 16px 0px",
    },
    categoryText: {
      display: "inline",
      color: "#fff",
      fontSize: "19px",
      fontFamily: "Lato"
    },
    node: {
      backgroundColor: "#fff",
      display: "flex",
      minHeight: "40px",
      padding: "15px",
      border: "1px solid #e7e7e7",
      borderTop: "none"
    },
    title: {
      width: "25%",
      lineHeight: "1.6rem"
    },
    description: {
      width: "75%",
      lineHeight: "1.6rem"
    },
    categoryIcon: {
      width: "32px"
    },
    property: {
      marginTop: "-5px"
    },
    propertyTable: {
      padding: "10px 18px 18px 23px",
      backgroundColor: "#fff",
      borderRight: "1px solid #ADBEC4",
      borderBottom: "1px solid #ADBEC4",
      borderLeftWidth: "5px",
      borderLeftStyle: "solid"
    },
    downloadButton: _defineProperty(_defineProperty(_defineProperty(_defineProperty({
      minWidth: "unset" /* override .g3-button's 152px min-width */,
      height: "30px",
      margin: "0",
      padding: "unset" /* override .g3-button's paddings */,
      "float": "right",
      fontWeight: "normal",
      border: "0"
    }, "padding", "0px 6px 0px 6px"), "textAlign", "center"), "&:hover", {
      color: "white",
      backgroundColor: "transparent"
    }), "&:active", {
      color: "white",
      backgroundColor: "transparent"
    }),
    downloadText: {
      marginBottom: "100px"
    },
    span: {
      display: "inline"
    },
    spanHighlight: {
      fontWeight: "600"
    },
    spanNewLine: {
      display: "block"
    },
    toggleNode: {
      minWidth: "unset" /* override .g3-button's 152px min-width */,
      height: "30px",
      padding: "0 20px",
      border: "none",
      marginLeft: "10px",
      position: "relative",
      top: "-2px"
    },
    nodeTitle: {
      width: "260px",
      flexGrow: "0",
      flexShrink: "0",
      "-moz-user-select": "none",
      "-webkit-user-select": "none",
      fontWeight: "900",
      "-ms-user-select": "none",
      userSelect: "none",
      fontSize: "15px",
      lineHeight: "14px"
    }
  }, "node", {
    backgroundColor: "#f4f5f5",
    borderRight: "1px solid #e7e7e7",
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 5px 14px 22px",
    borderLeftWidth: "5px",
    borderLeftStyle: "solid",
    borderLeftColor: "#e7e7e7",
    marginBottom: "5px",
    "&:last-child": {
      marginBottom: "0"
    },
    "&:hover $nodeTitle": {
      color: "#3283c8"
    }
  }), "nodeLabel", {
    marginTop: "10px",
    "float": "left",
    color: "#8e8e8e",
    fontWeight: "900",
    marginRight: "5px",
    borderRadius: "100px",
    border: "1px solid #cdcdcd",
    textAlign: "center",
    padding: "2px 12px",
    background: "#fff",
    fontSize: "12px"
  }), "nodeAssignmentGroup", {
    textAlign: "right"
  }), "nodeClass", {
    marginLeft: "5px",
    color: "#2982af",
    fontWeight: "500"
  }), "nodeAssignment", {
    marginLeft: "5px",
    color: "#2982af",
    fontWeight: "500"
  }), "categoryDivider", {
    height: "4px",
    display: "block",
    backgroundColor: "#e7e5e5",
    borderLeft: "5px solid #ffffff"
  }), "propertySummary", {
    /* margin: 5px 0', */
    color: "#7a7a7a",
    paddingLeft: "17px",
    marginBottom: "14px"
  });
};