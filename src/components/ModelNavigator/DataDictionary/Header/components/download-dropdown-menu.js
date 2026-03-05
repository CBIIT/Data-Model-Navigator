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
import TemplatesDownloadDialog from './TemplatesDownloadDialog';

const {
  FILE_TYPE_FULL_DICTIONARY,
  FILE_TYPE_REQUIRED_DICTIONARY,
  FILE_TYPE_FULL_DICTIONARY_TSV,
  FILE_TYPE_REQUIRED_DICTIONARY_TSV,
  FILE_TYPE_FULL_DICTIONARY_JSON,
  FILE_TYPE_REQUIRED_DICTIONARY_JSON,
  FILE_TYPE_README,
  FILE_TYPE_CONTROLLED_VOCAB_TSV,
  FILE_TYPE_CONTROLLED_VOCAB_JSON,
  FILE_TYPE_LOADING_EXAMPLE,
} = {
  FILE_TYPE_FULL_DICTIONARY: { label: 'Data Dictionary', type: "(PDF)" },
  FILE_TYPE_REQUIRED_DICTIONARY: { label: 'Data Dictionary (Required)', type: "(PDF)" },
  FILE_TYPE_FULL_DICTIONARY_TSV: { label: 'Data Dictionary', type: "(TSV)" },
  FILE_TYPE_REQUIRED_DICTIONARY_TSV: { label: 'Data Dictionary (Required)', type: "(TSV)" },
  FILE_TYPE_FULL_DICTIONARY_JSON: { label: 'Data Dictionary', type: "(JSON)" },
  FILE_TYPE_REQUIRED_DICTIONARY_JSON: { label: 'Data Dictionary (Required)', type: "(JSON)" },
  FILE_TYPE_README: { label: 'Data Model README', type: "(PDF)" },
  FILE_TYPE_CONTROLLED_VOCAB_TSV: { label: 'All Vocabularies', type: "(TSV)" },
  FILE_TYPE_CONTROLLED_VOCAB_JSON: { label: 'All Vocabularies', type: "(JSON)" },
  FILE_TYPE_LOADING_EXAMPLE: { label: 'Example Templates', type: "" },
}

const FILE_TYPES = [
  FILE_TYPE_README,
  // FILE_TYPE_FULL_DICTIONARY,
  // FILE_TYPE_REQUIRED_DICTIONARY,
  // FILE_TYPE_FULL_DICTIONARY_TSV,
  // FILE_TYPE_REQUIRED_DICTIONARY_TSV,
  // FILE_TYPE_FULL_DICTIONARY_JSON,
  // FILE_TYPE_REQUIRED_DICTIONARY_JSON,
  FILE_TYPE_CONTROLLED_VOCAB_TSV,
  FILE_TYPE_CONTROLLED_VOCAB_JSON,
  FILE_TYPE_LOADING_EXAMPLE,
];

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #0A4A6D',
    width: '233px',
    borderRadius: "0 0 8px 8px",
    marginLeft: "0px",
    marginTop: "-1px",
    backgroundColor: '#3C597C',
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
    color: "#FFFFFF",
    minWidth: "28px",
    justifyContent: "flex-end",
  }
})(ListItemIcon);

const StyledMenuItem = withStyles({
  root: {
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
})(MenuItem);

const StyledListItemText = withStyles({
  root: {
    padding: "0",
    display: 'flex',
    alignItems: 'center',
    gap: "6px",
    flex: 1,
  },
  primary: {
    fontFamily: "Lato",
    fontSize: "15px",
    fontWeight: 400,
    color: "#FFFFFF",
    lineHeight: '15px',
    letterSpacing: '0%',
    verticalAlign: 'middle',
  },
  secondary: {
    fontFamily: "Lato",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: '15px',
    letterSpacing: '0%',
    verticalAlign: 'middle',
  }
})(ListItemText);

const generatePdfDocument = async (object, config, setLoading, fileName, pdfDownloadConfig, onlyRequired, iconMapInfo) => {
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
    config.landscape ? <LandscapePDFDoc nodes={document} pdfDownloadConfig={pdfDownloadConfig} icon={config.catagoryIcon} iconMapInfo={iconMapInfo} /> : <PdfDocument nodes={document} />
  )).toBlob();
  setLoading(false);
  saveAs(blob, `${fileName}.pdf`);
};

const getMenuItem = (item, onClick) => (
  <StyledMenuItem key={`${item.label}_${item.type}`} onClick={onClick}>
    <StyledListItemText primary={item.label} secondary={item?.type} />
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
  const [openSubmissionTemplatesDialog, setOpenSubmissionTemplatesDialog] = React.useState(false);

  const fullDictionaryC2nl = category2NodeList(fullDictionary);
  const processedFullDictionary = sortByCategory(fullDictionaryC2nl, fullDictionary);
  const pdfDownloadConfig = useSelector(state => state.ddgraph && state.ddgraph.pdfDownloadConfig);
  const iconMapInfo = useSelector(state => state.iconMapInfo && state.iconMapInfo);

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
      generatePdfDocument(processedFullDictionary, config, setLoading, fileName, pdfDownloadConfig, onlyRequired, iconMapInfo);
    }, 50);
  };

 const templateEntries = React.useMemo(() => {
    return Object.entries(fullDictionary || {}).filter(([_, value]) => value?.template === 'Yes');
  }, [fullDictionary]);

  const downloadAllTemplates = (prefix = "ICDC_", fileTransferManifestName = "") => {
    const allKeys = templateEntries?.map(([key]) => key) || [];
    downloadSelectedTemplates(allKeys, prefix, fileTransferManifestName);
  }

  const downloadSelectedTemplates = (selectedKeys = [], prefix = "ICDC_", fileTransferManifestName = "") => {
    const fullDictionaryTemplates = Object.fromEntries(templateEntries);
    const selectedMap = Object.fromEntries(
      Object.entries(fullDictionaryTemplates).filter(([k]) => selectedKeys.includes(k))
    );

    const nodesValueArray = Object.values(selectedMap);
    const nodesKeyArray = Object.keys(selectedMap);
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
    closeHandler();

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

  const openTemplatesDialog = () => {
    setAnchorElement(null);
    setToggledMenus([]);
    setOpenSubmissionTemplatesDialog(true);
  };

  const handleTemplatesDownload = (selectedKeys) => {
    const prefixArg = config?.downloadPrefix || 'ICDC_';
    downloadSelectedTemplates(selectedKeys, prefixArg, config?.fileTransferManifestName);
    setOpenSubmissionTemplatesDialog(false);
  };

  const handleTemplatesClose = () => {
    setOpenSubmissionTemplatesDialog(false);
  };

  return (
    <>
      <Button
        classes={{
          root: classes.downloadButton,
          label: classes.downloadButtonLabel,
        }}
        style={Boolean(anchorElement) ? { borderRadius: '8px 8px 0 0' } : {}}
        endIcon={!Boolean(anchorElement) ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
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
        open={Boolean(anchorElement)}
        onClose={closeHandler}
      >
        {/* Data Dictionary Items */}
        <StyledMenuItem onClick={() => handleMenuClick("data_dictionary")}>
          <StyledListItemText primary="Data Dictionary" />
          <StyledListItemIcon>
            {!toggledMenus.includes("data_dictionary") ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </StyledListItemIcon>
        </StyledMenuItem>
        <Collapse in={toggledMenus.includes("data_dictionary")} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_FULL_DICTIONARY)}>
              <div className={classes.indent} />
              <StyledListItemText primary="All Properties" secondary="(PDF)" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_FULL_DICTIONARY_JSON)}>
              <div className={classes.indent} />
              <StyledListItemText primary="All Properties" secondary="(JSON)" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_FULL_DICTIONARY_TSV)}>
              <div className={classes.indent} />
              <StyledListItemText primary="All Properties" secondary="(TSV)" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_REQUIRED_DICTIONARY)}>
              <div className={classes.indent} />
              <StyledListItemText primary="Required Properties" secondary="(PDF)" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_REQUIRED_DICTIONARY_JSON)}>
              <div className={classes.indent} />
              <StyledListItemText primary="Required Properties" secondary="(JSON)" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleDownloadClick(FILE_TYPE_REQUIRED_DICTIONARY_TSV)}>
              <div className={classes.indent} />
              <StyledListItemText primary="Required Properties" secondary="(TSV)" />
            </StyledMenuItem>
          </List>
        </Collapse>

        {/* Submission Templates Items */}
        <StyledMenuItem onClick={() => handleMenuClick("submission_templates")}>
          <StyledListItemText primary="Submission Templates" />
          <StyledListItemIcon>
            {!toggledMenus.includes("submission_templates") ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </StyledListItemIcon>
        </StyledMenuItem>
        <Collapse in={toggledMenus.includes("submission_templates")} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledMenuItem onClick={() => downloadAllTemplates(config?.downloadPrefix, config?.fileTransferManifestName)}>
              <div className={classes.indent} />
              <StyledListItemText primary="All Templates" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => openTemplatesDialog()}>
              <div className={classes.indent} />
              <StyledListItemText primary="Selective Templates" />
            </StyledMenuItem>
          </List>
        </Collapse>

        {/* Standard items */}
        {options}
      </StyledMenu>

      <TemplatesDownloadDialog
        open={openSubmissionTemplatesDialog}
        onClose={handleTemplatesClose}
        onConfirm={handleTemplatesDownload}
        entries={templateEntries}
        defaultSelectAll={false}
      />
    </>
  );
};

const styles = () => ({
  startIcon: {
    width: '20px',
  },
  downloadButton: {
    border: "1px solid #30405C",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: '#FFFFFF',
    width: '235px',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
  },
  downloadButtonLabel: {
    fontFamily: "Lato",
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0%',
    textTransform: 'none',
    color: '#30405C',
    padding: "0",
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


