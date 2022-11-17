/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconAdministrativeGraph from '-!react-svg-loader!./icons/Administrative_graph.svg';
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconStudyGraph from '-!react-svg-loader!./icons/Study_graph.svg';
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconClinicalTrialGraph from '-!react-svg-loader!./icons/Clinical_Trial_graph.svg';
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconCaseGraph from '-!react-svg-loader!./icons/Case_graph.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconAnalysisGraph from '-!react-svg-loader!./icons/icon_analysis_graph.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconBiospecimenGraph from '-!react-svg-loader!./icons/icon_biospecimen_graph.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconClinicalGraph from '-!react-svg-loader!./icons/icon_clinical_graph.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconClinicalAssessment from '-!react-svg-loader!./icons/icon_clinical_assessment.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconDataFileGraph from '-!react-svg-loader!./icons/icon_data_file_graph.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconMetadata from '-!react-svg-loader!./icons/icon_metadata.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconNotation from '-!react-svg-loader!./icons/icon_notation.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconIndexFile from '-!react-svg-loader!./icons/icon_index_file.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconDataObservations from '-!react-svg-loader!./icons/icon_data_observations.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconDefault from '-!react-svg-loader!./icons/icon_default.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconExperimentalMethods from '-!react-svg-loader!./icons/icon_experimental_methods.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconSubjectCharacteristics from '-!react-svg-loader!./icons/icon_subject_characteristics.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconImaging from '-!react-svg-loader!./icons/icon_imaging.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconStudyAdministration from '-!react-svg-loader!./icons/icon_study_administration.svg';

// Holustic icons
// eslint-disable-next-line import/no-webpack-loader-syntax
import LgAdministrationSvg from '-!react-svg-loader!./icons/Legend/lg_administrative.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LgAnalysisSvg from '-!react-svg-loader!./icons/Legend/lg_analysis.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LgBiospecimenSvg from '-!react-svg-loader!./icons/Legend/lg_biospecimen.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LgCaseSvg from '-!react-svg-loader!./icons/Legend/lg_case.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LgClinicalTrialSvg from '-!react-svg-loader!./icons/Legend/lg_clinical_trial.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LgClinicalSvg from '-!react-svg-loader!./icons/Legend/lg_clinical.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LgFileSvg from '-!react-svg-loader!./icons/Legend/lg_file.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LgRelationSvg from '-!react-svg-loader!./icons/Legend/lg_relationship_links.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LgStudySvg from '-!react-svg-loader!./icons/Legend/lg_study.svg';

//Table view icons
// eslint-disable-next-line import/no-webpack-loader-syntax
import Administrative from '-!react-svg-loader!./icons/Table/Administrative.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Study from '-!react-svg-loader!./icons/Table/Study.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ClinicalTrial from '-!react-svg-loader!./icons/Table/ClinicalTrial.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Case from '-!react-svg-loader!./icons/Table/Case.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Biospecimen from '-!react-svg-loader!./icons/Table/Biospecimen.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Clinical from '-!react-svg-loader!./icons/Table/Clinical.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Analysis from '-!react-svg-loader!./icons/Table/Analysis.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DataFile from '-!react-svg-loader!./icons/Table/DataFile.svg';

const nodeLgCategoryList = {
  administrative: {
    icon: LgAdministrationSvg,
    color: '#9b2d20',
  },
  analysis: {
    icon: LgAnalysisSvg,
    color: '#b533a9',
  },
  biospecimen: {
    icon: LgBiospecimenSvg,
    color: '#00785a',
  },
  case: {
    icon: LgCaseSvg,
    color: '#ff7f15',
  },
  clinical_trial: {
    icon: LgClinicalTrialSvg,
    color: '#00b5d3',
  },
  clinical: {
    icon: LgClinicalSvg,
    color: '#1c75bc',
  },
  data_file: {
    icon: LgFileSvg,
    color: '#00ad0e',
  },
  study: {
    icon: LgStudySvg,
    color: '#9875ff',
  },
}

const nodeCategoryList = {
  administrative: {
    icon: Administrative,
    color: '#9C2E1F',
    background: '#691706',
  },
  study: {
    icon: Study,
    color: '#9775FF',
    background: '#4D31A2',
  },
  clinical_trial: {
    icon: ClinicalTrial,
    color: '#00A0BA',
    background: '#043F55',
  },
  case: {
    icon: Case,
    color: '#FF7E14',
    background: '#672900',
  },
  biospecimen: {
    icon: Biospecimen,
    color: '#00785A',
    background: '#063126',
  },
  clinical: {
    icon: Clinical,
    color: '#1C75BB',
    background: '#073A61',
  },
  data_file: {
    icon: DataFile,
    color: '#00AC0E',
    background: '#023806',
  },
  metadata_file: {
    icon: IconMetadata,
    color: '#F4B940',
  },
  analysis: {
    icon: Analysis,
    color: '#B533A9',
    background: '#6F0065',
  }
};

const graphNodeCategoryList = {
  clinical: {
    icon: IconClinicalGraph,
    color: '#05B8EE',
  },
  biospecimen: {
    icon: IconBiospecimenGraph,
    color: '#28AE60',
  },
  data_file: {
    icon: IconDataFileGraph,
    color: '#7EC500',
  },
  metadata_file: {
    icon: IconMetadata,
    color: '#F4B940',
  },
  analysis: {
    icon: IconAnalysisGraph,
    color: '#FF7ABC',
  },
  administrative: {
    icon: IconAdministrativeGraph,
    color: '#9B2C1F',
  },
  case: {
    icon: IconCaseGraph,
    color: '#FF7F15',
  },
  study: {
    icon: IconStudyGraph,
    color: '#AD91FF',
  },
  clinical_trial: {
    icon: IconClinicalTrialGraph,
    color: '#1C75BC',
  },
  notation: {
    icon: IconNotation,
    color: '#E74C3C',
  },
  index_file: {
    icon: IconIndexFile,
    color: '#26D9B1',
  },
  clinical_assessment: {
    icon: IconClinicalAssessment,
    color: '#3283C8',
  },
  medical_history: {
    icon: IconClinicalGraph,
    color: '#05B8EE',
  },
  data_observations: {
    icon: IconDataObservations,
    color: '#FF8585',
  },
  experimental_methods: {
    icon: IconExperimentalMethods,
    color: '#E74C3C',
  },
  subject_characteristics: {
    icon: IconSubjectCharacteristics,
    color: '#05B8EE',
  },
  imaging: {
    icon: IconImaging,
    color: '#7EC500',
  },
  study_administration: {
    icon: IconStudyAdministration,
    color: '#733EA3',
  },
};

const defaultCategory = {
  icon: IconDefault,
  color: '#9B9B9B',
};

export const getCategoryIconSVG = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].icon;
  }

  return defaultCategory.icon;
};

export const getCategoryColor = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].color;
  }

  return defaultCategory.color;
};

export const getCategoryStyle = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category];
  }

  return defaultCategory.color;
};

export const getGraphCategoryIconSVG = (category) => {
  if (graphNodeCategoryList[category]) {
    return graphNodeCategoryList[category].icon;
  }

  return defaultCategory.icon;
};

export const getLegendCategoryIconSVG = (category) => {
  if (nodeLgCategoryList[category]) {
    return nodeLgCategoryList[category].icon;
  }

  return defaultCategory.icon;
};