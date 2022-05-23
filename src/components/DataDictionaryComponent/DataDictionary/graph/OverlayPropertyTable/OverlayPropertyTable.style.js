export default () => ({
  table: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: '3',
  },
  background: {
    position: 'absolute',
    top: '0',
    height: '100%',
    left: '0',
    right: '0',
    backgroundColor: 'var(--g3-color__bg-coal)',
    opacity: '.5',
    zIndex: '-1',
  },
    fixedContainer: {
    height: '100%',
    overflowY: 'scroll',
    padding: '15px',
  },
  content: {
    backgroundColor: '#fff',
  },
  header: {
    position: '-webkit-sticky',
    position: 'sticky',
    top: '0',
    zIndex: '3',
  },
  close: {
    float: 'right',
    color: '#fff',
    cursor: 'pointer',
    marginLeft: '15px',
  },
  closeIcon: {
    backgroundColor: '#fff',
    marginLeft: '8px',
    position: 'relative',
    top: '1px',
  },
  category: {
    backgroundColor: 'var(--dictionary-header-color)',
    padding: '10px 15px',
    lineHeight: '40px',
    verticalAlign: 'middle',
    borderLeft: '5px solid',
  },
  categoryText: {
    display: 'inline',
    color: 'var(--g3-color__white);',
  },
  node: {
    backgroundColor: 'var(--g3-color__white)',
    display: 'flex',
    minHeight: '40px',
    padding: '15px',
    border: '1px solid var(--g3-color__silver)',
    borderTop: 'none',
  },
  title: {
    width: '25%',
    lineHeight: '1.6rem',
  },
  description: {
    width: '75%',
    lineHeight: '1.6rem',
  },
  categoryIcon: {
    verticalAlign: 'middle',
    position: 'relative',
    top: '-2px',
    marginRight: '10px',
  },
  property: {
    marginTop: '-5px',
  },
  propertyTable: {
    padding: '10px 18px 18px 23px',
  },
  downloadButton: {
    minWidth: 'unset', /* override .g3-button's 152px min-width */
    height: '30px',
    margin: '0',
    padding: 'unset', /* override .g3-button's paddings */
    float: 'right',
    fontWeight: 'normal',
    border: '0',
    padding: '0px 6px 0px 6px',
    textAlign: 'center',
    '&:hover': {
      color: 'white',
      backgroundColor: 'transparent',
    },
    '&:active': {
      color: 'white',
      backgroundColor: 'transparent',
    }
  },
  downloadText: {
    marginBottom: '100px',
  },
  span: {
    display: 'inline',
  },
  spanHighlight: {
    color: 'var(--g3-color__highlight-orange)',
    fontWeight: '600',
  },
  spanNewLine: {
    display: 'block',
  },
  toggleNode: {
    minWidth: 'unset', /* override .g3-button's 152px min-width */
    height: '30px',
    padding: '0 20px',
    border: 'none',
    marginLeft: '10px',
    position: 'relative',
    top: '-2px',
  },
  nodeTitle : {
    width: '260px',
    flexGrow: '0',
    flexShrink: '0',
    '-moz-user-select': 'none',
    '-webkit-user-select': 'none',
    fontWeight: '900',
    '-ms-user-select': 'none',
    userSelect: 'none',
    fontSize: '15px',
    lineHeight: '14px',
  },
  node : {
    backgroundColor: '#f4f5f5',
    borderRight: '1px solid var(--dictionary-border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 5px 14px 22px',
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'var(--dictionary-border-color)',
    cursor: 'pointer',
    marginBottom: '5px',
    '&:last-child': {
      marginBottom: '0',
    },
    '&:hover $nodeTitle': {
      color: 'var(--g3-color__base-blue)',
    },
  },
  nodeLabel: {
    marginTop: '10px',
    float: 'left',
    color: '#8e8e8e',
    fontWeight: '900',
    marginRight: '5px',
    borderRadius: '100px',
    border: '1px solid #cdcdcd',
    textAlign: 'center',
    padding: '2px 12px',
    background: '#fff',
    fontSize: '12px',
  },
  nodeAssignmentGroup : {
    textAlign: 'right',
  },
  nodeClass: {
    marginLeft: '5px',
    color: '#2982af',
    fontWeight: '500',
  },
  nodeAssignment: {
    marginLeft: '5px',
    color: '#2982af',
    fontWeight: '500',
  },
  categoryDivider: {
    height: '4px',
    display: 'block',
    backgroundColor: '#e7e5e5',
    borderLeft: '5px solid var(--dictionary-border-color)',
  },
  propertySummary: {
    /* margin: 5px 0', */
    color: '#7a7a7a',
    paddingLeft: '17px',
    marginBottom: '8px',
  },
});
  


  