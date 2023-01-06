import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Button,
  withStyles,
} from '@material-ui/core';
import styles from './Header.style';
import CustomTheme from './Header.theme.config';
import ReadMeComponent from '../ReadMe/ReadMe.controller';
import DownloadDropdownMenu from './components/download-dropdown-menu';

const dogIconSrc = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/4a3fb8e201e6ba2a858d7ec1226d2fd6ea2b5298/icdc/images/svgs/Icon-DMNav.85x85.svg';
const HeaderComponent = ({
  pdfDownloadConfig, dictionary, fullDictionary, classes,
}) => {
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const [content, setContent] = useState(undefined);

  const config = useSelector((state) => (state.submission && state.submission.readMeConfig
    ? state.submission.readMeConfig : undefined));

  useEffect(() => {
    if (config) {
      axios.get(config.readMeUrl).then((response) => response).then((resp) => {
        if (resp.data) {
          setContent(resp.data);
        }
      });
    }
  }, []);

  const displayReadMeHandler = () => {
    setDisplayReadMe(!displayReadMe);
  };

  return (
    <>
      <CustomTheme>
        <div
          className={classes.titleContainer}
        >
          <div
            className={classes.logoAndTitle}
          >
            <img
              className={classes.dogIcon}
              alt="dog-icon"
              src={dogIconSrc}
            />
            <h2
              className={classes.title}
            >
              Data Model Navigator

            </h2>
          </div>

          <div
            className={classes.btnGroup}
          >
            <Button
              classes={{
                root: classes.readMeBtnRoot,
                label: classes.readMeBtnLabel,
              }}
              variant="contained"
              color="primary"
              onClick={displayReadMeHandler}
              endIcon={(
                <img
                  style={{
                    height: '20px',
                    width: '20px',
                  }}
                  alt="readme btn icon"
                  src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_readme_title-bar_icon.svg"
                />
)}
            >
              Read Me
            </Button>

            <DownloadDropdownMenu
              config={{ ...pdfDownloadConfig, type: 'document' }}
              filteredDictionary={dictionary}
              fullDictionary={fullDictionary}
              readMeContent={content}
              readMeConfig={config}
            />
          </div>
          <ReadMeComponent
            content={content}
            config={config}
            display={displayReadMe}
            displayReadMeDialog={displayReadMeHandler}
          />
        </div>
        <hr className={classes.divider} />
      </CustomTheme>
    </>

  );
};

export default withStyles(styles)(HeaderComponent);
