import React, { useEffect, useState } from 'react';
import {
  DialogContent,
  withStyles,
  IconButton,
  Backdrop,
  Dialog,
  Button,
} from '@material-ui/core';
import { ArrowDownward } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import styles from './ReadMe.style';
import CustomTheme from './ReadMe.theme.config';

const ReadMeDialogComponent = ({
  classes,
  display,
}) => {
  const [open, setOpen] = useState(display);
  useEffect(() => {
    console.log('display true')
    setOpen(display);
  }, [display]);

  const closeHandler = () => {
    console.log('close');
    setOpen(false);
  }

  const downladFile = () => {
    console.log('download files');
  }

  return (
    <CustomTheme>
      <Dialog
      open={open}
      onClose={closeHandler}
      BackdropProps={{
        timeout: 500,
      }}
      BackdropComponent={Backdrop}
      >
       <div className={classes.titleContent}>
          <div item xs={1} className={classes.closeBtn}>
            <Button
              className={classes.downloadBtn}
              startIcon={<ArrowDownward className={classes.downloadIcon} id="download_arrow_all" />}
              onClick={downladFile}
            />
            <IconButton
              onClick={closeHandler}
            >
              <CloseIcon
                fontSize="small" 
              />
            </IconButton>
          </div>
          <div>
            <span className={classes.title}>
              Acceptable Values
            </span>
          </div>
        </div>
      </Dialog>
    </CustomTheme>
  );
}

export default withStyles(styles)(ReadMeDialogComponent);
