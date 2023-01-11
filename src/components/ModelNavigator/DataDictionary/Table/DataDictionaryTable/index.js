import { connect } from 'react-redux';
import { setExpandNode, setExpandNodes } from '../../Store/actions/graph';
import DataDictionaryTable from './DataDictionaryTable';

const ReduxDataDictionaryTable = (() => {
  const mapStateToProps = (state) => ({
    dictionary: state.submission.dictionary,
    highlightingNodeID: state.ddgraph.tableExpandNodeID,
    dictionaryName: 'Dictionary Utils Viz',
  });

  const mapDispatchToProps = (dispatch) => ({
    onExpandNode: (nodeID, nodeState) => dispatch(setExpandNodes(nodeID, nodeState)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(DataDictionaryTable);
})();

export default ReduxDataDictionaryTable;
