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
import ReactMarkdown from 'react-markdown'
import styles from './ReadMe.style';
import CustomTheme from './ReadMe.theme.config';

const ReadMeDialogComponent = ({
  classes,
  display,
  displayReadMeDialog,
  content,
}) => {

  const downladFile = () => {
    console.log('download pdf');
  }

  return (
    <CustomTheme>
      <Dialog
      open={display}
      onClose={displayReadMeDialog}
      maxWidth="md"
      className={classes.dialogBox}
      BackdropProps={{
        timeout: 500,
      }}
      BackdropComponent={Backdrop}
      >
       <div className={classes.titleContent}>
          <div className={classes.title}>
            <span>
              Understanding the ICDC Data Model
            </span>
          </div>
          <div item xs={1} className={classes.closeBtn}>
            <Button
              className={classes.downloadBtn}
              startIcon={<ArrowDownward className={classes.downloadIcon} id="download_arrow_all" />}
              onClick={downladFile}
            />
            <IconButton
              onClick={displayReadMeDialog}
            >
              <CloseIcon
                fontSize="small"
                className={classes.closeBtn}
              />
            </IconButton>
          </div>
        </div>
        <div className={classes.content}>
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>
      </Dialog>
    </CustomTheme>
  );
}

export default withStyles(styles)(ReadMeDialogComponent);
