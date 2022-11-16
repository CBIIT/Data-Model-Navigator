export default () => ({
  titleContainer: {
    height: '85px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '27px',
    paddingRight: '38px',
    paddingTop: '21px',
    marginBottom: '13px',
  },
  logoAndTitle: {
    display: 'flex',
    gap: '13px',
  },
  dogIcon: {
    height: '85px',
    width: '85px',
    border: '0px',
    zIndex: '2',
  },
  title: {
    color: '#007FC6',
    fontSize: '25px',
    fontWeight: '500',
    letterSpacing: '1px',
    fontFamily: 'Raleway',
  },
  btnGroup: {
    display: 'flex',
    gap: '13px',
  },
  divider: {
    position: 'relative',
    bottom: '13px',
    zIndex: '1',
    borderColor: '#686F7F',
    height: '3px',
    backgroundColor: '#686F7F',
  },
});
