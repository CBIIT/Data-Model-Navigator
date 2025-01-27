import React from 'react';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import {
  Button,
  withStyles,
  createTheme,
  MuiThemeProvider,
  Menu,
  MenuItem,
  ListItemText,
  Collapse,
  List,
  ListItemIcon,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { pdf } from '@react-pdf/renderer';
import { cloneDeep } from 'lodash';
import LandscapePDFDoc from '../../../LandscapeNodePDF/Pdf';
import GenericDownloadIcon from "../../icons/icon_download.svg";
import GenericDownloadIconDark from "../../icons/icon_download_dark.svg";
import { generateNodeJSON, generateNodeTSV, getDictionaryFilename } from '../../../utils';

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

const StyledButton = withStyles({
  root: {
    marginLeft: "8px",
    background: "#0A4A6D !important",
    padding: "8px",
    color: "#fff",
    fontFamily: "Nunito",
    fontSize: "15px",
    fontWeight: 500,
    borderRadius: "6px",
    textTransform: "none",
  },
})(Button);

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #0A4A6D',
    borderRadius: "6px",
    width: "192px",
  },
  list: {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles({
  root: {
    display: 'flex',
    padding: "4px 10px",
    margin: "0",
  },
})(MenuItem);

const StyledListItemIcon = withStyles({
  root: {
    minWidth: "28px",
  }
})(ListItemIcon);

const StyledListItemText = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: "6px",
  },
  primary: {
    fontFamily: "Nunito",
    fontSize: "16px",
    fontWeight: 500,
    color: "#0A4A6D",
    lineHeight: 0,
  },
  secondary: {
    fontFamily: "Nunito",
    fontSize: "14px",
    textTransform: "uppercase",
    fontWeight: 400,
    color: "#0A4A6D",
  },
})(ListItemText);

const DictionaryButton = ({
  classes,
  config,
  documentData,
}) => {
  const modelVersion = useSelector(state => state.versionInfo && state.versionInfo.modelVersion);
  const pdfDownloadConfig = useSelector(state => state.ddgraph && state.ddgraph.pdfDownloadConfig);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [toggledMenus, setToggledMenus] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setToggledMenus([]);
  };

  const handleMenuClick = (name) => {
    if (toggledMenus.includes(name)) {
      setToggledMenus(toggledMenus.filter(menu => menu !== name));
    } else {
      setToggledMenus([...toggledMenus, name]);
    }
  };

  const generatePdfDocument = async (object, onlyRequired, fileName) => {
    const node = cloneDeep(object);
    for (let key in object.properties) {
      if (onlyRequired && !object?.required?.includes(key)) {
        delete node.properties[key];
      }
    }

    const blob = await pdf((<LandscapePDFDoc nodes={[node]} icon={config.catagoryIcon}
      pdfDownloadConfig={pdfDownloadConfig} />
    )).toBlob();
    saveAs(blob, `${fileName}.pdf`)
  };

  const download = (type, onlyRequired) => {
    const fileName = getDictionaryFilename(pdfDownloadConfig.prefix, documentData.title, onlyRequired, modelVersion);
    if (type === 'pdf') {
      generatePdfDocument(documentData, onlyRequired, fileName);
    } else if (type === "tsv") {
      const tsv = generateNodeTSV(documentData, true, onlyRequired);
      const exportData = new Blob([tsv], { type: 'data:text/tab-separated-values' });
      saveAs(exportData, `${fileName}.tsv`);
    } else if (type === "json") {
      const json = generateNodeJSON(documentData, onlyRequired);
      const exportData = new Blob([JSON.stringify(json, null, 2)], { type: 'data:application/json' });
      saveAs(exportData, `${fileName}.json`);
    }
    setToggledMenus([]);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <StyledButton
        type="button"
        aria-controls="dictionary-options-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        disableElevation
      >
        <img className={classes.icon} src={GenericDownloadIcon} alt="Download" />
        Data Dictionary
      </StyledButton>
      <StyledMenu
        id="dictionary-options-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => handleMenuClick("all")}>
          <StyledListItemIcon>
            {toggledMenus.includes("all") ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </StyledListItemIcon>
          <StyledListItemText primary="All Properties" />
        </StyledMenuItem>
        <Collapse in={toggledMenus.includes("all")} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledMenuItem onClick={() => download('pdf', false)}>
              <StyledListItemText primary={<img className={classes.menuIcon} src={GenericDownloadIconDark} alt="Download PDF" />} secondary="PDF" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => download('json', false)}>
              <StyledListItemText primary={<img className={classes.menuIcon} src={GenericDownloadIconDark} alt="Download JSON" />} secondary="JSON" />

            </StyledMenuItem>
            <StyledMenuItem onClick={() => download('tsv', false)}>
              <StyledListItemText primary={<img className={classes.menuIcon} src={GenericDownloadIconDark} alt="Download TSV" />} secondary="TSV" />
            </StyledMenuItem>
          </List>
        </Collapse>
        <StyledMenuItem onClick={() => handleMenuClick("required")}>
          <StyledListItemIcon>
            {toggledMenus.includes("required") ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </StyledListItemIcon>
          <StyledListItemText primary="Required Properties" />
        </StyledMenuItem>
        <Collapse in={toggledMenus.includes("required")} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledMenuItem onClick={() => download('pdf', true)}>
              <StyledListItemText primary={<img className={classes.menuIcon} src={GenericDownloadIconDark} alt="Download PDF" />} secondary="PDF" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => download('json', true)}>
              <StyledListItemText primary={<img className={classes.menuIcon} src={GenericDownloadIconDark} alt="Download JSON" />} secondary="JSON" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => download('tsv', true)}>
              <StyledListItemText primary={<img className={classes.menuIcon} src={GenericDownloadIconDark} alt="Download TSV" />} secondary="TSV" />
            </StyledMenuItem>
          </List>
        </Collapse>
      </StyledMenu>
    </MuiThemeProvider>
  );
};

const styles = () => ({
  icon: {
    width: "24px",
    paddingRight: "7px",
  },
  menuIcon: {
    width: "24px",
    color: "#0A4A6D",
    paddingLeft: "28px",
  }
});

export default withStyles(styles)(DictionaryButton);
