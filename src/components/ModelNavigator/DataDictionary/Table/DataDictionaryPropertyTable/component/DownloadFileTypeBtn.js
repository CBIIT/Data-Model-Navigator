import React, { useState } from 'react';
import {
  withStyles,
  createTheme,
  MuiThemeProvider,
  Box,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MenuItem from '@material-ui/core/MenuItem';
import { ArrowDownward, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { saveAs } from 'file-saver';
import { capitalizeFirstLetter, createFileName } from '../../../utils';

const DOWNLOADS = 'DOWNLOADS';
const filePerfix = 'ICDC_Controlled_Vocabulary-';
const FILE_TYPE_JSON = 'JSON';
const CONTENT_TYPE_JSON = 'application/json';
const CONTENT_TYPE_TSV = 'data:text/tab-separated-values';
const FILE_TYPE_TSV = 'TSV';
const fileTypes = [FILE_TYPE_JSON, FILE_TYPE_TSV];

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: '100px',
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
      backgroundColor: 'none',
      '& .MuiListItemIcon-root': {
        backgroundColor: 'none',
      },
    },
  },
}))(MenuItem);

// const MuiMenu = withStyles({
//   paper: {
//     border: '1px solid #0D71A3',
//     width: '103px',
//     borderRadius: '0px',
//     '& .MuiList': {
//       marginTop: '0px',
//     },
//   },
//   list: {
//     paddingBottom: '0px',
//     paddingTop: '0px',
//     marginTop: '0px',
//   },
// })((props) => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'center',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'center',
//     }}
//     {...props}
//   />
// ));

// const MuiMenuItem = withStyles(() => ({
//   root: {
//     '&:focus': {
//       backgroundColor: 'none',
//       '& .MuiListItemIcon-root': {
//         backgroundColor: 'none',
//       },
//     },
//   },
// }))(MenuItem);

// const theme = {
//   overrides: {
//     MuiButton: {
//       root: {
//         minWidth: '10px',
//       },
//       startIcon: {
//         marginRight: '0px',
//       },
//       label: {
//         justifyContent: 'left',
//       },
//       outlined: {
//         border: 'none',
//       },
//     },
//   },
// };

const DownloadFileTypeBtn = ({
  classes,
  data,
  node,
  propertyKey,
}) => {
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [label, setLabel] = useState('DOWNLOADS');

  const clickHandler = (event) => {
    setLabel('DOWNLOADS');
    setAnchorElement(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorElement(null);
  };

  const setFileType = (value) => {
    setLabel(value);
    setAnchorElement(null);
  };

  const download = (thisData, fileType, contentType) => {
    const exportData = new Blob([thisData], { type: contentType });
    const nodeTitle = capitalizeFirstLetter(node);
    const fileName = createFileName(`${nodeTitle}-${propertyKey}`, filePerfix);
    saveAs(exportData, `${fileName}.${fileType.toLowerCase()}`);
  };

  const downladFile = () => {
    if (label === FILE_TYPE_JSON) {
      const jsonData = JSON.stringify(data);
      download(jsonData, FILE_TYPE_JSON, CONTENT_TYPE_JSON);
    }
    if (label === FILE_TYPE_TSV) {
      let content = '';
      if (data && data.length) {
        data.forEach((item, index) => {
          content += (index === 0) ? item : `${'\n'}${item}`;
        });
      }
      download(content, FILE_TYPE_TSV, CONTENT_TYPE_TSV);
    }
  };

  const menuItem = (type) => (
    <StyledMenuItem className={classes.menuItem} onClick={() => setFileType(type)}>
      {type}
    </StyledMenuItem>
  );

  const options = fileTypes.map((item) => menuItem(item));

  // return (
  //   <MuiThemeProvider theme={createTheme(theme)}>
  //     <Box className={classes.menu}>
  //       <Button
  //         disableRipple
  //         disabled={DOWNLOADS === label}
  //         className={classes.downloadBtn}
  //         startIcon={<ArrowDownward className={classes.downloadIcon} id="download_arrow" />}
  //         onClick={downladFile}
  //       />
  //       <Button
  //         disableRipple
  //         aria-controls="mui-menu"
  //         variant="outlined"
  //         onClick={clickHandler}
  //         className={classes.displayBtn}
  //         startIcon={<ExpandMoreIcon className={classes.expandIcon} />}
  //       >
  //         <div className={classes.dropDownText}>
  //           {label}
  //         </div>
  //       </Button>
  //       <MuiMenu
  //         anchorEl={anchorElement}
  //         keepMounted
  //         open={Boolean(anchorElement)}
  //         onClose={closeHandler}
  //       >
  //         {options}
  //       </MuiMenu>
  //     </Box>
  //   </MuiThemeProvider>
  // );
  return (
    <>
      <ButtonGroup variant="contained" classes={{ root: classes.btnGrpRoot, groupedHorizontal: classes.btnGrpHrzntl }}>
        <Button
          classes={{
            root: classes.downloadDropdownBtn,
            label: classes.downloadDropdownBtnLabel,
          }}
          startIcon={<KeyboardArrowDownIcon />}
          onClick={clickHandler}
        >
          {label}
        </Button>
        <Button
          disabled={DOWNLOADS === label}
          onClick={downladFile}
          classes={{
            root: classes.downloadBtn,
          }}
        >
          <ArrowDownward classes={{
            root: classes.downloadBtnIcon
          }} />
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
    border: '1px solid #0D71A3',
    backgroundColor: '#0D71A3',
    width: '140px',
    height: '2em',
    boxShadow: 'none',
  },
  btnGrpHrzntl: {
    borderTopRightRadius: '5px !important',
    borderBottomRightRadius: '5px !important'
  },
  downloadDropdownBtn: {
    backgroundColor: '#F2F1F1',
    border: '1px solid #0D71A3',
    width: '100%',
  },
  downloadDropdownBtnLabel: {
    color: '#0D71A3',
    fontSize: '10px',
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
  downloadBtn: {
    backgroundColor: '#0D71A3',
    width: '27px',
    color: 'white',
    '&:disabled': {
      backgroundColor: '#0D71A3',
    },
    '&:hover': {
      backgroundColor: '#0D71A3',
    }
  },
  downloadBtnIcon: {
    color: '#FFF'
  },
  menu: {
    border: '1px solid #0D71A3',
    boxSizing: 'border-box',
    backgroundColor: '#0D71A3',
    borderRadius: '5px',
    float: 'left',
  },
  displayBtn: {
    width: '102px',
    height: '2em',
    boxSizing: 'border-box',
    color: '#0d71a3',
    backgroundColor: '#F2F1F1',
    textTransform: 'none',
    padding: '7px',
    marginRight: '0',
    float: 'left',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#F2F1F1',
    },
  },
  dropDownText: {
    lineHeight: '1.05',
    fontSize: '10px',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#0d71a3',
    textAlign: 'left',
    position: 'relative',
  },
  arrowDownward: {
    fontSize: '30px',
    color: '#DC762F',
  },
  menuItem: {
    fontSize: '10px',
    fontWeight: '700',
    paddingLeft: '22px',
    color: '#0d71a3',
    '&:last-child': {
      backgroundColor: '#CBE2EE',
      '&:hover': {
        backgroundColor: '#CBE2EE',
      },
    },
  },
  // downloadBtn: {
  //   float: 'right',
  //   marginBottom: '-20px',
  //   height: '27px',
  //   width: '27px',
  //   backgroundColor: '#0D71A3',
  //   borderRadius: '0px',
  //   paddingLeft: '8px',
  //   '&:hover': {
  //     backgroundColor: '#0D71A3',
  //   },
  // },
  downloadIcon: {
    color: '#fff',
    fontSize: '18px',
  },
});

export default withStyles(styles, { withTheme: true })(DownloadFileTypeBtn);
