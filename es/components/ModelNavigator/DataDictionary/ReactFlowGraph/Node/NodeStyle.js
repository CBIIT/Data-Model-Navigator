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
  var _viewPropBtn;
  return {
    propDialog: {
      backgroundColor: "#2D4455",
      borderRadius: "5px",
      marginTop: "-18px",
      marginLeft: "-22px",
      border: "5px solid #0c3759",
      zIndex: "1000"
    },
    customNodeCollapse: {
      fontSize: "10px",
      // background: '#f5f5f6',
      color: "#222",
      borderRadius: "2px",
      padding: "0",
      background: "transparent"
    },
    customNodeExpand: {
      fontSize: "10px",
      color: "#222",
      // boxShadow: '0 4px 6px -1px rgb(0 0 0 / 15%), 0 2px 4px -1px rgb(0 0 0 / 8%)',
      borderRadius: "5px",
      padding: "0px 0px 0px 0px",
      opacity: "0.97",
      boxSizing: "border-box",
      backgroundColor: "#2d4455"
    },
    highLightNode: {
      fontSize: "15px",
      fontWeight: "900",
      lineHeight: "10px"
    },
    nodeTitle: {
      // backgroundColor: '#ffffff',
      borderRadius: "5px",
      // border: '0.5px solid #ffffff',
      height: "33px",
      textAlign: "center"
      // backgroundColor: '#2d4455',
    },
    iconBar: {
      display: "flex",
      alignItems: "center",
      padding: "5px 0",
      justifyContent: "end"
    },
    closeIcon: {
      "float": "right",
      color: "#ffffff",
      height: "15px",
      width: "20px",
      cursor: "pointer"
    },
    labelWrapper: {
      fontSize: "16px",
      fontWeight: "500",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 8px",
      "&:hover": {
        backgroundColor: "#ef8523",
        color: "#fff"
      }
    },
    nodeButtonOuterWrapper: {
      borderRadius: "15px"
    },
    nodeButtonInnerWrapper: {
      border: "3px solid #2E2E2E",
      display: "grid",
      gridTemplateColumns: "60px 1fr",
      zIndex: "1",
      backgroundColor: "#fff",
      cursor: "pointer",
      borderRadius: "15px"
    },
    iconWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottomLeftRadius: "13px",
      borderTopLeftRadius: "13px"
    },
    icon: {
      height: "39px"
    },
    btnPadding: {
      paddingLeft: "20px",
      paddingRight: "20px"
    },
    nodeTitleBtnWrapper: {
      outline: "0.5px solid #ffffff"
    },
    sourceHandler: {
      background: "#2e2e2e",
      top: "39px"
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "35px"
    },
    viewSection: {
      //marginTop: "30px",
      color: "#FFFFFF",
      fontSize: "10px",
      display: "flex",
      justifyContent: "center"
    },
    hideSection: {
      display: "none"
    },
    list: {
      paddingLeft: "0px",
      marginBottom: "0px",
      listStyleType: "none",
      flexGrow: "1"
      //display: "flex",
      //alignItems: "center",
      //flexDirection: "column",
      //paddingBottom: "5px",
    },
    listItem: {
      fontSize: "12px",
      lineHeight: "18px",
      color: "#0077c1",
      padding: "0 45px",
      display: "flex",
      //justifyContent: "center",
      gap: "8px"

      //display: "grid",
      //gridTemplateColumns: "1fr 1fr",
    },
    content: {},
    listItemLabel: {
      color: "#FFFFFF",
      fontFamily: "Nunito",
      fontSize: "13px",
      fontWeight: "300",
      letterSpacing: "0",
      lineHeight: "24px"
    },
    listItemValue: {
      color: "#3fd9ff",
      fontFamily: "Nunito",
      fontSize: "13px",
      fontWeight: "600",
      letterSpacing: "0",
      lineHeight: "24px"
    },
    viewPropBtn: (_viewPropBtn = {
      cursor: "pointer",
      fontSize: "9px",
      width: "100%",
      height: "50px"
    }, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_viewPropBtn, "height", "50px"), "marginTop", "15px"), "border", "1px solid #14212b"), "backgroundColor", "#14212b"), "color", "#ffffff"), "fontFamily", "Lato"), "fontSize", "16px"), "lineHeight", "13px"), "textAlign", "center"), "borderBottomLeftRadius", "5px"), _defineProperty(_viewPropBtn, "borderBottomRightRadius", "5px")),
    divider: {
      margin: "0",
      height: "1px",
      background: "#5f86a4",
      border: "0",
      opacity: "0.85",
      //width: "100%",
      flexGrow: "1"
    },
    matchedNodeIDs: {},
    matchedInNameAndDesc: {
      // border: '2px solid red',
    },
    matchedNodeIDsInProps: {
      border: "2.5px dashed #2E2E2E",
      borderRadius: "15px"
    },
    excludeNode: {
      cursor: "not-allowed",
      pointerEvents: "none",
      opacity: "0.4"
    }
  };
};