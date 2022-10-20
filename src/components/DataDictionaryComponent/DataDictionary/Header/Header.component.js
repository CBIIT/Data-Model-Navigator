import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Button,
  withStyles,
} from '@material-ui/core';
import styles from './Header.style';
import CustomTheme from './Header.theme.config';
import ReadMeComponent from '../../ReadMe/ReadMe.controller';
import DownloadDropdownMenu from './components/download-dropdown-menu';

const HeaderComponent = ({
  pdfDownloadConfig, dictionary,
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
    <div>
      <CustomTheme>
        <div>
          <Button color="primary" onClick={displayReadMeHandler}>
            ReadMe
          </Button>
          {/* <DownloadButton
            config={{ ...pdfDownloadConfig, type: 'document' }}
            documentData={sortByCategory(categoryToNodeList, dictionary)}
            fileName={createFileName('', pdfDownloadConfig.prefix)}
          /> */}
          <DownloadDropdownMenu
            config={{ ...pdfDownloadConfig, type: 'document' }}
            documentData={dictionary}
            fileName="test"
            readMeContent={content}
            readMeConfig={config}
          />
        </div>
      </CustomTheme>
      <ReadMeComponent
        content={content}
        config={config}
        display={displayReadMe}
        displayReadMeDialog={displayReadMeHandler}
      />
    </div>
  );
};

export default withStyles(styles)(HeaderComponent);
