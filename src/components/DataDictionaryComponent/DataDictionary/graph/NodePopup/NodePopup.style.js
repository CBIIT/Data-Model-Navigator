export default () => ({
  popup: {
    position: 'absolute',
  },
  wrapper: {
    position: 'relative',
    backgroundColor: '#f0f0f0',
    verticalAlign: 'middle',
    textAlign: 'center',
    padding: '10px 0',
    left: '-112px', /* tooltipWidth / 2 */
    width: '220px', /* tooltipWidth = 240 */
    top: '12px',
    border: '2px solid #6060608f',
    borderRadius: '8px',
  },
  arrow: {
    width: '0',
    height: '0',
    position: 'absolute',
    top: '-11px',
    left: 'calc(50% - 10px)',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '9px solid #6060608f', /* gap = 10px */
  },
  arrowInner: {
    top: '-9px',
    borderBottom: '10px solid #f0f0f0',
  },
  content: {
    position: 'relative',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '1.6em',
    letterSpacing: '.02rem',
    textAlign: 'unset',
  },
  list: {
    listStyle: 'none',
    marginBottom: '0',
    paddingLeft: '20px',
  },
  listItem: {
    textAlign: 'left',
    marginLeft: '15px',
    fontSize: '12px',
    lineHeight: '18px',
    color: '#0077c1',
  },
  nodeTitle: {
    textAlign: 'left',
    marginLeft: '15px',
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: '600',
    marginBottom: '5px',
    color: 'var(--g3-color__black)',
  },
  listItemLabel: {
    fontWeight: '600',
    color: '#6c6c6c',
  },
  button: {
    width: '165px',
    fontSize: '11px',
    height: '35px',
    backgroundColor: '#2f9acf',
    color: 'var(--g3-color__white)',
    margin: '10px auto auto auto',
    padding: '12px 23px 12px 15px',
    border: '2px solid #2982af',
    borderRadius: '10px',
    fontWeight: '100',
  },
  close: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    width: '12px',
    height: '12px',
    backgroundColor: 'var(--g3-color__gray)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'var(--g3-color__lightgray)',
    },
  },
});
