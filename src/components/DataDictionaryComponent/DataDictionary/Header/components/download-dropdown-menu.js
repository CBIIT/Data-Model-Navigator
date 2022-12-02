import React, { useState } from 'react';
import {
  withStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { pdf } from '@react-pdf/renderer';
import { node } from 'prop-types';
import LandscapePDFDoc from '../../LandscapeNodePDF/Pdf';
import PdfDocument from '../../NodePDF/Pdf';
import { category2NodeList, sortByCategory } from '../../utils/download-helper-functions';
import { downloadMarkdownPdf } from '../../../ReadMe/ReadMe.component';
import {
  convertToTSV, createFileName, generateFileManifest, generateVocabFullDownload, isFileManifest,
} from '../../../utils';

const DOWNLOADS = 'Available Downloads';
const FILE_TYPE_FULL_DICTIONARY = 'Data Dictionary (PDF)';
const FILE_TYPE_README = 'Data Model ReadME (PDF)';
const FILE_TYPE_TEMPLATES = 'All Data Templates (TSV)';
const FILE_TYPE_CONTROLLED_VOCAB_TSV = 'All Vocabularies (TSV)';
const FILE_TYPE_CONTROLLED_VOCAB_JSON = 'All Vocabularies (JSON)';
const fileTypes = [
  FILE_TYPE_README,
  FILE_TYPE_FULL_DICTIONARY,
  FILE_TYPE_TEMPLATES,
  FILE_TYPE_CONTROLLED_VOCAB_TSV,
  FILE_TYPE_CONTROLLED_VOCAB_JSON,
];

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: '195px',
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
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const generatePdfDocument = async (object, config, setLoading, fileName) => {
  const document = (config.type === 'document') ? object : [object];
  const blob = await pdf((
    config.landscape ? <LandscapePDFDoc nodes={document} icon={config.catagoryIcon} /> : <PdfDocument nodes={document} />
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
}) => {
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [label, setLabel] = useState('Available Downloads');
  const [isLoading, setLoading] = React.useState(false);

  const filteredDictionaryC2nl = category2NodeList(filteredDictionary);
  // eslint-disable-next-line no-unused-vars
  const processedFilteredDictionary = sortByCategory(filteredDictionaryC2nl, filteredDictionary);
  const fullDictionaryC2nl = category2NodeList(fullDictionary);
  const processedFullDictionary = sortByCategory(fullDictionaryC2nl, fullDictionary);

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

  const downloadFullDictionaryPdf = () => {
    const fileName = createFileName('ICDC_Data_Model', '');
    setLoading(true);
    setTimeout(() => {
      generatePdfDocument(processedFullDictionary, config, setLoading, fileName);
    }, 50);
  };

  const downloadAllTemplates = () => {
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
    const titlePrefix = (nodeTSV) => (nodeTSV.type === 'file-manifest'
      ? 'ICDC_File_Transfer_Manifest' : 'ICDC_Data_Loading_Template-');
    const nodeName = (name) => (name === 'file' ? '' : name);
    nodesTSV.forEach((nodeTSV, index) => zip.file(`${createFileName(nodeName(nodesKeyArray[index]), titlePrefix(nodeTSV))}.tsv`, nodeTSV.content));

    zip.generateAsync({ type: 'blob' }).then((thisContent) => {
      saveAs(thisContent, createFileName('', 'ICDC_Data_Loading_Templates'));
    });
  };

  const download = () => {
    switch (label) {
      case FILE_TYPE_FULL_DICTIONARY:
        return downloadFullDictionaryPdf();
      case FILE_TYPE_README:
        return downloadMarkdownPdf(readMeConfig.readMeTitle, readMeContent);
      case FILE_TYPE_TEMPLATES:
        return downloadAllTemplates();
      case FILE_TYPE_CONTROLLED_VOCAB_TSV:
        return generateVocabFullDownload(fullDictionary, 'TSV');
      case FILE_TYPE_CONTROLLED_VOCAB_JSON:
        return generateVocabFullDownload(fullDictionary, 'JSON');
      default:
        return null;
    }
  };

  const getMenuItem = (type) => (
    <StyledMenuItem onClick={() => setFileType(type)}>
      <ListItemText
        classes={{
          primary: classes.listItemText,
        }}
        primary={type}
      />
    </StyledMenuItem>
  );

  const options = fileTypes.map((item) => getMenuItem(item));

  return (
    <>
      <ButtonGroup variant="contained">
        <Button
          classes={{
            root: classes.availableDownloadDropdownBtn,
            label: classes.availableDownloadDropdownBtnLabel,
          }}
          startIcon={<KeyboardArrowDownIcon />}
          onClick={clickHandler}
        >
          { isLoading ? (<p>Loading...</p>) : (
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
  availableDownloadDropdownBtn: {
    width: '195px',
    height: '38px',
  },
  availableDownloadBtn: {
    width: '44px',
    backgroundColor: '#0D71A3',
    '&:hover': {
      backgroundColor: '#0D71A3',
    },
    '&:disabled': {
      backgroundColor: '#0D71A3',
    },
  },
  availableDownloadDropdownBtnLabel: {
    fontSize: '12px',
    color: '#0D71A3',
  },
  listItemText: {
    fontSize: '14px',
  },

});

export default withStyles(styles, { withTheme: true })(DownloadFileTypeBtn);
