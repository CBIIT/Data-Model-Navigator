"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.types = exports.sortLabels = exports.showCheckboxCount = exports.resetIcon = exports.filterSections = exports.filterOptions = exports.filterConfig = exports.facetSectionVariables = exports.facetSearchData = exports.defaultFacetSectionVariables = exports.controlVocabConfig = exports.categories = exports.baseFilters = void 0;
var categories = ['Admistrative', 'Study', 'Clinical Trial', 'Case', 'Biospecimen', 'Clinical', 'Analysis', 'Data File'];
exports.categories = categories;
var showCheckboxCount = 5;
exports.showCheckboxCount = showCheckboxCount;
var types = {
  CATEGORY: 'category',
  ASSIGNMENT: 'assignment',
  INCLUSION: 'inclusion',
  CLASS: 'class',
  MULTIPLICITY: 'multiplicity'
};
exports.types = types;
var defaultFacetSectionVariables = {
  color: '#000000',
  checkBoxColorsOne: '#0d71a3',
  checkBoxColorsTwo: '#0d71a3',
  height: '5px',
  isExpanded: false
};
exports.defaultFacetSectionVariables = defaultFacetSectionVariables;
var sortLabels = {
  sortAlphabetically: 'Sort alphabetically',
  sortByCount: 'Sort by counts',
  showMore: '...expand to see all selections'
};
exports.sortLabels = sortLabels;
var facetSearchData = [{
  groupName: 'Category',
  datafield: 'category',
  section: 'Filter By Nodes',
  tooltip: 'category',
  show: true,
  checkboxItems: [{
    name: 'Administrative',
    isChecked: false,
    group: 'category'
  }, {
    name: 'Analysis',
    isChecked: false,
    group: 'category'
  }, {
    name: 'Biospecimen',
    isChecked: false,
    group: 'category'
  }, {
    name: 'Case',
    isChecked: false,
    group: 'category'
  }, {
    name: 'Clinical',
    isChecked: false,
    group: 'category'
  }, {
    name: 'Clinical_Trial',
    isChecked: false,
    group: 'category'
  }, {
    name: 'Data_File',
    isChecked: false,
    group: 'category'
  }, {
    name: 'Study',
    isChecked: false,
    group: 'category'
  }]
}, {
  groupName: 'Assignment',
  datafield: 'assignment',
  section: 'Filter By Nodes',
  tooltip: 'assignment',
  show: true,
  checkboxItems: [{
    name: 'Core',
    isChecked: false,
    group: 'assignment'
  }, {
    name: 'Extended',
    isChecked: false,
    group: 'assignment'
  }]
}, {
  groupName: 'Class',
  datafield: 'class',
  section: 'Filter By Nodes',
  tooltip: 'class',
  show: true,
  checkboxItems: [{
    name: 'Primary',
    isChecked: false,
    group: 'class'
  }, {
    name: 'Secondary',
    isChecked: false,
    group: 'class'
  }]
},
// {
//   groupName: 'Multiplicity',
//   datafield: 'multiplicity',
//   section: 'Filter By Relationship',
//   tooltip: 'multiplicity',
//   show: true,
//   checkboxItems: [
//     { name: 'One_to_one', isChecked: false, group: 'multiplicity' },
//     { name: 'One_to_many', isChecked: false, group: 'multiplicity' },
//     { name: 'Many_to_one', isChecked: false, group: 'multiplicity' },
//     { name: 'Many_to_many', isChecked: false, group: 'multiplicity' },
//   ],
// },
{
  groupName: 'Inclusion',
  datafield: 'inclusion',
  section: 'Filter By Property',
  tooltip: 'inclusion',
  show: true,
  checkboxItems: [{
    name: 'Optional',
    isChecked: false,
    group: 'optional'
  }, {
    name: 'Preferred',
    isChecked: false,
    group: 'preferred'
  }, {
    name: 'Required',
    isChecked: false,
    group: 'required'
  }]
}, {
  groupName: 'UI Display',
  datafield: 'uiDisplay',
  section: 'Filter By Property',
  tooltip: 'inclusion',
  show: true,
  checkboxItems: [{
    name: 'no',
    isChecked: false,
    group: 'no'
  }, {
    name: 'yes',
    isChecked: false,
    group: 'yes'
  }]
}];
exports.facetSearchData = facetSearchData;
var facetSectionVariables = {
  'Filter By Nodes': {
    color: '#0D71A3',
    checkBoxColorsOne: '#E3F4FD',
    checkBoxColorsTwo: '#0d71a3',
    checkBoxBorderColor: '#0D71A3',
    height: '7px',
    isExpanded: true
  },
  'Filter By Relationship': {
    color: '#FF9742',
    checkBoxColorsOne: '#FF9742',
    checkBoxColorsTwo: '#FF9742',
    height: '7px',
    isExpanded: true
  },
  'Filter By Property': {
    color: '#94C0EC',
    checkBoxColorsOne: '#E3F4FD',
    checkBoxColorsTwo: '#0d71a3',
    checkBoxBorderColor: '#0D71A3',
    height: '7px',
    isExpanded: true
  }
};
exports.facetSectionVariables = facetSectionVariables;
var resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px'
};
exports.resetIcon = resetIcon;
var baseFilters = {
  category: [],
  assignment: [],
  "class": [],
  multiplicity: [],
  inclusion: [],
  uiDisplay: []
};
exports.baseFilters = baseFilters;
var filterSections = ['category', 'assignment', 'class', 'inclusion', 'display', 'uiDisplay'];
exports.filterSections = filterSections;
var filterOptions = [
// category
'administrative', 'case', 'study', 'clinical', 'clinical_trial', 'biospecimen', 'analysis', 'data_file',
// Assignment
'core', 'extended',
// Class
'primary', 'secondary',
// Inclusion
'required', 'preferred', 'optional', 'uiDisplay', 'yes', 'no'];
exports.filterOptions = filterOptions;
var controlVocabConfig = {
  maxNoOfItems: 10,
  maxNoOfItemDlgBox: 30
};
exports.controlVocabConfig = controlVocabConfig;
var filterConfig = {
  facetSearchData: facetSearchData,
  facetSectionVariables: facetSectionVariables,
  resetIcon: resetIcon,
  baseFilters: baseFilters,
  filterSections: filterSections,
  filterOptions: filterOptions,
  showCheckboxCount: showCheckboxCount
};
exports.filterConfig = filterConfig;