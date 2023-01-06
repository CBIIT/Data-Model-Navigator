export default () => ({
  searcher: {
    padding: '15px',
    borderTop: '1px solid var(--g3-color__silver)',
  },
  result: {
    margin: '10px 0',
  },
  resultText: {
    display: 'inline',
  },
  resultItem: {
    marginBottom: '8px',
  },
  resultCount: {
    color: 'var(--g3-color__base-blue)',
  },
  resultClear: {
    color: 'var(--g3-color__base-blue)',
    cursor: 'pointer',
    float: 'right',
    '&:hover': {
      color: 'var(--g3-color__base-blue-light)',
    }
  },
});
