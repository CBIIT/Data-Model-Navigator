export default () => ({
  propDialog: {
    backgroundColor: '#2D4455',
    borderRadius: '5px',
    marginTop: '-10px',
    marginLeft: '-10px',
    zIndex: '1000',
  },
  customNodeCollapse: {
    fontSize: '10px',
    // background: '#f5f5f6',
    color: '#222',
    borderRadius: '2px',
    padding: '10px 10px 0px 10px',
    background: 'transparent',
  },
  customNodeExpand: {
    fontSize: '10px',
    color: '#222',
    // boxShadow: '0 4px 6px -1px rgb(0 0 0 / 15%), 0 2px 4px -1px rgb(0 0 0 / 8%)',
    borderRadius: '5px',
    padding: '0px 0px 0px 0px',
    opacity: '0.97',
    boxSizing: 'border-box',
    backgroundColor: '#2d4455',
  },
  highLightNode: {
    fontSize: '15px',
    fontWeight: '900',
  },
  nodeTitle: {
    // backgroundColor: '#ffffff',
    borderRadius: '5px',
    // border: '0.5px solid #ffffff',
    height: '33px',
    textAlign: 'center',
    // backgroundColor: '#2d4455',
  },
  iconBar: {
    height: '17px',
    width: '100%',
    paddingTop: '5px',
  },
  closeIcon: {
    float: 'right',
    color: '#ffffff',
    height: '13px',
    width: '20px',
    cursor: 'pointer',
  },
  nodeIcon: {
    float: 'left',
    width: '33px',
    // height: '30px',
  },
  iconWrapper: {
    width: '33px',
    float: 'left',
    height: '100%',
  },
  nodeName: {
    float: 'right',
    display: 'block',
    padding: '5px 10px 5px 10px',
    minWidth: '90px',
    fontSize: '16px',
    fontWeight: '500',
  },
  btnPadding: {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  nodeTitleBtnWrapper: {
    outline: '0.5px solid #ffffff',
  },
  nodeTitleBtn: {
    border: '2px solid #2E2E2E',
    padding: '0',
    minWidth: '115px',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    height: '32px',
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
    marginTop: '30px',
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
    fontSize: '12px',
    lineHeight: '18px',
    color: '#0077c1',
    padding: '0px 25px 0px 25px',
  },
  content : {
    margin: 'auto',
    maxWidth: '140px',
  }, 
  listItemLabel: {
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: '13px',
    fontWeight: '300',
    letterSpacing: '0',
    lineHeight: '24px',
  },
  listItemValue: {
    color: '#3fd9ff',
    fontFamily: 'Nunito',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0',
    lineHeight: '24px',
  },
  viewPropBtn: {
    cursor: 'pointer',
    fontSize: '9px',
    width: '100%',
    height: '50px',
    height: '50px',
    marginTop: '15px',
    border: '1px solid #14212b',
    backgroundColor: '#14212b',
    color: '#ffffff',
    fontFamily: 'Lato',
    fontSize: '16px',
    lineHeight: '13px',
    textAlign: 'center',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
  },
  divider: {
    margin: '0',
    height: '1px',
    background: '#5f86a4',
    border: '0',
    opacity: '0.85',
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
      borderTopLeftRadius: '5px',
      borderBottomLeftRadius: '5px',
      // marginTop: '-0.5px',
      marginLeft: '-0.5px',
    }
  },
  administrative: {
    '& img': {
      background: '#9b2d20',
      borderTop: '1px solid #9b2d20',
    }
  },
  study: {
    '& .iconWrapper': {
      background: '#9875ff',
    },
    '& img': {
      background: '#9875ff',
      borderTop: '1px solid #9875ff',
    }
  },
  case: {
    '& img': {
      background: '#ff7f15',
      borderTop: '1px solid #ff7f15',
    }
  },
  clinical_trial: {
    '& img': {
      background: '#00A1BB',
      borderTop: '1px solid #00A1BB',
    }
  },
  biospecimen: {
    '& img': {
      background: '#00785a',
      borderTop: '1px solid #00785a',
    }
  },
  analysis: {
    '& img': {
      background: '#b533a9',
      borderTop: '1px solid #b533a9',
    }
  },
  data_file: {
    '& img': {
      background: '#00ad0e',
      borderTop: '1px solid #00ad0e',
    }
  },
  clinical: {
    '& img': {
      background: '#1c75bc',
      borderTop: '1px solid #1c75bc',
    }
  }
});