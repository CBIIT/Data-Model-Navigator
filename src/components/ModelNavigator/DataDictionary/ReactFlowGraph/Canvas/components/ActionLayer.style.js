export default () => ({
  actionLayer: {
    position: 'absolute',
    zIndex: '1',
    left: '420px',
  },
  clearSearch: {
    marginLeft: '25px',
    marginTop: '15px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    height: '40px',
    padding: '1px 20px',
    textTransform: 'none',
    color: ' #fff',
    backgroundColor: '#ef8523',
    '&:hover': {
      backgroundColor: '#ff9635',
    }
  },
  zvalue: {
    zIndex: '0',
  }
});
