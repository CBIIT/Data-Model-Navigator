export default () => ({
  searchHistory : {
    padding: '15px',
    borderTop: '1px solid var(--g3-color__silver)',
    fontSize: '14px',
    color: 'var(--g3-color__gray)',
  },
  item : {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: 'var(--g3-color__silver) 1px solid',
    borderLeft: 'var(--g3-color__silver) 1px solid',
    borderRight: 'var(--g3-color__silver) 1px solid',
    cursor: 'pointer',

    '&:first-child': {
      borderTop: 'var(--g3-color__silver) 1px solid',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
    },
    '&:last-child': {
      borderTop: 'var(--g3-color__silver) 1px solid',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
    },
    '&:hover': {
      backgroundColor: 'var(--g3-color__base-blue)',
      color: 'var(--g3-color__white)',
      '& $itemBadge': {
        backgroundColor: 'var(--g3-color__white)',
        color: 'var(--g3-color__base-blue)',
      },
    },
  },
  itemKeyword : {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  itemBadge : {
    backgroundColor: 'var(--g3-color__base-blue)',
    color: 'var(--g3-color__white)',
    padding: '0 8px',
    borderRadius: '4px',
  },
  itemBadgeZero : {
    backgroundColor: 'var(--g3-color__gray)',
  },
  titleText : {
    display: 'inline',
  },
  clear : {
    color: 'var(--g3-color__base-blue)',
    cursor: 'pointer',
    float: 'right',
    '&:hover': {
      color: 'var(--g3-color__base-blue-light)',
    }
  },
});
