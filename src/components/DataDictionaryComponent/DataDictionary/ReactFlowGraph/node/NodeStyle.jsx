export default () => ({
  propDialog: {
    backgroundColor: '#2D4455',
    borderRadius: '2px',
    // border: '1.5px solid #0C3759',
    // width: '200px'
  },
  customNodeCollapse: {
    fontSize: '10px',
    // background: '#f5f5f6',
    color: '#222',
    // boxShadow: '0 4px 6px -1px rgb(0 0 0 / 15%), 0 2px 4px -1px rgb(0 0 0 / 8%)',
    borderRadius: '2px',
    padding: '10px 10px 0px 10px',
    background: 'transparent',
  },
  customNodeExpand: {
    fontSize: '10px',
    color: '#222',
    // boxShadow: '0 4px 6px -1px rgb(0 0 0 / 15%), 0 2px 4px -1px rgb(0 0 0 / 8%)',
    // borderRadius: '2px',
    padding: '10px 10px 0px 10px',
    // boxSizing: 'border-box',
    opacity: '0.97',
    // backgroundColor: '#2D4455',
  },
  nodeTitle: {
    height: '25px',
    // backgroundColor: '#2D4455',
  },
  nodeIcon: {
    float: 'left',
    width: '33px',
    height: '25px'
  },
  nodeName: {
    float: 'right',
    display: 'block',
    padding: '5px 10px 0px 10px',
  },
  nodeTitleBtn: {
    border: '2.5px solid #2E2E2E',
    padding: '0',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  viewSection: {
    marginTop: '10px',
    color: '#FFFFFF',
    fontSize: '10px',
  },
  hideSection: {
    display: 'none',
  },
  list: {
    paddingLeft: '0px',
    marginBottom: '0px',
    listStyleType: 'none',
    paddingBottom: '5px',
  },
  listItem: {
    fontSize: '9px',
  },
  viewPropBtn: {
    fontSize: '9px',
    width: '100%',
    height: '20px',
  },
  matchedNodeIDs: {

  },
  matchedInNameAndDesc: {
    // border: '2px solid red',
  },
  matchedNodeIDsInProps: {
    border: '2.5px dashed #2E2E2E',

  },
  excludeNode: {
    opacity: '0.3',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  administrative: {
    '& img': {
      background: '#9b2d20',
      borderLeft: '2px solid #9b2d20',
    }
  },
  study: {
    '& img': {
      background: '#9875ff',
      borderLeft: '2px solid #9875f',
    }
  },
  case: {
    '& img': {
      background: '#ff7f15',
      borderLeft: '2px solid #ff7f15',
    }
  },
  clinical_trial: {
    '& img': {
      background: '#00A1BB',
      borderLeft: '2px solid #00A1BB',
    }
  },
  biospecimen: {
    '& img': {
      background: '#00785a',
      borderLeft: '2px solid #00785a',
    }
  },
  analysis: {
    '& img': {
      background: '#b533a9',
      borderLeft: '2px solid #b533a9',
    }
  },
  data_file: {
    '& img': {
      background: '#00ad0e',
      borderLeft: '2px solid #00ad0e',
    }
  },
  clinical: {
    '& img': {
      background: '#1c75bc',
      borderLeft: '2px solid #1c75bc',
    }
  }
});