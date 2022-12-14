import backgroundImg from '../../assets/Model_View.png';
export default () => ({
  container: {
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '0px',
    paddingRight: '0px',
    width: '100%',
  },
  viewGraphContainer: {
    height: '90%',
    marginTop: '30px',
    marginLeft: '36px',
    marginRight: '36px',
    marginBottom: '36px',
    backgroundImage: `url(${backgroundImg})`,
    borderRadius: '5px',
  },
  viewTableContainer: {
    height: '90%',
    marginTop: '30px',
    marginLeft: '36px',
    marginRight: '36px',
    marginBottom: '36px',
    // backgroundImage: `url(${backgroundImg})`,
    borderRadius: '5px',
    overflowY: 'scroll',
  },
  tabPrimaryColor: {
    fontWeight: '700',
    fontSize: '18px',
    opacity: '1',
    color: '#83a3b5',
    fontWeight: '500',
    fontSize: '18px',
    opacity: '1',
    fontFamily: 'Lato',
  },
  tabHighlightColor: {
    color: '#6d9eba',
    fontWeight: 'bold',
    fontSize: '18px',
    fontFamily: 'Lato',
  },
  hrLine: {
    // marginTop: '-5px',
    // marginBottom: '0',
    // borderTop: '5px solid #81a6b9',
    boxShadow: '-0.01em 0 .4em #c4c4c4',
    borderBottom: '0.1em #4c4c4',
    marginTop: '-3px',
    height: '0px',
  },
  tabs: {
    paddingLeft: '10%',
  },
  tabItems: {
    boxShadow: 'inset 1px -11px 10px -7px rgb(50 50 50 / 25%)',
    // borderBottom: '0.1em #c4c4c4',
  },
  graphView: {
    overflow: 'hidden',
    height: '100%',
    position: 'relative',
  },
  tableView: {
    // padding: '20px',
  },
  tableViewTabPanel: {
    overflow: 'scroll',
  }
});