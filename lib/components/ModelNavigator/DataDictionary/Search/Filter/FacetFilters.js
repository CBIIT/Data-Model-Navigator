"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
var _lodash = _interopRequireDefault(require("lodash"));
var _icons = require("@material-ui/icons");
var _reactRedux = require("react-redux");
var _dataDictionaryData = require("../../../bento/dataDictionaryData");
var _CheckBoxView = _interopRequireDefault(require("./CheckBoxView"));
var _FacetFilters = _interopRequireDefault(require("./FacetFilters.style"));
var _FacetFilterThemeConfig = _interopRequireDefault(require("./FacetFilterThemeConfig"));
var _excluded = ["section"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var CustomAccordionSummary = (0, _core.withStyles)({
  root: {
    marginBottom: -1,
    padding: "0 39px",
    minHeight: 48,
    // marginLeft: 35,
    "&$expanded": {
      minHeight: 48
    }
  },
  content: {
    "&$expanded": {
      margin: "16px 0"
    }
  },
  expanded: {}
})(_core.AccordionSummary);
var FacetFilters = function FacetFilters(_ref) {
  var classes = _ref.classes,
    onClearAllFilter = _ref.onClearAllFilter,
    onToggleCheckBox = _ref.onToggleCheckBox,
    hidePropertyTable = _ref.hidePropertyTable,
    onClickBlankSpace = _ref.onClickBlankSpace,
    onResetGraphCanvas = _ref.onResetGraphCanvas,
    onSortSection = _ref.onSortSection,
    onClearGroupFilter = _ref.onClearGroupFilter;
  var activeFilters = (0, _reactRedux.useSelector)(function (state) {
    return state.submission && state.submission.allActiveFilters ? state.submission.allActiveFilters : {};
  });
  var activeFiltersCount = Object.entries(activeFilters).reduce(function (acc, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      key = _ref3[0],
      val = _ref3[1];
    return acc + val.length;
  }, 0 // eslint-disable-line no-unused-vars
  );

  var sortByForGroups = (0, _reactRedux.useSelector)(function (state) {
    return state.submission && state.submission.sortByList ? state.submission.sortByList : {};
  });
  var facetSectionVariables = (0, _reactRedux.useSelector)(function (state) {
    return state.submission && state.submission.facetfilterConfig ? state.submission.facetfilterConfig.facetSectionVariables : {};
  });
  var sideBarContent = (0, _reactRedux.useSelector)(function (state) {
    return state.submission && state.submission.checkbox ? state.submission.checkbox : {
      data: [],
      defaultPanel: false
    };
  });
  var showCheckboxCount = (0, _reactRedux.useSelector)(function (state) {
    return state.submission && state.submission.facetfilterConfig ? state.submission.facetfilterConfig.showCheckboxCount : 3;
  });
  var _useState = (0, _react.useState)(3),
    _useState2 = _slicedToArray(_useState, 2),
    checkBoxCount = _useState2[0],
    setCheckBoxCount = _useState2[1];
  (0, _react.useEffect)(function () {
    setCheckBoxCount(showCheckboxCount);
  }, []);
  var _React$useState = _react["default"].useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    groupsExpanded = _React$useState2[0],
    setGroupsExpanded = _React$useState2[1];
  var _React$useState3 = _react["default"].useState(Object.keys(facetSectionVariables).reduce(function (acc, filterKey) {
      var isExpanded = facetSectionVariables[filterKey].isExpanded;
      if (isExpanded) {
        acc.push(filterKey);
      }
      return acc;
    }, [])),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    sectionExpanded = _React$useState4[0],
    setSectionExpanded = _React$useState4[1];
  function getSortButtonColor(sideBarItem, sortType) {
    return sortByForGroups[sideBarItem.datafield] === sortType ? "#B2C6D6" : "#4A4A4A";
  }
  var handleGroupsChange = function handleGroupsChange(panel) {
    return function (event, isExpanded) {
      var groups = _lodash["default"].cloneDeep(groupsExpanded);
      if (isExpanded) {
        groups.push(panel);
      } else {
        var index = groups.indexOf(panel);
        if (index > -1) {
          groups.splice(index, 1);
        }
        setCheckBoxCount(showCheckboxCount);
      }
      setGroupsExpanded(groups);
      // set height of filters.
    };
  };

  var displayAllSelection = function displayAllSelection(checkboxItems) {
    var count = 0;
    checkboxItems.forEach(function (item) {
      if (item.isChecked) {
        count += 1;
      }
    });
    setCheckBoxCount(count);
  };
  var getGroupNameColor = function getGroupNameColor(sideBarItem, currentSection) {
    var groupNameColor = "black";
    sideBarItem.checkboxItems.map(function (item) {
      if (item.isChecked) {
        groupNameColor = facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : "" : _dataDictionaryData.defaultFacetSectionVariables.color;
      }
      return "";
    });
    return groupNameColor;
  };
  function getCheckBoxColor(index, currentSection) {
    return facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne : _dataDictionaryData.defaultFacetSectionVariables.checkBoxColorsOne;
    // return index % 2 ? facetSectionVariables[currentSection.sectionName]
    //   ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo
    //     ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo : ''
    //       : defaultFacetSectionVariables.checkBoxColorsTwo
    //         : facetSectionVariables[currentSection.sectionName]
    //           ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne
    //             ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne
    //               : '' : defaultFacetSectionVariables.checkBoxColorsOne;
  }

  var handleSectionChange = function handleSectionChange(panel) {
    return function (event, isExpanded) {
      var sections = _lodash["default"].cloneDeep(sectionExpanded);
      if (isExpanded) {
        sections.push(panel);
      } else {
        var index = sections.indexOf(panel);
        if (index > -1) {
          sections.splice(index, 1);
        }
      }
      setSectionExpanded(sections);
    };
  };
  var handleToggle = function handleToggle(item) {
    return function () {
      var toggleCheckBoxItem = {
        groupName: item.groupName,
        section: item.section,
        name: item.name,
        datafield: item.datafield,
        isChecked: !item.isChecked
      };
      onClickBlankSpace();
      hidePropertyTable();
      onToggleCheckBox(toggleCheckBoxItem);
    };
  };
  var getCheckBoxView = function getCheckBoxView(sideBarItem, currentSection) {
    var showItems = sideBarItem.checkboxItems.filter(function (item) {
      return item !== undefined && item.subjects > 0;
    });
    return showItems.map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement(_CheckBoxView["default"], {
        key: index,
        checkboxItem: item,
        sideBarItem: sideBarItem,
        currentSection: currentSection,
        handleToggle: handleToggle,
        facetSectionVariables: facetSectionVariables,
        defaultFacetSectionVariables: _dataDictionaryData.defaultFacetSectionVariables,
        backgroundColor: getCheckBoxColor(index, currentSection),
        checkColor: getGroupNameColor(sideBarItem, currentSection),
        dataDictionary: true
      });
    });
  };
  var showSelectedChecbox = function showSelectedChecbox(sideBarItem, currentSection) {
    var selectedItems = sideBarItem.checkboxItems.filter(function (item) {
      return item.isChecked && item.subjects > 0;
    }).map(function (item) {
      return _objectSpread({}, item);
    });
    var selectedCheckbox = selectedItems.slice(0, checkBoxCount).map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement(_CheckBoxView["default"], {
        checkboxItem: item,
        sideBarItem: sideBarItem,
        currentSection: currentSection,
        handleToggle: handleToggle,
        facetSectionVariables: facetSectionVariables,
        defaultFacetSectionVariables: _dataDictionaryData.defaultFacetSectionVariables,
        backgroundColor: getCheckBoxColor(index, currentSection),
        checkColor: getGroupNameColor(sideBarItem, currentSection),
        dataDictionary: true
      });
    });
    return /*#__PURE__*/_react["default"].createElement("div", null, selectedCheckbox, selectedItems.length > checkBoxCount && /*#__PURE__*/_react["default"].createElement("div", {
      className: classes.clearfix
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: classes.showMore,
      onClick: function onClick(e) {
        return displayAllSelection(sideBarItem.checkboxItems);
      }
    }, _dataDictionaryData.sortLabels.showMore)));
  };
  var sideBarDisplay = sideBarContent.data.filter(function (sideBar) {
    return sideBar.show === true;
  });
  var arrangeBySections = function arrangeBySections(arr) {
    var sideBar = {};
    arr.forEach(function (_ref4) {
      var section = _ref4.section,
        item = _objectWithoutProperties(_ref4, _excluded);
      if (!sideBar[section]) {
        sideBar[section] = {
          sectionName: section,
          items: []
        };
      }
      sideBar[section].items.push(_objectSpread({
        section: section
      }, item));
    });
    return Object.values(sideBar);
  };
  var sideBarSections = arrangeBySections(sideBarDisplay);
  if (facetSectionVariables && Object.keys(facetSectionVariables).length === 0) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
  }

  // const clearFilterHandler = () => {
  //   onClearAllFilter();
  //   onClickBlankSpace();
  //   hidePropertyTable();
  // };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, sideBarSections.map(function (currentSection) {
    return /*#__PURE__*/_react["default"].createElement(_FacetFilterThemeConfig["default"], {
      key: currentSection === null || currentSection === void 0 ? void 0 : currentSection.sectionName
    }, /*#__PURE__*/_react["default"].createElement(_core.Divider, {
      variant: "middle",
      style: {
        backgroundColor: facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : "" : "#000000",
        margin: "0px",
        height: facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].height ? facetSectionVariables[currentSection.sectionName].height : "" : "5px"
      }
    }), /*#__PURE__*/_react["default"].createElement(_core.Accordion, {
      expanded: sectionExpanded.includes(currentSection.sectionName),
      onChange: handleSectionChange(currentSection.sectionName),
      classes: {
        root: classes.expansionPanelRoot
      }
    }, /*#__PURE__*/_react["default"].createElement(CustomAccordionSummary, {
      expandIcon: /*#__PURE__*/_react["default"].createElement(_icons.ArrowDropDown, {
        classes: {
          root: classes.dropDownIconSection
        },
        fontSize: "large"
      }),
      "aria-controls": currentSection.sectionName,
      id: currentSection.sectionName
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: classes.sectionSummaryText
    }, currentSection.sectionName)), /*#__PURE__*/_react["default"].createElement(_core.AccordionDetails, {
      classes: {
        root: classes.expansionPanelDetailsRoot
      }
    }, /*#__PURE__*/_react["default"].createElement(_core.List, {
      component: "div",
      disablePadding: true,
      dense: true
    },
    // eslint-disable-next-line arrow-body-style
    currentSection.items.map(function (sideBarItem) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
        key: sideBarItem === null || sideBarItem === void 0 ? void 0 : sideBarItem.groupName
      }, /*#__PURE__*/_react["default"].createElement(_core.Accordion, {
        square: true,
        expanded: groupsExpanded.includes(sideBarItem.groupName),
        onChange: handleGroupsChange(sideBarItem.groupName),
        classes: {
          root: classes.expansionPanelsideBarItem
        }
      }, /*#__PURE__*/_react["default"].createElement(CustomAccordionSummary, {
        expandIcon: /*#__PURE__*/_react["default"].createElement(_icons.ExpandMore, {
          classes: {
            root: classes.dropDownIconSubSection
          },
          style: {
            fontSize: 26
          }
        }),
        "aria-controls": sideBarItem.groupName,
        id: sideBarItem.groupName,
        className: classes.customExpansionPanelSummaryRoot
      }, /*#__PURE__*/_react["default"].createElement("div", {
        id: "filterGroup_".concat(sideBarItem.datafield),
        style: {
          color: getGroupNameColor(sideBarItem, currentSection)
        },
        className: classes.subSectionSummaryText
      }, sideBarItem.groupName)), /*#__PURE__*/_react["default"].createElement(_core.AccordionDetails, {
        classes: {
          root: classes.expansionPanelDetailsRoot
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.List, {
        component: "div",
        disablePadding: true,
        dense: true
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.sortGroup
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: classes.sortGroupIcon
      }, /*#__PURE__*/_react["default"].createElement(_core.Icon, {
        style: {
          fontSize: 10
        },
        onClick: function onClick() {
          onClearGroupFilter(sideBarItem);
        }
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: _dataDictionaryData.resetIcon.src,
        height: _dataDictionaryData.resetIcon.size,
        width: _dataDictionaryData.resetIcon.size,
        alt: _dataDictionaryData.resetIcon.alt
      }))), /*#__PURE__*/_react["default"].createElement("span", {
        className: classes.sortGroupItem,
        style: {
          color: getSortButtonColor(sideBarItem, "alphabet")
        },
        onClick: function onClick() {
          onSortSection(sideBarItem.datafield, "alphabet");
        }
      }, _dataDictionaryData.sortLabels.sortAlphabetically), /*#__PURE__*/_react["default"].createElement("span", {
        className: classes.sortGroupItemCounts,
        style: {
          color: getSortButtonColor(sideBarItem, "count")
        },
        onClick: function onClick() {
          onSortSection(sideBarItem.datafield, "count");
        }
      }, _dataDictionaryData.sortLabels.sortByCount)), getCheckBoxView(sideBarItem, currentSection)))), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.selectedCheckboxDisplay
      }, !groupsExpanded.includes(sideBarItem.groupName) && showSelectedChecbox(sideBarItem, currentSection)));
    })))));
  }));
};
var _default = (0, _core.withStyles)(_FacetFilters["default"])(FacetFilters);
exports["default"] = _default;