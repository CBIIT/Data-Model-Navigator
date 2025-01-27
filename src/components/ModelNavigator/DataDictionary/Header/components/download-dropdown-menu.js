import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Collapse,
  List,
  ListItemIcon,
  withStyles,
} from '@material-ui/core';
import { compose } from "redux";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { pdf } from '@react-pdf/renderer';
import LandscapePDFDoc from '../../LandscapeNodePDF/Pdf';
import PdfDocument from '../../NodePDF/Pdf';
import { category2NodeList, sortByCategory } from '../../Utils/download-helper-functions';
import { downloadMarkdownPdf } from '../../ReadMe/ReadMe.component';
import {
  convertToTSV, createFileName, generateFileManifest, generateVocabFullDownload, isFileManifest,
  generateLoadingExample,
  downloadLoadingExample,
  generateNodeTSV,
  generateNodeJSON,
  getDictionaryFilename
} from '../../utils';
import { cloneDeep } from 'lodash';
import GenericDownloadIconDark from "../../Table/icons/icon_download_dark.svg";

const {
  FILE_TYPE_FULL_DICTIONARY,
  FILE_TYPE_REQUIRED_DICTIONARY,
  FILE_TYPE_FULL_DICTIONARY_TSV,
  FILE_TYPE_REQUIRED_DICTIONARY_TSV,
  FILE_TYPE_FULL_DICTIONARY_JSON,
  FILE_TYPE_REQUIRED_DICTIONARY_JSON,
  FILE_TYPE_README,
  FILE_TYPE_TEMPLATES,
  FILE_TYPE_CONTROLLED_VOCAB_TSV,
  FILE_TYPE_CONTROLLED_VOCAB_JSON,
  FILE_TYPE_LOADING_EXAMPLE,
} = {
  FILE_TYPE_FULL_DICTIONARY: 'Data Dictionary (PDF)',
  FILE_TYPE_REQUIRED_DICTIONARY: 'Data Dictionary (PDF) (Required)',
  FILE_TYPE_FULL_DICTIONARY_TSV: 'Data Dictionary (TSV)',
  FILE_TYPE_REQUIRED_DICTIONARY_TSV: 'Data Dictionary (TSV) (Required)',
  FILE_TYPE_FULL_DICTIONARY_JSON: 'Data Dictionary (JSON)',
  FILE_TYPE_REQUIRED_DICTIONARY_JSON: 'Data Dictionary (JSON) (Required)',
  FILE_TYPE_README: 'Data Model README (PDF)',
  FILE_TYPE_TEMPLATES: 'Submission Templates (TSV)',
  FILE_TYPE_CONTROLLED_VOCAB_TSV: 'All Vocabularies (TSV)',
  FILE_TYPE_CONTROLLED_VOCAB_JSON: 'All Vocabularies (JSON)',
  FILE_TYPE_LOADING_EXAMPLE: 'Example Templates'
}

const FILE_TYPES = [
  FILE_TYPE_README,
  // FILE_TYPE_FULL_DICTIONARY,
  // FILE_TYPE_REQUIRED_DICTIONARY,
  // FILE_TYPE_FULL_DICTIONARY_TSV,
  // FILE_TYPE_REQUIRED_DICTIONARY_TSV,
  // FILE_TYPE_FULL_DICTIONARY_JSON,
  // FILE_TYPE_REQUIRED_DICTIONARY_JSON,
  FILE_TYPE_TEMPLATES,
  FILE_TYPE_CONTROLLED_VOCAB_TSV,
  FILE_TYPE_CONTROLLED_VOCAB_JSON,
  FILE_TYPE_LOADING_EXAMPLE,
];

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #0A4A6D',
    width: '257px',
    borderRadius: "8px",
    marginLeft: "-10px",
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
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));

const StyledListItemIcon = withStyles({
  root: {
    color: "#0A4A6D",
    minWidth: "28px",
    paddingLeft: "4px",
  }
})(ListItemIcon);

const StyledMenuItem = withStyles({
  root: {
    padding: "10px",
  },
})(MenuItem);

const StyledListItemText = withStyles({
  root: {
    padding: "10px",
    paddingLeft: "6px",
  },
  primary: {
    fontFamily: "Nunito",
    fontSize: "16px",
    fontWeight: 500,
    color: "#0A4A6D",
    lineHeight: 0,
  },
})(ListItemText);

const generatePdfDocument = async (object, config, setLoading, fileName, pdfDownloadConfig, onlyRequired) => {
  let fullDictionary = cloneDeep(object);
  fullDictionary.forEach((node) => {
    for (let key in node.properties) {
      if (onlyRequired && !node?.required?.includes(key)) {
        delete node.properties[key];
      }
    }
  })
  fullDictionary = fullDictionary.filter((node) => Object.keys(node.properties).length > 0);

  const document = (config.type === 'document') ? fullDictionary : [fullDictionary];
  const blob = await pdf((
    config.landscape ? <LandscapePDFDoc nodes={document} pdfDownloadConfig={pdfDownloadConfig} icon={config.catagoryIcon} /> : <PdfDocument nodes={document} />
  )).toBlob();
  setLoading(false);
  saveAs(blob, `${fileName}.pdf`);
};

const getMenuItem = (type, onClick) => (
  <StyledMenuItem key={type} onClick={onClick}>
    <StyledListItemText primary={type} />
  </StyledMenuItem>
);

const DownloadFileTypeBtn = ({
  classes,
  config,
  filteredDictionary,
  readMeContent,
  readMeConfig,
  fullDictionary,
  loadingExampleConfig,
  modelVersion
}) => {
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [toggledMenus, setToggledMenus] = React.useState([]);

  const fullDictionaryC2nl = category2NodeList(fullDictionary);
  const processedFullDictionary = sortByCategory(fullDictionaryC2nl, fullDictionary);
  const pdfDownloadConfig = useSelector(state => state.ddgraph && state.ddgraph.pdfDownloadConfig);

  const clickHandler = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorElement(null);
    setToggledMenus([]);
  };

  const handleMenuClick = (name) => {
    if (toggledMenus.includes(name)) {
      setToggledMenus(toggledMenus.filter(menu => menu !== name));
    } else {
      setToggledMenus([...toggledMenus, name]);
    }
  };

  const downloadFullDictionaryPdf = (pdfDownloadConfig, onlyRequired) => {
    const fileName = getDictionaryFilename(config?.prefix, null, onlyRequired, modelVersion);
    setLoading(true);
    setTimeout(() => {
      generatePdfDocument(processedFullDictionary, config, setLoading, fileName, pdfDownloadConfig, onlyRequired);
    }, 50);
  };

  const downloadAllTemplates = (prefix = "ICDC_", fileTransferManifestName = "") => {
    const fullDictionaryTemplates = Object.fromEntries(Object.entries(fullDictionary).filter(([_key, value]) => value.template === 'Yes'));
    const nodesValueArray = Object.values(fullDictionaryTemplates);
    const nodesKeyArray = Object.keys(fullDictionaryTemplates);
    const nodesTSV = nodesValueArray.map(
      (elem) => (isFileManifest(elem) ? {
        type: 'file-manifest',
        content: generateFileManifest(elem),
      } : {
        type: 'template',
        content: convertToTSV(elem),
      }
      ),
    );

    const zip = new JSZip();

    nodesTSV.forEach((nodeTSV, index) => {
      zip.file(`${createFileName(nodesKeyArray[index], prefix, modelVersion, true)}.tsv`, nodeTSV.content);
    });

    zip.generateAsync({ type: 'blob' }).then((thisContent) => {
      saveAs(thisContent, `${createFileName('', prefix + 'Data_Loading_Templates', modelVersion)}.zip`);
    });
  };

  const downloadAllJSON = (onlyRequired) => {
    const nodeJson = {};
    Object.keys(fullDictionary).forEach((nodeName) => {
      const node = fullDictionary[nodeName];
      nodeJson[nodeName] = generateNodeJSON(node, onlyRequired);
    });

    const exportData = new Blob([JSON.stringify(nodeJson, null, 2)], { type: 'data:application/json' });
    const fileName = getDictionaryFilename(config?.prefix, null, onlyRequired, modelVersion);
    saveAs(exportData, `${fileName}.json`);
  };

  const downloadFullDictionaryTSV = (onlyRequired) => {
    let tsv = "";

    Object.keys(fullDictionary).forEach((nodeName, index) => {
      const node = fullDictionary[nodeName];
      tsv += generateNodeTSV(node, index === 0, onlyRequired);
    });

    const exportData = new Blob([tsv], { type: 'data:text/tab-separated-values' });
    const fileName = getDictionaryFilename(config?.prefix, null, onlyRequired, modelVersion);
    saveAs(exportData, `${fileName}.tsv`);
  };

  const handleDownloadClick = (label) => {
    setAnchorElement(null);
    setToggledMenus([]);

    switch (label) {
      case FILE_TYPE_FULL_DICTIONARY:
        return downloadFullDictionaryPdf(pdfDownloadConfig);
      case FILE_TYPE_REQUIRED_DICTIONARY:
        return downloadFullDictionaryPdf(pdfDownloadConfig, true);
      case FILE_TYPE_FULL_DICTIONARY_TSV:
        return downloadFullDictionaryTSV(false);
      case FILE_TYPE_REQUIRED_DICTIONARY_TSV:
        return downloadFullDictionaryTSV(true);
      case FILE_TYPE_FULL_DICTIONARY_JSON:
        return downloadAllJSON(false);
      case FILE_TYPE_REQUIRED_DICTIONARY_JSON:
        return downloadAllJSON(true);
      case FILE_TYPE_README:
        return downloadMarkdownPdf(readMeConfig.readMeTitle, readMeContent, config?.iconSrc, config?.downloadPrefix, config?.footnote);
      case FILE_TYPE_TEMPLATES:
        return downloadAllTemplates(config?.downloadPrefix, config?.fileTransferManifestName);
      case FILE_TYPE_CONTROLLED_VOCAB_TSV:
        return generateVocabFullDownload(fullDictionary, 'TSV', config?.downloadPrefix);
      case FILE_TYPE_CONTROLLED_VOCAB_JSON:
        return generateVocabFullDownload(fullDictionary, 'JSON', config?.downloadPrefix);
      case FILE_TYPE_LOADING_EXAMPLE:
        return loadingExampleConfig?.type === "static"
          ? downloadLoadingExample(loadingExampleConfig?.url)
          : generateLoadingExample(loadingExampleConfig?.url);
      default:
        return null;
    }
  };

  const options = useMemo(() => {
    return FILE_TYPES
      .filter((item) => {
        if (item === FILE_TYPE_README && typeof (readMeConfig?.readMeUrl) !== "string") {
          return false;
        }
        if (item === FILE_TYPE_README && typeof (readMeConfig?.allowDownload) === "boolean") {
          return readMeConfig?.allowDownload;
        }

        return true;
      })
      .map((item) => getMenuItem(item, () => handleDownloadClick(item)));
  }, [FILE_TYPES, readMeConfig]);

  return (
    <>
      <Button
        classes={{
          root: classes.downloadButton,
          label: classes.downloadButtonLabel,
        }}
        startIcon={<img src={GenericDownloadIconDark} className={classes.startIcon} alt="Download" />}
        endIcon={Boolean(anchorElement) ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        onClick={clickHandler}
        disableRipple
        disableElevation
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Available Downloads"}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={closeHandler}
      >
        {/* Data Dictionary Items */}
        <StyledMenuItem onClick={() => handleMenuClick("data_dictionary")}>
          <StyledListItemIcon>
            {toggledMenus.includes("data_dictionary") ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </StyledListItemIcon>
          <StyledListItemText primary="Data Dictionary" />
        </StyledMenuItem>
        <Collapse in={toggledMenus.includes("data_dictionary")} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledMenuItem onClick={() => handleMenuClick("all_dictionary")}>
              <div className={classes.indent} />
              <StyledListItemIcon>
                {toggledMenus.includes("all_dictionary") ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </StyledListItemIcon>
              <StyledListItemText primary="All Properties" />
            </StyledMenuItem>
            <Collapse in={toggledMenus.includes("all_dictionary")} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_FULL_DICTIONARY)}>
                  <div className={classes.doubleIndent} />
                  <StyledListItemText primary="PDF" />
                </StyledMenuItem>
                <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_FULL_DICTIONARY_JSON)}>
                  <div className={classes.doubleIndent} />
                  <StyledListItemText primary="JSON" />
                </StyledMenuItem>
                <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_FULL_DICTIONARY_TSV)}>
                  <div className={classes.doubleIndent} />
                  <StyledListItemText primary="TSV" />
                </StyledMenuItem>
              </List>
            </Collapse>
            <StyledMenuItem onClick={() => handleMenuClick("required_dictionary")}>
              <div className={classes.indent} />
              <StyledListItemIcon>
                {toggledMenus.includes("required_dictionary") ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </StyledListItemIcon>
              <StyledListItemText primary="Required Properties" />
            </StyledMenuItem>
            <Collapse in={toggledMenus.includes("required_dictionary")} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_REQUIRED_DICTIONARY)}>
                  <div className={classes.doubleIndent} />
                  <StyledListItemText primary="PDF" />
                </StyledMenuItem>
                <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_REQUIRED_DICTIONARY_JSON)}>
                  <div className={classes.doubleIndent} />
                  <StyledListItemText primary="JSON" />
                </StyledMenuItem>
                <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_REQUIRED_DICTIONARY_TSV)}>
                  <div className={classes.doubleIndent} />
                  <StyledListItemText primary="TSV" />
                </StyledMenuItem>
              </List>
            </Collapse>
          </List>
        </Collapse>
        {/* Standard items */}
        {options}
      </StyledMenu>
    </>
  );
};

const styles = () => ({
  startIcon: {
    width: '20px',
  },
  downloadButton: {
    border: "1px solid #004A80",
    borderRadius: "8px",
    padding: "5px 10px",
  },
  downloadButtonLabel: {
    fontFamily: "Nunito",
    fontSize: '16px',
    textTransform: 'none',
    color: '#004A80',
    padding: "0 5px",
  },
  indent: {
    width: "25px",
    height: "1px",
    background: "transparent",
  },
  doubleIndent: {
    width: "60px",
    height: "1px",
    background: "transparent",
  },
});

const mapStateToProps = (state) => {
  return {
    modelVersion: state.versionInfo.modelVersion
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true })
)(DownloadFileTypeBtn);


