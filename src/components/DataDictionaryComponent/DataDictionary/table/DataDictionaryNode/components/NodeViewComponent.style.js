export default () => ({
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
  nodeAssignmentGroup : {
    textAlign: 'right',
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
  nodeDownloadButtonGroup : {
    textAlign: 'right',
    marginTop: '15px',
    paddingRight: '15px',
  },
  buttonWrap : {
    float: 'right',
    marginTop: '-8px',
    '&:last-child': {
      borderRight: 'none',
    }
  },
});
  