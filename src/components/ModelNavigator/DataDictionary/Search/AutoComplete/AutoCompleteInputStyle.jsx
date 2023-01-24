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
    width: '22px',
    // color: '#0d71a3',
    height: '25px',
    position: 'relative',
    color: '#0D71A3',
    '& :hover': {
        cursor: 'pointer',
    },
  },
  searchBtn:{
    minWidth: '15px',
    padding: '0',
  },
  searchIcon: {
    color: '#0D71A3',
    width: '22px',
    '& :hover': {
        cursor: 'pointer',
    },
  },
  verticalLine: {
    width: '2px',
    color: '#0D71A3',
    borderLeft: '1px solid ',
    margin: '0px 2px 0px 2px',
  }
});