import React, { useEffect, useState } from 'react';
import {
    Button,
  withStyles,
} from '@material-ui/core';
import styles from './Header.style';
import CustomTheme from './Header.theme.config';
import ReadMeComponent from '../../ReadMe/ReadMe.component';

const HeaderComponent = ({
  classes,
}) => {
  
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const openReadMeHandler = () => {
    console.log('openReadMeHandler');
    setDisplayReadMe(true);
  };    

  return (
    <div>
      <CustomTheme>
        <div>
            <Button color="primary" onClick={openReadMeHandler}>
                ReadMe
            </Button>
        </div>
      </CustomTheme>
      <ReadMeComponent
        display={displayReadMe}
      />
    </div>
  );
}

export default withStyles(styles)(HeaderComponent);