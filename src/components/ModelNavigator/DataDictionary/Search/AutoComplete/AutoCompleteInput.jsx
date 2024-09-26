import React, { Component } from 'react';
import { IconButton, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import './AutoCompleteInput.css';
import styles from './AutoCompleteInputStyle';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from "@material-ui/icons/Search";

class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeIconHidden: true,
    };
    this.inputElem = React.createRef();
  }

  handleChange() {
    const currentInput = this.inputElem.current.value;
    this.props.onInputChange(currentInput);
    this.updateCloseIcon();
  }

  handleClear() {
    this.inputElem.current.value = '';
    this.updateCloseIcon();
    this.props.onInputChange('');
  }

  handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.props.onSubmitInput(this.inputElem.current.value);
  }

  setInputText(text) {
    this.inputElem.current.value = text;
    this.updateCloseIcon();
  }

  updateCloseIcon() {
    const currentInput = this.inputElem.current.value;
    this.setState({
      closeIconHidden: !currentInput || currentInput.length === 0,
    });
  }

  clearInput() {
    this.inputElem.current.value = '';
    this.updateCloseIcon();
  }

  render() {
    const {
      classes,
      placeHolderText,
      icon
    } = this.props;
    return (
      <div className={classes.autoCompleteInput}>
        <form
          className={classes.autoCompleteInputForm}
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <input
            title={this.props.inputTitle}
            className={classes.autoCompleteInputBox}
            onChange={() => { this.handleChange(); }}
            placeholder={placeHolderText}
            ref={this.inputElem}
          />
        </form>
        {
          !this.state.closeIconHidden && (
            <>
              <IconButton
                onClick={() => this.handleClear()}
                disableRipple
                className={classes.closeBtn} 
                aria-label='close icon'
              >
                <CloseIcon
                  className={classes.closeIcon} 
                />
              </IconButton>
              {/* <i
                className='g3-icon g3-icon--cross auto-complete-input__close'
                onClick={() => { this.handleClear(); }}
                role='button'
                aria-label='close'
                tabIndex={0}
              /> */}
              <i className={classes.verticalLine} />
              {/* <i className='auto-complete-input__separator' /> */}
            </>
          )
        }
        <IconButton
          onClick={() => this.handleSubmit()}
          disableRipple
          className={classes.searchBtn}
          aria-label='search-icon'
        >
          <SearchIcon
            className={classes.searchIcon}
          />
        </IconButton>
        
        {/* <i
          className={`g3-icon g3-icon--${icon} auto-complete-input__icon`}
          onClick={() => this.handleSubmit()}
          role='button'
          aria-label='submit'
          tabIndex={0}
        /> */}
      </div>
    );
  }
}

AutoCompleteInput.propTypes = {
  onInputChange: PropTypes.func,
  placeHolderText: PropTypes.string,
  icon: PropTypes.string,
  onSubmitInput: PropTypes.func,
  inputTitle: PropTypes.string,
};

AutoCompleteInput.defaultProps = {
  onInputChange: () => {},
  placeHolderText: 'Search',
  icon: 'search',
  onSubmitInput: () => {},
  inputTitle: 'Search Input',
};

export default withStyles(styles)(AutoCompleteInput);