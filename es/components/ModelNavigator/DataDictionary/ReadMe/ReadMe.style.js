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
  return {
    dialogBox: {
      minWidth: "750px",
      overflowY: "scroll"
    },
    dialogPaper: {
      paddingBottom: "10px"
    },
    titleContent: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    title: {
      fontSize: "23px",
      marginTop: "20px",
      display: "inherit",
      fontWeight: "500",
      color: "#0d71a3",
      "float": "left",
      fontFamily: "Nunito"
    },
    closeBtn: {
      padding: "5px",
      textAlign: "right",
      fontSize: "30px"
    },
    closBtnContainer: {
      paddingTop: "8px"
    },
    closeBtnIcon: {
      paddingTop: "10px"
    },
    downloadBtn: {
      height: "30px",
      width: "30px",
      marginBottom: "-10px",
      marginRight: "7px"
      // '&:hover': {
      //   backgroundColor: '#0D71A3',
      // },
    },
    downloadIcon: {
      color: "#fff",
      height: "30px",
      width: "30px"
    },
    content: {
      height: "700px",
      overflowY: "scroll",
      paddingRight: "20px",
      paddingLeft: "25px",
      lineHeight: "1.5",
      "& h1, h2, h3, h4, h5": _defineProperty({
        color: "#000000",
        marginBottom: "0px",
        fontWeight: "700",
        lineHeight: "40px"
      }, "lineHeight", "1.2"),
      "& p": {
        marginTop: "5px",
        fontSize: "14px",
        fontWeight: "300",
        marginBottom: "0px"
      }
    }
  };
};