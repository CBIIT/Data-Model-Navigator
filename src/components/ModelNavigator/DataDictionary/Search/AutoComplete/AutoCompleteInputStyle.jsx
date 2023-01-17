export default () => ({
  autoCompleteInput: {
    padding: '0',
    height: '100%',
    width: '100%',
    border: 'none',
    display: 'flex',
    borderRadius: '15px',
    '& :active': {
      borderColor: 'red',
    }
  },
  autoCompleteInputForm: {
    marginRight: '10px',
    flexGrow: '1',
    paddingLeft: '10px',
  },
  autoCompleteInputBox: {
    border: 'none',
    width: '100%',
    height: '25px',
    borderRadius: '15px',
    float: 'left',
    '&:focus': {
      outline: 'none',
    },
  },
  closeBtn: {
    minWidth: '15px',
    padding: '0',
  },
  closeIcon: {
    width: '25px',
    // color: '#0d71a3',
    height: '25px',
    position: 'relative',
    '& :hover': {
        cursor: 'pointer',
    },
  },
  searchBtn:{
    minWidth: '15px',
    padding: '0',
  },
  searchIcon: {
    '& :hover': {
        cursor: 'pointer',
    },
  },
  verticalLine: {
    width: '2px',
    borderLeft: '1px solid ',
    margin: '0px 2px 0px 2px',
  }
});