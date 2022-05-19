export default () => ({
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
  nodeFileIcon : {
    marginRight: '10px',
    position: 'relative',
    top: '3px',
  },
  nodeToggleIcon : {
    marginLeft: '10px',
    position: 'relative',
    top: '3px',
  },
  nodeDescription: {
    flexGrow: '3',
    paddingRight: '21px',
    fontSize: '14px',
    lineHeight: '17px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingTop: '10px',
    paddingLeft: '0',
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
  nodeClassGroup: {
    paddingLeft: '18px',
  },
  nodeDownloadButtonGroup : {
    textAlign: 'right',
    marginTop: '15px',
    paddingRight: '15px',
  },
  downloadGroup : {
    display: 'inline',
    flexGrow: '0',
    flexShrink: '0',
    paddingLeft: '5px',
  },
  buttonWrap : {
    float: 'right',
    marginTop: '-8px',
    '&:last-child': {
      borderRight: 'none',
    }
  },
  downloadButtonTsv: {
    padding: '0',
    width: '35px',
    border: 'none',
    backgroundColor: 'inherit',
    marginRight: '10px',
    '&:hover':{
      cursor: 'pointer',
    }
  },
  downloadButtonGroupLoading : {
    opacity: '05',
    color: '#f4f5f5',
    backgroundColor: '#0a4a6d',
    float: 'left',
    width: '400px',
  },
  downloadButtonPdf : {
    height: '30px',
    margin: '5px 6px 0 6px',
    padding: 'unset', /* override g3-button's paddings */
    fontWeight: 'normal',
    display: 'block',
    color: 'var(--g3-color__white)',
    textAlign: 'right',
    border: 'none',
    '&:hover':{
      cursor: 'pointer',
    }
  },
  loading : {
    padding: '5px 5px',
    backgroundColor: '#0b3557',
    color: '#fff',
  },
  downloadButtonPdf: {
    '& img': {
      width: '35px',
      marginTop: '-5px',
    },
  },
  downloadButton:{
    position: 'relative',
    top: '1px',
    left: '-2px',
    '&:active': {
      cursor: 'pointer',
    },
  },
  property : {
    backgroundColor: '#fff',
    padding: '10px 18px 18px 23px',
    position: 'relative',
    margin: '0',
  },
  propertySummary: {
    /* margin: 5px 0', */
    color: '#7a7a7a',
    paddingLeft: '17px',
    marginBottom: '8px',
  },
  propertyClose : {
    float: 'right',
    cursor: 'pointer',
    '&:hover': {
      color: 'var(--g3-color__black)',
    },
    '&:hover $propertyCloseIcon': {
      backgroundColor: 'var(--g3-color__black)',
    }
  },
  propertyCloseIcon : {
    position: 'relative',
    top: '4px',
    marginRight: '20px',
    backgroundColor: 'var(--g3-color__gray)',
  },
})
