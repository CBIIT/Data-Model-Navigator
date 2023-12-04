"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableNodeCategoryList = exports.tableIconUrl = exports.pdfNodeCategoryList = exports.legendNodeCategoryList = exports.legendIconUrl = exports.graphIconUrl = exports.getPdfCategoryIconSVG = exports.getLegendCategoryIconSVG = exports.getGraphCategoryIconSVG = exports.getCategoryStyle = exports.getCategoryIconSVG = exports.getCategoryColor = exports.getCategoryBackground = exports.defaultCategory = void 0;
var _study = _interopRequireDefault(require("./icons/Pdf/study.png"));
var _case = _interopRequireDefault(require("./icons/Pdf/case.png"));
var _clinical_trial = _interopRequireDefault(require("./icons/Pdf/clinical_trial.png"));
var _administrative = _interopRequireDefault(require("./icons/Pdf/administrative.png"));
var _biospecimen = _interopRequireDefault(require("./icons/Pdf/biospecimen.png"));
var _analysis = _interopRequireDefault(require("./icons/Pdf/analysis.png"));
var _data_file = _interopRequireDefault(require("./icons/Pdf/data_file.png"));
var _clinical = _interopRequireDefault(require("./icons/Pdf/clinical.png"));
var _study2 = _interopRequireDefault(require("./icons/Table/study.svg"));
var _case2 = _interopRequireDefault(require("./icons/Table/case.svg"));
var _clinical_trial2 = _interopRequireDefault(require("./icons/Table/clinical_trial.svg"));
var _administrative2 = _interopRequireDefault(require("./icons/Table/administrative.svg"));
var _biospecimen2 = _interopRequireDefault(require("./icons/Table/biospecimen.svg"));
var _analysis2 = _interopRequireDefault(require("./icons/Table/analysis.svg"));
var _data_file2 = _interopRequireDefault(require("./icons/Table/data_file.svg"));
var _clinical2 = _interopRequireDefault(require("./icons/Table/clinical.svg"));
var _lg_study = _interopRequireDefault(require("./icons/Legend/lg_study.svg"));
var _lg_case = _interopRequireDefault(require("./icons/Legend/lg_case.svg"));
var _lg_clinical_trial = _interopRequireDefault(require("./icons/Legend/lg_clinical_trial.svg"));
var _lg_administrative = _interopRequireDefault(require("./icons/Legend/lg_administrative.svg"));
var _lg_biospecimen = _interopRequireDefault(require("./icons/Legend/lg_biospecimen.svg"));
var _lg_analysis = _interopRequireDefault(require("./icons/Legend/lg_analysis.svg"));
var _lg_data_file = _interopRequireDefault(require("./icons/Legend/lg_data_file.svg"));
var _lg_clinical = _interopRequireDefault(require("./icons/Legend/lg_clinical.svg"));
var _icon_default = _interopRequireDefault(require("./icons/icon_default.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * pdf icon import
 */

/**
 * table icon import
 */

/**
 * legend icon import
 */

var iconUrl = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/data_model_pdf_icons/icdc/DMN/';
var graphIconUrl = exports.graphIconUrl = iconUrl + 'graph/';
var legendIconUrl = exports.legendIconUrl = iconUrl + 'legend/';
var tableIconUrl = exports.tableIconUrl = iconUrl + 'table/';
var nodeCategoryList = {
  administrative: {
    // icon: Administrative,
    color: '#9C2E1F',
    background: '#691706'
  },
  study: {
    // icon: Study,
    color: '#9775FF',
    background: '#4D31A2'
  },
  clinical_trial: {
    // icon: ClinicalTrial,
    color: '#00A0BA',
    background: '#043F55'
  },
  "case": {
    // icon: Case,
    color: '#FF7E14',
    background: '#672900'
  },
  biospecimen: {
    // icon: Biospecimen,
    color: '#00785A',
    background: '#063126'
  },
  clinical: {
    // icon: Clinical,
    color: '#1C75BB',
    background: '#073A61'
  },
  data_file: {
    // icon: DataFile,
    color: '#00AC0E',
    background: '#023806'
  },
  metadata_file: {
    // icon: IconMetadata,
    color: '#F4B940'
  },
  analysis: {
    // icon: Analysis,
    color: '#B533A9',
    background: '#6F0065'
  }
};
var graphNodeCategoryList = {
  clinical: {
    // icon: IconClinicalGraph,
    color: '#05B8EE'
  },
  biospecimen: {
    // icon: IconBiospecimenGraph,
    color: '#28AE60'
  },
  data_file: {
    // icon: IconDataFileGraph,
    color: '#7EC500'
  },
  metadata_file: {
    // icon: IconMetadata,
    color: '#F4B940'
  },
  analysis: {
    // icon: IconAnalysisGraph,
    color: '#FF7ABC'
  },
  administrative: {
    // icon: IconAdministrativeGraph,
    color: '#9B2C1F'
  },
  "case": {
    // icon: IconCaseGraph,
    color: '#FF7F15'
  },
  study: {
    // icon: IconStudyGraph,
    color: '#AD91FF'
  },
  clinical_trial: {
    // icon: IconClinicalTrialGraph,
    color: '#1C75BC'
  }
};
var pdfNodeCategoryList = exports.pdfNodeCategoryList = {
  clinical: {
    icon: _clinical["default"],
    color: '#05B8EE'
  },
  biospecimen: {
    icon: _biospecimen["default"],
    color: '#28AE60'
  },
  data_file: {
    icon: _data_file["default"],
    color: '#7EC500'
  },
  analysis: {
    icon: _analysis["default"],
    color: '#FF7ABC'
  },
  administrative: {
    icon: _administrative["default"],
    color: '#9B2C1F'
  },
  "case": {
    icon: _case["default"],
    color: '#FF7F15'
  },
  study: {
    icon: _study["default"],
    color: '#AD91FF'
  },
  clinical_trial: {
    icon: _clinical_trial["default"],
    color: '#1C75BC'
  }
};
var tableNodeCategoryList = exports.tableNodeCategoryList = {
  clinical: {
    icon: _clinical2["default"],
    color: '#05B8EE'
  },
  biospecimen: {
    icon: _biospecimen2["default"],
    color: '#28AE60'
  },
  data_file: {
    icon: _data_file2["default"],
    color: '#7EC500'
  },
  analysis: {
    icon: _analysis2["default"],
    color: '#FF7ABC'
  },
  administrative: {
    icon: _administrative2["default"],
    color: '#9B2C1F'
  },
  "case": {
    icon: _case2["default"],
    color: '#FF7F15'
  },
  study: {
    icon: _study2["default"],
    color: '#AD91FF'
  },
  clinical_trial: {
    icon: _clinical_trial2["default"],
    color: '#1C75BC'
  }
};
var legendNodeCategoryList = exports.legendNodeCategoryList = {
  clinical: {
    icon: _lg_clinical["default"],
    color: '#05B8EE'
  },
  biospecimen: {
    icon: _lg_biospecimen["default"],
    color: '#28AE60'
  },
  data_file: {
    icon: _lg_data_file["default"],
    color: '#7EC500'
  },
  analysis: {
    icon: _lg_analysis["default"],
    color: '#FF7ABC'
  },
  administrative: {
    icon: _lg_administrative["default"],
    color: '#9B2C1F'
  },
  "case": {
    icon: _lg_case["default"],
    color: '#FF7F15'
  },
  study: {
    icon: _lg_study["default"],
    color: '#AD91FF'
  },
  clinical_trial: {
    icon: _lg_clinical_trial["default"],
    color: '#1C75BC'
  }
};
var defaultCategory = exports.defaultCategory = {
  icon: _icon_default["default"],
  color: '#9B9B9B'
};
var getCategoryIconSVG = exports.getCategoryIconSVG = function getCategoryIconSVG(category) {
  if (nodeCategoryList[category]) {
    return table + category;
  }
  return defaultCategory.icon;
};
var getCategoryColor = exports.getCategoryColor = function getCategoryColor(category) {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].color;
  }
  return defaultCategory.color;
};
var getCategoryBackground = exports.getCategoryBackground = function getCategoryBackground(category) {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].background || nodeCategoryList[category].color;
  }
  return defaultCategory.color;
};
var getCategoryStyle = exports.getCategoryStyle = function getCategoryStyle(category) {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category];
  }
  return defaultCategory.color;
};
var getGraphCategoryIconSVG = exports.getGraphCategoryIconSVG = function getGraphCategoryIconSVG(category) {
  if (graphNodeCategoryList[category]) {
    return graph + category;
  }
  return table + 'default.svg';
};
var getPdfCategoryIconSVG = exports.getPdfCategoryIconSVG = function getPdfCategoryIconSVG(category) {
  return pdfNodeCategoryList[category];
};
var getLegendCategoryIconSVG = exports.getLegendCategoryIconSVG = function getLegendCategoryIconSVG(category) {
  if (graphNodeCategoryList[category]) {
    return legend + category;
  }
  return table + 'default.svg';
};