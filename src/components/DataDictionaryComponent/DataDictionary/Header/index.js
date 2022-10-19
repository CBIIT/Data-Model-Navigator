import { connect } from 'react-redux';
import HeaderComponent from './Header.component';

const ReduxDataDictionaryHeader = (() => {
  const mapStateToProps = (state) => ({
    dictionary: state.submission.dictionary,
  });

  return connect(mapStateToProps)(HeaderComponent);
})();

export default ReduxDataDictionaryHeader;
