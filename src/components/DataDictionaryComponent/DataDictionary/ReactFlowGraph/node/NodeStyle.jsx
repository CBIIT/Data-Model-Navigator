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
  highLightNode: {
    fontSize: '15px',
    fontWeight: '900',
  },
  nodeTitle: {
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    border: '0.5px solid #ffffff',
    height: '36px',
    textAlign: 'center',
  },
  nodeIcon: {
    float: 'left',
    width: '33px',
    height: '30px'
  },
  nodeName: {
    float: 'right',
    display: 'block',
    padding: '5px 10px 5px 10px',
    minWidth: '60px',
    fontSize: '16px',
    fontWeight: '500',
  },
  nodeTitleBtn: {
    border: '2.5px solid #2E2E2E',
    padding: '0',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ef8523',
      color: '#ffffff',
    },
    '& img': {
      borderTopLeftRadius: '2px',
      borderBottomLeftRadius: '2px',
    }
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
    cursor: 'not-allowed',
    pointerEvents: 'none',
    opacity: '0.4',
  },
  categoryIcon: {
    '& img': {
      borderTopLeftRadius: '2px',
      borderBottomLeftRadius: '2px',
    }
  },
  administrative: {
    '& img': {
      background: '#9b2d20',
      borderLeft: '2px solid #9b2d20',
      borderRight: '2px solid #9b2d20',
      borderTopLeftRadius: '2px',
      borderBottomLeftRadius: '2px',
    }
  },
  study: {
    '& img': {
      background: '#9875ff',
      borderLeft: '2px solid #9875ff',
      borderRight: '2px solid #9875ff',
      borderTopLeftRadius: '2px',
      borderBottomLeftRadius: '2px',
    }
  },
  case: {
    '& img': {
      background: '#ff7f15',
      borderLeft: '2px solid #ff7f15',
      borderRight: '2px solid #ff7f15',
      borderTopLeftRadius: '2px',
      borderBottomLeftRadius: '2px',
    }
  },
  clinical_trial: {
    '& img': {
      background: '#00A1BB',
      borderLeft: '2px solid #00A1BB',
      borderRight: '2px solid #00A1BB',
    }
  },
  biospecimen: {
    '& img': {
      background: '#00785a',
      borderLeft: '2px solid #00785a',
      borderRight: '2px solid #00785a',
    }
  },
  analysis: {
    '& img': {
      background: '#b533a9',
      borderLeft: '2px solid #b533a9',
      borderRight: '2px solid #b533a9',
    }
  },
  data_file: {
    '& img': {
      background: '#00ad0e',
      borderLeft: '2px solid #00ad0e',
      borderRight: '2px solid #00ad0e',
    }
  },
  clinical: {
    '& img': {
      background: '#1c75bc',
      borderLeft: '2px solid #1c75bc',
      borderRight: '2px solid #1c75bc',
    }
  }
});