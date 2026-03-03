import React from 'react';
import { saveAs } from 'file-saver';
import {
  Button,
  withStyles,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import GenericDownloadIcon from "../../icons/icon_download_TSV.svg";
import { convertToTSV, generateFileManifest } from '../../../utils';

const DownloadButton = ({
  classes,
  documentData,
  fileName,
  isFileManifest = false,
}) => {
  const theme = createTheme({
    overrides: {
      MuiButton: {
        root: {
          minWidth: '35px',
          paddingRight: '10px',
          '&:hover': {
            backgroundColor: 'none',
          },
        },
      },
    },
  });

  const download = () => {
    const tsv = isFileManifest ? generateFileManifest(documentData) : convertToTSV(documentData);
    const exportData = new Blob([tsv], { type: 'data:text/tab-separated-values' });
    saveAs(exportData, `${fileName}.tsv`);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Button
        type="button"
        disableRipple
        className={classes.button}
        onClick={download}
      >
        <img className={classes.icon} src={GenericDownloadIcon} alt="Download" />
      </Button>
    </MuiThemeProvider>
  );
};

const styles = () => ({
  icon: {
    width: "26px",
    height: "27px",
    display: "block",
  },
  button: {
    background: "#42779A !important",
    padding: "0",
    color: "#fff",
    fontFamily: "Nunito",
    fontSize: "13px",
    fontWeight: 500,
    borderRadius: "6px",
    textTransform: "none",
    minWidth: "32px",
    width: "32px",
    height: "32px",
  }
});

export default withStyles(styles)(DownloadButton);
