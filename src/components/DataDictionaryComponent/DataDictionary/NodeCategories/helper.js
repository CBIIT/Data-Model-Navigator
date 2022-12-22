// /* eslint-disable import/no-unresolved */
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconAdministrativeGraph from './icons/Administrative_graph.svg';
// /* eslint-disable import/no-unresolved */
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconStudyGraph from './icons/Study_graph.svg';
// /* eslint-disable import/no-unresolved */
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconClinicalTrialGraph from './icons/Clinical_Trial_graph.svg';
// /* eslint-disable import/no-unresolved */
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconCaseGraph from './icons/Case_graph.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconAnalysisGraph from './icons/icon_analysis_graph.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconBiospecimenGraph from './icons/icon_biospecimen_graph.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconClinicalGraph from './icons/icon_clinical_graph.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconClinicalAssessment from './icons/icon_clinical_assessment.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconDataFileGraph from './icons/icon_data_file_graph.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconMetadata from './icons/icon_metadata.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconNotation from './icons/icon_notation.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconIndexFile from './icons/icon_index_file.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconDataObservations from './icons/icon_data_observations.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconDefault from './icons/icon_default.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconExperimentalMethods from './icons/icon_experimental_methods.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconSubjectCharacteristics from './icons/icon_subject_characteristics.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconImaging from './icons/icon_imaging.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import IconStudyAdministration from './icons/icon_study_administration.svg';

// // Holustic icons
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import LgAdministrationSvg from './icons/Legend/lg_administrative.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import LgAnalysisSvg from './icons/Legend/lg_analysis.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import LgBiospecimenSvg from './icons/Legend/lg_biospecimen.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import LgCaseSvg from './icons/Legend/lg_case.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import LgClinicalTrialSvg from './icons/Legend/lg_clinical_trial.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import LgClinicalSvg from './icons/Legend/lg_clinical.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import LgFileSvg from './icons/Legend/lg_file.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import LgRelationSvg from './icons/Legend/lg_relationship_links.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import LgStudySvg from './icons/Legend/lg_study.svg';

// //Table view icons
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import Administrative from './icons/Table/Administrative.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import Study from './icons/Table/Study.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import ClinicalTrial from './icons/Table/ClinicalTrial.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import Case from './icons/Table/Case.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import Biospecimen from './icons/Table/Biospecimen.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import Clinical from './icons/Table/Clinical.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import Analysis from './icons/Table/Analysis.svg';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import DataFile from './icons/Table/DataFile.svg';

const iconUrl = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/data_model_pdf_icons/icdc/DMN/'
export const graphIconUrl = iconUrl + 'graph/';
export const legendIconUrl = iconUrl + 'legend/';
export const tableIconUrl = iconUrl + 'table/';

const nodeLgCategoryList = {
  administrative: {
    // icon: LgAdministrationSvg,
    color: '#9b2d20',
  },
  analysis: {
    // icon: LgAnalysisSvg,
    color: '#b533a9',
  },
  biospecimen: {
    // icon: LgBiospecimenSvg,
    color: '#00785a',
  },
  case: {
    // icon: LgCaseSvg,
    color: '#ff7f15',
  },
  clinical_trial: {
    // icon: LgClinicalTrialSvg,
    color: '#00b5d3',
  },
  clinical: {
    // icon: LgClinicalSvg,
    color: '#1c75bc',
  },
  data_file: {
    // icon: LgFileSvg,
    color: '#00ad0e',
  },
  study: {
    // icon: LgStudySvg,
    color: '#9875ff',
  },
}

const nodeCategoryList = {
  administrative: {
    // icon: Administrative,
    color: '#9C2E1F',
    background: '#691706',
  },
  study: {
    // icon: Study,
    color: '#9775FF',
    background: '#4D31A2',
  },
  clinical_trial: {
    // icon: ClinicalTrial,
    color: '#00A0BA',
    background: '#043F55',
  },
  case: {
    // icon: Case,
    color: '#FF7E14',
    background: '#672900',
  },
  biospecimen: {
    // icon: Biospecimen,
    color: '#00785A',
    background: '#063126',
  },
  clinical: {
    // icon: Clinical,
    color: '#1C75BB',
    background: '#073A61',
  },
  data_file: {
    // icon: DataFile,
    color: '#00AC0E',
    background: '#023806',
  },
  metadata_file: {
    // icon: IconMetadata,
    color: '#F4B940',
  },
  analysis: {
    // icon: Analysis,
    color: '#B533A9',
    background: '#6F0065',
  }
};

const graphNodeCategoryList = {
  clinical: {
    // icon: IconClinicalGraph,
    color: '#05B8EE',
  },
  biospecimen: {
    // icon: IconBiospecimenGraph,
    color: '#28AE60',
  },
  data_file: {
    // icon: IconDataFileGraph,
    color: '#7EC500',
  },
  metadata_file: {
    // icon: IconMetadata,
    color: '#F4B940',
  },
  analysis: {
    // icon: IconAnalysisGraph,
    color: '#FF7ABC',
  },
  administrative: {
    // icon: IconAdministrativeGraph,
    color: '#9B2C1F',
  },
  case: {
    // icon: IconCaseGraph,
    color: '#FF7F15',
  },
  study: {
    // icon: IconStudyGraph,
    color: '#AD91FF',
  },
  clinical_trial: {
    // icon: IconClinicalTrialGraph,
    color: '#1C75BC',
  },
  notation: {
    // icon: IconNotation,
    color: '#E74C3C',
  },
  index_file: {
    // icon: IconIndexFile,
    color: '#26D9B1',
  },
  clinical_assessment: {
    // icon: IconClinicalAssessment,
    color: '#3283C8',
  },
  medical_history: {
    // icon: IconClinicalGraph,
    color: '#05B8EE',
  },
  data_observations: {
    // icon: IconDataObservations,
    color: '#FF8585',
  },
  experimental_methods: {
    // icon: IconExperimentalMethods,
    color: '#E74C3C',
  },
  subject_characteristics: {
    // icon: IconSubjectCharacteristics,
    color: '#05B8EE',
  },
  imaging: {
    // icon: IconImaging,
    color: '#7EC500',
  },
  study_administration: {
    // icon: IconStudyAdministration,
    color: '#733EA3',
  },
};

const defaultCategory = {
  // icon: IconDefault,
  color: '#9B9B9B',
};

export const getCategoryIconSVG = (category) => {
  if (nodeCategoryList[category]) {
    return table+category;
  }

  return defaultCategory.icon;
};

export const getCategoryColor = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].color;
  }

  return defaultCategory.color;
};

export const getCategoryBackground = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].background ||  nodeCategoryList[category].color;
  }

  return defaultCategory.color;
}

export const getCategoryStyle = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category];
  }
  return defaultCategory.color;
};

export const getGraphCategoryIconSVG = (category) => {
  if (graphNodeCategoryList[category]) {
    return graph+category;
  }

  return table+'default.svg';
};

export const getLegendCategoryIconSVG = (category) => {
  if (graphNodeCategoryList[category]) {
    return legend+category;
  }

  return table+'default.svg';
};
