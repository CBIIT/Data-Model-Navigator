import React, { useState } from 'react';
import {
  Button,
  withStyles,
} from '@material-ui/core';
import { createFileName } from '../../utils';
import { sortByCategory, category2NodeList } from '../utils/download-helper-functions';
import styles from './Header.style';
import CustomTheme from './Header.theme.config';
import ReadMeComponent from '../../ReadMe/ReadMe.controller';
import DownloadButton from '../NodePDF/DownloadButton';

const HeaderComponent = ({
  pdfDownloadConfig, dictionary,
}) => {
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const categoryToNodeList = category2NodeList(dictionary);
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
          <DownloadButton
            config={{ ...pdfDownloadConfig, type: 'document' }}
            documentData={sortByCategory(categoryToNodeList, dictionary)}
            fileName={createFileName('', pdfDownloadConfig.prefix)}
          />
        </div>
      </CustomTheme>
      <ReadMeComponent
        display={displayReadMe}
        displayReadMeDialog={displayReadMeHandler}
      />
    </div>
  );
};

export default withStyles(styles)(HeaderComponent);
