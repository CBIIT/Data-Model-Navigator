

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
};

const pdfNodeCategoryList = {
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

export const getPdfCategoryIconSVG = (category) => {
  return pdfNodeCategoryList(category);
};

export const getLegendCategoryIconSVG = (category) => {
  if (graphNodeCategoryList[category]) {
    return legend+category;
  }

  return table+'default.svg';
};
