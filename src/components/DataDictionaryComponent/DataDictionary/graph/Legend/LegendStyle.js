export default () => ({
  legend: {
    position: 'absolute',
    padding: '15px',
    right: '15px',
    top: '15px',
    backgroundColor: 'rgb(170, 154, 154)',
    maxWidth: '300px',
    minWidth: '200px',
    zIndex: '1',
    border: '1px solid var(--g3-color__silver)',
  },
  collapse: {
    backgroundColor: 'unset',
    minWidth: 'unset',
    padding: '0',
    border: 'none',
  },
  category: {
    lineHeight: '20px',
    verticalAlign: 'middle',
    marginBottom: '15px',
    display: 'flex',
  },
  circleWrapper: {
    display: 'block',
    height: '20px',
  },
  circle: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
  },
  text: {
    marginLeft: '15px',
    wordBreak: 'break-all',
    display: 'block',
  },
  item: {
    lineHeight: '20px',
    verticalAlign: 'middle',
    marginBottom: '15px',
    display: 'flex',
  }
});
