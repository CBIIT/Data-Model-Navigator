import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
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
  downloadLoadingExample
} from '../../utils';

const {
  FILE_TYPE_FULL_DICTIONARY,
  FILE_TYPE_README,
  FILE_TYPE_TEMPLATES,
  FILE_TYPE_CONTROLLED_VOCAB_TSV,
  FILE_TYPE_CONTROLLED_VOCAB_JSON,
  FILE_TYPE_LOADING_EXAMPLE,
} = {
  FILE_TYPE_FULL_DICTIONARY: 'Data Dictionary (PDF)',
  FILE_TYPE_README: 'Data Model README (PDF)',
  FILE_TYPE_TEMPLATES: 'All Data Templates (TSV)',
  FILE_TYPE_CONTROLLED_VOCAB_TSV: 'All Vocabularies (TSV)',
  FILE_TYPE_CONTROLLED_VOCAB_JSON: 'All Vocabularies (JSON)',
  FILE_TYPE_LOADING_EXAMPLE: 'Loading File Examples'

}
const DOWNLOADS = 'Available Downloads';

const fileTypes = [
  FILE_TYPE_README,
  FILE_TYPE_FULL_DICTIONARY,
  FILE_TYPE_TEMPLATES,
  FILE_TYPE_CONTROLLED_VOCAB_TSV,
  FILE_TYPE_CONTROLLED_VOCAB_JSON,
  FILE_TYPE_LOADING_EXAMPLE,
];

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: '257px',
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '0px',
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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    padding: '10px',
    color: '#095c85',
    '&:focus': {
      backgroundColor: '#0d71a3',
      color: 'white',
      '& .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const generatePdfDocument = async (object, config, setLoading, fileName, pdfDownloadConfig) => {
  const document = (config.type === 'document') ? object : [object];
  const blob = await pdf((
    config.landscape ? <LandscapePDFDoc nodes={document} pdfDownloadConfig={pdfDownloadConfig} icon={config.catagoryIcon} /> : <PdfDocument nodes={document} />
  )).toBlob();
  setLoading(false);
  saveAs(blob, `${fileName}.pdf`);
};

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
  const [label, setLabel] = useState('Available Downloads');
  const [isLoading, setLoading] = React.useState(false);

  const filteredDictionaryC2nl = category2NodeList(filteredDictionary);
  // eslint-disable-next-line no-unused-vars
  const processedFilteredDictionary = sortByCategory(filteredDictionaryC2nl, filteredDictionary);
  const fullDictionaryC2nl = category2NodeList(fullDictionary);
  const processedFullDictionary = sortByCategory(fullDictionaryC2nl, fullDictionary);

  const pdfDownloadConfig = useSelector(state => state.ddgraph && state.ddgraph.pdfDownloadConfig);

  const clickHandler = (event) => {
    setLabel('Available Downloads');
    setAnchorElement(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorElement(null);
  };

  const setFileType = (value) => {
    setLabel(value);
    setAnchorElement(null);
  };

  const downloadFullDictionaryPdf = (pdfDownloadConfig) => {
    const fileName = createFileName(config?.downloadPrefix || 'ICDC_Data_Model', '');
    setLoading(true);
    setTimeout(() => {
      generatePdfDocument(processedFullDictionary, config, setLoading, fileName, pdfDownloadConfig);
    }, 50);
  };

  const downloadAllTemplates = (prefix = "ICDC_", fileTransferManifestName = "") => {
    // eslint-disable-next-line no-unused-vars
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
    
    const titlePrefix = (nodeTSV) => {
        const isFileManifestType = nodeTSV.type === 'file-manifest';
        return (isFileManifestType
            ? (fileTransferManifestName || prefix + 'File_Transfer_Manifest') : prefix)
    };
    const nodeName = (name) => (name === 'file' ? '' : name);
    nodesTSV.forEach((nodeTSV, index) => {
        const isFileManifestType = nodeTSV.type === 'file-manifest';
        zip.file(`${createFileName(nodeName(nodesKeyArray[index]), titlePrefix(nodeTSV), modelVersion, !isFileManifestType)}.tsv`, nodeTSV.content);
    });

    zip.generateAsync({ type: 'blob' }).then((thisContent) => {
      saveAs(thisContent, createFileName('', prefix + 'Data_Loading_Templates'));
    });
  };

  const download = () => {
    switch (label) {
      case FILE_TYPE_FULL_DICTIONARY:
        return downloadFullDictionaryPdf(pdfDownloadConfig);
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

  const getMenuItem = (type) => (
    <StyledMenuItem key={type} onClick={() => setFileType(type)}>
      <ListItemText
        classes={{
          primary: classes.listItemText,
        }}
        primary={type}
      />
    </StyledMenuItem>
  );

  const options = fileTypes
    .filter((item) => {
      if (item === FILE_TYPE_README && typeof(readMeConfig?.readMeUrl) !== "string") {
        return false;
      }
      if (item === FILE_TYPE_README && typeof(readMeConfig?.allowDownload) === "boolean") {
        return readMeConfig?.allowDownload;
      }

      return true;
    })
    .map((item) => getMenuItem(item));

  return (
    <>
      <ButtonGroup variant="contained" classes={{ root: classes.btnGrpRoot, contained: classes.btnGrpContained }}>
        <Button
          classes={{
            root: classes.availableDownloadDropdownBtn,
            label: classes.availableDownloadDropdownBtnLabel,
            contained: classes.availableDownloadBtnContained
          }}
          startIcon={<KeyboardArrowDownIcon />}
          onClick={clickHandler}
        >
          {isLoading ? (<p>Loading...</p>) : (
            <>
              {label}
            </>
          )}
        </Button>
        <Button
          disabled={DOWNLOADS === label}
          onClick={download}
          classes={{
            root: classes.availableDownloadBtn,
          }}
        >
          <img
            style={{ height: '19px', width: '19px' }}
            alt="download icon"
            src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg"
          />
        </Button>
      </ButtonGroup>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={closeHandler}
      >
        {options}
      </StyledMenu>
    </>
  );
};

const styles = () => ({
  btnGrpRoot: {
    borderRadius: '10px',
  },
  btnGrpContained: {
    boxShadow: 'none',
  },
  availableDownloadBtnContained: {
    '&:focus': {
      boxShadow: 'none'
    },
    '&:hover': {
      boxShadow: 'none'
    }
  },
  availableDownloadDropdownBtn: {
    minWidth: '258px',
    height: '38px',
    backgroundColor: '#F2F2F2'
  },
  availableDownloadBtn: {
    width: '44px',
    backgroundColor: '#0F4C91',
    '&:hover': {
      backgroundColor: '#0F4C91',
    },
    '&:disabled': {
      backgroundColor: '#A2ABBF',
    },
  },
  availableDownloadDropdownBtnLabel: {
    fontSize: '16px',
    color: '#0D71A3',
  },
  listItemText: {
    fontSize: '15px',
    paddingLeft: '29px',
    fontFamily: 'Lato',
    fontWeight: '500'
  },

});

const mapStateToProps = (state) => {
    return {
      modelVersion: state.versionInfo.modelVersion
    };
  };
  
  export default compose(
    connect(mapStateToProps),
    withStyles(styles, {withTheme: true})
  )(DownloadFileTypeBtn);
  

