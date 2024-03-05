import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Button,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
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
  const pageConfig = useSelector((state) => (state.submission && state.submission.pageConfig ? state.submission.pageConfig : undefined));
  const loadingExampleConfig = useSelector((state) => (state.submission && state.submission.loadingExampleConfig ? state.submission.loadingExampleConfig : undefined));
  const modelVersion = useSelector((state) => state.versionInfo && state.versionInfo.modelVersion ? state.versionInfo.modelVersion : undefined);

  useEffect(() => {
    if (config && config.readMeUrl) {
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
              src={pageConfig?.iconSrc || dogIconSrc}
            />
            <div className={classes.titleAndVersion}>
              <h2
                className={modelVersion ? clsx(classes.title, classes.titleWithVersion) : classes.title}
              >
                {pageConfig?.title || "Data Model Navigator"}
              </h2>
              {modelVersion && (<span className={classes.modelVersion}>Version {modelVersion}</span>)}
            </div>
          </div>

          <div
            className={classes.btnGroup}
          >
            {typeof(config?.readMeUrl) === "string" && (
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
                README
              </Button>
            )}
            <DownloadDropdownMenu
              config={{ ...pdfDownloadConfig, type: 'document' }}
              filteredDictionary={dictionary}
              fullDictionary={fullDictionary}
              readMeContent={content}
              readMeConfig={config}
              loadingExampleConfig={loadingExampleConfig}
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
