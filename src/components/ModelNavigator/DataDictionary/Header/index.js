import { connect } from 'react-redux';
import HeaderComponent from './Header.component';

const ReduxDataDictionaryHeader = (() => {
  const mapStateToProps = (state) => {
    return ({
      dictionary: state.submission.dictionary,
      fullDictionary: state.submission.unfilteredDictionary,
    });
  };

  return connect(mapStateToProps)(HeaderComponent);
})();

export default ReduxDataDictionaryHeader;
