"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = function _default() {
  return _defineProperty({
    category: {
      marginTop: '20px',
      borderTop: '1px solid #e7e7e7',
      border: '1px solid #e7e7e7'
    },
    categoryHead: {
      background: '#fff',
      paddingTop: '3px',
      paddingBottom: '3px',
      paddingLeft: '12px',
      paddingRight: '10px',
      fontWeight: '900',
      fontSize: '18px',
      borderLeft: '5px solid'
    },
    categoryDivider: {
      height: '4px',
      display: 'block',
      backgroundColor: '#e7e5e5',
      borderLeft: '5px solid'
    },
    downloadTemplate: {
      "float": 'right',
      marginRight: '4px'
    },
    categoryIcon: {
      verticalAlign: 'middle',
      marginRight: '13px'
    },
    title: {
      color: '#FFFFFF',
      fontFamily: 'Lato',
      fontSize: '19px',
      fontWeight: '500',
      letterSpacing: '0'
      //lineHeight: '3',
      //marginLeft: '10px',
      //verticalAlign: 'text-bottom',
      //height: '40px',
      //lineHeight: '2.5',
      //paddingLeft: '40px',
    }
  }, "categoryIcon", {
    "float": 'left'
  });
};
exports["default"] = _default;