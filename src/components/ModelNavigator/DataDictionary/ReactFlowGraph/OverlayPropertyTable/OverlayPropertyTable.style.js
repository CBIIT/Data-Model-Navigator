export default () => ({
  table: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: '15',
  },
  background: {
    position: 'absolute',
    top: '0',
    height: '100%',
    left: '0',
    right: '0',
    backgroundColor: '#4a4a4a',
    opacity: '.5',
    zIndex: '-1',
  },
    fixedContainer: {
    height: '100%',
    overflowY: 'scroll',
    padding: '15px 40px',
  },
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '-5px 4px 21px 18px rgba(27,28,28,0.32)',
  },
  header: {
    // position: '-webkit-sticky',
    // position: 'sticky',
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
    backgroundColor: '#000000',
    marginLeft: '8px',
    position: 'relative',
    top: '1px',
    marginRight: '20px',
    backgroundColor: '#606060',
  },
  category: {
    // backgroundColor: 'var(--dictionary-header-color)',
    padding: '3px 15px 0px 15px',
    lineHeight: '40px',
    verticalAlign: 'middle',
    borderLeft: '5px solid',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    display: 'inline',
    color: '#fff',
    fontSize: '18px',
  },
  node: {
    backgroundColor: '#fff',
    display: 'flex',
    minHeight: '40px',
    padding: '15px',
    border: '1px solid #e7e7e7',
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
    backgroundColor: '#fff',
    borderRight: '1px solid #ADBEC4',
    borderBottom: '1px solid #ADBEC4',
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid',
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
    borderRight: '1px solid #e7e7e7',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 5px 14px 22px',
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid',
    borderLeftColor: '#e7e7e7',
    marginBottom: '5px',
    '&:last-child': {
      marginBottom: '0',
    },
    '&:hover $nodeTitle': {
      color: '#3283c8',
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
    borderLeft: '5px solid #ffffff',
  },
  propertySummary: {
    /* margin: 5px 0', */
    color: '#7a7a7a',
    paddingLeft: '17px',
    marginBottom: '14px',
  },
});
  


  