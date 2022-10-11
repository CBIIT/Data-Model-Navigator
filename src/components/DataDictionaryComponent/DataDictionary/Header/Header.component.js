import React, { useEffect, useState } from 'react';
import {
    Button,
  withStyles,
} from '@material-ui/core';
import styles from './Header.style';
import CustomTheme from './Header.theme.config';
import ReadMeComponent from '../../ReadMe/ReadMe.controller';

const HeaderComponent = ({
  classes,
}) => {
  
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const displayReadMeHandler = () => {
    setDisplayReadMe(!displayReadMe);
  }

  return (
    <div>
      <CustomTheme>
        <div>
            <Button color="primary" onClick={displayReadMeHandler}>
                ReadMe
            </Button>
        </div>
      </CustomTheme>
      <ReadMeComponent
        display={displayReadMe}
        displayReadMeDialog={displayReadMeHandler}
      />
    </div>
  );
}

export default withStyles(styles)(HeaderComponent);