export const categories = ['Admistrative', 'Study', 'Clinical Trial', 'Case', 'Biospecimen', 'Clinical', 'Analysis', 'Data File'];

export const types = {
  CATEGORY: 'category',
  ASSIGNMENT: 'assignment',
  INCLUSION: 'inclusion',
  CLASS: 'class',
  MULTIPLICITY: 'multiplicity',
}

export const defaultFacetSectionVariables = {
  color: '#000000',
  checkBoxColorsOne: '#E8F7DC',
  checkBoxColorsTwo: '#F5FDEE',
  height: '5px',
  isExpanded: false,
};

export const facetSearchData = [
  {
    groupName: 'Category',
    datafield: 'category',
    section: 'Filter By Nodes',
    tooltip: 'category',
    show: true,
    checkboxItems: [
      { name: 'Administrative', isChecked: false, group:'category' },
      { name: 'Case', isChecked: false, group:'category' },
      { name: 'Study', isChecked: false, group:'category' },
      { name: 'Clinical', isChecked: false, group:'category' },
      { name: 'Clinical_Trial', isChecked: false, group:'category' },
      { name: 'Biospecimen', isChecked: false, group:'category' },
      { name: 'Analysis', isChecked: false, group:'category' },
      { name: 'Data_File', isChecked: false, group:'category' },
    ],
  },
  {
    groupName: 'Assignment',
    datafield: 'assignment',
    section: 'Filter By Nodes',
    tooltip: 'assignment',
    show: true,
    checkboxItems: [
      { name: 'Core', isChecked: false, group: 'assignment' },
      { name: 'Extended', isChecked: false, group: 'assignment'  },
    ],
  },
  {
    groupName: 'Class',
    datafield: 'class',
    section: 'Filter By Nodes',
    tooltip: 'class',
    show: true,
    checkboxItems: [
      { name: 'Primary', isChecked: false, group: 'class' },
      { name: 'Secondary', isChecked: false, group: 'class' },
    ],
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
    checkboxItems: [
      { name: 'Required', isChecked: false, group: 'required' },
      { name: 'Preferred', isChecked: false, group: 'preferred' },
      { name: 'Optional', isChecked: false, group: 'optional' },
    ],
  },
];

export const facetSectionVariables = {
  'Filter By Nodes': {
    color: '#FF9742',
    checkBoxColorsOne: '#fdf1e8',
    checkBoxColorsTwo: '#fff9f5',
    height: '7px',
    isExpanded: true,
  },
  'Filter By Relationship': {
    color: '#9DC1D9',
    checkBoxColorsOne: '#dafafb',
    checkBoxColorsTwo: '#eafafb',
    height: '7px',
    isExpanded: true,
  },
  'Filter By Property': {
    color: '#667A87',
    checkBoxColorsOne: '#d4ddf7',
    checkBoxColorsTwo: '#e9eefb',
    height: '7px',
    isExpanded: true,
  },
};

export const resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};

export const baseFilters = {
  category: [],
  assignment: [],
  class: [],
  multiplicity: [],
  inclusion: [],
};

export const filterSections = [
  'category',
  'assignment',
  'class',
  'inclusion',
];

export const filterOptions = [
  // category
  'administrative',
  'case',
  'study',
  'clinical',
  'clinical_trial',
  'biospecimen',
  'analysis',
  'data_file',
  // Assignment
  'core',
  'extended',
  // Class
  'primary',
  'secondary',
  // Inclusion
  'required',
  'preferred',
  'optional',
];

export const controlVocabConfig = {
  maxNoOfItems: 15,
  maxNoOfItemDlgBox: 30,
};
